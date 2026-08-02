import React, { useState, useEffect, useRef } from 'react';
import { MarathiNLPEngine } from '../nlp/marathiEngine';
import { CATEGORIES } from '../data/initialData';
import { DatasetRecord, QueryResult } from '../types';
import {
  Send,
  Bot,
  User,
  Check,
  FileCheck,
  Building2,
  Clock,
  CircleDollarSign,
  UserCheck,
  Lightbulb,
  Sparkles,
  RefreshCw,
  Info,
  ChevronRight,
  Database
} from 'lucide-react';

interface ChatbotPageProps {
  nlpEngine: MarathiNLPEngine;
  selectedCategoryFilter?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  result?: QueryResult;
  timestamp: string;
}

export const ChatbotPage: React.FC<ChatbotPageProps> = ({
  nlpEngine,
  selectedCategoryFilter = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategoryFilter);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: 'नमस्कार! मी महाराष्ट्र सरकारी सेवा सहाय्यक आहे. मी तुम्हाला विविध शासकीय योजना, कागदपत्रे, दाखले व अर्ज प्रक्रियेबद्दल अचूक माहिती देऊ शकतो. तुम्हाला कशाबद्दल माहिती हवी आहे?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [activeQueryResult, setActiveQueryResult] = useState<QueryResult | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendQuery = (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Execute Offline Marathi NLP Engine
    const result = nlpEngine.query(q);
    setActiveQueryResult(result);

    const botReplyText = result.matchedRecord
      ? result.matchedRecord.answer
      : 'क्षमस्व, आपल्या प्रश्नाशी तंतोतंत जुळणारी माहिती सापडली नाही. कृपया प्रश्न अधिक स्पष्टपणे किंवा इतर शब्दांत विचारा.';

    const botMsg: Message = {
      id: `msg-bot-${Date.now()}`,
      sender: 'bot',
      text: botReplyText,
      result: result,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 150);
  };

  const presetQuestions = [
    'नवीन आधार कार्ड कसे काढायचे?',
    'पॅन कार्ड साठी कोणती कागदपत्रे लागतात?',
    'नवीन पासपोर्ट साठी अर्ज कसा करावा?',
    'ड्रायव्हिंग लायसन्स ची फी किती आहे?',
    'उत्पन्नाचा दाखला कुठे मिळतो?'
  ];

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-white overflow-hidden">
      {/* Left Sidebar: Categories */}
      <aside className="w-full lg:w-64 bg-white border-r border-orange-100 flex flex-col p-4 shrink-0 overflow-y-auto max-h-48 lg:max-h-none border-b lg:border-b-0">
        <h2 className="text-orange-700 font-extrabold text-xs uppercase tracking-widest mb-3">
          सेवा श्रेणी (11 Categories)
        </h2>

        <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          <button
            onClick={() => setSelectedCategory('')}
            className={`p-2.5 text-xs rounded-xl font-medium text-left transition-colors whitespace-nowrap shrink-0 lg:shrink ${
              selectedCategory === ''
                ? 'bg-orange-600 text-white font-bold shadow-sm'
                : 'hover:bg-orange-50 text-gray-700'
            }`}
          >
            सर्व श्रेणी (All Services)
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.code}
              onClick={() => {
                setSelectedCategory(cat.code);
                handleSendQuery(`${cat.name} साठी अर्ज कसा करावा?`);
              }}
              className={`p-2.5 text-xs rounded-xl font-medium text-left transition-colors whitespace-nowrap shrink-0 lg:shrink flex items-center justify-between ${
                selectedCategory === cat.code
                  ? 'bg-orange-100 text-orange-900 border-l-4 border-orange-600 font-bold'
                  : 'hover:bg-orange-50 text-gray-700'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-gray-400 font-normal ml-2 hidden lg:inline">
                ({cat.englishName})
              </span>
            </button>
          ))}
        </div>

        {/* Offline Badge */}
        <div className="mt-auto pt-4 hidden lg:block">
          <div className="p-3 bg-green-50 border border-green-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-green-700 font-bold text-xs">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shrink-0" />
              स्थिती: ऑफलाइन (Offline Active)
            </div>
            <p className="text-[10px] text-green-600 leading-tight">
              सर्व प्रक्रिया स्थानिक सर्व्हरवर सुरक्षितपणे पार पाडली जात आहे.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-orange-50/30 relative h-full overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  म
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[78%] space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-orange-600 text-white p-4 rounded-2xl rounded-tr-none shadow-md font-medium text-sm sm:text-base'
                    : 'bg-white text-gray-800 p-4 sm:p-5 rounded-2xl rounded-tl-none shadow-sm border border-orange-100 text-sm sm:text-base'
                }`}
              >
                <div>{msg.text}</div>

                {/* Personalized Guidance Card inside Bot Response */}
                {msg.sender === 'bot' && msg.result && msg.result.matchedRecord && (
                  <div className="mt-3 pt-3 border-t border-orange-100 space-y-3 text-xs">
                    <div className="flex items-center gap-1.5 text-orange-700 font-extrabold text-xs">
                      <Sparkles className="w-4 h-4 text-orange-600" />
                      वैयक्तिक मार्गदर्शन व तपशील (Personalized Guidance):
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                      <div className="p-2.5 bg-orange-50/80 rounded-xl border border-orange-100 flex items-start gap-2">
                        <FileCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-900 block">आवश्यक कागदपत्रे:</span>
                          <span className="text-[11px]">
                            {msg.result.guidance.documents.join(', ')}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-orange-50/80 rounded-xl border border-orange-100 flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-900 block">कार्यालय / स्थान:</span>
                          <span className="text-[11px]">{msg.result.guidance.office}</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-orange-50/80 rounded-xl border border-orange-100 flex items-start gap-2">
                        <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-900 block">अंदाजे कालावधी:</span>
                          <span className="text-[11px]">{msg.result.guidance.processingTime}</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-orange-50/80 rounded-xl border border-orange-100 flex items-start gap-2">
                        <CircleDollarSign className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-900 block">शासकीय शुल्क:</span>
                          <span className="text-[11px]">{msg.result.guidance.fees}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-amber-700 shrink-0" />
                      <div>
                        <strong className="text-amber-900">पात्रता निकष: </strong>
                        <span className="text-amber-800">{msg.result.guidance.eligibility}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-right opacity-60 font-sans">{msg.timestamp}</div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Quick Preset Buttons */}
          {messages.length < 3 && (
            <div className="pt-2">
              <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                वारंवार विचारले जाणारे प्रश्न (Suggested Queries):
              </div>
              <div className="flex flex-wrap gap-2">
                {presetQuestions.map((pq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendQuery(pq)}
                    className="text-xs bg-white hover:bg-orange-100 text-orange-900 border border-orange-200 px-3 py-1.5 rounded-full transition-colors font-medium shadow-2xs"
                  >
                    {pq}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-orange-50/90 border-t border-orange-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputQuery);
            }}
            className="flex gap-2 sm:gap-3 max-w-4xl mx-auto"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="तुमचा प्रश्न येथे विचारा... (उदा. नवीन रेशन कार्ड कसे काढायचे?)"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl border-2 border-orange-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none text-sm sm:text-base bg-white shadow-sm"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl font-bold shadow-md hover:shadow-orange-200 transition-all flex items-center gap-2 active:scale-95 shrink-0"
            >
              <span>विचारा</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      {/* Right Sidebar: Related Recommendations & NLP Pipeline Status */}
      <aside className="w-full lg:w-80 bg-gray-50 border-l border-gray-200 p-4 flex flex-col shrink-0 overflow-y-auto gap-4">
        {/* Related Service Recommendations */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            शिफारस केलेल्या संबंधित सेवा (Related Recommendations)
          </h2>

          {activeQueryResult && activeQueryResult.relatedRecommendations.length > 0 ? (
            <div className="space-y-2">
              {activeQueryResult.relatedRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => handleSendQuery(rec.question)}
                  className="p-2.5 bg-orange-50/50 hover:bg-orange-100 border border-orange-100 rounded-xl text-xs cursor-pointer transition-colors group"
                >
                  <span className="text-orange-700 font-bold block group-hover:underline">
                    {rec.question}
                  </span>
                  <span className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                    {rec.category} • {rec.intent}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic p-2 text-center">
              प्रश्नाचा शोध घेतल्यानंतर संबंधित इतर सेवा येथे दर्शविल्या जातील.
            </div>
          )}
        </div>

        {/* NLP Pipeline Status Breakdown */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 flex-1 space-y-4">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center justify-between">
            <span>NLP प्रक्रिया स्थिती (Pipeline)</span>
            <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">
              100% Local
            </span>
          </h2>

          {activeQueryResult ? (
            <div className="space-y-3 text-xs">
              <div className="p-2 bg-gray-50 rounded-lg space-y-1">
                <div className="flex items-center gap-2 text-green-700 font-bold">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  Unicode Normalization
                </div>
                <div className="text-[11px] text-gray-600 font-mono pl-6 truncate">
                  {activeQueryResult.pipelineSteps[0].details || 'NFC Clean'}
                </div>
              </div>

              <div className="p-2 bg-gray-50 rounded-lg space-y-1">
                <div className="flex items-center gap-2 text-green-700 font-bold">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  Text Cleaning & Tokenization
                </div>
                <div className="text-[11px] text-gray-600 pl-6 flex flex-wrap gap-1">
                  {activeQueryResult.pipelineSteps[2].tokens?.slice(0, 6).map((t, i) => (
                    <span key={i} className="bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2 bg-gray-50 rounded-lg space-y-1">
                <div className="flex items-center gap-2 text-green-700 font-bold">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  Stopwords Removed
                </div>
                <div className="text-[10px] text-gray-500 pl-6 italic">
                  {activeQueryResult.pipelineSteps[3].stopwordsRemoved?.join(', ') || 'None'}
                </div>
              </div>

              <div className="p-2 bg-gray-50 rounded-lg space-y-1">
                <div className="flex items-center gap-2 text-blue-700 font-bold">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
                  TF-IDF Vector Weight
                </div>
                <div className="text-[10px] text-gray-600 pl-6 space-y-0.5 font-mono">
                  {activeQueryResult.pipelineSteps[4].vectorTerms?.slice(0, 3).map((vt, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{vt.term}</span>
                      <span className="font-bold text-blue-800">{vt.tfidf}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-200">
                <div className="text-[11px] font-bold text-orange-900 flex justify-between">
                  <span>Cosine Similarity Match:</span>
                  <span className="text-sm font-black text-orange-700">
                    {activeQueryResult.similarityScore}%
                  </span>
                </div>
                {activeQueryResult.matchedRecord && (
                  <div className="text-[10px] text-orange-800 mt-1">
                    Intent: <strong>{activeQueryResult.matchedRecord.intent}</strong>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</div>
                <span>Unicode Normalization</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</div>
                <span>Tokenization</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</div>
                <span>Stopword Removal</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">↻</div>
                <span>TF-IDF Vectorization</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px]">-</div>
                <span>Cosine Similarity</span>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 text-[10px] font-mono text-gray-400 space-y-1">
            <div>DATASET: 396 Records</div>
            <div>INTENTS: 66 Categories</div>
            <div>ENGINE: Local Scikit-learn TF-IDF</div>
          </div>
        </div>
      </aside>
    </div>
  );
};
