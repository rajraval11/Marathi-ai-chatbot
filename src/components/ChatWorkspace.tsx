import React, { useState, useEffect, useRef } from 'react';
import { MarathiNLPEngine } from '../nlp/marathiEngine';
import { DatasetRecord, QueryResult, ChatMessage, ChatSession, GuidanceInfo } from '../types';
import { CATEGORIES } from '../data/initialData';
import {
  Send,
  Bot,
  User,
  Sparkles,
  FileCheck,
  Building2,
  Clock,
  CircleDollarSign,
  UserCheck,
  Menu,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  RotateCcw,
  RefreshCw,
  Search,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

interface ChatWorkspaceProps {
  nlpEngine: MarathiNLPEngine;
  activeSession: ChatSession;
  onUpdateSessionMessages: (messages: ChatMessage[], lastContext?: string) => void;
  onNewChat: () => void;
  onToggleMobileSidebar: () => void;
  debugMode: boolean;
}

// Service detection keywords in Marathi & English
const SERVICE_KEYWORDS: { [key: string]: string } = {
  'आधार': 'Aadhaar Card',
  'aadhaar': 'Aadhaar Card',
  'पॅन': 'PAN Card',
  'pan': 'PAN Card',
  'पासपोर्ट': 'Passport',
  'passport': 'Passport',
  'ड्रायव्हिंग': 'Driving Licence',
  'लायसन्स': 'Driving Licence',
  'licence': 'Driving Licence',
  'उत्पन्न': 'Income Certificate',
  'income': 'Income Certificate',
  'जात': 'Caste Certificate',
  'caste': 'Caste Certificate',
  'रेशन': 'Ration Card',
  'ration': 'Ration Card',
  'मतदार': 'Voter ID',
  'voter': 'Voter ID',
  'शिष्यवृत्ती': 'Scholarship',
  'scholarship': 'Scholarship',
  'जन्म': 'Birth Certificate',
  'birth': 'Birth Certificate'
};

// Common follow-up & intent indicators
const AMBIGUOUS_FOLLOWUP_REGEX = /(कागदपत्रे|कागदपत्र|फी|शुल्क|कालावधी|वेळ|दिवस|पात्रता|कुठे|स्थान|ऑफिस|अर्ज कसा|माहिती द्या|काय लागते|किती|नूतनीकरण|नवीन|फायदे|लागतो|लागते|documents|document|fee|fees|cost|process|apply|how to apply|time|duration|eligibility|where|office)/i;

const GREETING_REGEX = /^(hi|hii|hiii|hey|hello|helo|helloo|hy|good\s*morning|good\s*evening|good\s*afternoon|namaste|namaskar|namste|नमस्कार|नमस्ते|हाय|हॅलो|kay\s*mhanta|kay\s*challay|kasa\s*ahes|kashi\s*ahes|bara\s*ahes\s*ka|कसा\s*आहेस|कशी\s*आहेस|काय\s*म्हणताय)$/i;
const THANKS_REGEX = /^(thanks|thank\s*you|thx|ty|धन्यवाद|खूप\s*धन्यवाद|thanksss|dhanyavad|आभारी\s*आहे|थांक्स|थँक्यू)$/i;
const GOODBYE_REGEX = /^(bye|goodbye|see\s*you|take\s*care|bye\s*bye|tc|पुन्हा\s*भेटू|निघतो|अलविदा|टाटा)$/i;
const SMALLTALK_REGEX = /^(how\s*are\s*you|who\s*are\s*you|what\s*is\s*your\s*name|tu\s*kasa\s*ahes|kaise\s*ho|कसा\s*आहेस|तुझे\s*नाव\s*काय|tu\s*kon\s*ahes|who\s*made\s*you)$/i;
const HELP_REGEX = /^(help|madat|मदत|what\s*can\s*you\s*do|features|sewa|सेवा)$/i;

export const ChatWorkspace: React.FC<ChatWorkspaceProps> = ({
  nlpEngine,
  activeSession,
  onUpdateSessionMessages,
  onNewChat,
  onToggleMobileSidebar,
  debugMode
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Auto-scroll on new message or typing state change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession.messages, isTyping]);

  // Handle textarea auto-height
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  // Helper to detect service topic in text
  const detectServiceTopic = (text: string): string | undefined => {
    const lower = text.toLowerCase();
    for (const [kw, serviceName] of Object.entries(SERVICE_KEYWORDS)) {
      if (lower.includes(kw)) {
        return serviceName;
      }
    }
    return undefined;
  };

  // Build ChatGPT-like Conversational Bot Response (6-8 lines max, no monolithic data dumps)
  const buildConversationalResponse = (
    userQuery: string,
    record: DatasetRecord,
    guidance: GuidanceInfo,
    relatedRecs: DatasetRecord[],
    serviceTitle: string
  ): { botText: string; actionChips: { label: string; query: string }[] } => {
    const qLower = userQuery.toLowerCase();

    // Specific Intent detection regexes
    const isDocs = /(कागदपत्रे|कागदपत्र|कागद|documents|document|docs|doc)/i.test(qLower);
    const isFees = /(फी|शुल्क|किती\s*फी|किती\s*शुल्क|पैसे|पावती|cost|fees|fee|charge|price)/i.test(qLower);
    const isTime = /(कालावधी|वेळ|दिवस|किती\s*दिवस|कालावधी\s*किती|time|duration|days)/i.test(qLower);
    const isEligibility = /(पात्रता|निकष|कुठे|स्थान|कार्यालय|ऑफिस|स्थानिक|eligibility|where|office)/i.test(qLower);
    const isSpecificProcess = /(अर्ज\s*कसा\s*करावा|प्रक्रिया\s*काय|स्टेप्स|steps|नोंदणी\s*कशी|procedure|apply\s*process)/i.test(qLower);

    let botText = '';
    const actionChips: { label: string; query: string }[] = [];

    const displayName = serviceTitle || record.category || 'या सेवे';

    if (isDocs) {
      const docsList = guidance?.documents && guidance.documents.length > 0
        ? guidance.documents.slice(0, 4).map(d => `• ${d}`).join('\n')
        : '• ओळखीचा पुरावा (आधार / पॅन)\n• निवासाचा पुरावा (वीज बिल / रेशन कार्ड)';

      botText = `नवीन ${displayName} साठी खालील कागदपत्रे आवश्यक आहेत:\n\n${docsList}\n\nतुम्हाला ${displayName} ची अर्ज प्रक्रिया किंवा शुल्काविषयी माहिती हवी आहे का?`;

      actionChips.push(
        { label: '📝 अर्ज प्रक्रिया', query: `${displayName} ची अर्ज प्रक्रिया काय आहे?` },
        { label: '💰 शुल्क', query: `${displayName} ची फी किती आहे?` },
        { label: '⏳ कालावधी', query: `${displayName} साठी किती वेळ लागतो?` },
        { label: '✅ पात्रता', query: `${displayName} ची पात्रता काय आहे?` }
      );
    } else if (isFees) {
      const feeText = guidance?.fees || 'शासकीय नियमानुसार नाममात्र शुल्क';
      const officeText = guidance?.office ? `\n• भरण्याचे ठिकाण: ${guidance.office}` : '';

      botText = `${displayName} साठी लागणारे शासकीय शुल्क:\n\n• शासकीय शुल्क: ${feeText}${officeText}\n\nतुम्हाला यासाठी लागणारी आवश्यक कागदपत्रे किंवा अर्ज प्रक्रिया पाहायची आहे का?`;

      actionChips.push(
        { label: '📄 आवश्यक कागदपत्रे', query: `${displayName} साठी कोणती कागदपत्रे लागतात?` },
        { label: '📝 अर्ज प्रक्रिया', query: `${displayName} ची अर्ज प्रक्रिया काय आहे?` },
        { label: '⏳ कालावधी', query: `${displayName} साठी किती वेळ लागतो?` },
        { label: '✅ पात्रता', query: `${displayName} ची पात्रता काय आहे?` }
      );
    } else if (isTime) {
      const timeText = guidance?.processingTime || '७ ते १५ कार्यदिवस';
      const officeText = guidance?.office ? ` (${guidance.office})` : '';

      botText = `${displayName} मिळण्याचा अंदाजे कालावधी:\n\n• कालावधी: ${timeText}${officeText}\n• अर्ज सबमिट केल्यानंतर पोच पावती क्रमांकाने स्थिती ट्रॅक करता येते.\n\nतुम्हाला यासाठी लागणारी कागदपत्रे किंवा अर्ज प्रक्रिया पाहायची आहे का?`;

      actionChips.push(
        { label: '📄 आवश्यक कागदपत्रे', query: `${displayName} साठी कोणती कागदपत्रे लागतात?` },
        { label: '📝 अर्ज प्रक्रिया', query: `${displayName} ची अर्ज प्रक्रिया काय आहे?` },
        { label: '💰 शुल्क', query: `${displayName} ची फी किती आहे?` },
        { label: '✅ पात्रता', query: `${displayName} ची पात्रता काय आहे?` }
      );
    } else if (isEligibility) {
      const eligibilityText = guidance?.eligibility || 'महाराष्ट्रातील रहिवासी नागरिक';
      const officeText = guidance?.office || 'सेतू केंद्र / तहसील कार्यालय';

      botText = `${displayName} साठी पात्रता आणि स्थान माहिती:\n\n• पात्रता निकष: ${eligibilityText}\n• कार्यालय / ठिकाण: ${officeText}\n\nतुम्हाला यासाठी लागणारी कागदपत्रे किंवा अर्ज प्रक्रिया पाहायची आहे का?`;

      actionChips.push(
        { label: '📄 आवश्यक कागदपत्रे', query: `${displayName} साठी कोणती कागदपत्रे लागतात?` },
        { label: '📝 अर्ज प्रक्रिया', query: `${displayName} ची अर्ज प्रक्रिया काय आहे?` },
        { label: '💰 शुल्क', query: `${displayName} ची फी किती आहे?` },
        { label: '⏳ कालावधी', query: `${displayName} साठी किती वेळ लागतो?` }
      );
    } else if (isSpecificProcess) {
      const officeText = guidance?.office || 'सेतू सुविधा केंद्र';
      botText = `${displayName} साठी अर्ज करण्याची मुख्य प्रक्रिया:\n\n• ${officeText} किंवा अधिकृत शासकीय पोर्टलवर ऑनलाईन/ऑफलाईन अर्ज भरा.\n• आवश्यक मूळ कागदपत्रांची पडताळणी पूर्ण करा.\n• विहित शासकीय शुल्क भरून पोच पावती मिळवा.\n\nतुम्हाला या सेवेची आवश्यक कागदपत्रे किंवा शुल्क पाहायचे आहे का?`;

      actionChips.push(
        { label: '📄 आवश्यक कागदपत्रे', query: `${displayName} साठी कोणती कागदपत्रे लागतात?` },
        { label: '💰 शुल्क', query: `${displayName} ची फी किती आहे?` },
        { label: '⏳ कालावधी', query: `${displayName} साठी किती वेळ लागतो?` },
        { label: '✅ पात्रता', query: `${displayName} ची पात्रता काय आहे?` }
      );
    } else {
      // General Inquiry (e.g., "पासपोर्ट कसा काढायचा?", "आधार कार्ड", "पॅन कार्ड") -> Guide the conversation with chips
      botText = `मी तुम्हाला ${displayName} बद्दल मदत करू शकतो.\n\nतुम्हाला कोणती माहिती हवी आहे?`;

      actionChips.push(
        { label: '📄 आवश्यक कागदपत्रे', query: `${displayName} साठी कोणती कागदपत्रे लागतात?` },
        { label: '📝 अर्ज प्रक्रिया', query: `${displayName} ची अर्ज प्रक्रिया काय आहे?` },
        { label: '💰 शुल्क', query: `${displayName} ची फी किती आहे?` },
        { label: '⏳ कालावधी', query: `${displayName} साठी किती वेळ लागतो?` },
        { label: '✅ पात्रता', query: `${displayName} ची पात्रता काय आहे?` }
      );
    }

    // Recommend another related government service if available
    if (relatedRecs && relatedRecs.length > 0) {
      const topRelated = relatedRecs.find(r => r.category && r.category !== displayName) || relatedRecs[0];
      if (topRelated && topRelated.category && topRelated.category !== displayName) {
        actionChips.push({
          label: `🔗 इतर सेवा: ${topRelated.category}`,
          query: `${topRelated.category} कसा काढायचा?`
        });
      }
    }

    return { botText, actionChips };
  };

  // Core Message Handler
  const handleSendMessage = (textToSend?: string) => {
    const raw = (textToSend || inputText || '').trim();
    if (!raw) return;

    // Security: Truncate large input (>500 chars) and sanitize HTML/script tags
    const query = raw.slice(0, 500).replace(/<[^>]*>/g, '').trim();
    if (!query) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: userTimestamp
    };

    const updatedMessages = [...activeSession.messages, userMsg];
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Immediately update UI with user message and show typing indicator
    onUpdateSessionMessages(updatedMessages, activeSession.lastContextService);
    setIsTyping(true);

    setTimeout(() => {
      try {
        const trimmedQuery = query.trim();
        let detectedService = detectServiceTopic(trimmedQuery);
        let currentContextService = detectedService || activeSession.lastContextService;

        // 1. Natural Greetings Handling
        if (GREETING_REGEX.test(trimmedQuery)) {
          const botReplyMsg: ChatMessage = {
            id: `msg-bot-${Date.now()}`,
            sender: 'bot',
            text: `नमस्कार! 👋\n\nमी GovAssist आहे.\nमी महाराष्ट्र शासनाच्या विविध सेवांबद्दल माहिती देऊ शकतो.\n\nआज मी तुम्हाला कशात मदत करू शकतो?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            detectedService: currentContextService,
            actionChips: [
              { label: '💳 आधार कार्ड', query: 'नवीन आधार कार्ड कसे काढायचे?' },
              { label: '✈️ पासपोर्ट', query: 'पासपोर्ट साठी अर्ज कसा करावा?' },
              { label: '📑 पॅन कार्ड', query: 'पॅन कार्ड साठी कोणती कागदपत्रे लागतात?' },
              { label: '🚗 ड्रायव्हिंग लायसन्स', query: 'ड्रायव्हिंग लायसन्स ची फी किती आहे?' }
            ]
          };
          setIsTyping(false);
          onUpdateSessionMessages([...updatedMessages, botReplyMsg], currentContextService);
          return;
        }

        // 2. Natural Thanks Handling
        if (THANKS_REGEX.test(trimmedQuery)) {
          const botReplyMsg: ChatMessage = {
            id: `msg-bot-${Date.now()}`,
            sender: 'bot',
            text: `तुमचे स्वागत आहे. 😊\n\nआणखी काही मदत हवी असल्यास नक्की विचारा.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            detectedService: currentContextService
          };
          setIsTyping(false);
          onUpdateSessionMessages([...updatedMessages, botReplyMsg], currentContextService);
          return;
        }

        // 3. Natural Goodbye Handling
        if (GOODBYE_REGEX.test(trimmedQuery)) {
          const botReplyMsg: ChatMessage = {
            id: `msg-bot-${Date.now()}`,
            sender: 'bot',
            text: `धन्यवाद! 🙏\n\nतुमचा दिवस आनंददायी जावो.\nपुन्हा भेटू.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            detectedService: currentContextService
          };
          setIsTyping(false);
          onUpdateSessionMessages([...updatedMessages, botReplyMsg], currentContextService);
          return;
        }

        // 4. Natural Small Talk Handling
        if (SMALLTALK_REGEX.test(trimmedQuery)) {
          const botReplyMsg: ChatMessage = {
            id: `msg-bot-${Date.now()}`,
            sender: 'bot',
            text: `मी GovAssist AI सहाय्यक आहे. मी एकदम छान आहे! 😊\n\nतुम्हाला कोणत्याही शासकीय सेवेबद्दल (जसे की पासपोर्ट, आधार कार्ड, पॅन कार्ड) माहिती हवी असल्यास सांगा.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            detectedService: currentContextService,
            actionChips: [
              { label: '💳 आधार कार्ड', query: 'नवीन आधार कार्ड कसे काढायचे?' },
              { label: '✈️ पासपोर्ट', query: 'पासपोर्ट साठी अर्ज कसा करावा?' },
              { label: '📑 पॅन कार्ड', query: 'पॅन कार्ड साठी कोणती कागदपत्रे लागतात?' }
            ]
          };
          setIsTyping(false);
          onUpdateSessionMessages([...updatedMessages, botReplyMsg], currentContextService);
          return;
        }

        // 5. Help / Features Handling
        if (HELP_REGEX.test(trimmedQuery)) {
          const botReplyMsg: ChatMessage = {
            id: `msg-bot-${Date.now()}`,
            sender: 'bot',
            text: `मी महाराष्ट्र शासनाच्या विविध सेवांची सविस्तर माहिती देऊ शकतो:\n\n• ✈️ पासपोर्ट (Passport)\n• 💳 आधार कार्ड (Aadhaar Card)\n• 📑 पॅन कार्ड (PAN Card)\n• 🚗 ड्रायव्हिंग लायसन्स (Driving License)\n• 🌾 उत्पन्नाचा दाखला / जात दाखला / रेशन कार्ड\n\nतुम्हाला यापैकी कोणत्या सेवेबद्दल माहिती हवी आहे?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            detectedService: currentContextService,
            actionChips: [
              { label: '💳 आधार कार्ड', query: 'नवीन आधार कार्ड कसे काढायचे?' },
              { label: '✈️ पासपोर्ट', query: 'पासपोर्ट साठी अर्ज कसा करावा?' },
              { label: '📑 पॅन कार्ड', query: 'पॅन कार्ड साठी कोणती कागदपत्रे लागतात?' },
              { label: '🚗 ड्रायव्हिंग लायसन्स', query: 'ड्रायव्हिंग लायसन्स ची फी किती आहे?' }
            ]
          };
          setIsTyping(false);
          onUpdateSessionMessages([...updatedMessages, botReplyMsg], currentContextService);
          return;
        }

        // 6. Check for Generic / Ambiguous Queries Without Context (Multiple Match Case)
        const isGenericCardRequest = /^(कार्ड|कार्ड काढायचं आहे|कार्ड काढायचे आहे|कार्ड हवे|मला कार्ड हवे|i need a card|need a card|card|फी|शुल्क|कागदपत्रे|माहिती|अर्ज)$/i.test(trimmedQuery);

        if (isGenericCardRequest && !currentContextService) {
          const botClarificationMsg: ChatMessage = {
            id: `msg-bot-${Date.now()}`,
            sender: 'bot',
            text: `आपण कोणत्या सेवेबद्दल विचारत आहात?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isClarification: true,
            clarificationOptions: [
              { label: '💳 आधार कार्ड (Aadhaar Card)', query: 'नवीन आधार कार्ड कसे काढायचे?' },
              { label: '📑 पॅन कार्ड (PAN Card)', query: 'पॅन कार्ड साठी कोणती कागदपत्रे लागतात?' },
              { label: '✈️ पासपोर्ट (Passport)', query: 'पासपोर्ट साठी अर्ज कसा करावा?' },
              { label: '🚗 ड्रायव्हिंग लायसन्स (Driving License)', query: 'ड्रायव्हिंग लायसन्स ची फी किती आहे?' },
              { label: '🗳️ मतदान ओळखपत्र (Voter ID)', query: 'मतदार ओळखपत्र कसे बनवावे?' }
            ]
          };

          setIsTyping(false);
          onUpdateSessionMessages([...updatedMessages, botClarificationMsg], currentContextService);
          return;
        }

        // 5. Follow-up Question Resolution with Context Memory
        let resolvedQuery = trimmedQuery;
        const isFollowUp = (AMBIGUOUS_FOLLOWUP_REGEX.test(trimmedQuery) || trimmedQuery.length < 35) && !detectedService;

        if (isFollowUp && activeSession.lastContextService) {
          resolvedQuery = `${activeSession.lastContextService} ${trimmedQuery}`;
        }

        // 6. Execute Query via NLP Engine
        const result = nlpEngine.query(resolvedQuery);

        // Verify similarity confidence threshold
        const isMatchConfident = result.similarityScore >= 12 && result.matchedRecord;

        let botText = '';
        let actionChips: { label: string; query: string }[] = [];
        let isFallback = false;
        let fallbackQuestions: DatasetRecord[] = [];

        if (isMatchConfident && result.matchedRecord) {
          const effectiveService = currentContextService || result.matchedRecord.category || 'शासकीय सेवा';
          const convRes = buildConversationalResponse(
            resolvedQuery,
            result.matchedRecord,
            result.guidance,
            result.relatedRecommendations,
            effectiveService
          );
          botText = convRes.botText;
          actionChips = convRes.actionChips;

          if (!detectedService) {
            currentContextService = result.matchedRecord.category || activeSession.lastContextService;
          }
        } else {
          isFallback = true;
          botText = `क्षमस्व,\nमला या प्रश्नाचे अचूक उत्तर सापडले नाही.\n\nतुम्ही खालील विषयांबद्दल विचारू शकता:`;

          fallbackQuestions = result.relatedRecommendations.length > 0
            ? result.relatedRecommendations
            : nlpEngine.query('आधार पासपोर्ट पॅन').relatedRecommendations;

          actionChips = [
            { label: '💳 आधार कार्ड', query: 'नवीन आधार कार्ड कसे काढायचे?' },
            { label: '✈️ पासपोर्ट', query: 'पासपोर्ट साठी अर्ज कसा करावा?' },
            { label: '📑 पॅन कार्ड', query: 'पॅन कार्ड साठी कोणती कागदपत्रे लागतात?' },
            { label: '🎓 शिष्यवृत्ती', query: 'महाडीबीटी शिष्यवृत्ती अर्ज कसा करावा?' }
          ];
        }

        const botReplyMsg: ChatMessage = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: botText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          result: isMatchConfident ? result : undefined,
          actionChips: actionChips,
          isFallbackSuggestions: isFallback,
          fallbackQuestions: fallbackQuestions,
          detectedService: currentContextService
        };

        setIsTyping(false);
        onUpdateSessionMessages([...updatedMessages, botReplyMsg], currentContextService);
      } catch (err) {
        console.error('Chat bot processing error:', err);
        const errorReplyMsg: ChatMessage = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: `क्षमस्व, माहिती शोधताना अडचण आली. कृपया पुन्हा विचारण्याचा प्रयत्न करा.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setIsTyping(false);
        onUpdateSessionMessages([...updatedMessages, errorReplyMsg], activeSession.lastContextService);
      }
    }, 350);
  };

  // Preset Prompt Suggestions for empty state & chips
  const presetPrompts = [
    { title: 'आधार कार्ड', desc: 'नवीन आधार कार्ड व सुधारणा प्रक्रिया', query: 'नवीन आधार कार्ड कसे काढायचे?' },
    { title: 'पासपोर्ट', desc: 'पासपोर्ट अर्ज व कागदपत्रे', query: 'पासपोर्ट साठी अर्ज कसा करावा?' },
    { title: 'पॅन कार्ड', desc: 'पॅन कार्ड नोंदणी व शुल्क', query: 'पॅन कार्ड साठी कोणती कागदपत्रे लागतात?' },
    { title: 'ड्रायव्हिंग लायसन्स', desc: 'RTO लायसन्स प्रक्रिया व फी', query: 'ड्रायव्हिंग लायसन्स ची फी किती आहे?' },
    { title: 'महाडीबीटी शिष्यवृत्ती', desc: 'विद्यार्थी शिष्यवृत्ती अर्ज', query: 'महाडीबीटी शिष्यवृत्ती अर्ज कसा करावा?' },
    { title: 'उत्पन्नाचा दाखला', desc: 'तहसील दाखला कागदपत्रे', query: 'उत्पन्नाचा दाखला कसा मिळवावा?' }
  ];

  // Helper to format bot response text nicely with lists, headings & paragraphs
  const formatBotResponseText = (text: string) => {
    const lines = text.split('\n');
    const SECTION_HEADINGS = [
      'Answer',
      'Required Documents',
      'Application Process',
      'Fees',
      'Processing Time',
      'Related Services',
      'Personalized Guidance',
      '📄 आवश्यक कागदपत्रे',
      '📋 अर्ज प्रक्रिया',
      '💰 शुल्क',
      '⏳ कालावधी',
      '🔗 संबंधित सेवा',
      '💡 वैयक्तिक सूचना'
    ];

    return (
      <div className="space-y-2 leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          const isHeading = SECTION_HEADINGS.some(h => trimmed === h || trimmed.startsWith(h));

          if (isHeading) {
            return (
              <div
                key={idx}
                className="font-extrabold text-xs tracking-wider text-stone-900 border-b border-orange-200/80 pb-1 mt-3 mb-1.5 flex items-center gap-1.5 first:mt-0"
              >
                <span>{trimmed}</span>
              </div>
            );
          }

          if (trimmed.startsWith('•') || trimmed.startsWith('-') || /^\d+\./.test(trimmed)) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-orange-600 font-bold shrink-0 mt-1">•</span>
                <span>{trimmed.replace(/^[•\-\d+\.]\s*/, '')}</span>
              </div>
            );
          }

          return <p key={idx}>{trimmed}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-amber-50/20 relative h-full overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-14 bg-white border-b border-orange-200/80 px-4 flex items-center justify-between shrink-0 z-10 shadow-2xs">
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 lg:hidden"
            title="मेन्यू (Menu)"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-stone-900 tracking-tight">GovAssist</span>
            <span className="text-stone-300">|</span>
            <span className="text-xs text-stone-500 font-medium truncate max-w-[180px] sm:max-w-xs">
              {activeSession.lastContextService ? `विषय: ${activeSession.lastContextService}` : 'शासकीय सेवा सहाय्यक'}
            </span>
          </div>
        </div>

        <button
          onClick={onNewChat}
          className="text-xs font-bold text-orange-700 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200/80 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>नवीन चॅट (New Chat)</span>
        </button>
      </header>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-4xl w-full mx-auto">
        {activeSession.messages.length === 0 ? (
          /* EMPTY CHAT SCREEN: ChatGPT / Claude Landing */
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-8 space-y-8 animate-fadeIn">
            <div className="space-y-3 max-w-lg">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center mx-auto shadow-xl">
                <Bot className="w-9 h-9" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                GovAssist
              </h1>
              <p className="text-sm text-stone-600 font-medium">
                आज मी तुम्हाला कशी मदत करू शकेन?
              </p>
              <p className="text-xs text-stone-400">
                महाराष्ट्र शासनाच्या विविध योजना, दाखले, कार्ड व अर्जांची अचूक माहिती विचारा.
              </p>
            </div>

            {/* Prompt Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl pt-2">
              {presetPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.query)}
                  className="p-4 bg-white hover:bg-orange-50/80 border border-orange-200/90 hover:border-orange-400 rounded-2xl text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between space-y-2"
                >
                  <div className="font-extrabold text-xs text-stone-800 group-hover:text-orange-700 flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ACTIVE MESSAGES STREAM */
          activeSession.messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm mt-0.5">
                    G
                  </div>
                )}

                <div className={`max-w-[88%] sm:max-w-[80%] space-y-3`}>
                  {/* Message Bubble Container */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-sm sm:text-base leading-relaxed ${
                      isUser
                        ? 'bg-orange-600 text-white rounded-tr-xs shadow-md font-medium'
                        : 'bg-white text-stone-800 rounded-tl-xs shadow-xs border border-orange-200/90'
                    }`}
                  >
                    {/* Message Body */}
                    <div>{formatBotResponseText(msg.text)}</div>

                    {/* Clarification Options */}
                    {msg.isClarification && msg.clarificationOptions && (
                      <div className="mt-4 pt-3 border-t border-orange-100 space-y-2">
                        {msg.clarificationOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(opt.query)}
                            className="w-full text-left p-2.5 bg-orange-50/80 hover:bg-orange-100 text-orange-950 border border-orange-200/80 rounded-xl font-bold text-xs transition-all flex items-center justify-between group"
                          >
                            <span>{opt.label}</span>
                            <ChevronRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Fallback Suggested Questions */}
                    {msg.isFallbackSuggestions && msg.fallbackQuestions && msg.fallbackQuestions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                        <div className="text-xs font-bold text-stone-500 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          सुचवलेले प्रश्न (Suggested Questions):
                        </div>
                        <div className="space-y-1.5">
                          {msg.fallbackQuestions.slice(0, 4).map((fq) => (
                            <button
                              key={fq.id}
                              onClick={() => handleSendMessage(fq.question)}
                              className="w-full text-left p-2.5 bg-stone-50 hover:bg-orange-50 text-stone-800 hover:text-orange-950 border border-stone-200 hover:border-orange-300 rounded-xl text-xs font-semibold transition-colors"
                            >
                              {fq.question}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contextual Suggestion Action Chips / Next Actions */}
                    {msg.actionChips && msg.actionChips.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-orange-100/90 space-y-1.5">
                        <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-orange-600" />
                          <span>पुढील पर्याय (Next Actions):</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {msg.actionChips.map((chip, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(chip.query)}
                              className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100/90 text-orange-950 border border-orange-200/90 hover:border-orange-400 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-2xs hover:shadow-xs active:scale-95 text-left"
                            >
                              <span>{chip.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Debug Mode Inspector - Only shown if debugMode is enabled */}
                    {debugMode && msg.result && (
                      <div className="mt-3 p-2.5 bg-stone-900 text-stone-200 font-mono text-[10px] rounded-xl space-y-1">
                        <div className="text-emerald-400 font-bold flex justify-between">
                          <span>[DEBUG] Cosine Similarity: {msg.result.similarityScore}%</span>
                          <span>Doc ID: {msg.result.matchedRecord?.id || 'N/A'}</span>
                        </div>
                        <div>Intent: {msg.result.matchedRecord?.intent}</div>
                        <div>Category: {msg.result.matchedRecord?.category}</div>
                      </div>
                    )}

                    {/* Timestamp & Copy Button */}
                    <div className={`text-[10px] flex items-center justify-between mt-2 pt-1 font-mono ${isUser ? 'text-orange-200' : 'text-stone-400 border-t border-stone-100'}`}>
                      {!isUser ? (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="flex items-center gap-1 text-[11px] font-sans font-medium text-stone-500 hover:text-orange-600 transition-colors py-0.5 px-1.5 rounded hover:bg-stone-100"
                          title="उत्तर कॉपी करा"
                        >
                          {copiedMsgId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">कॉपी झाले</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>कॉपी करा</span>
                            </>
                          )}
                        </button>
                      ) : <span />}
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-stone-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 items-center text-stone-500 text-xs animate-pulse pl-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm shrink-0">
              G
            </div>
            <div className="p-3 bg-white border border-orange-200/80 rounded-2xl flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Fixed Input Box */}
      <div className="p-3 sm:p-4 bg-white border-t border-orange-200/80 shrink-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto space-y-2">
          {/* Preset Quick Chips above input */}
          {activeSession.messages.length > 0 && activeSession.messages.length < 6 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0">
                त्वरित प्रश्न:
              </span>
              <button
                onClick={() => handleSendMessage('नवीन आधार कार्ड कसे काढायचे?')}
                className="px-2.5 py-1 bg-orange-100/70 hover:bg-orange-200 text-orange-900 rounded-full text-[11px] font-medium whitespace-nowrap border border-orange-200/80 transition-colors shrink-0"
              >
                आधार कार्ड
              </button>
              <button
                onClick={() => handleSendMessage('पासपोर्ट साठी काय कागदपत्रे लागतात?')}
                className="px-2.5 py-1 bg-orange-100/70 hover:bg-orange-200 text-orange-900 rounded-full text-[11px] font-medium whitespace-nowrap border border-orange-200/80 transition-colors shrink-0"
              >
                पासपोर्ट कागदपत्रे
              </button>
              <button
                onClick={() => handleSendMessage('ड्रायव्हिंग लायसन्स ची फी किती आहे?')}
                className="px-2.5 py-1 bg-orange-100/70 hover:bg-orange-200 text-orange-900 rounded-full text-[11px] font-medium whitespace-nowrap border border-orange-200/80 transition-colors shrink-0"
              >
                लायसन्स फी
              </button>
              <button
                onClick={() => handleSendMessage('उत्पन्नाचा दाखला कसा मिळवावा?')}
                className="px-2.5 py-1 bg-orange-100/70 hover:bg-orange-200 text-orange-900 rounded-full text-[11px] font-medium whitespace-nowrap border border-orange-200/80 transition-colors shrink-0"
              >
                उत्पन्न दाखला
              </button>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2 bg-stone-50 border-2 border-orange-200 focus-within:border-orange-600 focus-within:ring-2 focus-within:ring-orange-100 rounded-2xl p-2 transition-all shadow-xs"
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={handleTextareaChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="तुमचा प्रश्न विचारा... (उदा. पॅन कार्ड साठी कोणती कागदपत्रे लागतात?)"
              className="flex-1 bg-transparent border-0 outline-none resize-none px-2 py-1 text-sm text-stone-800 placeholder-stone-400 max-h-32 min-h-[38px]"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white p-2.5 rounded-xl shadow-sm transition-all shrink-0 active:scale-95"
              title="पाठवा (Send)"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Disclaimer */}
          <div className="text-[10px] text-center text-stone-400 font-medium">
            GovAssist (100% Offline AI Assistant) • अधिकृत माहितीसाठी शासकीय पोर्टलला भेट द्या.
          </div>
        </div>
      </div>
    </div>
  );
};
