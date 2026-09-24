import React, { useState } from 'react';
import { useData } from '../../context/DataContext.tsx';
import { FAQItem } from '../../types.ts';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  Copy,
  CheckCircle2,
  X,
  RotateCcw,
  Search
} from 'lucide-react';

const FAQ_CATEGORIES: FAQItem['category'][] = [
  'Products & Nutrition',
  'Pond Farming Practices',
  'Water Quality & Minerals',
  'Ordering & Delivery',
];

export const AdminFAQs: React.FC = () => {
  const { faqs, addFAQ, updateFAQ, deleteFAQ, resetFAQs } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  // Form state
  const [category, setCategory] = useState<FAQItem['category']>('Products & Nutrition');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [keyPointsInput, setKeyPointsInput] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'All' || f.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setCategory('Products & Nutrition');
    setQuestion('');
    setAnswer('');
    setKeyPointsInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setCategory(faq.category);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setKeyPointsInput((faq.keyPoints || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleDuplicate = (faq: FAQItem) => {
    const copy: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`,
      question: `${faq.question} (Copy)`,
    };
    addFAQ(copy);
    showToast(`Duplicated question!`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      alert('Question and Answer are required.');
      return;
    }

    const points = keyPointsInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: FAQItem = {
      id: editingFaq ? editingFaq.id : `faq-${Date.now()}`,
      category,
      question: question.trim(),
      answer: answer.trim(),
      keyPoints: points.length > 0 ? points : undefined,
    };

    if (editingFaq) {
      updateFAQ(payload);
      showToast('Updated FAQ question.');
    } else {
      addFAQ(payload);
      showToast('Added new FAQ question.');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <HelpCircle className="w-7 h-7 text-emerald-600" />
            <span>Aquaculture FAQs & Farming Guidance Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Edit farmer questions, recommended dosages, and farming advisory displayed across Homepage and Contact pages.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (confirm('Restore default aquaculture FAQs?')) {
                resetFAQs();
                showToast('FAQs reset to defaults.');
              }
            }}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Reset to Factory Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ Question</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none self-start sm:self-auto">
          {['All', ...FAQ_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-sm transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {faq.category}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {faq.question}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => handleDuplicate(faq)}
                  className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                  title="Duplicate FAQ"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Delete this FAQ question?')) {
                      deleteFAQ(faq.id);
                      showToast('FAQ deleted.');
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {faq.answer}
            </div>

            {faq.keyPoints && faq.keyPoints.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {faq.keyPoints.map((point, i) => (
                  <span key={i} className="text-[11px] bg-emerald-50/80 text-emerald-900 border border-emerald-200/60 px-2.5 py-0.5 rounded-md font-medium">
                    ✓ {point}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  {editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category <span className="text-emerald-600">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FAQItem['category'])}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                >
                  {FAQ_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Farmer Question <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., Why is 3-hour water stability critical in shrimp feed?"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Answer <span className="text-emerald-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Provide comprehensive, practical aquaculture advice for local farmers..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Takeaway Bullet Points (One per line)
                </label>
                <textarea
                  rows={3}
                  value={keyPointsInput}
                  onChange={(e) => setKeyPointsInput(e.target.value)}
                  placeholder="3+ hours water stability with zero check-tray dusting.&#10;Prevents nutrient leaching into pond bottom mud.&#10;Saves up to 15% in feed costs."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  {editingFaq ? 'Save Changes' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
