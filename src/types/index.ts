export interface DatasetRecord {
  id: string;
  question: string;
  answer: string;
  intent: string;
  entity: string;
  keywords: string;
  category: string;
  complexity: string;
  conversationType: string;
}

export interface GuidanceInfo {
  documents: string[];
  office: string;
  processingTime: string;
  fees: string;
  eligibility: string;
}

export interface NLPPipelineStep {
  name: string;
  status: 'pending' | 'running' | 'completed';
  details?: string;
  tokens?: string[];
  stopwordsRemoved?: string[];
  vectorTerms?: { term: string; tfidf: number }[];
  similarityScore?: number;
}

export interface QueryResult {
  matchedRecord: DatasetRecord | null;
  similarityScore: number;
  relatedRecommendations: DatasetRecord[];
  guidance: GuidanceInfo;
  pipelineSteps: NLPPipelineStep[];
}

export interface CategoryInfo {
  name: string;
  englishName: string;
  code: string;
  icon: string;
  count: number;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  result?: QueryResult;
  isClarification?: boolean;
  clarificationOptions?: { label: string; query: string }[];
  isFallbackSuggestions?: boolean;
  fallbackQuestions?: DatasetRecord[];
  detectedService?: string;
  actionChips?: { label: string; query: string }[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
  lastContextService?: string;
}
