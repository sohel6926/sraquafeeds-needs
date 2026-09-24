import React from 'react';
import { useData } from '../../context/DataContext.tsx';
import {
  Users,
  Package,
  Image as ImageIcon,
  Settings,
  TrendingUp,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  ArrowRight,
  ShieldCheck,
  Megaphone,
  MessageSquare,
  HelpCircle,
  FileText,
  Star,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { WhatsAppIcon } from '../Icons.tsx';

interface AdminDashboardProps {
  onNavigateTab: (tab: 'dashboard' | 'leads' | 'products' | 'content' | 'stories' | 'faqs' | 'gallery' | 'settings' | 'backup') => void;
  onExitToWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab, onExitToWebsite }) => {
  const { leads, products, gallery, siteSettings, farmerStories, faqs, updateLeadStatus } = useData();

  const newLeads = leads.filter((l) => l.status === 'new');
  const recentLeads = leads.slice(0, 5);

  const handleWhatsAppFarmer = (lead: (typeof leads)[0]) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const greeting = `Namaste ${lead.farmerName} garu, this is Utukuri Rambabu from SR Aqua Feeds & Needs, Ulavapadu. Thank you for reaching out regarding ${lead.topic}. We are ready to dispatch high quality feed & supplies to your pond site.`;
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(greeting)}`, '_blank');

    if (lead.status === 'new') {
      updateLeadStatus(lead.id, 'contacted');
    }
  };

  return (
    <div className="space-y-7">
      {/* 1. Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Admin Management Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {siteSettings.proprietor}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Complete control center for <strong>{siteSettings.businessName}</strong>. Everything on the website is customizable: customer leads, product technical charts, hero text, farmer reviews, and store notices.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigateTab('leads')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Customer Inquiries {newLeads.length > 0 && `(${newLeads.length} New)`}</span>
            </button>

            <button
              onClick={onExitToWebsite}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Live Website</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Urgent Announcement Alert (if active) */}
      {siteSettings.announcementEnabled && siteSettings.announcementText && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-2.5 text-xs text-emerald-950 font-medium">
            <Megaphone className="w-4 h-4 text-emerald-600 flex-shrink-0 animate-bounce" />
            <span>
              <strong>Active Website Announcement Bar:</strong> {siteSettings.announcementText}
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('settings')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline whitespace-nowrap cursor-pointer"
          >
            Edit Announcement
          </button>
        </div>
      )}

      {/* 3. Primary 3 High-Impact Cards (Spacious & Easy to Understand) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Leads */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Farmer Leads</h3>
                <span className="text-[11px] text-slate-400">Direct inquiries & hotline</span>
              </div>
            </div>
            {newLeads.length > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-xs font-bold animate-pulse">
                {newLeads.length} New
              </span>
            )}
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900">{leads.length}</span>
              <span className="text-xs font-semibold text-slate-500">total inquiries logged</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Respond directly over WhatsApp or phone calls with pre-filled greetings.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('leads')}
            className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-800 text-xs font-bold transition-colors cursor-pointer border border-slate-200/80"
          >
            <span>Open Leads CRM</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 2: Products Catalog */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Product Catalog</h3>
                <span className="text-[11px] text-slate-400">Feeds, minerals & probiotics</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
              {products.filter((p) => p.isPopular).length} Featured
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900">{products.length}</span>
              <span className="text-xs font-semibold text-slate-500">products active</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Edit technical specs, ingredient %, dosage schedules, and water quality charts.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('products')}
            className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-sky-50 text-slate-700 group-hover:text-sky-800 text-xs font-bold transition-colors cursor-pointer border border-slate-200/80"
          >
            <span>Manage Catalog & Specs</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 3: Farmer Reviews */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Farmer Reviews</h3>
                <span className="text-[11px] text-slate-400">Crop harvest testimonials</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-xs font-black">5.0</span>
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900">{farmerStories.length}</span>
              <span className="text-xs font-semibold text-slate-500">verified farmer stories</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manage farmer success ratings, survival rates, count/kg, and FCR metrics.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('stories')}
            className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-amber-50 text-slate-700 group-hover:text-amber-800 text-xs font-bold transition-colors cursor-pointer border border-slate-200/80"
          >
            <span>Edit Farmer Testimonials</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 4. Website CMS & Knowledge Section (Clear, easy shortcuts) */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-1">
          Website Content & Customization Modules
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigateTab('content')}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400/80 shadow-2xs hover:shadow-md transition-all text-left flex items-start gap-3.5 cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-bold text-slate-900 block group-hover:text-teal-700 transition-colors">
                Hero & Page Text
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Edit hero title, slogan, 4 stats numbers & founder story.
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('faqs')}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400/80 shadow-2xs hover:shadow-md transition-all text-left flex items-start gap-3.5 cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-bold text-slate-900 block group-hover:text-indigo-700 transition-colors">
                Aquaculture FAQs ({faqs.length})
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Add mineral dosages, water care & feed guidance answers.
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('gallery')}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400/80 shadow-2xs hover:shadow-md transition-all text-left flex items-start gap-3.5 cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-bold text-slate-900 block group-hover:text-purple-700 transition-colors">
                Showroom Photos ({gallery.length})
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Upload photos of stock, facility, and pond visits.
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('settings')}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400/80 shadow-2xs hover:shadow-md transition-all text-left flex items-start gap-3.5 cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-bold text-slate-900 block group-hover:text-amber-700 transition-colors">
                Store Info & Notices
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Phone numbers, GSTIN, store address & marquee alerts.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 5. Recent Customer Inquiries / Leads Stream */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Recent Customer Inquiries</h3>
              <p className="text-[11px] text-slate-400">Farmers who contacted SR Aqua Feeds</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('leads')}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
          >
            <span>View All ({leads.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentLeads.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">No inquiries received yet.</p>
        ) : (
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-100/80 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="text-sm font-extrabold text-slate-900">{lead.farmerName}</strong>
                    <span className="text-xs text-slate-500 font-mono">({lead.phone})</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                      {lead.village}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.status === 'new'
                          ? 'bg-rose-100 text-rose-800 animate-pulse'
                          : lead.status === 'contacted'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {lead.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    <strong className="text-slate-800">{lead.topic}:</strong> {lead.message}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                  <a
                    href={`tel:${lead.phone}`}
                    className="p-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                    title="Call Farmer"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleWhatsAppFarmer(lead)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                    title="Send WhatsApp Greeting"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
