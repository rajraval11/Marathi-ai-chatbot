import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWorkspace } from './components/ChatWorkspace';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { dbManager } from './db/sqliteManager';
import { MarathiNLPEngine } from './nlp/marathiEngine';
import { INITIAL_DATASET } from './data/initialData';
import { ChatSession, ChatMessage } from './types';
import { ArrowLeft, MessageSquare } from 'lucide-react';

const SESSIONS_STORAGE_KEY = 'gov_assist_chat_sessions_v2';

export default function App() {
  const [viewMode, setViewMode] = useState<'chat' | 'admin-login' | 'admin-dashboard'>('chat');

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('marathi_govt_admin_auth') === 'true';
  });

  const [debugMode, setDebugMode] = useState<boolean>(false);
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState<boolean>(false);

  const [nlpEngine, setNlpEngine] = useState<MarathiNLPEngine>(
    () => new MarathiNLPEngine(INITIAL_DATASET)
  );

  const [isDbReady, setIsDbReady] = useState(false);
  const [recordCount, setRecordCount] = useState(INITIAL_DATASET.length);

  // Load / Initialize Chat Sessions
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    
    // Default initial session
    const defaultSess: ChatSession = {
      id: `sess-${Date.now()}`,
      title: 'नवीन संभाषण',
      messages: [],
      updatedAt: Date.now()
    };
    return [defaultSess];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    return sessions[0]?.id || `sess-${Date.now()}`;
  });

  // Sync Sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.warn('Failed saving sessions to localStorage:', e);
    }
  }, [sessions]);

  // Initialize SQLite Database and Corpus on mount
  useEffect(() => {
    async function setupDb() {
      try {
        await dbManager.init();
        const records = dbManager.getAllRecords();
        if (records && records.length > 0) {
          const engine = new MarathiNLPEngine(records);
          setNlpEngine(engine);
          setRecordCount(records.length);
        }
      } catch (e) {
        console.warn('SQLite init fallback to initial dataset:', e);
      } finally {
        setIsDbReady(true);
      }
    }
    setupDb();
  }, []);

  const refreshCorpusFromDB = () => {
    const records = dbManager.getAllRecords();
    const newEngine = new MarathiNLPEngine(records);
    setNlpEngine(newEngine);
    setRecordCount(records.length);
  };

  // Active Session Reference
  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0] || {
    id: `sess-${Date.now()}`,
    title: 'नवीन संभाषण',
    messages: [],
    updatedAt: Date.now()
  };

  // Handlers for Session Management
  const handleNewChat = () => {
    const newSess: ChatSession = {
      id: `sess-${Date.now()}`,
      title: 'नवीन संभाषण',
      messages: [],
      updatedAt: Date.now()
    };
    setSessions((prev) => [newSess, ...prev]);
    setActiveSessionId(newSess.id);
  };

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
    setViewMode('chat');
  };

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      if (filtered.length === 0) {
        const fresh: ChatSession = {
          id: `sess-${Date.now()}`,
          title: 'नवीन संभाषण',
          messages: [],
          updatedAt: Date.now()
        };
        setActiveSessionId(fresh.id);
        return [fresh];
      }
      if (activeSessionId === id) {
        setActiveSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleClearAllSessions = () => {
    const fresh: ChatSession = {
      id: `sess-${Date.now()}`,
      title: 'नवीन संभाषण',
      messages: [],
      updatedAt: Date.now()
    };
    setSessions([fresh]);
    setActiveSessionId(fresh.id);
  };

  const handleUpdateSessionMessages = (newMessages: ChatMessage[], lastContext?: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSession.id) {
          // Derive a suitable title from the first user message
          let title = s.title;
          const firstUserMsg = newMessages.find((m) => m.sender === 'user');
          if (firstUserMsg && (s.title === 'नवीन संभाषण' || !s.title)) {
            title = firstUserMsg.text.slice(0, 24) + (firstUserMsg.text.length > 24 ? '...' : '');
          }

          return {
            ...s,
            title,
            messages: newMessages,
            lastContextService: lastContext || s.lastContextService,
            updatedAt: Date.now()
          };
        }
        return s;
      })
    );
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('marathi_govt_admin_auth', 'true');
    setViewMode('admin-dashboard');
  };

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('marathi_govt_admin_auth');
    setViewMode('chat');
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setViewMode('admin-dashboard');
    } else {
      setViewMode('admin-login');
    }
  };

  return (
    <div className="h-screen w-screen flex bg-stone-900 font-sans text-stone-800 antialiased overflow-hidden">
      {/* ChatGPT / Claude Left Sidebar */}
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSession.id}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        onClearAllSessions={handleClearAllSessions}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={handleOpenAdmin}
        onLogoutAdmin={handleLogoutAdmin}
        debugMode={debugMode}
        onToggleDebugMode={() => setDebugMode(!debugMode)}
        isOpenMobile={isOpenMobileSidebar}
        onCloseMobile={() => setIsOpenMobileSidebar(false)}
        recordCount={recordCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {viewMode === 'chat' && (
          <ChatWorkspace
            nlpEngine={nlpEngine}
            activeSession={activeSession}
            onUpdateSessionMessages={handleUpdateSessionMessages}
            onNewChat={handleNewChat}
            onToggleMobileSidebar={() => setIsOpenMobileSidebar(!isOpenMobileSidebar)}
            debugMode={debugMode}
          />
        )}

        {viewMode === 'admin-login' && (
          <div className="flex-1 flex flex-col h-full bg-amber-50/30">
            <div className="p-4 bg-white border-b border-orange-200/80 flex items-center justify-between shrink-0">
              <button
                onClick={() => setViewMode('chat')}
                className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 font-bold text-xs text-orange-800 border border-orange-200/80 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>चॅटवर परत जा (Return to Chat)</span>
              </button>
              <div className="font-extrabold text-xs text-stone-800">
                GovAssist Admin Portal
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AdminLoginPage onLoginSuccess={handleAdminLoginSuccess} />
            </div>
          </div>
        )}

        {viewMode === 'admin-dashboard' && (
          <div className="flex-1 flex flex-col h-full bg-amber-50/30">
            <div className="p-4 bg-white border-b border-orange-200/80 flex items-center justify-between shrink-0">
              <button
                onClick={() => setViewMode('chat')}
                className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 font-bold text-xs text-orange-800 border border-orange-200/80 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-orange-600" />
                <span>चॅटवर परत जा (Return to Chatbot)</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-700">प्रशासक नियंत्रण पॅनेल</span>
                <button
                  onClick={handleLogoutAdmin}
                  className="text-xs text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-lg font-semibold"
                >
                  लॉगआउट
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AdminDashboardPage
                nlpEngine={nlpEngine}
                onRefreshCorpus={refreshCorpusFromDB}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
