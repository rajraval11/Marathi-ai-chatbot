import React from 'react';

interface NavbarProps {
  activeTab: 'home' | 'about' | 'chatbot' | 'admin-login' | 'admin-dashboard';
  setActiveTab: (tab: 'home' | 'about' | 'chatbot' | 'admin-login' | 'admin-dashboard') => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isAdminLoggedIn,
  onLogout,
}) => {
  return (
    <nav className="bg-orange-600 text-white shadow-lg shrink-0 border-b-4 border-orange-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-600 font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              म
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight leading-tight">
                महाराष्ट्र शासन : चॅटबॉट सेवा
              </h1>
              <p className="text-[11px] text-orange-100 font-medium">
                Offline Marathi Government Services Assistant
              </p>
            </div>
          </button>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 sm:gap-6 font-semibold text-sm">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'home'
                  ? 'bg-orange-700 text-white font-bold border-b-2 border-white'
                  : 'hover:bg-orange-500/80 text-orange-50'
              }`}
            >
              गृह
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'about'
                  ? 'bg-orange-700 text-white font-bold border-b-2 border-white'
                  : 'hover:bg-orange-500/80 text-orange-50'
              }`}
            >
              बद्दल
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'chatbot'
                  ? 'bg-orange-700 text-white font-bold border-b-2 border-white'
                  : 'hover:bg-orange-500/80 text-orange-50'
              }`}
            >
              चॅटबॉट
            </button>

            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('admin-dashboard')}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                    activeTab === 'admin-dashboard'
                      ? 'bg-white text-orange-700 font-extrabold ring-2 ring-white'
                      : 'bg-orange-800 text-white hover:bg-orange-900'
                  }`}
                >
                  प्रशासक पॅनेल
                </button>
                <button
                  onClick={onLogout}
                  className="text-xs bg-orange-800 hover:bg-red-700 text-orange-100 hover:text-white px-2.5 py-1 rounded-lg transition-colors"
                  title="लॉगआउट करा"
                >
                  बाहेर पडा
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('admin-login')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                  activeTab === 'admin-login'
                    ? 'bg-white text-orange-700 font-extrabold shadow-md'
                    : 'bg-white text-orange-600 hover:bg-orange-100'
                }`}
              >
                प्रशासक लॉगिन
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
