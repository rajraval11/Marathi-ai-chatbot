/**
 * Offline Roman Marathi & English Government Terms Normalizer
 * Normalizes Roman Marathi, English government terms, and mixed language inputs
 * into standardized Devanagari Marathi before TF-IDF vectorization & Cosine Similarity.
 * 
 * NO external APIs, NO Google Translate, NO Bhashini API, NO LLMs required.
 */

// Multi-word phrase mappings (evaluated first, case-insensitive)
const PHRASE_MAPPINGS: Array<[RegExp, string]> = [
  // Specific Government Services
  [/\b(adhar\s*card|aadhaar\s*card|aadhar\s*card|aadhr\s*card|adharcard|aadhaarcard|aadhr)\b/gi, 'आधार कार्ड'],
  [/\b(pan\s*card|pancard|pan\s*carda|pancard)\b/gi, 'पॅन कार्ड'],
  [/\b(passport|pasport|passprot|pass\s*port)\b/gi, 'पासपोर्ट'],
  [/\b(driving\s*licen[sc]e|driving\s*card|learning\s*licen[sc]e|driving\s*licen[sc]e\s*card|dl|licence|license)\b/gi, 'ड्रायव्हिंग लायसन्स'],
  [/\b(voter\s*id|voterid|voter\s*card|voting\s*card|matdar\s*id|voter\s*identity\s*card)\b/gi, 'मतदार ओळखपत्र'],
  [/\b(ration\s*card|reshan\s*card|rationcard|reshancard)\b/gi, 'रेशन कार्ड'],
  [/\b(income\s*certificate|income\s*cert|utpanna\s*dakhla|utpannacha\s*dakhla|utpanna\s*pramanpatra)\b/gi, 'उत्पन्नाचा दाखला'],
  [/\b(caste\s*certificate|caste\s*cert|jati\s*dakhla|jatiche\s*pramanpatra|jati\s*pramanpatra)\b/gi, 'जातीचा दाखला'],
  [/\b(domicile\s*certificate|domicile\s*cert|adhivas\s*pramanpatra|rehivasi\s*dakhla)\b/gi, 'अधिवास प्रमाणपत्र'],
  [/\b(birth\s*certificate|janma\s*dakhla|janmacha\s*dakhla|janma\s*pramanpatra)\b/gi, 'जन्म दाखला'],
  [/\b(death\s*certificate|mrutyu\s*dakhla|mrutyu\s*pramanpatra)\b/gi, 'मृत्यू दाखला'],
  [/\b(non\s*creamy\s*layer|non-creamy\s*layer|non\s*creamy)\b/gi, 'नॉन क्रिमी लेयर'],
  [/\b(senior\s*citizen\s*card|senior\s*citizen)\b/gi, 'ज्येष्ठ नागरिक कार्ड'],
  [/\b(pension\s*yojana|pension\s*scheme|pension\s*plan)\b/gi, 'पेन्शन योजना'],
  [/\b(govt\s*scheme|government\s*scheme|shaskiya\s*yojana|shaskiya\s*yojna)\b/gi, 'शासकीय योजना'],
  [/\b(scholarship\s*form|scholarship\s*apply|mahadbt\s*scholarship)\b/gi, 'शिष्यवृत्ती'],
  [/\b(light\s*bill|electricity\s*bill|vij\s*bill)\b/gi, 'वीज बिल'],
  [/\b(7\/12|7\s*12|satbara|sat\s*bara)\b/gi, '७/१२ उतारा'],
  [/\b(marriage\s*certificate|vivah\s*pramanpatra)\b/gi, 'विवाह नोंदणी'],
  [/\b(how\s*to\s*apply|apply\s*kase\s*karayche|kase\s*apply\s*karayche|arja\s*kasa\s*karaycha)\b/gi, 'अर्ज कसा करावा'],

  // Multi-word Actions & Queries
  [/\b(kase\s*banvayche|kase\s*banvayeche|kase\s*kadhayche|kase\s*kadhayeche|kasa\s*kadhaycha|kashi\s*kadhaychi|kase\s*kadhaych)\b/gi, 'कसे काढायचे'],
  [/\b(konte\s*documents|konthi\s*documents|konte\s*kagadpatra|konthi\s*kagadpatre|required\s*documents|documents\s*sathi)\b/gi, 'कोणती कागदपत्रे'],
  [/\b(fee\s*kiti|fees\s*kiti|kiti\s*fee|kiti\s*fees|kiti\s*shulka|cost\s*kiti)\b/gi, 'शुल्क किती'],
  [/\b(kiti\s*divas|kiti\s*vel|kiti\s*time|processing\s*time)\b/gi, 'कालावधी किती'],
  [/\b(kuthe\s*jaayce|kuthe\s*milale|kuthe\s*jaave|where\s*to\s*apply)\b/gi, 'कुठे अर्ज करावा']
];

// Single word mappings (Roman Marathi & English terms -> Devanagari Marathi)
const WORD_MAPPINGS: { [key: string]: string } = {
  // Document Names & Services
  'adhar': 'आधार',
  'aadhaar': 'आधार',
  'aadhar': 'आधार',
  'aadhr': 'आधार',
  'pan': 'पॅन',
  'card': 'कार्ड',
  'cards': 'कार्ड',
  'passport': 'पासपोर्ट',
  'pasport': 'पासपोर्ट',
  'passprot': 'पासपोर्ट',
  'driving': 'ड्रायव्हिंग',
  'licence': 'लायसन्स',
  'license': 'लायसन्स',
  'dl': 'ड्रायव्हिंग',
  'voter': 'मतदार',
  'voterid': 'मतदार',
  'matdar': 'मतदार',
  'matdan': 'मतदान',
  'ration': 'रेशन',
  'rationcard': 'रेशन',
  'reshan': 'रेशन',
  'income': 'उत्पन्न',
  'utpanna': 'उत्पन्न',
  'caste': 'जात',
  'jati': 'जात',
  'domicile': 'अधिवास',
  'rehivasi': 'रहवासी',
  'birth': 'जन्म',
  'janma': 'जन्म',
  'death': 'मृत्यू',
  'mrutyu': 'मृत्यू',
  'scholarship': 'शिष्यवृत्ती',
  'shishyavrutti': 'शिष्यवृत्ती',
  'dakhla': 'दाखला',
  'pramanpatra': 'प्रमाणपत्र',

  // Query Actions & Requirements
  'documents': 'कागदपत्रे',
  'document': 'कागदपत्रे',
  'doc': 'कागदपत्रे',
  'docs': 'कागदपत्रे',
  'kagadpatre': 'कागदपत्रे',
  'kagadpatra': 'कागदपत्रे',
  'kagad': 'कागदपत्रे',
  'fee': 'शुल्क',
  'fees': 'शुल्क',
  'shulka': 'शुल्क',
  'cost': 'शुल्क',
  'charge': 'शुल्क',
  'charges': 'शुल्क',
  'paisa': 'शुल्क',
  'paise': 'शुल्क',
  'time': 'कालावधी',
  'duration': 'कालावधी',
  'period': 'कालावधी',
  'days': 'दिवस',
  'day': 'दिवस',
  'vel': 'वेळ',
  'divas': 'दिवस',
  'kalavadhi': 'कालावधी',
  'process': 'प्रक्रिया',
  'procedure': 'प्रक्रिया',
  'prakriya': 'प्रक्रिया',
  'apply': 'अर्ज',
  'application': 'अर्ज',
  'arja': 'अर्ज',
  'arj': 'अर्ज',
  'eligibility': 'पात्रता',
  'patrata': 'पात्रता',
  'office': 'कार्यालय',
  'karyalaya': 'कार्यालय',
  'center': 'केंद्र',
  'centre': 'केंद्र',
  'setu': 'सेतू',
  'where': 'कुठे',
  'kuthe': 'कुठे',
  'kuthun': 'कुठून',
  'new': 'नवीन',
  'navin': 'नवीन',
  'nvin': 'नवीन',
  'update': 'दुरुस्ती',
  'correction': 'दुरुस्ती',
  'durushti': 'दुरुस्ती',
  'badal': 'बदल',
  'renewal': 'नूतनीकरण',
  'renew': 'नूतनीकरण',
  'nutanikaran': 'नूतनीकरण',
  'status': 'स्थिती',
  'online': 'ऑनलाईन',
  'offline': 'ऑफलाईन',

  // Devanagari Colloquial Normalization
  'कसं': 'कसे',
  'काढायचं': 'काढायचे',
  'बनवायचं': 'काढायचे',
  'लागेल': 'लागतात',

  // Roman Marathi Connectives & Prepositions
  'kase': 'कसे',
  'kasa': 'कसा',
  'kashi': 'कशी',
  'kas': 'कसे',
  'banvayche': 'काढायचे',
  'banvayeche': 'काढायचे',
  'kadhayche': 'काढायचे',
  'kadhayeche': 'काढायचे',
  'kadhaych': 'काढायचे',
  'kadhayca': 'काढायचे',
  'kadhanar': 'काढायचे',
  'karayche': 'करायचे',
  'sathi': 'साठी',
  'sati': 'साठी',
  'kiti': 'किती',
  'kitik': 'किती',
  'lagte': 'लागतात',
  'lagatya': 'लागतात',
  'lagat': 'लागतात',
  'lagtil': 'लागतात',
  'pahije': 'पाहिजे',
  'have': 'हवे',
  'mala': 'मला',
  'chi': 'ची',
  'cha': 'चा',
  'che': 'चे',
  'chya': 'च्या',
  'shi': 'शी',
  'ani': 'आणि',
  'mahiti': 'माहिती',
  'sang': 'सांगा',
  'sanga': 'सांगा',

  // Greetings & Courtesies
  'hi': 'नमस्कार',
  'hello': 'नमस्कार',
  'hey': 'नमस्कार',
  'namaskar': 'नमस्कार',
  'namaste': 'नमस्कार',
  'thanks': 'धन्यवाद',
  'thanku': 'धन्यवाद',
  'thankyou': 'धन्यवाद',
  'dhanyavad': 'धन्यवाद',
  'bye': 'पुन्हा भेटू',
  'goodbye': 'पुन्हा भेटू'
};

/**
 * Normalizes input containing Roman Marathi, English government terms, or mixed text
 * into clean Devanagari Marathi text.
 */
export function normalizeRomanAndMixedQuery(input: string): string {
  if (!input) return '';

  let normalized = input.trim();

  // 1. First pass: Replace multi-word Roman / English phrases
  for (const [regex, replacement] of PHRASE_MAPPINGS) {
    normalized = normalized.replace(regex, replacement);
  }

  // 2. Second pass: Replace individual Roman / English words
  const words = normalized.split(/\s+/);
  const translatedWords = words.map((word) => {
    // Strip trailing/leading punctuation
    const cleanWord = word.toLowerCase().replace(/^[^\w\u0900-\u097F]+|[^\w\u0900-\u097F]+$/g, '');
    if (WORD_MAPPINGS[cleanWord]) {
      return WORD_MAPPINGS[cleanWord];
    }
    return word;
  });

  return translatedWords.join(' ');
}
