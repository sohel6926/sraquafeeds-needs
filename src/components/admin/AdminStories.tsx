import React, { useState } from 'react';
import { useData } from '../../context/DataContext.tsx';
import { FarmerStory } from '../../types.ts';
import {
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Star,
  CheckCircle2,
  X,
  RotateCcw,
  MapPin,
  TrendingUp,
  Quote
} from 'lucide-react';

const STORY_CATEGORIES: FarmerStory['highlightCategory'][] = [
  'Minerals & Molting',
  'Feed & Low FCR',
  'Vibrio Defense',
  'Emergency DO',
];

export const AdminStories: React.FC = () => {
  const { farmerStories, addFarmerStory, updateFarmerStory, deleteFarmerStory, resetFarmerStories } = useData();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<FarmerStory | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [region, setRegion] = useState('');
  const [cultureType, setCultureType] = useState('L. vannamei Semi-Intensive');
  const [farmSize, setFarmSize] = useState('16 Acres (4 Ponds)');
  const [docDays, setDocDays] = useState('DOC 110 Harvest');
  const [stars, setStars] = useState(5);
  const [highlightCategory, setHighlightCategory] = useState<FarmerStory['highlightCategory']>('Feed & Low FCR');
  const [quote, setQuote] = useState('');
  const [verifiedCropCount, setVerifiedCropCount] = useState('3rd Consecutive Crop');
  const [date, setDate] = useState('Harvested 2026');

  // Key outcomes
  const [outcome1Label, setOutcome1Label] = useState('Survival Rate');
  const [outcome1Val, setOutcome1Val] = useState('92%');
  const [outcome2Label, setOutcome2Label] = useState('Harvest Count');
  const [outcome2Val, setOutcome2Val] = useState('28 Count/kg');
  const [outcome3Label, setOutcome3Label] = useState('FCR Ratio');
  const [outcome3Val, setOutcome3Val] = useState('1.18 Ratio');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingStory(null);
    setName('');
    setVillage('');
    setRegion('Ulavapadu Mandal');
    setCultureType('L. vannamei Semi-Intensive');
    setFarmSize('10 Acres (3 Ponds)');
    setDocDays('DOC 100 Harvest');
    setStars(5);
    setHighlightCategory('Feed & Low FCR');
    setQuote('');
    setVerifiedCropCount('Verified Partner');
    setDate('Current Season 2026');
    setOutcome1Label('Survival Rate');
    setOutcome1Val('90%');
    setOutcome2Label('Harvest Count');
    setOutcome2Val('30 Count/kg');
    setOutcome3Label('Feed FCR');
    setOutcome3Val('1.20');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (story: FarmerStory) => {
    setEditingStory(story);
    setName(story.name);
    setVillage(story.village);
    setRegion(story.region);
    setCultureType(story.cultureType);
    setFarmSize(story.farmSize);
    setDocDays(story.docDays);
    setStars(story.stars);
    setHighlightCategory(story.highlightCategory);
    setQuote(story.quote);
    setVerifiedCropCount(story.verifiedCropCount);
    setDate(story.date);

    setOutcome1Label(story.keyOutcomes?.[0]?.label || 'Outcome 1');
    setOutcome1Val(story.keyOutcomes?.[0]?.value || '-');
    setOutcome2Label(story.keyOutcomes?.[1]?.label || 'Outcome 2');
    setOutcome2Val(story.keyOutcomes?.[1]?.value || '-');
    setOutcome3Label(story.keyOutcomes?.[2]?.label || 'Outcome 3');
    setOutcome3Val(story.keyOutcomes?.[2]?.value || '-');

    setIsModalOpen(true);
  };

  const handleDuplicate = (story: FarmerStory) => {
    const copy: FarmerStory = {
      ...story,
      id: `story-${Date.now()}`,
      name: `${story.name} (Copy)`,
    };
    addFarmerStory(copy);
    showToast(`Duplicated story from "${story.name}"!`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) {
      alert('Farmer Name and Testimonial Quote are required.');
      return;
    }

    const payload: FarmerStory = {
      id: editingStory ? editingStory.id : `story-${Date.now()}`,
      name: name.trim(),
      village: village.trim() || 'Ulavapadu',
      region: region.trim() || 'Nellore District',
      cultureType: cultureType.trim(),
      farmSize: farmSize.trim(),
      docDays: docDays.trim(),
      stars,
      highlightCategory,
      quote: quote.trim(),
      verifiedCropCount: verifiedCropCount.trim(),
      date: date.trim(),
      keyOutcomes: [
        { label: outcome1Label.trim(), value: outcome1Val.trim() },
        { label: outcome2Label.trim(), value: outcome2Val.trim() },
        { label: outcome3Label.trim(), value: outcome3Val.trim() },
      ],
    };

    if (editingStory) {
      updateFarmerStory(payload);
      showToast(`Updated review from "${payload.name}"`);
    } else {
      addFarmerStory(payload);
      showToast(`Added new review from "${payload.name}"`);
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
            <Quote className="w-7 h-7 text-emerald-600" />
            <span>Farmer Success Stories & Reviews Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage farmer reviews and harvest results displayed on the Homepage stories carousel.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (confirm('Restore default farmer success stories?')) {
                resetFarmerStories();
                showToast('Farmer stories reset to defaults.');
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
            <span>Add Farmer Story</span>
          </button>
        </div>
      </div>

      {/* Stories Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {farmerStories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">{story.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {story.highlightCategory}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{story.village}, {story.region}</span>
                  </p>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: story.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 italic leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </div>

              {/* Key Outcomes */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {(story.keyOutcomes || []).map((o, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <span className="text-[10px] text-slate-500 block truncate">{o.label}</span>
                    <strong className="text-xs font-bold text-emerald-950 font-mono">{o.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                {story.farmSize} • {story.docDays}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDuplicate(story)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 text-xs font-bold transition-colors cursor-pointer"
                  title="Duplicate story"
                >
                  <Copy className="w-3.5 h-3.5 text-sky-600" />
                  <span>Duplicate</span>
                </button>

                <button
                  onClick={() => handleOpenEdit(story)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Delete story from "${story.name}"?`)) {
                      deleteFarmerStory(story.id);
                      showToast('Story removed.');
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete story"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Quote className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  {editingStory ? 'Edit Farmer Review' : 'Add New Farmer Review'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Farmer Name <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., K. Venkateswara Rao"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category Tag <span className="text-emerald-600">*</span>
                  </label>
                  <select
                    value={highlightCategory}
                    onChange={(e) => setHighlightCategory(e.target.value as FarmerStory['highlightCategory'])}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                  >
                    {STORY_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Village / Town</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g., Chakicherla Peddapattapu Palem"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mandal / District</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="e.g., Ulavapadu Mandal, Nellore"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Farm Size</label>
                  <input
                    type="text"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    placeholder="e.g., 16 Acres (4 Ponds)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">DOC Stage / Harvest</label>
                  <input
                    type="text"
                    value={docDays}
                    onChange={(e) => setDocDays(e.target.value)}
                    placeholder="e.g., DOC 112 Harvest"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Star Rating (1-5)</label>
                  <select
                    value={stars}
                    onChange={(e) => setStars(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Farmer Quote / Review Narrative <span className="text-emerald-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="What was the farmer's experience with SR Aqua Feeds, Utukuri Rambabu, feed FCR, minerals, or midnight emergency delivery..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
                />
              </div>

              {/* Key Outcome metrics */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 block">3 Key Result Metrics:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={outcome1Label}
                      onChange={(e) => setOutcome1Label(e.target.value)}
                      placeholder="Label e.g. Survival Rate"
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      value={outcome1Val}
                      onChange={(e) => setOutcome1Val(e.target.value)}
                      placeholder="Value e.g. 91.5%"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      value={outcome2Label}
                      onChange={(e) => setOutcome2Label(e.target.value)}
                      placeholder="Label e.g. Harvest Count"
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      value={outcome2Val}
                      onChange={(e) => setOutcome2Val(e.target.value)}
                      placeholder="Value e.g. 28 Count/kg"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      value={outcome3Label}
                      onChange={(e) => setOutcome3Label(e.target.value)}
                      placeholder="Label e.g. FCR Savings"
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      value={outcome3Val}
                      onChange={(e) => setOutcome3Val(e.target.value)}
                      placeholder="Value e.g. ₹1.85L Saved"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>
                </div>
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
                  {editingStory ? 'Save Changes' : 'Create Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
