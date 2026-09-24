import React, { useState } from 'react';
import { useData } from '../../context/DataContext.tsx';
import { SiteSettings } from '../../types.ts';
import {
  Settings,
  Save,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Megaphone,
  ShieldAlert,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
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
    showToast('Website business settings and announcement saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Reset all website settings to original factory defaults?')) {
      resetSiteSettings();
      // Also reload current formState
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-emerald-600" />
            <span>Website & Business Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Edit company identity, proprietor contact numbers, GSTIN, top marquee announcement, and emergency notices.
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
        {/* Section 1: Live Announcement Strip */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-base text-slate-900">Top Announcement Banner</h3>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.announcementEnabled}
                onChange={(e) => setFormState({ ...formState, announcementEnabled: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-xs font-bold text-slate-700">Display Banner on Website</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Banner Announcement Text
            </label>
            <input
              type="text"
              value={formState.announcementText}
              onChange={(e) => setFormState({ ...formState, announcementText: e.target.value })}
              placeholder="e.g., 🌊 Fresh High-Protein Vannamei Feed Batch Ready for Dispatch • Free DO & Salinity Testing..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Appears prominently across the very top of all pages. Great for stock arrival updates, emergency rain advisories, or free testing announcements.
            </p>
          </div>
        </div>

        {/* Section 2: Business Profile & Proprietor Contacts */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base text-slate-900">Business Identity & Contact Numbers</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Legal Name
              </label>
              <input
                type="text"
                required
                value={formState.businessName}
                onChange={(e) => setFormState({ ...formState, businessName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Proprietor / Owner Name
              </label>
              <input
                type="text"
                required
                value={formState.proprietor}
                onChange={(e) => setFormState({ ...formState, proprietor: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Phone (Call & WhatsApp)
              </label>
              <input
                type="tel"
                required
                value={formState.primaryPhone}
                onChange={(e) => setFormState({ ...formState, primaryPhone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Secondary Support Phone
              </label>
              <input
                type="tel"
                value={formState.secondaryPhone}
                onChange={(e) => setFormState({ ...formState, secondaryPhone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Phone
              </label>
              <input
                type="tel"
                value={formState.whatsappNumber}
                onChange={(e) => setFormState({ ...formState, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Email
              </label>
              <input
                type="email"
                value={formState.primaryEmail}
                onChange={(e) => setFormState({ ...formState, primaryEmail: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Secondary Email
              </label>
              <input
                type="email"
                value={formState.secondaryEmail}
                onChange={(e) => setFormState({ ...formState, secondaryEmail: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                GSTIN Tax Number
              </label>
              <input
                type="text"
                value={formState.gstin}
                onChange={(e) => setFormState({ ...formState, gstin: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono uppercase font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Store Operating Hours
              </label>
              <input
                type="text"
                value={formState.shopHours}
                onChange={(e) => setFormState({ ...formState, shopHours: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Covered Pond Delivery Radius
              </label>
              <input
                type="text"
                value={formState.coveredRadius}
                onChange={(e) => setFormState({ ...formState, coveredRadius: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Physical Showroom & Warehouse Address
            </label>
            <textarea
              rows={2}
              value={formState.address}
              onChange={(e) => setFormState({ ...formState, address: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
            />
          </div>
        </div>

        {/* Section 3: Hero Headline & Payment Security Notice */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base text-slate-900">Hero Section & Anti-Fraud Notice</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Homepage Hero Main Headline
            </label>
            <input
              type="text"
              value={formState.heroHeadline}
              onChange={(e) => setFormState({ ...formState, heroHeadline: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Homepage Hero Subheadline
            </label>
            <textarea
              rows={2}
              value={formState.heroSubheadline}
              onChange={(e) => setFormState({ ...formState, heroSubheadline: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Farmer Payment Security Warning Notice</span>
            </label>
            <textarea
              rows={2}
              value={formState.paymentNotice}
              onChange={(e) => setFormState({ ...formState, paymentNotice: e.target.value })}
              className="w-full px-3.5 py-2 bg-amber-50/60 border border-amber-300 rounded-xl text-xs text-amber-950 focus:ring-2 focus:ring-amber-500 focus:bg-white resize-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Warns farmers against fraudulent callers and emphasizes verified payment contact.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Website Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
