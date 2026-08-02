import { DatasetRecord, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'आधार कार्ड',
    englishName: 'Aadhaar Card',
    code: 'Aadhaar Card',
    icon: 'IdCard',
    count: 36,
    description: 'नवीन आधार नोंदणी, दुरुस्ती, स्टेटस ट्रॅकिंग, आणि शुल्क'
  },
  {
    name: 'पॅन कार्ड',
    englishName: 'PAN Card',
    code: 'PAN Card',
    icon: 'CreditCard',
    count: 36,
    description: 'नवीन पॅन कार्ड अर्ज, माहिती अपडेट, स्टेटस व शुल्क माहिती'
  },
  {
    name: 'पासपोर्ट',
    englishName: 'Passport',
    code: 'Passport',
    icon: 'Globe',
    count: 36,
    description: 'पासपोर्ट अर्ज प्रक्रिया, कागदपत्रे, तात्काळ सेवा व नियम'
  },
  {
    name: 'ड्रायव्हिंग लायसन्स',
    englishName: 'Driving Licence',
    code: 'Driving Licence',
    icon: 'Car',
    count: 36,
    description: 'लर्निंग व कायम लायसन्स, RTO प्रक्रिया आणि नूतनीकरण'
  },
  {
    name: 'मतदार ओळखपत्र',
    englishName: 'Voter ID',
    code: 'Voter ID',
    icon: 'CheckSquare',
    count: 36,
    description: 'नवीन मतदार नोंदणी, नाव-पत्ता दुरुस्ती व मतदार यादी माहिती'
  },
  {
    name: 'रेशन कार्ड',
    englishName: 'Ration Card',
    code: 'Ration Card',
    icon: 'ShoppingBag',
    count: 36,
    description: 'नवीन रेशन कार्ड, नावे वाढवणे/वगळणे व अन्न पुरवठा योजना'
  },
  {
    name: 'उत्पन्नाचा दाखला',
    englishName: 'Income Certificate',
    code: 'Income Certificate',
    icon: 'FileText',
    count: 36,
    description: 'तहसील उत्पन्नाचा दाखला, सेतू सुविधा केंद्र व कागदपत्रे'
  },
  {
    name: 'जन्म दाखला',
    englishName: 'Birth Certificate',
    code: 'Birth Certificate',
    icon: 'Baby',
    count: 36,
    description: 'ग्रामपंचायत व नगरपालिका जन्म दाखला नोंदणी प्रक्रिया'
  },
  {
    name: 'शासकीय योजना',
    englishName: 'Government Schemes',
    code: 'Government Schemes',
    icon: 'Award',
    count: 36,
    description: 'महा-डीबीटी, आपले सरकार पोर्टल योजना व लाभ'
  },
  {
    name: 'शिष्यवृत्ती',
    englishName: 'Scholarships',
    code: 'Scholarships',
    icon: 'GraduationCap',
    count: 36,
    description: 'विद्यार्थी शिष्यवृत्ती अर्ज, महा-डीबीटी व कागदपत्रे'
  },
  {
    name: 'पेन्शन योजना',
    englishName: 'Pension Services',
    code: 'Pension Services',
    icon: 'HeartHandshake',
    count: 36,
    description: 'ज्येष्ठ नागरिक, निवृत्ती वेतन व सामाजिक सुरक्षा पेन्शन'
  },
  {
    name: 'अधिवास प्रमाणपत्र',
    englishName: 'Domicile Certificate',
    code: 'Domicile Certificate',
    icon: 'Home',
    count: 36,
    description: 'डोमिसिल / रहिवासी दाखला अर्ज, कागदपत्रे, सेतू व तहसील प्रक्रिया'
  }
];

export const INITIAL_DATASET: DatasetRecord[] = [
  // --- AADHAAR CARD ---
  {
    id: "MGC-AAD-001",
    question: "नवीन आधार कार्ड कसे काढायचे?",
    answer: "नवीन आधार कार्ड साठी आधार सेवा केंद्र येथे जाऊन अर्ज सादर करावा लागतो. सोबत जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा सादर करावे लागते. साधारणपणे ९० ते १८० दिवस मध्ये ते उपलब्ध होते.",
    intent: "AADHAAR_NEW_APPLICATION",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [९० ते १८० दिवस](DATE_TIME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-002",
    question: "आधार कार्ड साठी अर्ज कसा करावा?",
    answer: "आधार कार्ड साठी अर्ज आधार सेवा केंद्र मार्फत सादर करता येतो. अर्जासोबत जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा जोडावे लागतात, आणि प्रक्रिया पूर्ण होण्यास साधारणपणे ९० ते १८० दिवस लागतात.",
    intent: "AADHAAR_NEW_APPLICATION",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [९० ते १८० दिवस](DATE_TIME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-003",
    question: "आधार कार्ड मिळवण्याची प्रक्रिया काय आहे?",
    answer: "आधार कार्ड मिळवण्यासाठी प्रथम आधार सेवा केंद्र येथे अर्ज नोंदवावा लागतो. आवश्यक कागदपत्रांमध्ये जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा यांचा समावेश होतो, आणि संपूर्ण प्रक्रियेस अंदाजे ९० ते १८० दिवस इतका वेळ लागतो.",
    intent: "AADHAAR_NEW_APPLICATION",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [९० ते १८० दिवस](DATE_TIME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-004",
    question: "मला आधार कार्ड बनवायचे आहे, कुठून सुरुवात करावी?",
    answer: "सर्वप्रथम आधार सेवा केंद्र येथे संपर्क साधून अर्ज भरावा. जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा सोबत ठेवणे आवश्यक आहे. प्रक्रिया पूर्ण होण्यास साधारण ९० ते १८० दिवस लागतात.",
    intent: "AADHAAR_NEW_APPLICATION",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [९० ते १८० दिवस](DATE_TIME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-005",
    question: "आधार कार्ड साठी नोंदणी कशी करावी?",
    answer: "आधार कार्ड साठी नोंदणी आधार सेवा केंद्र येथे किंवा संबंधित ऑनलाइन पोर्टलवर करता येते, त्यासाठी जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा लागतात. नोंदणीनंतर ९० ते १८० दिवस या कालावधीत कार्यवाही पूर्ण होते.",
    intent: "AADHAAR_NEW_APPLICATION",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [९० ते १८० दिवस](DATE_TIME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-006",
    question: "आधार कार्ड कसे मिळते, याबद्दल माहिती द्या.",
    answer: "आधार कार्ड मिळवण्यासाठी आधार सेवा केंद्र येथे अर्ज सादर करावा लागतो, सोबत जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा जोडावे लागतात. साधारणपणे ९० ते १८० दिवस या कालावधीत ते जारी केले जाते.",
    intent: "AADHAAR_NEW_APPLICATION",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [९० ते १८० दिवस](DATE_TIME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-007",
    question: "आधार कार्ड साठी कोणती कागदपत्रे लागतात?",
    answer: "आधार कार्ड साठी सर्वसाधारणपणे जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे आधार सेवा केंद्र येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "AADHAAR_REQUIRED_DOCUMENTS",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, कागदपत्रे, आवश्यक पुरावे",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-008",
    question: "आधार कार्ड काढताना कोणकोणती कागदपत्रे सोबत न्यावी लागतात?",
    answer: "आधार कार्ड साठी अर्ज करताना जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा ही कागदपत्रे सोबत न्यावी लागतात, जी आधार सेवा केंद्र येथे तपासली जातात.",
    intent: "AADHAAR_REQUIRED_DOCUMENTS",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, कागदपत्रे, आवश्यक पुरावे",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-009",
    question: "आधार कार्ड साठी आवश्यक कागदपत्रांची यादी सांगा.",
    answer: "आधार कार्ड साठी आवश्यक कागदपत्रांमध्ये जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा यांचा समावेश होतो. मूळ प्रत व छायाप्रत दोन्ही सोबत ठेवणे उपयुक्त ठरते.",
    intent: "AADHAAR_REQUIRED_DOCUMENTS",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT)",
    keywords: "आधार कार्ड, कागदपत्रे, आवश्यक पुरावे",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-010",
    question: "आधार कार्ड अर्जासोबत कोणते पुरावे जोडावे लागतात?",
    answer: "आधार कार्ड अर्जासोबत जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा हे पुरावे जोडावे लागतात, अन्यथा अर्ज अपूर्ण समजला जातो.",
    intent: "AADHAAR_REQUIRED_DOCUMENTS",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT)",
    keywords: "आधार कार्ड, कागदपत्रे, आवश्यक पुरावे",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-011",
    question: "आधार कार्ड साठी कोणती कागदपत्रे अनिवार्य आहेत?",
    answer: "आधार कार्ड साठी जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा ही कागदपत्रे अनिवार्य आहेत; यापैकी एखादे कागदपत्र नसल्यास अर्ज स्वीकारला जात नाही.",
    intent: "AADHAAR_REQUIRED_DOCUMENTS",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT)",
    keywords: "आधार कार्ड, कागदपत्रे, आवश्यक पुरावे",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-012",
    question: "आधार कार्ड बनवण्यासाठी कोणती कागदपत्रे आधीच तयार ठेवावीत?",
    answer: "आधार कार्ड बनवण्यापूर्वी जन्म दाखला किंवा शाळा सोडल्याचा दाखला, निवासाचा पुरावा ही कागदपत्रे तयार ठेवावीत, जेणेकरून आधार सेवा केंद्र येथे प्रक्रिया सुरळीत होईल.",
    intent: "AADHAAR_REQUIRED_DOCUMENTS",
    entity: "[आधार कार्ड](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, कागदपत्रे, आवश्यक पुरावे",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-013",
    question: "आधार कार्ड वरील माहिती कशी दुरुस्त करावी?",
    answer: "आधार कार्ड वरील नाव, पत्ता किंवा जन्मतारीख यामध्ये दुरुस्ती करण्यासाठी आधार सेवा केंद्र येथे दुरुस्ती अर्ज सादर करावा लागतो, सोबत योग्य पुरावा जोडावा लागतो.",
    intent: "AADHAAR_CORRECTION_UPDATE",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, दुरुस्ती, अपडेट, माहिती बदल",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-014",
    question: "आधार कार्ड मध्ये चूक असल्यास काय करावे?",
    answer: "आधार कार्ड मध्ये नाव, पत्ता किंवा जन्मतारीख संदर्भात चूक असल्यास आधार सेवा केंद्र येथे दुरुस्ती अर्ज व आवश्यक पुरावे सादर करून बदल करता येतो.",
    intent: "AADHAAR_CORRECTION_UPDATE",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, दुरुस्ती, अपडेट, माहिती बदल",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-015",
    question: "आधार कार्ड वर माहिती कशी अद्ययावत करायची?",
    answer: "आधार कार्ड वरील माहिती अद्ययावत करण्यासाठी आधार सेवा केंद्र येथे किंवा संबंधित ऑनलाइन पोर्टलवर दुरुस्ती अर्ज सादर करावा लागतो.",
    intent: "AADHAAR_CORRECTION_UPDATE",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, दुरुस्ती, अपडेट, माहिती बदल",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-016",
    question: "आधार कार्ड दुरुस्तीसाठी अर्ज कसा करावा?",
    answer: "आधार कार्ड दुरुस्तीसाठी आधार सेवा केंद्र येथे विनंती अर्ज व पुराव्यादाखल कागदपत्रे सादर करावी लागतात; त्यानंतर सुधारित आधार कार्ड जारी केले जाते.",
    intent: "AADHAAR_CORRECTION_UPDATE",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, दुरुस्ती, अपडेट, माहिती बदल",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-017",
    question: "आधार कार्ड वरील स्पेलिंगमधील चूक कशी बदलायची?",
    answer: "आधार कार्ड वरील स्पेलिंग किंवा नाव, पत्ता किंवा जन्मतारीख मधील चूक बदलण्यासाठी आधार सेवा केंद्र येथे दुरुस्ती अर्ज व शपथपत्र सादर करावे लागते.",
    intent: "AADHAAR_CORRECTION_UPDATE",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, दुरुस्ती, अपडेट, माहिती बदल",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-018",
    question: "आधार कार्ड अपडेट करण्याची प्रक्रिया काय आहे?",
    answer: "आधार कार्ड अपडेट करण्यासाठी आधार सेवा केंद्र येथे अर्ज सादर करून नाव, पत्ता किंवा जन्मतारीख संदर्भातील योग्य पुरावा जोडावा लागतो.",
    intent: "AADHAAR_CORRECTION_UPDATE",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, दुरुस्ती, अपडेट, माहिती बदल",
    category: "Aadhaar Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-AAD-019",
    question: "आधार कार्ड अर्जाची स्थिती कशी तपासावी?",
    answer: "आधार कार्ड अर्जाची स्थिती तपासण्यासाठी अर्ज सादर केल्यावर मिळालेल्या पावती किंवा अर्ज क्रमांकाचा वापर करून संबंधित पोर्टलवर तपासता येते.",
    intent: "AADHAAR_STATUS_TRACKING",
    entity: "[आधार कार्ड](SERVICE_NAME), [अर्ज क्रमांक](IDENTITY_NUMBER)",
    keywords: "आधार कार्ड, स्थिती तपासणी, ट्रॅकिंग, अर्ज क्रमांक",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Status Inquiry"
  },
  {
    id: "MGC-AAD-020",
    question: "माझा आधार कार्ड अर्ज मंजूर झाला आहे का, हे कसे कळेल?",
    answer: "अर्ज मंजूर झाला आहे का हे पाहण्यासाठी पावती क्रमांकाच्या साहाय्याने आधार सेवा केंद्र च्या संकेतस्थळावर स्थिती तपासता येते.",
    intent: "AADHAAR_STATUS_TRACKING",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE), [पावती क्रमांक](IDENTITY_NUMBER)",
    keywords: "आधार कार्ड, स्थिती तपासणी, ट्रॅकिंग, अर्ज क्रमांक",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Status Inquiry"
  },
  {
    id: "MGC-AAD-021",
    question: "आधार कार्ड किती दिवसांत मिळेल हे कसे समजेल?",
    answer: "आधार कार्ड अर्जाची सद्यस्थिती व अंदाजे प्रलंबित कालावधी अर्ज क्रमांकाद्वारे ऑनलाइन तपासता येतो; साधारणपणे ९० ते १८० दिवस या कालावधीत कार्यवाही पूर्ण होते.",
    intent: "AADHAAR_STATUS_TRACKING",
    entity: "[आधार कार्ड](SERVICE_NAME), [९० ते १८० दिवस](DATE_TIME), [अर्ज क्रमांक](IDENTITY_NUMBER)",
    keywords: "आधार कार्ड, स्थिती तपासणी, ट्रॅकिंग, अर्ज क्रमांक",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Status Inquiry"
  },
  {
    id: "MGC-AAD-022",
    question: "आधार कार्ड अर्ज ट्रॅक कसा करावा?",
    answer: "आधार कार्ड अर्ज ट्रॅक करण्यासाठी अर्ज क्रमांक किंवा पावती क्रमांक वापरून आधार सेवा केंद्र च्या पोर्टलवर लॉगिन करावे लागते.",
    intent: "AADHAAR_STATUS_TRACKING",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE), [पावती क्रमांक](IDENTITY_NUMBER), [अर्ज क्रमांक](IDENTITY_NUMBER)",
    keywords: "आधार कार्ड, स्थिती तपासणी, ट्रॅकिंग, अर्ज क्रमांक",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Status Inquiry"
  },
  {
    id: "MGC-AAD-023",
    question: "आधार कार्ड अर्जाचे स्टेटस ऑनलाइन कसे पाहायचे?",
    answer: "आधार कार्ड अर्जाचे स्टेटस पाहण्यासाठी संबंधित शासकीय संकेतस्थळावर अर्ज क्रमांक टाकून सद्यस्थिती तपासता येते.",
    intent: "AADHAAR_STATUS_TRACKING",
    entity: "[आधार कार्ड](SERVICE_NAME), [अर्ज क्रमांक](IDENTITY_NUMBER)",
    keywords: "आधार कार्ड, स्थिती तपासणी, ट्रॅकिंग, अर्ज क्रमांक",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Status Inquiry"
  },
  {
    id: "MGC-AAD-024",
    question: "आधार कार्ड अर्ज नाकारला गेला तर कसे कळेल?",
    answer: "अर्ज नाकारला गेल्यास त्याचे कारण अर्ज क्रमांकाच्या साहाय्याने पोर्टलवर किंवा आधार सेवा केंद्र येथे विचारून समजून घेता येते.",
    intent: "AADHAAR_STATUS_TRACKING",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE), [अर्ज क्रमांक](IDENTITY_NUMBER)",
    keywords: "आधार कार्ड, स्थिती तपासणी, ट्रॅकिंग, अर्ज क्रमांक",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Status Inquiry"
  },
  {
    id: "MGC-AAD-025",
    question: "आधार कार्ड साठी शुल्क किती आहे?",
    answer: "आधार कार्ड साठी शासकीय शुल्क नोंदणीसाठी कोणतेही शुल्क आकारले जात नाही इतके आहे.",
    intent: "AADHAAR_FEES_CHARGES",
    entity: "[आधार कार्ड](SERVICE_NAME), [नोंदणीसाठी कोणतेही शुल्क आकारले जात नाही](FEE_AMOUNT)",
    keywords: "आधार कार्ड, शुल्क, फी, पेमेंट",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-026",
    question: "आधार कार्ड बनवण्यासाठी किती पैसे लागतात?",
    answer: "आधार कार्ड बनवण्यासाठी साधारणपणे नोंदणीसाठी कोणतेही शुल्क आकारले जात नाही, जे आधार सेवा केंद्र येथे किंवा ऑनलाइन पद्धतीने भरता येते.",
    intent: "AADHAAR_FEES_CHARGES",
    entity: "[आधार कार्ड](SERVICE_NAME), [नोंदणीसाठी कोणतेही शुल्क आकारले जात नाही](FEE_AMOUNT), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, शुल्क, फी, पेमेंट",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-027",
    question: "आधार कार्ड फी ऑनलाइन कशी भरावी?",
    answer: "आधार कार्ड साठी लागणारे शुल्क, म्हणजेच नोंदणीसाठी कोणतेही शुल्क आकारले जात नाही, ऑनलाइन पेमेंट गेटवेद्वारे भरता येते; पावती जपून ठेवावी.",
    intent: "AADHAAR_FEES_CHARGES",
    entity: "[आधार कार्ड](SERVICE_NAME), [नोंदणीसाठी कोणतेही शुल्क आकारले जात नाही](FEE_AMOUNT)",
    keywords: "आधार कार्ड, शुल्क, फी, पेमेंट",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-028",
    question: "आधार कार्ड साठी अतिरिक्त शुल्क कधी लागते?",
    answer: "आधार कार्ड साठी विलंब झाल्यास किंवा तातडीच्या सेवेसाठी नियमित शुल्काव्यतिरिक्त (नोंदणीसाठी कोणतेही शुल्क आकारले जात नाही) अतिरिक्त शुल्क आकारले जाऊ शकते.",
    intent: "AADHAAR_FEES_CHARGES",
    entity: "[आधार कार्ड](SERVICE_NAME), [नोंदणीसाठी कोणतेही शुल्क आकारले जात नाही](FEE_AMOUNT)",
    keywords: "आधार कार्ड, शुल्क, फी, पेमेंट",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-029",
    question: "आधार कार्ड चे शुल्क सवलतीत मिळू शकते का?",
    answer: "काही विशिष्ट प्रवर्गातील अर्जदारांसाठी आधार कार्ड चे शुल्क सवलतीत किंवा माफ असू शकते; अचूक माहितीसाठी आधार सेवा केंद्र येथे चौकशी करावी.",
    intent: "AADHAAR_FEES_CHARGES",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "आधार कार्ड, शुल्क, फी, पेमेंट",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-030",
    question: "आधार कार्ड फीची पावती हरवली तर काय करावे?",
    answer: "फीची पावती हरवल्यास व्यवहार क्रमांकाच्या आधारे आधार सेवा केंद्र किंवा संबंधित पोर्टलवरून डुप्लिकेट पावती मिळवता येते.",
    intent: "AADHAAR_FEES_CHARGES",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE), [व्यवहार क्रमांक](IDENTITY_NUMBER)",
    keywords: "आधार कार्ड, शुल्क, फी, पेमेंट",
    category: "Aadhaar Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-AAD-031",
    question: "आधार कार्ड साठी पात्रता निकष काय आहेत?",
    answer: "आधार कार्ड साठी पात्रता निकष असा आहे की भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही.",
    intent: "AADHAAR_ELIGIBILITY_CRITERIA",
    entity: "[आधार कार्ड](SERVICE_NAME), [भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही](ELIGIBILITY_ATTRIBUTE)",
    keywords: "आधार कार्ड, पात्रता, निकष, अट",
    category: "Aadhaar Card",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },
  {
    id: "MGC-AAD-032",
    question: "मी आधार कार्ड साठी पात्र आहे का?",
    answer: "आधार कार्ड साठी पात्रता ठरवताना खालील निकष लागू होतो: भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही. अचूक खात्रीसाठी आधार सेवा केंद्र येथे संपर्क साधावा.",
    intent: "AADHAAR_ELIGIBILITY_CRITERIA",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE), [भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही](ELIGIBILITY_ATTRIBUTE)",
    keywords: "आधार कार्ड, पात्रता, निकष, अट",
    category: "Aadhaar Card",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },
  {
    id: "MGC-AAD-033",
    question: "आधार कार्ड साठी कोण अर्ज करू शकतो?",
    answer: "भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही, अशा व्यक्ती आधार कार्ड साठी अर्ज करू शकतात.",
    intent: "AADHAAR_ELIGIBILITY_CRITERIA",
    entity: "[आधार कार्ड](SERVICE_NAME), [भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही](ELIGIBILITY_ATTRIBUTE)",
    keywords: "आधार कार्ड, पात्रता, निकष, अट",
    category: "Aadhaar Card",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },
  {
    id: "MGC-AAD-034",
    question: "आधार कार्ड साठी वयाची किंवा उत्पन्नाची अट आहे का?",
    answer: "होय, आधार कार्ड साठी भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही ही अट लागू होते.",
    intent: "AADHAAR_ELIGIBILITY_CRITERIA",
    entity: "[आधार कार्ड](SERVICE_NAME), [भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही](ELIGIBILITY_ATTRIBUTE)",
    keywords: "आधार कार्ड, पात्रता, निकष, अट",
    category: "Aadhaar Card",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },
  {
    id: "MGC-AAD-035",
    question: "आधार कार्ड साठीची पात्रता कशी तपासावी?",
    answer: "आधार कार्ड साठीची पात्रता आधार सेवा केंद्र येथे किंवा संबंधित ऑनलाइन पोर्टलवर दिलेल्या निकषांनुसार तपासता येते; सर्वसाधारण निकष म्हणजे भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही.",
    intent: "AADHAAR_ELIGIBILITY_CRITERIA",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE), [भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही](ELIGIBILITY_ATTRIBUTE)",
    keywords: "आधार कार्ड, पात्रता, निकष, अट",
    category: "Aadhaar Card",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },
  {
    id: "MGC-AAD-036",
    question: "आधार कार्ड साठी पात्र नसल्यास काय पर्याय आहेत?",
    answer: "भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही या निकषात न बसणाऱ्या व्यक्तींसाठी संबंधित योजनेचे इतर पर्यायी निकष किंवा तत्सम योजना आधार सेवा केंद्र येथे तपासून पाहता येतात.",
    intent: "AADHAAR_ELIGIBILITY_CRITERIA",
    entity: "[आधार कार्ड](SERVICE_NAME), [आधार सेवा केंद्र](LOCATION_OFFICE), [भारताचा कोणताही रहिवासी नागरिक अर्ज करू शकतो, वयाची कोणतीही अट नाही](ELIGIBILITY_ATTRIBUTE)",
    keywords: "आधार कार्ड, पात्रता, निकष, अट",
    category: "Aadhaar Card",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },

  // --- PAN CARD ---
  {
    id: "MGC-PAN-001",
    question: "नवीन पॅन कार्ड कसे काढायचे?",
    answer: "नवीन पॅन कार्ड साठी NSDL अथवा UTIITSL केंद्र येथे जाऊन अर्ज सादर करावा लागतो. सोबत ओळखीचा पुरावा, पत्त्याचा पुरावा, अलीकडील छायाचित्र सादर करावे लागते. साधारणपणे १५ ते २० दिवस मध्ये ते उपलब्ध होते.",
    intent: "PAN_NEW_APPLICATION",
    entity: "[पॅन कार्ड](SERVICE_NAME), [ओळखीचा पुरावा](DOCUMENT), [पत्त्याचा पुरावा](DOCUMENT), [अलीकडील छायाचित्र](DOCUMENT), [१५ ते २० दिवस](DATE_TIME), [NSDL अथवा UTIITSL केंद्र](ORGANIZATION)",
    keywords: "पॅन कार्ड, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "PAN Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-PAN-002",
    question: "पॅन कार्ड साठी अर्ज कसा करावा?",
    answer: "पॅन कार्ड साठी अर्ज NSDL अथवा UTIITSL केंद्र मार्फत सादर करता येतो. अर्जासोबत ओळखीचा पुरावा, पत्त्याचा पुरावा, अलीकडील छायाचित्र जोडावे लागतात, आणि प्रक्रिया पूर्ण होण्यास साधारणपणे १५ ते २० दिवस लागतात.",
    intent: "PAN_NEW_APPLICATION",
    entity: "[पॅन कार्ड](SERVICE_NAME), [ओळखीचा पुरावा](DOCUMENT), [पत्त्याचा पुरावा](DOCUMENT), [अलीकडील छायाचित्र](DOCUMENT), [१५ ते २० दिवस](DATE_TIME), [NSDL अथवा UTIITSL केंद्र](ORGANIZATION)",
    keywords: "पॅन कार्ड, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "PAN Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-PAN-007",
    question: "पॅन कार्ड साठी कोणती कागदपत्रे लागतात?",
    answer: "पॅन कार्ड साठी सर्वसाधारणपणे ओळखीचा पुरावा, पत्त्याचा पुरावा, अलीकडील छायाचित्र ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे NSDL अथवा UTIITSL केंद्र येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "PAN_REQUIRED_DOCUMENTS",
    entity: "[पॅन कार्ड](SERVICE_NAME), [ओळखीचा पुरावा](DOCUMENT), [पत्त्याचा पुरावा](DOCUMENT), [अलीकडील छायाचित्र](DOCUMENT), [NSDL अथवा UTIITSL केंद्र](ORGANIZATION)",
    keywords: "पॅन कार्ड, कागदपत्रे, आवश्यक पुरावे",
    category: "PAN Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-PAN-013",
    question: "पॅन कार्ड वरील माहिती कशी दुरुस्त करावी?",
    answer: "पॅन कार्ड वरील नाव, जन्मतारीख किंवा छायाचित्र यामध्ये दुरुस्ती करण्यासाठी NSDL अथवा UTIITSL केंद्र येथे दुरुस्ती अर्ज सादर करावा लागतो, सोबत योग्य पुरावा जोडावा लागतो.",
    intent: "PAN_CORRECTION_UPDATE",
    entity: "[पॅन कार्ड](SERVICE_NAME), [NSDL अथवा UTIITSL केंद्र](ORGANIZATION)",
    keywords: "पॅन कार्ड, दुरुस्ती, अपडेट, माहिती बदल",
    category: "PAN Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-PAN-019",
    question: "पॅन कार्ड अर्जाची स्थिती कशी तपासावी?",
    answer: "पॅन कार्ड अर्जाची स्थिती तपासण्यासाठी अर्ज सादर केल्यावर मिळालेल्या पावती किंवा अर्ज क्रमांकाचा वापर करून संबंधित पोर्टलवर तपासता येते.",
    intent: "PAN_STATUS_TRACKING",
    entity: "[पॅन कार्ड](SERVICE_NAME), [अर्ज क्रमांक](IDENTITY_NUMBER)",
    keywords: "पॅन कार्ड, स्थिती तपासणी, ट्रॅकिंग, अर्ज क्रमांक",
    category: "PAN Card",
    complexity: "Simple",
    conversationType: "Status Inquiry"
  },
  {
    id: "MGC-PAN-025",
    question: "पॅन कार्ड साठी शुल्क किती आहे?",
    answer: "पॅन कार्ड साठी शासकीय शुल्क साधारणपणे रुपये १०७ (भारतीय पत्त्यासाठी) इतके आहे.",
    intent: "PAN_FEES_CHARGES",
    entity: "[पॅन कार्ड](SERVICE_NAME), [साधारणपणे रुपये १०७ (भारतीय पत्त्यासाठी)](FEE_AMOUNT)",
    keywords: "पॅन कार्ड, शुल्क, फी, पेमेंट",
    category: "PAN Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-PAN-031",
    question: "पॅन कार्ड साठी पात्रता निकष काय आहेत?",
    answer: "पॅन कार्ड साठी पात्रता निकष असा आहे की भारतीय नागरिक किंवा भारतात कर भरणारी कोणतीही व्यक्ती अर्ज करू शकते.",
    intent: "PAN_ELIGIBILITY_CRITERIA",
    entity: "[पॅन कार्ड](SERVICE_NAME), [भारतीय नागरिक किंवा भारतात कर भरणारी कोणतीही व्यक्ती अर्ज करू शकते](ELIGIBILITY_ATTRIBUTE)",
    keywords: "पॅन कार्ड, पात्रता, निकष, अट",
    category: "PAN Card",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },

  // --- PASSPORT ---
  {
    id: "MGC-PPT-001",
    question: "नवीन पासपोर्ट कसे काढायचे?",
    answer: "नवीन पासपोर्ट साठी पासपोर्ट सेवा केंद्र येथे जाऊन अर्ज सादर करावा लागतो. सोबत जन्म दाखला, पत्त्याचा पुरावा, आधार कार्ड सादर करावे लागते. साधारणपणे ३० ते ४५ दिवस (सर्वसाधारण), ७ दिवस (तात्काळ) मध्ये ते उपलब्ध होते.",
    intent: "PASSPORT_NEW_APPLICATION",
    entity: "[पासपोर्ट](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [पत्त्याचा पुरावा](DOCUMENT), [आधार कार्ड](DOCUMENT), [३० ते ४५ दिवस (सर्वसाधारण), ७ दिवस (तात्काळ)](DATE_TIME), [पासपोर्ट सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "पासपोर्ट, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Passport",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-PPT-007",
    question: "पासपोर्ट साठी कोणती कागदपत्रे लागतात?",
    answer: "पासपोर्ट साठी सर्वसाधारणपणे जन्म दाखला, पत्त्याचा पुरावा, आधार कार्ड ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे पासपोर्ट सेवा केंद्र येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "PASSPORT_REQUIRED_DOCUMENTS",
    entity: "[पासपोर्ट](SERVICE_NAME), [जन्म दाखला](DOCUMENT), [पत्त्याचा पुरावा](DOCUMENT), [आधार कार्ड](DOCUMENT), [पासपोर्ट सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "पासपोर्ट, कागदपत्रे, आवश्यक पुरावे",
    category: "Passport",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-PPT-013",
    question: "पासपोर्ट वरील माहिती कशी दुरुस्त करावी?",
    answer: "पासपोर्ट वरील नाव, पत्ता किंवा वैवाहिक स्थिती यामध्ये दुरुस्ती करण्यासाठी पासपोर्ट सेवा केंद्र येथे दुरुस्ती अर्ज सादर करावा लागतो, सोबत योग्य पुरावा जोडावा लागतो.",
    intent: "PASSPORT_CORRECTION_UPDATE",
    entity: "[पासपोर्ट](SERVICE_NAME), [पासपोर्ट सेवा केंद्र](LOCATION_OFFICE)",
    keywords: "पासपोर्ट, दुरुस्ती, अपडेट, माहिती बदल",
    category: "Passport",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-PPT-019",
    question: "पासपोर्ट अर्जाची स्थिती कशी तपासावी?",
    answer: "पासपोर्ट अर्जाची स्थिती तपासण्यासाठी अर्ज सादर केल्यावर मिळालेल्या पावती किंवा अर्ज क्रमांकाचा वापर करून संबंधित पोर्टलवर तपासता येते.",
    intent: "PASSPORT_STATUS_TRACKING",
    entity: "[पासपोर्ट](SERVICE_NAME), [अर्ज क्रमांक](IDENTITY_NUMBER)",
    keywords: "पासपोर्ट, स्थिती तपासणी, ट्रॅकिंग, अर्ज क्रमांक",
    category: "Passport",
    complexity: "Simple",
    conversationType: "Status Inquiry"
  },
  {
    id: "MGC-PPT-025",
    question: "पासपोर्ट साठी शुल्क किती आहे?",
    answer: "पासपोर्ट साठी शासकीय शुल्क रुपये १,५०० (सर्वसाधारण सेवा) व रुपये ३,५०० (तात्काळ सेवा) इतके आहे.",
    intent: "PASSPORT_FEES_CHARGES",
    entity: "[पासपोर्ट](SERVICE_NAME), [रुपये १,५०० (सर्वसाधारण सेवा) व रुपये ३,५०० (तात्काळ सेवा)](FEE_AMOUNT)",
    keywords: "पासपोर्ट, शुल्क, फी, पेमेंट",
    category: "Passport",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },

  // --- DRIVING LICENCE ---
  {
    id: "MGC-DL-001",
    question: "नवीन ड्रायव्हिंग लायसन्स कसे काढायचे?",
    answer: "नवीन ड्रायव्हिंग लायसन्स साठी प्रादेशिक परिवहन कार्यालय (RTO) येथे जाऊन अर्ज सादर करावा लागतो. सोबत लर्निंग लायसन्स, वयाचा पुरावा, पत्त्याचा पुरावा सादर करावे लागते. साधारणपणे लर्निंग लायसन्सनंतर किमान ३० दिवसांनी कायम परवाना मध्ये ते उपलब्ध होते.",
    intent: "DRIVING_LICENCE_NEW_APPLICATION",
    entity: "[ड्रायव्हिंग लायसन्स](SERVICE_NAME), [लर्निंग लायसन्स](DOCUMENT), [वयाचा पुरावा](DOCUMENT), [पत्त्याचा पुरावा](DOCUMENT), [लर्निंग लायसन्सनंतर किमान ३० दिवसांनी कायम परवाना](DATE_TIME), [प्रादेशिक परिवहन कार्यालय (RTO)](LOCATION_OFFICE)",
    keywords: "ड्रायव्हिंग लायसन्स, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Driving Licence",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-DL-007",
    question: "ड्रायव्हिंग लायसन्स साठी कोणती कागदपत्रे लागतात?",
    answer: "ड्रायव्हिंग लायसन्स साठी सर्वसाधारणपणे लर्निंग लायसन्स, वयाचा पुरावा, पत्त्याचा पुरावा ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे प्रादेशिक परिवहन कार्यालय (RTO) येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "DRIVING_LICENCE_REQUIRED_DOCUMENTS",
    entity: "[ड्रायव्हिंग लायसन्स](SERVICE_NAME), [लर्निंग लायसन्स](DOCUMENT), [वयाचा पुरावा](DOCUMENT), [पत्त्याचा पुरावा](DOCUMENT), [प्रादेशिक परिवहन कार्यालय (RTO)](LOCATION_OFFICE)",
    keywords: "ड्रायव्हिंग लायसन्स, कागदपत्रे, आवश्यक पुरावे",
    category: "Driving Licence",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-DL-013",
    question: "ड्रायव्हिंग लायसन्स वरील माहिती कशी दुरुस्त करावी?",
    answer: "ड्रायव्हिंग लायसन्स वरील पत्ता किंवा नाव यामध्ये दुरुस्ती करण्यासाठी प्रादेशिक परिवहन कार्यालय (RTO) येथे दुरुस्ती अर्ज सादर करावा लागतो, सोबत योग्य पुरावा जोडावा लागतो.",
    intent: "DRIVING_LICENCE_CORRECTION_UPDATE",
    entity: "[ड्रायव्हिंग लायसन्स](SERVICE_NAME), [प्रादेशिक परिवहन कार्यालय (RTO)](LOCATION_OFFICE)",
    keywords: "ड्रायव्हिंग लायसन्स, दुरुस्ती, अपडेट, माहिती बदल",
    category: "Driving Licence",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-DL-025",
    question: "ड्रायव्हिंग लायसन्स साठी शुल्क किती आहे?",
    answer: "ड्रायव्हिंग लायसन्स साठी शासकीय शुल्क साधारणपणे रुपये २०० (नूतनीकरणासाठी) इतके आहे.",
    intent: "DRIVING_LICENCE_FEES_CHARGES",
    entity: "[ड्रायव्हिंग लायसन्स](SERVICE_NAME), [साधारणपणे रुपये २०० (नूतनीकरणासाठी)](FEE_AMOUNT)",
    keywords: "ड्रायव्हिंग लायसन्स, शुल्क, फी, पेमेंट",
    category: "Driving Licence",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-DL-031",
    question: "ड्रायव्हिंग लायसन्स साठी पात्रता निकष काय आहेत?",
    answer: "ड्रायव्हिंग लायसन्स साठी पात्रता निकष असा आहे की वय किमान १८ वर्षे (गिअरलेस वाहनासाठी १६ वर्षे) असणे आवश्यक आहे.",
    intent: "DRIVING_LICENCE_ELIGIBILITY_CRITERIA",
    entity: "[ड्रायव्हिंग लायसन्स](SERVICE_NAME), [वय किमान १८ वर्षे (गिअरलेस वाहनासाठी १६ वर्षे) असणे आवश्यक आहे](ELIGIBILITY_ATTRIBUTE)",
    keywords: "ड्रायव्हिंग लायसन्स, पात्रता, निकष, अट",
    category: "Driving Licence",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },

  // --- VOTER ID ---
  {
    id: "MGC-VOT-001",
    question: "नवीन मतदार ओळखपत्र कसे काढायचे?",
    answer: "नवीन मतदार ओळखपत्र साठी तहसील कार्यालय अथवा मतदार नोंदणी अधिकारी येथे जाऊन अर्ज सादर करावा लागतो. सोबत वयाचा पुरावा, निवासाचा पुरावा, अलीकडील छायाचित्र सादर करावे लागते. साधारणपणे १५ ते ३० दिवस मध्ये ते उपलब्ध होते.",
    intent: "VOTER_ID_NEW_APPLICATION",
    entity: "[मतदार ओळखपत्र](SERVICE_NAME), [वयाचा पुरावा](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [अलीकडील छायाचित्र](DOCUMENT), [१५ ते ३० दिवस](DATE_TIME), [तहसील कार्यालय अथवा मतदार नोंदणी अधिकारी](LOCATION_OFFICE)",
    keywords: "मतदार ओळखपत्र, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Voter ID",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-VOT-007",
    question: "मतदार ओळखपत्र साठी कोणती कागदपत्रे लागतात?",
    answer: "मतदार ओळखपत्र साठी सर्वसाधारणपणे वयाचा पुरावा, निवासाचा पुरावा, अलीकडील छायाचित्र ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे तहसील कार्यालय अथवा मतदार नोंदणी अधिकारी येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "VOTER_ID_REQUIRED_DOCUMENTS",
    entity: "[मतदार ओळखपत्र](SERVICE_NAME), [वयाचा पुरावा](DOCUMENT), [निवासाचा पुरावा](DOCUMENT), [अलीकडील छायाचित्र](DOCUMENT), [तहसील कार्यालय अथवा मतदार नोंदणी अधिकारी](LOCATION_OFFICE)",
    keywords: "मतदार ओळखपत्र, कागदपत्रे, आवश्यक पुरावे",
    category: "Voter ID",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-VOT-025",
    question: "मतदार ओळखपत्र साठी शुल्क किती आहे?",
    answer: "मतदार ओळखपत्र साठी शासकीय शुल्क कोणतेही शुल्क आकारले जात नाही इतके आहे.",
    intent: "VOTER_ID_FEES_CHARGES",
    entity: "[मतदार ओळखपत्र](SERVICE_NAME), [कोणतेही शुल्क आकारले जात नाही](FEE_AMOUNT)",
    keywords: "मतदार ओळखपत्र, शुल्क, फी, पेमेंट",
    category: "Voter ID",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-VOT-031",
    question: "मतदार ओळखपत्र साठी पात्रता निकष काय आहेत?",
    answer: "मतदार ओळखपत्र साठी पात्रता निकष असा आहे की वय किमान १८ वर्षे पूर्ण व भारतीय नागरिकत्व असणे आवश्यक आहे.",
    intent: "VOTER_ID_ELIGIBILITY_CRITERIA",
    entity: "[मतदार ओळखपत्र](SERVICE_NAME), [वय किमान १८ वर्षे पूर्ण व भारतीय नागरिकत्व असणे आवश्यक आहे](ELIGIBILITY_ATTRIBUTE)",
    keywords: "मतदार ओळखपत्र, पात्रता, निकष, अट",
    category: "Voter ID",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },

  // --- RATION CARD ---
  {
    id: "MGC-RC-001",
    question: "नवीन रेशन कार्ड कसे काढायचे?",
    answer: "नवीन रेशन कार्ड साठी अन्न, नागरी पुरवठा व ग्राहक संरक्षण कार्यालय येथे जाऊन अर्ज सादर करावा लागतो. सोबत रहिवासाचा पुरावा, कुटुंबातील सदस्यांचे आधार कार्ड, उत्पन्नाचा दाखला सादर करावे लागते. साधारणपणे साधारण ३० दिवस मध्ये ते उपलब्ध होते.",
    intent: "RATION_CARD_NEW_APPLICATION",
    entity: "[रेशन कार्ड](SERVICE_NAME), [रहिवासाचा पुरावा](DOCUMENT), [कुटुंबातील सदस्यांचे आधार कार्ड](DOCUMENT), [उत्पन्नाचा दाखला](DOCUMENT), [साधारण ३० दिवस](DATE_TIME), [अन्न, नागरी पुरवठा व ग्राहक संरक्षण कार्यालय](LOCATION_OFFICE)",
    keywords: "रेशन कार्ड, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Ration Card",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-RC-007",
    question: "रेशन कार्ड साठी कोणती कागदपत्रे लागतात?",
    answer: "रेशन कार्ड साठी सर्वसाधारणपणे रहिवासाचा पुरावा, कुटुंबातील सदस्यांचे आधार कार्ड, उत्पन्नाचा दाखला ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे अन्न, नागरी पुरवठा व ग्राहक संरक्षण कार्यालय येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "RATION_CARD_REQUIRED_DOCUMENTS",
    entity: "[रेशन कार्ड](SERVICE_NAME), [रहिवासाचा पुरावा](DOCUMENT), [कुटुंबातील सदस्यांचे आधार कार्ड](DOCUMENT), [उत्पन्नाचा दाखला](DOCUMENT), [अन्न, नागरी पुरवठा व ग्राहक संरक्षण कार्यालय](LOCATION_OFFICE)",
    keywords: "रेशन कार्ड, कागदपत्रे, आवश्यक पुरावे",
    category: "Ration Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-RC-025",
    question: "रेशन कार्ड साठी शुल्क किती आहे?",
    answer: "रेशन कार्ड साठी शासकीय शुल्क नाममात्र प्रक्रिया शुल्क इतके आहे.",
    intent: "RATION_CARD_FEES_CHARGES",
    entity: "[रेशन कार्ड](SERVICE_NAME), [नाममात्र प्रक्रिया शुल्क](FEE_AMOUNT)",
    keywords: "रेशन कार्ड, शुल्क, फी, पेमेंट",
    category: "Ration Card",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-RC-031",
    question: "रेशन कार्ड साठी पात्रता निकष काय आहेत?",
    answer: "रेशन कार्ड साठी पात्रता निकष असा आहे की महाराष्ट्रात वास्तव्य असणारे व उत्पन्न मर्यादेत बसणारे कुटुंब पात्र असते.",
    intent: "RATION_CARD_ELIGIBILITY_CRITERIA",
    entity: "[रेशन कार्ड](SERVICE_NAME), [महाराष्ट्रात वास्तव्य असणारे व उत्पन्न मर्यादेत बसणारे कुटुंब पात्र असते](ELIGIBILITY_ATTRIBUTE)",
    keywords: "रेशन कार्ड, पात्रता, निकष, अट",
    category: "Ration Card",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },

  // --- INCOME CERTIFICATE ---
  {
    id: "MGC-INC-001",
    question: "नवीन उत्पन्नाचा दाखला कसे काढायचे?",
    answer: "नवीन उत्पन्नाचा दाखला साठी सेतू सुविधा केंद्र अथवा तहसील कार्यालय येथे जाऊन अर्ज सादर करावा लागतो. सोबत रहिवासाचा पुरावा, स्वयंघोषणापत्र, वेतन प्रमाणपत्र किंवा ७/१२ उतारा सादर करावे लागते. साधारणपणे ७ ते १५ दिवस मध्ये ते उपलब्ध होते.",
    intent: "INCOME_CERTIFICATE_NEW_APPLICATION",
    entity: "[उत्पन्नाचा दाखला](SERVICE_NAME), [रहिवासाचा पुरावा](DOCUMENT), [स्वयंघोषणापत्र](DOCUMENT), [वेतन प्रमाणपत्र](DOCUMENT), [७/१२ उतारा](DOCUMENT), [७ ते १५ दिवस](DATE_TIME), [सेतू सुविधा केंद्र अथवा तहसील कार्यालय](LOCATION_OFFICE)",
    keywords: "उत्पन्नाचा दाखला, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Income Certificate",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-INC-007",
    question: "उत्पन्नाचा दाखला साठी कोणती कागदपत्रे लागतात?",
    answer: "उत्पन्नाचा दाखला साठी सर्वसाधारणपणे रहिवासाचा पुरावा, स्वयंघोषणापत्र, वेतन प्रमाणपत्र किंवा ७/१२ उतारा ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे सेतू सुविधा केंद्र अथवा तहसील कार्यालय येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "INCOME_CERTIFICATE_REQUIRED_DOCUMENTS",
    entity: "[उत्पन्नाचा दाखला](SERVICE_NAME), [रहिवासाचा पुरावा](DOCUMENT), [स्वयंघोषणापत्र](DOCUMENT), [वेतन प्रमाणपत्र](DOCUMENT), [७/१२ उतारा](DOCUMENT), [सेतू सुविधा केंद्र अथवा तहसील कार्यालय](LOCATION_OFFICE)",
    keywords: "उत्पन्नाचा दाखला, कागदपत्रे, आवश्यक पुरावे",
    category: "Income Certificate",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-INC-025",
    question: "उत्पन्नाचा दाखला साठी शुल्क किती आहे?",
    answer: "उत्पन्नाचा दाखला साठी शासकीय शुल्क नाममात्र प्रक्रिया शुल्क इतके आहे.",
    intent: "INCOME_CERTIFICATE_FEES_CHARGES",
    entity: "[उत्पन्नाचा दाखला](SERVICE_NAME), [नाममात्र प्रक्रिया शुल्क](FEE_AMOUNT)",
    keywords: "उत्पन्नाचा दाखला, शुल्क, फी, पेमेंट",
    category: "Income Certificate",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-INC-031",
    question: "उत्पन्नाचा दाखला साठी पात्रता निकष काय आहेत?",
    answer: "उत्पन्नाचा दाखला साठी पात्रता निकष असा आहे की महाराष्ट्राचा रहिवासी असलेली कोणतीही व्यक्ती अर्ज करू शकते.",
    intent: "INCOME_CERTIFICATE_ELIGIBILITY_CRITERIA",
    entity: "[उत्पन्नाचा दाखला](SERVICE_NAME), [महाराष्ट्राचा रहिवासी असलेली कोणतीही व्यक्ती अर्ज करू शकते](ELIGIBILITY_ATTRIBUTE)",
    keywords: "उत्पन्नाचा दाखला, पात्रता, निकष, अट",
    category: "Income Certificate",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },

  // --- BIRTH CERTIFICATE ---
  {
    id: "MGC-BC-001",
    question: "नवीन जन्म दाखला कसे काढायचे?",
    answer: "नवीन जन्म दाखला साठी ग्रामपंचायत अथवा नगरपालिका कार्यालय येथे जाऊन अर्ज सादर करावा लागतो. सोबत रुग्णालयाचा जन्म पुरावा, पालकांचा ओळख पुरावा सादर करावे लागते. साधारणपणे साधारण ७ दिवस मध्ये ते उपलब्ध होते.",
    intent: "BIRTH_CERTIFICATE_NEW_APPLICATION",
    entity: "[जन्म दाखला](SERVICE_NAME), [रुग्णालयाचा जन्म पुरावा](DOCUMENT), [पालकांचा ओळख पुरावा](DOCUMENT), [साधारण ७ दिवस](DATE_TIME), [ग्रामपंचायत अथवा नगरपालिका कार्यालय](LOCATION_OFFICE)",
    keywords: "जन्म दाखला, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Birth Certificate",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-BC-007",
    question: "जन्म दाखला साठी कोणती कागदपत्रे लागतात?",
    answer: "जन्म दाखला साठी सर्वसाधारणपणे रुग्णालयाचा जन्म पुरावा, पालकांचा ओळख पुरावा ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे ग्रामपंचायत अथवा नगरपालिका कार्यालय येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "BIRTH_CERTIFICATE_REQUIRED_DOCUMENTS",
    entity: "[जन्म दाखला](SERVICE_NAME), [रुग्णालयाचा जन्म पुरावा](DOCUMENT), [पालकांचा ओळख पुरावा](DOCUMENT), [ग्रामपंचायत अथवा नगरपालिका कार्यालय](LOCATION_OFFICE)",
    keywords: "जन्म दाखला, कागदपत्रे, आवश्यक पुरावे",
    category: "Birth Certificate",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-BC-025",
    question: "जन्म दाखला साठी शुल्क किती आहे?",
    answer: "जन्म दाखला साठी शासकीय शुल्क जन्मानंतर २१ दिवसांच्या आत विनामूल्य, उशिरा नोंदणीसाठी विलंब शुल्क लागू होते इतके आहे.",
    intent: "BIRTH_CERTIFICATE_FEES_CHARGES",
    entity: "[जन्म दाखला](SERVICE_NAME), [जन्मानंतर २१ दिवसांच्या आत विनामूल्य, उशिरा नोंदणीसाठी विलंब शुल्क लागू होते](FEE_AMOUNT)",
    keywords: "जन्म दाखला, शुल्क, फी, पेमेंट",
    category: "Birth Certificate",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-BC-031",
    question: "जन्म दाखला साठी पात्रता निकष काय आहेत?",
    answer: "जन्म दाखला साठी पात्रता निकष असा आहे की प्रत्येक नवजात बालकाच्या पालकांना नोंदणी करणे बंधनकारक आहे.",
    intent: "BIRTH_CERTIFICATE_ELIGIBILITY_CRITERIA",
    entity: "[जन्म दाखला](SERVICE_NAME), [प्रत्येक नवजात बालकाच्या पालकांना नोंदणी करणे बंधनकारक आहे](ELIGIBILITY_ATTRIBUTE)",
    keywords: "जन्म दाखला, पात्रता, निकष, अट",
    category: "Birth Certificate",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },

  // --- GOVERNMENT SCHEMES ---
  {
    id: "MGC-SCH-001",
    question: "नवीन शासकीय योजना कसे काढायचे?",
    answer: "नवीन शासकीय योजना साठी आपले सरकार पोर्टल अथवा महा-डीबीटी पोर्टल येथे जाऊन अर्ज सादर करावा लागतो. सोबत आधार कार्ड, उत्पन्नाचा दाखला, अधिवास प्रमाणपत्र, बँक खाते तपशील सादर करावे लागते. साधारणपणे योजनेनुसार कालावधी वेगवेगळा असतो मध्ये ते उपलब्ध होते.",
    intent: "GOVT_SCHEME_NEW_APPLICATION",
    entity: "[शासकीय योजना](SERVICE_NAME), [आधार कार्ड](DOCUMENT), [उत्पन्नाचा दाखला](DOCUMENT), [अधिवास प्रमाणपत्र](DOCUMENT), [बँक खाते तपशील](DOCUMENT), [योजनेनुसार कालावधी वेगवेगळा असतो](DATE_TIME), [आपले सरकार पोर्टल अथवा महा-डीबीटी पोर्टल](ORGANIZATION)",
    keywords: "शासकीय योजना, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Government Schemes",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-SCH-007",
    question: "शासकीय योजना साठी कोणती कागदपत्रे लागतात?",
    answer: "शासकीय योजना साठी सर्वसाधारणपणे आधार कार्ड, उत्पन्नाचा दाखला, अधिवास प्रमाणपत्र, बँक खाते तपशील ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे आपले सरकार पोर्टल अथवा महा-डीबीटी पोर्टल येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "GOVT_SCHEME_REQUIRED_DOCUMENTS",
    entity: "[शासकीय योजना](SERVICE_NAME), [आधार कार्ड](DOCUMENT), [उत्पन्नाचा दाखला](DOCUMENT), [अधिवास प्रमाणपत्र](DOCUMENT), [बँक खाते तपशील](DOCUMENT), [आपले सरकार पोर्टल अथवा महा-डीबीटी पोर्टल](ORGANIZATION)",
    keywords: "शासकीय योजना, कागदपत्रे, आवश्यक पुरावे",
    category: "Government Schemes",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-SCH-025",
    question: "शासकीय योजना साठी शुल्क किती आहे?",
    answer: "शासकीय योजना साठी शासकीय शुल्क अर्जासाठी कोणतेही शुल्क आकारले जात नाही इतके आहे.",
    intent: "GOVT_SCHEME_FEES_CHARGES",
    entity: "[शासकीय योजना](SERVICE_NAME), [अर्जासाठी कोणतेही शुल्क आकारले जात नाही](FEE_AMOUNT)",
    keywords: "शासकीय योजना, शुल्क, फी, पेमेंट",
    category: "Government Schemes",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-SCH-031",
    question: "शासकीय योजना साठी पात्रता निकष काय आहेत?",
    answer: "शासकीय योजना साठी पात्रता निकष असा आहे की योजनेनुसार उत्पन्न, वय व निवासाच्या अटी वेगवेगळ्या असतात.",
    intent: "GOVT_SCHEME_ELIGIBILITY_CRITERIA",
    entity: "[शासकीय योजना](SERVICE_NAME), [योजनेनुसार उत्पन्न, वय व निवासाच्या अटी वेगवेगळ्या असतात](ELIGIBILITY_ATTRIBUTE)",
    keywords: "शासकीय योजना, पात्रता, निकष, अट",
    category: "Government Schemes",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },

  // --- SCHOLARSHIPS ---
  {
    id: "MGC-SCL-001",
    question: "नवीन शिष्यवृत्ती कसे काढायचे?",
    answer: "नवीन शिष्यवृत्ती साठी महा-डीबीटी पोर्टल येथे जाऊन अर्ज सादर करावा लागतो. सोबत उत्पन्नाचा दाखला, आवश्यक असल्यास जात प्रमाणपत्र, बोनाफाईड प्रमाणपत्र, बँक खाते तपशील सादर करावे लागते. साधारणपणे शैक्षणिक वर्षाच्या वेळापत्रकानुसार बदलते मध्ये ते उपलब्ध होते.",
    intent: "SCHOLARSHIP_NEW_APPLICATION",
    entity: "[शिष्यवृत्ती](SERVICE_NAME), [उत्पन्नाचा दाखला](DOCUMENT), [आवश्यक असल्यास जात प्रमाणपत्र](DOCUMENT), [बोनाफाईड प्रमाणपत्र](DOCUMENT), [बँक खाते तपशील](DOCUMENT), [शैक्षणिक वर्षाच्या वेळापत्रकानुसार बदलते](DATE_TIME), [महा-डीबीटी पोर्टल](ORGANIZATION)",
    keywords: "शिष्यवृत्ती, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Scholarships",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-SCL-007",
    question: "शिष्यवृत्ती साठी कोणती कागदपत्रे लागतात?",
    answer: "शिष्यवृत्ती साठी सर्वसाधारणपणे उत्पन्नाचा दाखला, आवश्यक असल्यास जात प्रमाणपत्र, बोनाफाईड प्रमाणपत्र, बँक खाते तपशील ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे महा-डीबीटी पोर्टल येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "SCHOLARSHIP_REQUIRED_DOCUMENTS",
    entity: "[शिष्यवृत्ती](SERVICE_NAME), [उत्पन्नाचा दाखला](DOCUMENT), [आवश्यक असल्यास जात प्रमाणपत्र](DOCUMENT), [बोनाफाईड प्रमाणपत्र](DOCUMENT), [बँक खाते तपशील](DOCUMENT), [महा-डीबीटी पोर्टल](ORGANIZATION)",
    keywords: "शिष्यवृत्ती, कागदपत्रे, आवश्यक पुरावे",
    category: "Scholarships",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-SCL-025",
    question: "शिष्यवृत्ती साठी शुल्क किती आहे?",
    answer: "शिष्यवृत्ती साठी शासकीय शुल्क अर्जासाठी कोणतेही शुल्क आकारले जात नाही इतके आहे.",
    intent: "SCHOLARSHIP_FEES_CHARGES",
    entity: "[शिष्यवृत्ती](SERVICE_NAME), [अर्जासाठी कोणतेही शुल्क आकारले जात नाही](FEE_AMOUNT)",
    keywords: "शिष्यवृत्ती, शुल्क, फी, पेमेंट",
    category: "Scholarships",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-SCL-031",
    question: "शिष्यवृत्ती साठी पात्रता निकष काय आहेत?",
    answer: "शिष्यवृत्ती साठी पात्रता निकष असा आहे की मान्यताप्राप्त संस्थेत शिकणारा व कौटुंबिक वार्षिक उत्पन्न विहित मर्यादेत असणारा विद्यार्थी पात्र असतो.",
    intent: "SCHOLARSHIP_ELIGIBILITY_CRITERIA",
    entity: "[शिष्यवृत्ती](SERVICE_NAME), [मान्यताप्राप्त संस्थेत शिकणारा व कौटुंबिक वार्षिक उत्पन्न विहित मर्यादेत असणारा विद्यार्थी पात्र असतो](ELIGIBILITY_ATTRIBUTE)",
    keywords: "शिष्यवृत्ती, पात्रता, निकष, अट",
    category: "Scholarships",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },

  // --- PENSION SERVICES ---
  {
    id: "MGC-PEN-001",
    question: "नवीन पेन्शन योजना कसे काढायचे?",
    answer: "नवीन पेन्शन योजना साठी तहसील कार्यालय अथवा सामाजिक न्याय विभाग येथे जाऊन अर्ज सादर करावा लागतो. सोबत वयाचा पुरावा, उत्पन्नाचा दाखला, बँक खाते तपशील, अधिवास प्रमाणपत्र सादर करावे लागते. साधारणपणे ४५ ते ६० दिवस मध्ये ते उपलब्ध होते.",
    intent: "PENSION_NEW_APPLICATION",
    entity: "[पेन्शन योजना](SERVICE_NAME), [वयाचा पुरावा](DOCUMENT), [उत्पन्नाचा दाखला](DOCUMENT), [बँक खाते तपशील](DOCUMENT), [अधिवास प्रमाणपत्र](DOCUMENT), [४५ ते ६० दिवस](DATE_TIME), [तहसील कार्यालय अथवा सामाजिक न्याय विभाग](LOCATION_OFFICE)",
    keywords: "पेन्शन योजना, नवीन अर्ज, नोंदणी, प्रक्रिया",
    category: "Pension Services",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-PEN-007",
    question: "पेन्शन योजना साठी कोणती कागदपत्रे लागतात?",
    answer: "पेन्शन योजना साठी सर्वसाधारणपणे वयाचा पुरावा, उत्पन्नाचा दाखला, बँक खाते तपशील, अधिवास प्रमाणपत्र ही कागदपत्रे आवश्यक असतात. ही कागदपत्रे तहसील कार्यालय अथवा सामाजिक न्याय विभाग येथे पडताळणीसाठी सादर करावी लागतात.",
    intent: "PENSION_REQUIRED_DOCUMENTS",
    entity: "[पेन्शन योजना](SERVICE_NAME), [वयाचा पुरावा](DOCUMENT), [उत्पन्नाचा दाखला](DOCUMENT), [बँक खाते तपशील](DOCUMENT), [अधिवास प्रमाणपत्र](DOCUMENT), [तहसील कार्यालय अथवा सामाजिक न्याय विभाग](LOCATION_OFFICE)",
    keywords: "पेन्शन योजना, कागदपत्रे, आवश्यक पुरावे",
    category: "Pension Services",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-PEN-025",
    question: "पेन्शन योजना साठी शुल्क किती आहे?",
    answer: "पेन्शन योजना साठी शासकीय शुल्क अर्जासाठी कोणतेही शुल्क आकारले जात नाही इतके आहे.",
    intent: "PENSION_FEES_CHARGES",
    entity: "[पेन्शन योजना](SERVICE_NAME), [अर्जासाठी कोणतेही शुल्क आकारले जात नाही](FEE_AMOUNT)",
    keywords: "पेन्शन योजना, शुल्क, फी, पेमेंट",
    category: "Pension Services",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-PEN-031",
    question: "पेन्शन योजना साठी पात्रता निकष काय आहेत?",
    answer: "पेन्शन योजना साठी पात्रता निकष असा आहे की वय वर्षे ६० पूर्ण व उत्पन्न मर्यादेत बसणारी व्यक्ती पात्र असते (योजनेनुसार निकष बदलतात).",
    intent: "PENSION_ELIGIBILITY_CRITERIA",
    entity: "[पेन्शन योजना](SERVICE_NAME), [वय वर्षे ६० पूर्ण व उत्पन्न मर्यादेत बसणारी व्यक्ती पात्र असते (योजनेनुसार निकष बदलतात)](ELIGIBILITY_ATTRIBUTE)",
    keywords: "पेन्शन योजना, पात्रता, निकष, अट",
    category: "Pension Services",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },

  // --- DOMICILE CERTIFICATE ---
  {
    id: "MGC-DOM-001",
    question: "नवीन अधिवास प्रमाणपत्र (Domicile Certificate) कसे काढायचे?",
    answer: "वय, अधिवास व राष्ट्रीयत्व दाखला (Domicile Certificate) काढण्यासाठी आपले सरकार (Aaple Sarkar) पोर्टलवर ऑनलाईन किंवा तहसील कार्यालय / सेतू सुविधा केंद्र येथे अर्ज करता येतो. अर्जासोबत निवासाचा पुरावा, शाळा सोडल्याचा दाखला, वयाचा पुरावा आणि रेशन कार्ड सादर करावे लागते. साधारणपणे १५ ते २१ दिवसांत प्रमाणपत्र मिळते.",
    intent: "DOMICILE_NEW_APPLICATION",
    entity: "[अधिवास प्रमाणपत्र](SERVICE_NAME), [निवासाचा पुरावा](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [वयाचा पुरावा](DOCUMENT), [१५ ते २१ दिवस](DATE_TIME), [तहसील कार्यालय व सेतू केंद्र](LOCATION_OFFICE)",
    keywords: "अधिवास प्रमाणपत्र, Domicile Certificate, डोमिसिल, रहिवासी दाखला, नवीन अर्ज, डोमासाईल, domicile, domisil, rehivasi",
    category: "Domicile Certificate",
    complexity: "Moderate",
    conversationType: "Procedural Guidance"
  },
  {
    id: "MGC-DOM-007",
    question: "अधिवास प्रमाणपत्रासाठी (Domicile) कोणती कागदपत्रे लागतात?",
    answer: "अधिवास प्रमाणपत्रासाठी (१) महाराष्ट्रात १५ वर्षे वास्तव्याचा पुरावा (वीज बिल/घरपट्टी), (२) शाळा सोडल्याचा दाखला (LC), (३) आधार कार्ड/पॅन कार्ड, (४) रेशन कार्ड आणि (५) स्वयंघोषणा पत्र ही कागदपत्रे आवश्यक असतात.",
    intent: "DOMICILE_REQUIRED_DOCUMENTS",
    entity: "[अधिवास प्रमाणपत्र](SERVICE_NAME), [वीज बिल किंवा घरपट्टी](DOCUMENT), [शाळा सोडल्याचा दाखला](DOCUMENT), [आधार कार्ड](DOCUMENT), [रेशन कार्ड](DOCUMENT)",
    keywords: "अधिवास, डोमिसिल, Domicile, कागदपत्रे, documents, docs, काय लागते, kagadpatre",
    category: "Domicile Certificate",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-DOM-025",
    question: "अधिवास प्रमाणपत्र (Domicile) काढण्यासाठी फी किती आहे?",
    answer: "अधिवास प्रमाणपत्रासाठी शासकीय शुल्क अंदाजे ₹३३ (पोर्टल चार्जसह) किंवा सेतू केंद्रावर ₹५० ते ₹१०० सेवा शुल्क असते.",
    intent: "DOMICILE_FEES_CHARGES",
    entity: "[अधिवास प्रमाणपत्र](SERVICE_NAME), [₹३३ शासकीय शुल्क / ₹५० ते ₹१०० सेतू शुल्क](FEE_AMOUNT)",
    keywords: "अधिवास, डोमिसिल, Domicile, शुल्क, फी, शुल्क किती, cost, fees, fee",
    category: "Domicile Certificate",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  },
  {
    id: "MGC-DOM-031",
    question: "अधिवास प्रमाणपत्रासाठी (Domicile) पात्रता निकष काय आहेत?",
    answer: "अर्जदार नागरिक महाराष्ट्रात किमान १५ वर्षे सलग वास्तव्यास असावा किंवा त्यांचा जन्म महाराष्ट्रात झालेला असावा. विद्यार्थी आणि शासकीय नोकरीसाठी हे प्रमाणपत्र आवश्यक असते.",
    intent: "DOMICILE_ELIGIBILITY_CRITERIA",
    entity: "[अधिवास प्रमाणपत्र](SERVICE_NAME), [महाराष्ट्रात किमान १५ वर्षे वास्तव्यास असावा](ELIGIBILITY_ATTRIBUTE)",
    keywords: "अधिवास, डोमिसिल, Domicile, पात्रता, निकष, eligibility, patrata",
    category: "Domicile Certificate",
    complexity: "Complex",
    conversationType: "Eligibility Inquiry"
  },
  {
    id: "MGC-DOM-040",
    question: "अधिवास प्रमाणपत्र (Domicile) मिळण्यासाठी किती दिवस लागतात?",
    answer: "अधिवास प्रमाणपत्र मिळण्यासाठी अर्ज सबमिट केल्यानंतर साधारणपणे १५ ते २१ कार्यदिवस लागतात.",
    intent: "DOMICILE_PROCESSING_TIME",
    entity: "[अधिवास प्रमाणपत्र](SERVICE_NAME), [१५ ते २१ दिवस](DATE_TIME)",
    keywords: "अधिवास, डोमिसिल, कालावधी, दिवस, वेळ, duration, time, days",
    category: "Domicile Certificate",
    complexity: "Simple",
    conversationType: "Factual Lookup"
  }
];
