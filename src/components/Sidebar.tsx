import React, { useState } from 'react';
import {
  MessageSquarePlus,
  MessageSquare,
  ShieldCheck,
  Settings,
  Trash2,
  Bug,
  ChevronLeft,
  ChevronRight,
  Bot,
  Sparkles,
  Lock,
  ExternalLink,
  Database,
  CheckCircle2
} from 'lucide-react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onClearAllSessions: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
  onLogoutAdmin: () => void;
  debugMode: boolean;
  onToggleDebugMode: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  recordCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onClearAllSessions,
  isAdminLoggedIn,
  onOpenAdmin,
  onLogoutAdmin,
  debugMode,
  onToggleDebugMode,
  isOpenMobile,
  onCloseMobile,
  recordCount
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-72 bg-stone-900 text-stone-200 flex flex-col border-r border-stone-800 transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header: Brand Logo & Title */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black shadow-md shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">GovAssist</span>
                <span className="px-1.5 py-0.2 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold rounded-md">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-medium leading-none mt-0.5">
                महाराष्ट्र शासन - सेतू सहाय्यक
              </p>
            </div>
          </div>
        </div>

        {/* Action: New Chat Button */}
        <div className="p-3">
          <button
            onClick={() => {
              onNewChat();
              onCloseMobile();
            }}
            className="w-full bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-sm group"
          >
            <MessageSquarePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>नवीन संभाषण (New Chat)</span>
          </button>
        </div>

        {/* Middle Section: Chat Threads History */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 py-1">
            संभाषण इतिहास (Previous Chats)
          </div>

          {sessions.length > 0 ? (
            sessions.map((sess) => {
              const isActive = sess.id === activeSessionId;
              return (
                <div
                  key={sess.id}
                  className={`group relative flex items-center justify-between rounded-xl p-2.5 text-xs font-medium cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-stone-800 text-orange-400 font-semibold border-l-2 border-orange-500'
                      : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
                  }`}
                  onClick={() => {
                    onSelectSession(sess.id);
                    onCloseMobile();
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-6">
                    <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-orange-400' : 'text-stone-500'}`} />
                    <span className="truncate">{sess.title || 'नवीन संभाषण'}</span>
                  </div>

                  {/* Delete Thread Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(sess.id);
                    }}
                    title="हटवा (Delete)"
                    className="opacity-0 group-hover:opacity-100 p-1 text-stone-500 hover:text-red-400 transition-opacity absolute right-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-stone-500 text-xs italic">
              कोणताही संभाषण इतिहास नाही.
            </div>
          )}
        </div>

        {/* Bottom Bar: Status, Admin & Settings */}
        <div className="p-3 border-t border-stone-800 space-y-2 text-xs">
          {/* Offline Engine Indicator */}
          <div className="p-2.5 bg-stone-800/80 rounded-xl border border-stone-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-[11px] leading-tight">
                <div className="font-bold text-stone-200">100% Offline NLP Engine</div>
                <div className="text-[10px] text-stone-400">{recordCount} Records • SQLite KB</div>
              </div>
            </div>
          </div>

          {/* Admin Dashboard Access */}
          <div className="flex items-center gap-1.5">
            {isAdminLoggedIn ? (
              <div className="w-full flex items-center justify-between bg-emerald-950/50 border border-emerald-800/60 p-2 rounded-xl text-[11px] text-emerald-300">
                <span className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Admin Access
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={onOpenAdmin}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold"
                  >
                    पॅनेल
                  </button>
                  <button
                    onClick={onLogoutAdmin}
                    className="text-stone-400 hover:text-red-300 text-[10px] px-1"
                  >
                    बाहेर
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white p-2 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-colors border border-stone-700/50"
              >
                <Lock className="w-3.5 h-3.5 text-stone-400" />
                <span>प्रशासक प्रवेश (Admin Login)</span>
              </button>
            )}

            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors border border-stone-700/50 shrink-0"
              title="सेटिंग्ज (Settings)"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-stone-200 shadow-2xl text-stone-800">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                <Settings className="w-4 h-4 text-orange-600" />
                सेटिंग्ज व पर्याय (Settings)
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Debug / Inspection Mode Toggle */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Bug className="w-3.5 h-3.5 text-orange-600" />
                    NLP डिबग मोड (Debug Inspector)
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    TF-IDF व्हेक्टर व कोसाइन स्कोअर तपशील दर्शवा
                  </div>
                </div>
                <button
                  onClick={onToggleDebugMode}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    debugMode ? 'bg-orange-600' : 'bg-stone-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                      debugMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Clear History */}
              <div className="p-3 bg-red-50/50 rounded-2xl border border-red-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-red-900">सर्व इतिहास हटवा (Clear All)</div>
                  <div className="text-[11px] text-red-700">स्थानिक ब्राउझर इतिहास पुसून टाका</div>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('तुम्हाला सर्व संभाषण इतिहास साफ करायचा आहे का?')) {
                      onClearAllSessions();
                      setShowSettingsModal(false);
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs"
                >
                  Clear History
                </button>
              </div>
            </div>

            <div className="pt-2 text-center text-[11px] text-stone-400">
              GovAssist v2.5 • 100% Local Marathi NLP
            </div>
          </div>
        </div>
      )}
    </>
  );
};
