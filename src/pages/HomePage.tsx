import React from 'react';
import { CATEGORIES } from '../data/initialData';
import {
  IdCard,
  CreditCard,
  Globe,
  Car,
  CheckSquare,
  ShoppingBag,
  FileText,
  Baby,
  Award,
  GraduationCap,
  HeartHandshake,
  Bot,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Database
} from 'lucide-react';

interface HomePageProps {
  onStartChatbot: (initialCategory?: string) => void;
  onNavigate: (page: 'home' | 'about' | 'chatbot' | 'admin-login' | 'admin-dashboard') => void;
  totalRecordsCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartChatbot,
  onNavigate,
  totalRecordsCount
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'IdCard': return <IdCard className="w-6 h-6 text-orange-600" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-orange-600" />;
      case 'Globe': return <Globe className="w-6 h-6 text-orange-600" />;
      case 'Car': return <Car className="w-6 h-6 text-orange-600" />;
      case 'CheckSquare': return <CheckSquare className="w-6 h-6 text-orange-600" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-orange-600" />;
      case 'FileText': return <FileText className="w-6 h-6 text-orange-600" />;
      case 'Baby': return <Baby className="w-6 h-6 text-orange-600" />;
      case 'Award': return <Award className="w-6 h-6 text-orange-600" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-orange-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-orange-600" />;
      default: return <FileText className="w-6 h-6 text-orange-600" />;
    }
  };

  return (
    <div className="bg-orange-50/50 min-h-[calc(100vh-4rem)] p-4 sm:p-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-orange-200 shadow-md relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-orange-100 rounded-full opacity-50 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold border border-orange-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            १००% ऑफलाइन व स्थानिक प्रणाली (No Cloud / No API)
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            महाराष्ट्रातील शासकीय सेवा आणि योजनांची माहिती आता एका क्लिकवर!
          </h1>

          <p className="text-gray-600 text-base leading-relaxed">
            मराठी नैसर्गिक भाषा प्रक्रिया (NLP) तंत्रज्ञानावर आधारित चॅटबॉट. आधार, पॅन, रेशन कार्ड, दाखले व शासकीय योजनांचे नियम, कागदपत्रे आणि अर्ज प्रक्रिया सोप्या भाषेत जाणून घ्या.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => onStartChatbot()}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-orange-200 transition-all flex items-center gap-3 group active:scale-95"
            >
              <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              चॅटबॉट वापरा (Start Chatbot)
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="bg-white hover:bg-orange-50 text-orange-800 border-2 border-orange-200 font-bold px-6 py-3.5 rounded-2xl transition-colors text-sm"
            >
              तंत्रज्ञान व NLP माहिती
            </button>
          </div>
        </div>

        {/* Quick Offline Stats Badge */}
        <div className="mt-8 pt-6 border-t border-orange-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-orange-50/80 rounded-2xl border border-orange-100">
            <div className="text-2xl font-black text-orange-700">{totalRecordsCount}</div>
            <div className="text-xs font-medium text-gray-600">एकूण प्रश्नोत्तर नोंदी</div>
          </div>
          <div className="p-3 bg-orange-50/80 rounded-2xl border border-orange-100">
            <div className="text-2xl font-black text-orange-700">११</div>
            <div className="text-xs font-medium text-gray-600">शासकीय सेवा श्रेणी</div>
          </div>
          <div className="p-3 bg-orange-50/80 rounded-2xl border border-orange-100">
            <div className="text-2xl font-black text-orange-700">६६</div>
            <div className="text-xs font-medium text-gray-600">इंटेन्ट गट (Intents)</div>
          </div>
          <div className="p-3 bg-green-50 rounded-2xl border border-green-200">
            <div className="text-xs font-bold text-green-700 flex items-center justify-center gap-1 mt-1">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              सुरक्षित SQLite DB
            </div>
            <div className="text-[10px] text-green-600 mt-1">पूर्णपणे स्थानिक साठवणूक</div>
          </div>
        </div>
      </div>

      {/* 11 Service Categories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">शासकीय सेवा श्रेणी (11 Categories)</h2>
            <p className="text-xs text-gray-500">कोणत्याही श्रेणीवर क्लिक करून थेट प्रश्न विचारा</p>
          </div>
          <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
            एकूण ११ श्रेणी
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.code}
              onClick={() => onStartChatbot(cat.code)}
              className="bg-white p-5 rounded-2xl border border-orange-100 hover:border-orange-400 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                    ३६ प्रश्न
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">{cat.englishName}</p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-orange-600 font-bold group-hover:translate-x-0.5 transition-transform">
                <span>प्रश्न विचारा</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local NLP Pipeline Step Banner */}
      <div className="bg-white p-6 rounded-3xl border-2 border-orange-100 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-xl text-orange-700">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">स्थानिक NLP प्रक्रिया मार्गदर्शक (Local Pipeline Workflow)</h3>
            <p className="text-xs text-gray-500">प्रत्येक प्रश्नावर स्थानिक पातळीवर ५-टप्प्यांची NLP प्रक्रिया राबवली जाते</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 text-xs space-y-1">
            <span className="font-bold text-orange-800">१. युनिकोड नॉर्मलायझेशन</span>
            <p className="text-[11px] text-gray-600">Devanagari NFC अक्षरांचे एकसारखेकरण</p>
          </div>
          <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 text-xs space-y-1">
            <span className="font-bold text-orange-800">२. मजकूर स्वच्छता व टोकनायझेशन</span>
            <p className="text-[11px] text-gray-600">विरामचिन्हे काढणे व शब्दांचे तुकडे</p>
          </div>
          <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 text-xs space-y-1">
            <span className="font-bold text-orange-800">३. स्टॉपवर्ड्स फिल्टरिंग</span>
            <p className="text-[11px] text-gray-600">सामान्य मराठी निरुपयोगी शब्द हटवणे</p>
          </div>
          <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 text-xs space-y-1">
            <span className="font-bold text-orange-800">४. TF-IDF व्हेक्टरायझेशन</span>
            <p className="text-[11px] text-gray-600">शब्द वारंवारता व महत्त्व गुणांक</p>
          </div>
          <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 text-xs space-y-1">
            <span className="font-bold text-orange-800">५. कोसाइन सिमिलॅरिटी व उत्तर</span>
            <p className="text-[11px] text-gray-600">SQLite DB मधून सर्वोत्तम उत्तर शोध</p>
          </div>
        </div>
      </div>
    </div>
  );
};
