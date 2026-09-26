import React, { useState } from 'react';
import { useData } from '../../context/DataContext.tsx';
import {
  Database,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileJson,
  ShieldCheck
} from 'lucide-react';

export const AdminBackup: React.FC = () => {
  const { exportAllDataJSON, importAllDataJSON, resetAllData } = useData();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportAllDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sr_aqua_feeds_complete_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Complete website data exported successfully as JSON!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importAllDataJSON(content);
      if (success) {
        setImportStatus('Backup restored successfully! All products, gallery, leads, and settings updated.');
        showToast('Backup restored successfully!');
      } else {
        setImportStatus('Failed to import backup file. Please ensure it is a valid JSON file exported from this admin panel.');
      }
    };
    reader.readAsText(file);
  };

  const handleFactoryReset = () => {
    if (
      confirm(
        'WARNING: Are you sure you want to reset all website content to factory defaults? All newly added products, gallery items, leads, and custom settings will be restored to their original seed state.'
      )
    ) {
      resetAllData();
      showToast('All website data reset to factory defaults.');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
          <Database className="w-7 h-7 text-emerald-600" />
          <span>Data Backup, Export & System Restore</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Download a complete snapshot of all products, farmer leads, showroom images, and business settings.
        </p>
      </div>

      {/* Export Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Download className="w-5 h-5 text-emerald-600" />
          <h3 className="font-extrabold text-base text-slate-900">Export Complete Site Snapshot</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Create an offline JSON backup file containing all your customized products, price details, showroom gallery photos, customer leads, and company contact records. You can save this file on your computer for safekeeping.
        </p>

        <div>
          <button
            onClick={handleDownloadBackup}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <FileJson className="w-4 h-4" />
            <span>Download Complete Backup (.json)</span>
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Upload className="w-5 h-5 text-sky-600" />
          <h3 className="font-extrabold text-base text-slate-900">Restore from Backup File</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Upload a previously downloaded JSON backup file to instantly restore your catalog, gallery items, leads, and store settings.
        </p>

        {importStatus && (
          <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>{importStatus}</span>
          </div>
        )}

        <div>
          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Choose JSON File to Restore</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Factory Reset Section */}
      <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-rose-100">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <h3 className="font-extrabold text-base text-rose-950">Factory Reset Website Data</h3>
        </div>

        <p className="text-xs text-rose-700 leading-relaxed">
          Restore the initial demonstration products, sample gallery photos, seed farmer inquiries, and original Utukuri Rambabu business details.
        </p>

        <div>
          <button
            onClick={handleFactoryReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Data to Factory Defaults</span>
          </button>
        </div>
      </div>

      {/* Cloud & Supabase Infrastructure Summary */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl border border-slate-700 p-6 text-white space-y-4 shadow-xl">
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 flex-wrap">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-sm sm:text-base">Supabase Cloud Architecture</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
            Vercel + Supabase + Cloudinary
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Products Table</span>
            <div className="font-mono text-emerald-300 font-bold text-sm">public.products</div>
            <span className="text-[11px] text-slate-300">Live synced table</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Gallery Table</span>
            <div className="font-mono text-emerald-300 font-bold text-sm">public.gallery</div>
            <span className="text-[11px] text-slate-300">Showroom & warehouse</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Leads Table</span>
            <div className="font-mono text-emerald-300 font-bold text-sm">public.leads</div>
            <span className="text-[11px] text-slate-300">Farmer CRM inquiries</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Stories Table</span>
            <div className="font-mono text-emerald-300 font-bold text-sm">public.farmer_stories</div>
            <span className="text-[11px] text-slate-300">Verified harvest stories</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">FAQs Table</span>
            <div className="font-mono text-emerald-300 font-bold text-sm">public.faqs</div>
            <span className="text-[11px] text-slate-300">Pond science knowledgebase</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Settings Table</span>
            <div className="font-mono text-emerald-300 font-bold text-sm">public.site_settings</div>
            <span className="text-[11px] text-slate-300">Store hours, phones, GSTIN</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2 border-t border-white/10">
          <span>Supabase Project: <strong className="text-slate-200">lnsflmqbrpdkjcajzagw</strong></span>
          <span>Cloud CDN: <strong className="text-slate-200">neaxuyc2 (Cloudinary)</strong></span>
          <span>Hosting Ready: <strong className="text-slate-200">Vercel</strong></span>
        </div>
      </div>
    </div>
  );
};
