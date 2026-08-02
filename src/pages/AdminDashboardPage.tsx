import React, { useState, useEffect } from 'react';
import { DatasetRecord } from '../types';
import { CATEGORIES } from '../data/initialData';
import { dbManager } from '../db/sqliteManager';
import { MarathiNLPEngine } from '../nlp/marathiEngine';
import {
  Upload,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Search,
  FileSpreadsheet,
  Download,
  Database,
  CheckCircle2,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AdminDashboardPageProps {
  nlpEngine: MarathiNLPEngine;
  onRefreshCorpus: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  nlpEngine,
  onRefreshCorpus
}) => {
  const [records, setRecords] = useState<DatasetRecord[]>([]);
  const [searchTerm, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const [isRebuildingIndex, setIsRebuildingIndex] = useState(false);

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DatasetRecord | null>(null);
  const [formData, setFormData] = useState<DatasetRecord>({
    id: '',
    question: '',
    answer: '',
    intent: 'GENERAL_INQUIRY',
    entity: '',
    keywords: '',
    category: 'Aadhaar Card',
    complexity: 'Moderate',
    conversationType: 'Procedural Guidance'
  });

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const list = dbManager.getAllRecords();
    setRecords(list);
  };

  const showNotify = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // CSV Upload Handler
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target?.result as string;
      if (csvText) {
        const result = dbManager.importFromCSV(csvText);
        if (result.success) {
          showNotify('success', `CSV यशस्वीरीत्या अपलोड केले! ${result.count} नवीन नोंदी जोडल्या.`);
          loadRecords();
          onRefreshCorpus();
        } else {
          showNotify('error', `CSV एरर: ${result.error || 'अवैध CSV स्वरूप'}`);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Download CSV
  const handleExportCSV = () => {
    const csvContent = dbManager.exportToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `marathi_govt_dataset_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Rebuild TF-IDF Index Action
  const handleRebuildTFIDFIndex = () => {
    setIsRebuildingIndex(true);
    setTimeout(() => {
      onRefreshCorpus();
      setIsRebuildingIndex(false);
      showNotify('success', 'TF-IDF इंडेक्स व कोसाइन व्हेक्टर मॅट्रिक्स यशस्वीरीत्या अपडेट आणि Rebuild झाले!');
    }, 600);
  };

  // Sync / Restore Default Dataset
  const handleSyncDefaultDataset = () => {
    const count = dbManager.syncWithDefaultDataset();
    loadRecords();
    onRefreshCorpus();
    showNotify('success', `डिफॉल्ट डेटासेट यशस्वीरीत्या सिंक केला! एकूण ${count} अद्ययावत नोंदी समाविष्ट.`);
  };

  // Delete Record
  const handleDeleteRecord = (id: string) => {
    if (window.confirm(`तुम्हाला निश्चितपणे ID "${id}" ची नोंद हटवायची आहे का?`)) {
      const ok = dbManager.deleteRecord(id);
      if (ok) {
        showNotify('success', `रेकॉर्ड ${id} हटवले.`);
        loadRecords();
        onRefreshCorpus();
      } else {
        showNotify('error', 'रेकॉर्ड हटवताना त्रुटी घडली.');
      }
    }
  };

  // Open Modal for Add/Edit
  const handleOpenAddModal = () => {
    setEditingRecord(null);
    setFormData({
      id: `MGC-NEW-${Math.floor(100 + Math.random() * 900)}`,
      question: '',
      answer: '',
      intent: 'NEW_APPLICATION',
      entity: '',
      keywords: '',
      category: 'Aadhaar Card',
      complexity: 'Moderate',
      conversationType: 'Procedural Guidance'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (rec: DatasetRecord) => {
    setEditingRecord(rec);
    setFormData({ ...rec });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      showNotify('error', 'कृपया प्रश्न व उत्तर अनिवार्य भरून घ्या.');
      return;
    }

    if (editingRecord) {
      dbManager.updateRecord(formData);
      showNotify('success', `रेकॉर्ड ${formData.id} अद्ययावत केले.`);
    } else {
      dbManager.addRecord(formData);
      showNotify('success', `नवीन रेकॉर्ड ${formData.id} जोडले.`);
    }

    setIsModalOpen(false);
    loadRecords();
    onRefreshCorpus();
  };

  // Filtered & Paginated records
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.intent.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter ? r.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-orange-50/50 min-h-[calc(100vh-4rem)] p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border-2 border-orange-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold mb-2">
            <Database className="w-3.5 h-3.5 text-orange-600" />
            SQLite स्थानिक डेटाबेस व्यवस्थापन (Local DB Admin)
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            प्रशासक नियंत्रण पॅनेल (Admin Dashboard)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            एकूण {records.length} प्रश्नोत्तर नोंदी, CSV अपलोड व TF-IDF री-इंडेक्सिंग
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSyncDefaultDataset}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition-all"
            title="नवीनतम डेटासेट सिंक करा"
          >
            <Database className="w-4 h-4" />
            <span>डेटासेट सिंक / रिसेट करा</span>
          </button>

          <button
            onClick={handleRebuildTFIDFIndex}
            disabled={isRebuildingIndex}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isRebuildingIndex ? 'animate-spin' : ''}`} />
            <span>Rebuild TF-IDF Index</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>नवीन नोंद जोडा</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-sm border ${
            notification.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)}>
            <X className="w-4 h-4 opacity-60 hover:opacity-100" />
          </button>
        </div>
      )}

      {/* CSV Controls & Filters */}
      <div className="bg-white p-5 rounded-3xl border border-orange-200 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* CSV Upload */}
          <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-800 text-xs block">CSV डेटासेट अपलोड करा</span>
              <span className="text-[10px] text-gray-500">नवीन CSV फाइल जोडा</span>
            </div>
            <label className="bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>फाइल निवडा</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Export CSV */}
          <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-800 text-xs block">डेटासेट डाउनलोड करा</span>
              <span className="text-[10px] text-gray-500">CSV फॉरमॅटमध्ये एक्सपोर्ट</span>
            </div>
            <button
              onClick={handleExportCSV}
              className="bg-white hover:bg-orange-100 text-orange-800 border border-orange-300 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Total Stats */}
          <div className="p-4 bg-orange-100/50 border border-orange-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="font-bold text-orange-900 text-xs block">डेटाबेस माहिती</span>
              <span className="text-[10px] text-orange-700 font-mono">SQLite (sql.js Engine)</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-orange-700">{filteredRecords.length} / {records.length}</div>
              <span className="text-[10px] text-gray-600">दर्शवलेल्या नोंदी</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="प्रश्न, उत्तर किंवा ID द्वारे शोधा..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none text-xs"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2.5 rounded-xl border border-gray-300 focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none text-xs bg-white text-gray-700"
          >
            <option value="">सर्व श्रेणी (All Categories)</option>
            {CATEGORIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dataset Table */}
      <div className="bg-white rounded-3xl border border-orange-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-100/60 border-b border-orange-200 text-orange-900 text-[11px] uppercase tracking-wider font-extrabold">
                <th className="p-3.5">ID</th>
                <th className="p-3.5">प्रश्न (Question)</th>
                <th className="p-3.5">उत्तर (Answer)</th>
                <th className="p-3.5">श्रेणी & Intent</th>
                <th className="p-3.5 text-right">क्रिया (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y border-gray-100 text-xs text-gray-700">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-orange-50/40 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] font-bold text-orange-700 shrink-0 whitespace-nowrap">
                      {r.id}
                    </td>
                    <td className="p-3.5 font-semibold text-gray-900 max-w-xs">
                      {r.question}
                    </td>
                    <td className="p-3.5 text-gray-600 max-w-md line-clamp-2">
                      {r.answer}
                    </td>
                    <td className="p-3.5 space-y-1">
                      <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-md inline-block">
                        {r.category}
                      </span>
                      <div className="text-[10px] font-mono text-gray-400">{r.intent}</div>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(r)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="संपादित करा (Edit)"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(r.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="हटवा (Delete)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                    कोणतेही रेकॉर्ड सापडले नाही.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 bg-orange-50/50 border-t border-orange-100 flex items-center justify-between text-xs text-gray-600">
          <div>
            पान {currentPage} पैकी {totalPages} (एकूण {filteredRecords.length} नोंदी)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-300 bg-white hover:bg-orange-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-300 bg-white hover:bg-orange-50 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 border-2 border-orange-200 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-orange-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                {editingRecord ? 'नोंद संपादित करा (Edit Record)' : 'नवीन नोंद जोडा (Add New Record)'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">रेकॉर्ड ID</label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-orange-600 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">श्रेणी (Category)</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-orange-600 outline-none bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">मराठी प्रश्न (Question)</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="उदा. नवीन आधार कार्ड कसे काढायचे?"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-orange-600 outline-none text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">मराठी उत्तर (Answer)</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={3}
                  placeholder="सविस्तर शासकीय उत्तर..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-orange-600 outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">इंटेन्ट कोड (Intent Code)</label>
                  <input
                    type="text"
                    value={formData.intent}
                    onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-orange-600 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">कीवर्ड्स (Keywords)</label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="उदा. आधार, नोंदणी, दाखला"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-orange-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">एंटिटी गुणधर्म (Entity Tagging)</label>
                <input
                  type="text"
                  value={formData.entity}
                  onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                  placeholder="[आधार सेवा केंद्र](LOCATION_OFFICE), [जन्म दाखला](DOCUMENT)"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-orange-600 outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 font-bold hover:bg-gray-100"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm"
                >
                  {editingRecord ? 'बदल जतन करा' : 'नोंद जोडा'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
