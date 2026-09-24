import React, { useState } from 'react';
import { useData } from '../../context/DataContext.tsx';
import { SiteSettings } from '../../types.ts';
import {
  FileText,
  Save,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  TrendingUp,
  RotateCcw,
  Truck,
  Quote
} from 'lucide-react';

export const AdminContent: React.FC = () => {
  const { siteSettings, updateSiteSettings, resetSiteSettings } = useData();
  const [formState, setFormState] = useState<SiteSettings>({ ...siteSettings });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formState);
    showToast('All website narrative and page content updated live!');
  };

  const handleReset = () => {
    if (confirm('Reset all page headlines, hero stats, and story texts to factory defaults?')) {
      resetSiteSettings();
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
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
            <FileText className="w-7 h-7 text-emerald-600" />
            <span>Website Pages & Hero Content Editor</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Customize homepage hero slogans, statistical numbers, badges, About Us story paragraphs, and mission statement.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Reset to Factory Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Homepage Hero Section & Brand Badges */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base text-slate-900">Homepage Hero Banner & Slogans</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Main Brand Name Display
              </label>
              <input
                type="text"
                value={formState.businessName}
                onChange={(e) => setFormState({ ...formState, businessName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Brand Slogan / Tagline
              </label>
              <input
                type="text"
                value={formState.tagline}
                onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hero Section Subheadline / Value Proposition Narrative
            </label>
            <textarea
              rows={3}
              value={formState.heroSubheadline}
              onChange={(e) => setFormState({ ...formState, heroSubheadline: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
            />
          </div>

          {/* Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Hero Pill Badge 1</label>
              <input
                type="text"
                value={formState.heroBadge1}
                onChange={(e) => setFormState({ ...formState, heroBadge1: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Hero Pill Badge 2</label>
              <input
                type="text"
                value={formState.heroBadge2}
                onChange={(e) => setFormState({ ...formState, heroBadge2: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Hero Pill Badge 3</label>
              <input
                type="text"
                value={formState.heroBadge3}
                onChange={(e) => setFormState({ ...formState, heroBadge3: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: 4 Key Statistical Counters */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base text-slate-900">Homepage Statistical Counters & Metrics</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Stat 1 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat Counter 1</label>
              <input
                type="text"
                value={formState.heroStat1Number}
                onChange={(e) => setFormState({ ...formState, heroStat1Number: e.target.value })}
                placeholder="500+"
                className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-sm font-black text-emerald-700"
              />
              <input
                type="text"
                value={formState.heroStat1Label}
                onChange={(e) => setFormState({ ...formState, heroStat1Label: e.target.value })}
                placeholder="Happy Coastal Farmers"
                className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-[11px] text-slate-700"
              />
            </div>

            {/* Stat 2 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat Counter 2</label>
              <input
                type="text"
                value={formState.heroStat2Number}
                onChange={(e) => setFormState({ ...formState, heroStat2Number: e.target.value })}
                placeholder="15+"
                className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-sm font-black text-sky-700"
              />
              <input
                type="text"
                value={formState.heroStat2Label}
                onChange={(e) => setFormState({ ...formState, heroStat2Label: e.target.value })}
                placeholder="Years Field Wisdom"
                className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-[11px] text-slate-700"
              />
            </div>

            {/* Stat 3 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat Counter 3</label>
              <input
                type="text"
                value={formState.heroStat3Number}
                onChange={(e) => setFormState({ ...formState, heroStat3Number: e.target.value })}
                placeholder="35 km"
                className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-sm font-black text-amber-700"
              />
              <input
                type="text"
                value={formState.heroStat3Label}
                onChange={(e) => setFormState({ ...formState, heroStat3Label: e.target.value })}
                placeholder="Direct Dyke Delivery"
                className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-[11px] text-slate-700"
              />
            </div>

            {/* Stat 4 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat Counter 4</label>
              <input
                type="text"
                value={formState.heroStat4Number}
                onChange={(e) => setFormState({ ...formState, heroStat4Number: e.target.value })}
                placeholder="100%"
                className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-sm font-black text-purple-700"
              />
              <input
                type="text"
                value={formState.heroStat4Label}
                onChange={(e) => setFormState({ ...formState, heroStat4Label: e.target.value })}
                placeholder="Genuine Sealed Stock"
                className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-[11px] text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Section 3: About Us Page - Founder Story & Core Mission */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Quote className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base text-slate-900">About Us Page - Founder Quote & Story</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Founder Utukuri Rambabu Personal Quote
            </label>
            <textarea
              rows={2}
              value={formState.aboutFounderMessage}
              onChange={(e) => setFormState({ ...formState, aboutFounderMessage: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none italic"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              About Us Story - Paragraph 1
            </label>
            <textarea
              rows={3}
              value={formState.aboutStoryPart1}
              onChange={(e) => setFormState({ ...formState, aboutStoryPart1: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              About Us Story - Paragraph 2
            </label>
            <textarea
              rows={3}
              value={formState.aboutStoryPart2}
              onChange={(e) => setFormState({ ...formState, aboutStoryPart2: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Core Business Mission Statement
            </label>
            <textarea
              rows={2}
              value={formState.aboutMission}
              onChange={(e) => setFormState({ ...formState, aboutMission: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
            />
          </div>
        </div>

        {/* Section 4: Coastal Dispatch Turnaround */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Truck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base text-slate-900">Coastal Delivery & Dispatch Badge</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Emergency Delivery Turnaround (ETA)
              </label>
              <input
                type="text"
                value={formState.dispatchTurnaround}
                onChange={(e) => setFormState({ ...formState, dispatchTurnaround: e.target.value })}
                placeholder="e.g., < 45 Mins Express Delivery"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Covered Coastal Radius
              </label>
              <input
                type="text"
                value={formState.coveredRadius}
                onChange={(e) => setFormState({ ...formState, coveredRadius: e.target.value })}
                placeholder="e.g., 35 km Coastal Pond Belt"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Page Content Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
