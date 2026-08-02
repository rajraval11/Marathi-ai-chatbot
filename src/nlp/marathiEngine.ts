import { DatasetRecord, QueryResult, NLPPipelineStep, GuidanceInfo } from '../types';
import { normalizeRomanAndMixedQuery } from './romanMarathiNormalizer';

// Standard Marathi Stopwords List
const MARATHI_STOPWORDS = new Set([
  'आहे', 'आहेत', 'आहीत', 'होते', 'होता', 'होती', 'आणि', 'साठी', 'हे', 'हा', 'ही',
  'तर', 'की', 'चा', 'ची', 'चे', 'च्या', 'ने', 'ना', 'ला', 'मध्ये', 'वर', 'कडून',
  'द्वारे', 'बद्दल', 'कसा', 'कशी', 'कसे', 'का', 'काय', 'कोण', 'कुठे', 'कुठून',
  'इत्यादी', 'या', 'ती', 'त्या', 'मला', 'माझा', 'माझी', 'माझे', 'होय', 'नाही',
  'सांगा', 'सांगावे', 'मिळेल', 'मिळते', 'करावा', 'करावी', 'करावे', 'करा', 'करू',
  'असा', 'अशी', 'असे', 'अशा', 'कोणती', 'कोणता', 'कोणते', 'कोणकोणती', 'सर्व',
  'सर्वप्रथम', 'आपले', 'आपल्या', 'उदा', 'सोबत', 'सुद्धा', 'तसेच', 'किंवा', 'इतके',
  'योजना', 'केले', 'जाते', 'जातो', 'येते', 'येतो', 'आहेत', 'असल्यास', 'नसल्यास'
]);

export class MarathiNLPEngine {
  private corpus: DatasetRecord[] = [];
  private vocabulary: string[] = [];
  private idfMap: Map<string, number> = new Map();
  private docVectors: Map<string, Map<string, number>> = new Map();
  private docNorms: Map<string, number> = new Map();
  private isIndexBuilt = false;

  constructor(records: DatasetRecord[]) {
    this.updateCorpus(records);
  }

  public updateCorpus(records: DatasetRecord[]): void {
    this.corpus = records;
    this.buildTFIDFIndex();
  }

  /**
   * 1. Unicode Normalization
   */
  public normalizeUnicode(text: string): string {
    if (!text) return '';
    // Normalize to Unicode NFC
    let normalized = text.normalize('NFC');
    // Remove Zero-Width Joiner (U+200D) and Non-Joiner (U+200C)
    normalized = normalized.replace(/[\u200B-\u200D\uFEFF]/g, '');
    // Standardize Devanagari variations
    normalized = normalized
      .replace(/ऴ/g, 'ळ')
      .replace(/क़/g, 'क')
      .replace(/ख़/g, 'ख')
      .replace(/ग़/g, 'ग')
      .replace(/ज़/g, 'ज')
      .replace(/फ़/g, 'फ');
    return normalized.trim();
  }

  /**
   * 2. Text Cleaning
   */
  public cleanText(text: string): string {
    const normalized = this.normalizeUnicode(text);
    // Keep Devanagari characters, Latin alphanumeric characters, numbers, and whitespace.
    const cleaned = normalized.replace(/[^\u0900-\u097F0-9a-zA-Z\s]/g, ' ');
    // Replace multiple spaces with a single space
    return cleaned.replace(/\s+/g, ' ').trim();
  }

  /**
   * 3. Tokenization
   */
  public tokenize(text: string): string[] {
    const cleaned = this.cleanText(text);
    if (!cleaned) return [];
    return cleaned.split(' ').filter((token) => token.length > 0);
  }

  /**
   * 4. Stopword Removal
   */
  public removeStopwords(tokens: string[]): { filtered: string[]; removed: string[] } {
    const filtered: string[] = [];
    const removed: string[] = [];

    for (const token of tokens) {
      const lowerToken = token.toLowerCase();
      if (MARATHI_STOPWORDS.has(token) || MARATHI_STOPWORDS.has(lowerToken) || token.length < 2) {
        removed.push(token);
      } else {
        filtered.push(token);
      }
    }

    return { filtered, removed };
  }

  /**
   * Preprocess a raw query string into tokens
   */
  public preprocess(rawText: string): {
    normalized: string;
    cleaned: string;
    rawTokens: string[];
    tokens: string[];
    stopwordsRemoved: string[];
  } {
    // Local offline normalization layer for Roman Marathi & English terms
    const transliterated = normalizeRomanAndMixedQuery(rawText);
    const combinedRaw = `${rawText} ${transliterated}`;

    const normalized = this.normalizeUnicode(combinedRaw);
    const cleaned = this.cleanText(normalized);
    const rawTokens = this.tokenize(cleaned);
    const { filtered: tokens, removed: stopwordsRemoved } = this.removeStopwords(rawTokens);

    return {
      normalized,
      cleaned,
      rawTokens,
      tokens,
      stopwordsRemoved
    };
  }

  /**
   * 5. Build TF-IDF Index over Corpus
   */
  public buildTFIDFIndex(): void {
    const vocabSet = new Set<string>();
    const docTermFreqs: Map<string, Map<string, number>> = new Map();
    const docCount = this.corpus.length;

    if (docCount === 0) return;

    // Document frequency per term
    const dfMap = new Map<string, number>();

    for (const record of this.corpus) {
      const fullText = `${record.question} ${record.question} ${record.keywords} ${record.category} ${record.intent}`;
      const { tokens } = this.preprocess(fullText);

      const tfMap = new Map<string, number>();
      const uniqueTerms = new Set<string>();

      for (const term of tokens) {
        tfMap.set(term, (tfMap.get(term) || 0) + 1);
        vocabSet.add(term);
        uniqueTerms.add(term);
      }

      // Term Frequencies
      docTermFreqs.set(record.id, tfMap);

      for (const term of uniqueTerms) {
        dfMap.set(term, (dfMap.get(term) || 0) + 1);
      }
    }

    this.vocabulary = Array.from(vocabSet);
    this.idfMap.clear();

    // Compute IDF
    for (const term of this.vocabulary) {
      const df = dfMap.get(term) || 0;
      // Smooth IDF formula: ln((1 + N) / (1 + df)) + 1
      const idf = Math.log((1 + docCount) / (1 + df)) + 1;
      this.idfMap.set(term, idf);
    }

    // Compute TF-IDF Vectors & Norms
    this.docVectors.clear();
    this.docNorms.clear();

    for (const record of this.corpus) {
      const tfMap = docTermFreqs.get(record.id) || new Map();
      const tfidfVector = new Map<string, number>();
      let sumSquares = 0;

      tfMap.forEach((freq, term) => {
        const idf = this.idfMap.get(term) || 1;
        // TF: term count divided by total document tokens
        const tf = freq;
        const weight = tf * idf;
        tfidfVector.set(term, weight);
        sumSquares += weight * weight;
      });

      this.docVectors.set(record.id, tfidfVector);
      this.docNorms.set(record.id, Math.sqrt(sumSquares) || 1);
    }

    this.isIndexBuilt = true;
  }

  /**
   * Compute TF-IDF vector for query
   */
  private getQueryVector(tokens: string[]): {
    vector: Map<string, number>;
    norm: number;
    vectorTerms: { term: string; tfidf: number }[];
  } {
    const tfMap = new Map<string, number>();
    for (const token of tokens) {
      tfMap.set(token, (tfMap.get(token) || 0) + 1);
    }

    const queryVector = new Map<string, number>();
    const vectorTerms: { term: string; tfidf: number }[] = [];
    let sumSquares = 0;

    tfMap.forEach((freq, term) => {
      const idf = this.idfMap.get(term) || Math.log(1 + this.corpus.length) + 1;
      const weight = freq * idf;
      queryVector.set(term, weight);
      sumSquares += weight * weight;
      vectorTerms.push({ term, tfidf: Number(weight.toFixed(4)) });
    });

    const norm = Math.sqrt(sumSquares) || 1;
    vectorTerms.sort((a, b) => b.tfidf - a.tfidf);

    return { vector: queryVector, norm, vectorTerms };
  }

  /**
   * 6. Cosine Similarity Computation
   */
  public calculateCosineSimilarity(
    qVector: Map<string, number>,
    qNorm: number,
    docId: string
  ): number {
    const dVector = this.docVectors.get(docId);
    const dNorm = this.docNorms.get(docId);

    if (!dVector || !dNorm || qNorm === 0) return 0;

    let dotProduct = 0;
    qVector.forEach((weight, term) => {
      if (dVector.has(term)) {
        dotProduct += weight * (dVector.get(term) || 0);
      }
    });

    return dotProduct / (qNorm * dNorm);
  }

  /**
   * Main Query Function
   */
  public query(rawUserQuery: string): QueryResult {
    if (!this.isIndexBuilt || this.corpus.length === 0) {
      this.buildTFIDFIndex();
    }

    const pipelineSteps: NLPPipelineStep[] = [
      { name: 'Unicode Normalization', status: 'completed', details: '' },
      { name: 'Text Cleaning', status: 'completed', details: '' },
      { name: 'Tokenization', status: 'completed', tokens: [] },
      { name: 'Stopword Removal', status: 'completed', stopwordsRemoved: [] },
      { name: 'TF-IDF Vectorization', status: 'completed', vectorTerms: [] },
      { name: 'Cosine Similarity', status: 'completed', similarityScore: 0 }
    ];

    const prep = this.preprocess(rawUserQuery);

    pipelineSteps[0].details = `NFC Norm: "${prep.normalized}"`;
    pipelineSteps[1].details = `Cleaned: "${prep.cleaned}"`;
    pipelineSteps[2].tokens = prep.rawTokens;
    pipelineSteps[3].stopwordsRemoved = prep.stopwordsRemoved;

    const { vector: qVector, norm: qNorm, vectorTerms } = this.getQueryVector(prep.tokens);
    pipelineSteps[4].vectorTerms = vectorTerms;

    let bestScore = 0;
    let matchedRecord: DatasetRecord | null = null;
    const scores: { record: DatasetRecord; score: number }[] = [];

    for (const record of this.corpus) {
      const score = this.calculateCosineSimilarity(qVector, qNorm, record.id);
      scores.push({ record, score });

      if (score > bestScore) {
        bestScore = score;
        matchedRecord = record;
      }
    }

    // Sort scores descending
    scores.sort((a, b) => b.score - a.score);

    // Fallback search if TF-IDF score is very low (e.g. substring match in Marathi)
    if (bestScore < 0.1 && prep.cleaned.length > 2) {
      const subMatch = this.corpus.find(
        (r) => r.question.includes(prep.cleaned) || prep.cleaned.includes(r.question)
      );
      if (subMatch) {
        matchedRecord = subMatch;
        bestScore = 0.45;
      } else if (this.corpus.length > 0) {
        matchedRecord = scores[0].record;
        bestScore = Math.max(0.1, scores[0].score);
      }
    }

    pipelineSteps[5].similarityScore = Number((bestScore * 100).toFixed(1));
    pipelineSteps[5].details = matchedRecord
      ? `Matched: ID ${matchedRecord.id} (${(bestScore * 100).toFixed(1)}%)`
      : 'No confident match found';

    // Get Top 3 Related Recommendations from same category or next top similarity items
    const relatedRecommendations: DatasetRecord[] = [];
    if (matchedRecord) {
      const sameCategoryRecords = scores
        .filter((item) => item.record.id !== matchedRecord?.id)
        .slice(0, 3)
        .map((item) => item.record);

      relatedRecommendations.push(...sameCategoryRecords);
    }

    const guidance = this.extractGuidance(matchedRecord);

    return {
      matchedRecord,
      similarityScore: Number((bestScore * 100).toFixed(1)),
      relatedRecommendations,
      guidance,
      pipelineSteps
    };
  }

  /**
   * Extract Structured Guidance Information
   */
  public extractGuidance(record: DatasetRecord | null): GuidanceInfo {
    if (!record) {
      return {
        documents: ['जन्म दाखला / शाळा सोडल्याचा दाखला', 'ओळखीचा पुरावा (आधार / पॅन / मतदार ओळखपत्र)', 'निवासाचा पुरावा'],
        office: 'आधार सेवा केंद्र / सेतू केंद्र / तहसील कार्यालय',
        processingTime: '७ ते ३० कार्यदिवस',
        fees: 'शासकीय नियमानुसार (काही सेवा मोफत)',
        eligibility: 'महाराष्ट्रातील / भारतातील रहिवासी नागरिक'
      };
    }

    const answer = record.answer;
    const entity = record.entity;

    // Parse Entity Attributes if available
    const docs: string[] = [];
    let office = '';
    let processingTime = '';
    let fees = '';
    let eligibility = '';

    if (entity) {
      const docMatches = entity.match(/\[([^\]]+)\]\(DOCUMENT\)/g);
      if (docMatches) {
        docMatches.forEach((m) => {
          const doc = m.replace(/\[([^\]]+)\]\(DOCUMENT\)/, '$1');
          if (doc) docs.push(doc);
        });
      }

      const officeMatch = entity.match(/\[([^\]]+)\]\((LOCATION_OFFICE|ORGANIZATION)\)/);
      if (officeMatch) office = officeMatch[1];

      const timeMatch = entity.match(/\[([^\]]+)\]\(DATE_TIME\)/);
      if (timeMatch) processingTime = timeMatch[1];

      const feeMatch = entity.match(/\[([^\]]+)\]\(FEE_AMOUNT\)/);
      if (feeMatch) fees = feeMatch[1];

      const eligMatch = entity.match(/\[([^\]]+)\]\(ELIGIBILITY_ATTRIBUTE\)/);
      if (eligMatch) eligibility = eligMatch[1];
    }

    // Default Fallback values extracted from text if missing
    if (docs.length === 0) {
      if (answer.includes('जन्म दाखला')) docs.push('जन्म दाखला');
      if (answer.includes('शाळा सोडल्याचा दाखला')) docs.push('शाळा सोडल्याचा दाखला');
      if (answer.includes('निवासाचा पुरावा')) docs.push('निवासाचा पुरावा');
      if (answer.includes('आधार कार्ड')) docs.push('आधार कार्ड');
      if (answer.includes('उत्पन्नाचा दाखला')) docs.push('उत्पन्नाचा दाखला');
      if (answer.includes('ओळखीचा पुरावा')) docs.push('ओळखीचा पुरावा');
      if (answer.includes('पत्त्याचा पुरावा')) docs.push('पत्त्याचा पुरावा');
      if (docs.length === 0) docs.push('ओळखीचा पुरावा व निवासाचा पुरावा');
    }

    if (!office) {
      if (answer.includes('आधार सेवा केंद्र')) office = 'आधार सेवा केंद्र';
      else if (answer.includes('NSDL') || answer.includes('UTIITSL')) office = 'NSDL / UTIITSL केंद्र';
      else if (answer.includes('पासपोर्ट सेवा केंद्र')) office = 'पासपोर्ट सेवा केंद्र (PSK)';
      else if (answer.includes('RTO') || answer.includes('परिवहन')) office = 'प्रादेशिक परिवहन कार्यालय (RTO)';
      else if (answer.includes('तहसील')) office = 'तहसील कार्यालय / सेतू सुविधा केंद्र';
      else if (answer.includes('ग्रामपंचायत') || answer.includes('नगरपालिका')) office = 'ग्रामपंचायत / नगरपालिका कार्यालय';
      else if (answer.includes('अन्न, नागरी पुरवठा')) office = 'अन्न, नागरी पुरवठा कार्यालय';
      else office = 'संबंधित शासकीय कार्यालय / आपले सरकार पोर्टल';
    }

    if (!processingTime) {
      const timeExtract = answer.match(/(\d+\s*ते\s*\d+\s*दिवस|साधारण\s*\d+\s*दिवस)/);
      if (timeExtract) {
        processingTime = timeExtract[0];
      } else {
        processingTime = '१५ ते ३० दिवस (अंदाजे)';
      }
    }

    if (!fees) {
      if (answer.includes('विनामूल्य') || answer.includes('कोणतेही शुल्क नाही') || answer.includes('शुल्क आकारले जात नाही')) {
        fees = 'विनामूल्य (कोणतेही शासकीय शुल्क नाही)';
      } else if (answer.includes('१०७')) {
        fees = '₹१०७ (शासकीय शुल्क)';
      } else if (answer.includes('१,५००')) {
        fees = '₹१,५०० (सर्वसाधारण सेवा) / ₹३,५०० (तात्काळ)';
      } else if (answer.includes('२००')) {
        fees = '₹२०० (शासकीय प्रक्रिया शुल्क)';
      } else {
        fees = 'नाममात्र शासकीय शुल्क';
      }
    }

    if (!eligibility) {
      if (answer.includes('भारतीय नागरिक') || answer.includes('भारताचा')) {
        eligibility = 'भारताचा रहिवासी नागरिक';
      } else if (answer.includes('महाराष्ट्र')) {
        eligibility = 'महाराष्ट्राचा रहिवासी नागरिक / कुटुंब';
      } else if (answer.includes('१८ वर्षे')) {
        eligibility = 'वय किमान १८ वर्षे पूर्ण';
      } else {
        eligibility = 'संबंधित योजनेच्या निकषानुसार पात्र नागरिक';
      }
    }

    return {
      documents: docs,
      office,
      processingTime,
      fees,
      eligibility
    };
  }
}
