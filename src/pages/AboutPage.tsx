import React from 'react';
import {
  FileCode,
  Layers,
  Database,
  ShieldAlert,
  CheckCircle2,
  Cpu,
  Brain,
  Search,
  BookOpen
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-orange-50/50 min-h-[calc(100vh-4rem)] p-4 sm:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Overview Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-orange-200 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold border border-orange-200">
          <BookOpen className="w-3.5 h-3.5 text-orange-600" />
          NLP Stage-1 प्रकल्प अहवाल (NLP Stage-1 Report Overview)
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          स्थानिक मराठी शासकीय सेवा चॅटबॉट (Offline Marathi Government Services Chatbot)
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          हा प्रकल्प महाराष्ट्रातील सर्वसामान्य नागरिकांना इंटरनेट किंवा क्लाउड एआय सेवांशिवाय (Offline Mode) शासकीय योजना, दाखले, कार्ड नूतनीकरण व कागदपत्रांची अचूक माहिती देण्यासाठी तयार करण्यात आला आहे.
        </p>
      </div>

      {/* No API Guarantee Box */}
      <div className="bg-red-50/80 border-2 border-red-200 rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-3 text-red-800 font-bold text-base">
          <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
          १००% ऑफलाइन व डेटा गोपनीयता हमी (Strict Offline Constraints)
        </div>
        <p className="text-xs sm:text-sm text-red-700 leading-relaxed">
          या ॲप्लिकेशनमध्ये कोणतीही बाह्य API (उदा. OpenAI, Gemini, Claude, Bhashini, Google Translate) वापरलेली नाही. सर्व प्रक्रिया स्थानिक संगणकावर scikit-learn पद्धतीच्या TF-IDF, कोसाइन सिमिलॅरिटी व SQLite डेटाबेसद्वारे स्थानिकरीत्या पार पाडली जाते.
        </p>
      </div>

      {/* Tech Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-sm space-y-3">
          <div className="p-3 bg-orange-100 text-orange-700 rounded-xl w-fit">
            <FileCode className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">फ्रंटएंड (Frontend)</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            React.js सह Tailwind CSS चा वापर. वापरकर्त्यास प्रतिसादात्मक (Responsive), जलद आणि सुलभ मराठी इंटरफेस उपलब्ध करून दिला आहे.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-sm space-y-3">
          <div className="p-3 bg-orange-100 text-orange-700 rounded-xl w-fit">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">एमएल व एनएलपी (NLP Engine)</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Unicode Normalization, Devanagari Cleaning, Marathi Stopword Removal, TF-IDF Vectorizer, आणि Cosine Similarity.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-sm space-y-3">
          <div className="p-3 bg-orange-100 text-orange-700 rounded-xl w-fit">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">डेटाबेस (SQLite Knowledge Base)</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            SQLite डेटाबेस इंजिन (WebAssembly sql.js). ३९६ प्रश्नांची ३९६ नोंदींसह ११ श्रेणी व ६६ इंटेन्ट्स सुरक्षितपणे साठवले जातात.
          </p>
        </div>
      </div>

      {/* NLP Pipeline Detailed Explanation */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-100 rounded-2xl text-orange-700">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">संपूर्ण NLP प्रक्रिया टप्पे (NLP Pipeline Architecture)</h2>
            <p className="text-xs text-gray-500">प्रश्नाचा शोध घेताना पाळली जाणारी टप्प्याटप्प्याने प्रक्रिया</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100 flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              १
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">युनिकोड नॉर्मलायझेशन (Unicode Normalization)</h4>
              <p className="text-xs text-gray-600 mt-1">
                देवनागरी लिपीतील विविध युनिकोड अक्षरे (NFC Format) एकसारखी केली जातात. Zero-Width Joiner (ZWJ) व अवग्रह चिन्हे हटवून मजकूर मानक स्वरूपात आणला जातो.
              </p>
            </div>
          </div>

          <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100 flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              २
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">मजकूर स्वच्छता (Text Cleaning)</h4>
              <p className="text-xs text-gray-600 mt-1">
                विरामचिन्हे, विशेष चिन्हे व इतर भाषेतील निरुपयोगी चिन्हे काढून केवळ शुद्ध मराठी अक्षरे व आवश्यक अंक ठेवले जातात.
              </p>
            </div>
          </div>

          <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100 flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              ३
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">टोकनायझेशन व स्टॉपवर्ड्स फिल्टरिंग (Tokenization & Stopword Removal)</h4>
              <p className="text-xs text-gray-600 mt-1">
                वाक्याचे स्वतंत्र शब्दांमध्ये (Tokens) विभाजन केले जाते. त्यानंतर 'आहे', 'साठी', 'हे', 'आणि', 'कसे' यांसारखे वारंवार येणारे मराठी स्टॉपवर्ड्स काढून मुख्य गाभा शब्द निवडले जातात.
              </p>
            </div>
          </div>

          <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100 flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              ४
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">TF-IDF व्हेक्टरायझेशन (TF-IDF Vectorization)</h4>
              <p className="text-xs text-gray-600 mt-1">
                प्रत्येक शब्दाची टर्म फ्रिक्वेन्सी (TF) व इनव्हर्स डॉक्युमेंट फ्रिक्वेन्सी (IDF) वापरून गणितीय मूल्य गुणांक (Vectors) तयार केले जातात.
              </p>
            </div>
          </div>

          <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100 flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              ५
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">कोसाइन सिमिलॅरिटी व उत्तर शोध (Cosine Similarity Retrieval)</h4>
              <p className="text-xs text-gray-600 mt-1">
                वापरकर्त्याच्या प्रश्नाचा व्हेक्टर आणि डेटाबेसमधील प्रश्नांच्या व्हेक्टर्समधील कोसाइन कोन मोजून सर्वात जास्त साम्य असणारे (Highest Cosine Similarity) उत्तर SQLite मधून मिळवले जाते.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Specifications */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-200 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 text-lg">डेटासेट वैशिष्ट्ये (Dataset Specifications)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="font-bold text-gray-700 block">एकूण नोंदी:</span>
            <span className="text-sm font-black text-orange-700">३९६ रेकॉर्ड्स (396 Records)</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="font-bold text-gray-700 block">श्रेणी:</span>
            <span className="text-sm font-black text-orange-700">११ शासकीय श्रेणी (11 Categories)</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="font-bold text-gray-700 block">इंटेन्ट गट:</span>
            <span className="text-sm font-black text-orange-700">६६ विशिष्ट उद्देश (66 Intents)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
