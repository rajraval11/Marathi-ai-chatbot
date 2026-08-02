import React, { useState } from 'react';
import { Lock, User, KeyRound, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && (password === 'admin123' || password === 'admin')) {
      setError('');
      onLoginSuccess();
    } else {
      setError('अवैध वापरकर्ता नाव किंवा पासवर्ड! (Default: admin / admin123)');
    }
  };

  return (
    <div className="bg-orange-50/50 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 border-2 border-orange-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            प्रशासक लॉगिन (Admin Login)
          </h2>
          <p className="text-xs text-gray-500">
            डेटासेट व्यवस्थापन व TF-IDF इंडेक्स पुनर्बांधणीसाठी प्रवेश करा
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 block">
              वापरकर्ता नाव (Username)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none text-sm"
                placeholder="admin"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 block">
              पासवर्ड (Password)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm active:scale-98"
          >
            लॉगिन करा (Login)
          </button>
        </form>

        <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 text-[11px] text-orange-900 space-y-1 text-center font-mono">
          <div className="font-bold">डिफॉल्ट क्रेडेंशियल्स (Demo Access):</div>
          <div>Username: <code className="bg-orange-200 px-1 rounded">admin</code></div>
          <div>Password: <code className="bg-orange-200 px-1 rounded">admin123</code></div>
        </div>
      </div>
    </div>
  );
};
