import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import { PageType } from '../types.ts';
import { BrandLogo } from '../components/BrandLogo.tsx';
import {
  LayoutDashboard,
  Users,
  Package,
  Image as ImageIcon,
  Settings,
  Database,
  Lock,
  Unlock,
  LogOut,
  ExternalLink,
  ShieldCheck,
  ArrowLeft,
  FileText,
  MessageSquare,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { AdminDashboard } from '../components/admin/AdminDashboard.tsx';
import { AdminLeads } from '../components/admin/AdminLeads.tsx';
import { AdminProducts } from '../components/admin/AdminProducts.tsx';
import { AdminContent } from '../components/admin/AdminContent.tsx';
import { AdminStories } from '../components/admin/AdminStories.tsx';
import { AdminFAQs } from '../components/admin/AdminFAQs.tsx';
import { AdminGallery } from '../components/admin/AdminGallery.tsx';
import { AdminSettings } from '../components/admin/AdminSettings.tsx';
import { AdminBackup } from '../components/admin/AdminBackup.tsx';

interface AdminPageProps {
  onNavigate: (page: PageType) => void;
}

export type AdminTabType =
  | 'dashboard'
  | 'leads'
  | 'products'
  | 'content'
  | 'stories'
  | 'faqs'
  | 'gallery'
  | 'settings'
  | 'backup';

interface NavGroup {
  groupTitle: string;
  items: {
    id: AdminTabType;
    label: string;
    description: string;
    icon: React.ReactNode;
    badge?: number;
    badgeColor?: string;
  }[];
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { isAdminAuthenticated, loginAdmin, logoutAdmin, leads, products, gallery, siteSettings, farmerStories, faqs } = useData();
  const [activeTab, setActiveTab] = useState<AdminTabType>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Login form state
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const success = loginAdmin(pin);
    if (!success) {
      setLoginError('Invalid PIN. Use default demo PIN: 1234');
    }
  };

  const handleQuickDemoLogin = () => {
    loginAdmin('1234');
  };

  // If not logged in, show secure login portal
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 bg-slate-100/60">
        <div className="max-w-md w-full rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Top subtle aquatic accent line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500" />

          {/* Logo & Heading */}
          <div className="text-center space-y-2">
            <div className="inline-flex justify-center mb-2">
              <BrandLogo variant="compact" />
            </div>
            <h1 className="font-display text-2xl font-black text-slate-900">
              Admin & Proprietor Portal
            </h1>
            <p className="text-xs text-slate-500">
              Secure control access for <strong>{siteSettings.proprietor}</strong> and authorized management.
            </p>
          </div>

          {/* Login Error */}
          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
              {loginError}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-pin" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Admin Security PIN / Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-pin"
                  type="password"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN (Demo: 1234)"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white tracking-widest font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          {/* Quick Demo Bypass */}
          <div className="pt-2 text-center space-y-3 border-t border-slate-100">
            <div className="text-[11px] text-slate-400">
              Evaluating or testing the website?
            </div>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>1-Click Quick Login as Utukuri Rambabu</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors pt-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  const navGroups: NavGroup[] = [
    {
      groupTitle: 'OVERVIEW',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          description: 'Store summary & quick stats',
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
        {
          id: 'leads',
          label: 'Customer Leads',
          description: 'Farmer inquiries & WhatsApp calls',
          icon: <Users className="w-4 h-4" />,
          badge: newLeadsCount,
          badgeColor: newLeadsCount > 0 ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-200 text-slate-700',
        },
      ],
    },
    {
      groupTitle: 'STORE & CATALOG',
      items: [
        {
          id: 'products',
          label: 'Products & Specs',
          description: 'Technical charts, ingredients, dosage',
          icon: <Package className="w-4 h-4" />,
          badge: products.length,
          badgeColor: 'bg-emerald-100 text-emerald-800',
        },
        {
          id: 'gallery',
          label: 'Showroom Photos',
          description: 'Store images & pond gallery',
          icon: <ImageIcon className="w-4 h-4" />,
          badge: gallery.length,
          badgeColor: 'bg-slate-100 text-slate-700',
        },
      ],
    },
    {
      groupTitle: 'WEBSITE CONTENT (CMS)',
      items: [
        {
          id: 'content',
          label: 'Hero & About Text',
          description: 'Headlines, stats, founder message',
          icon: <FileText className="w-4 h-4" />,
        },
        {
          id: 'stories',
          label: 'Farmer Reviews',
          description: 'Testimonials, survival rates, FCR',
          icon: <MessageSquare className="w-4 h-4" />,
          badge: farmerStories.length,
          badgeColor: 'bg-amber-100 text-amber-800',
        },
        {
          id: 'faqs',
          label: 'Aquaculture FAQs',
          description: 'Pond guidance & mineral dosage answers',
          icon: <HelpCircle className="w-4 h-4" />,
          badge: faqs.length,
          badgeColor: 'bg-sky-100 text-sky-800',
        },
      ],
    },
    {
      groupTitle: 'SETTINGS & DATA',
      items: [
        {
          id: 'settings',
          label: 'Store Info & Notices',
          description: 'Phone, GSTIN, top alert banner',
          icon: <Settings className="w-4 h-4" />,
        },
        {
          id: 'backup',
          label: 'Backup & Restore',
          description: 'Export & import JSON database',
          icon: <Database className="w-4 h-4" />,
        },
      ],
    },
  ];

  // Find active item metadata for header breadcrumbs
  const allNavItems = navGroups.flatMap((g) => g.items);
  const currentNav = allNavItems.find((i) => i.id === activeTab) || allNavItems[0];

  const handleSelectTab = (tabId: AdminTabType) => {
    setActiveTab(tabId);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 pb-16">
      {/* Mobile Top Header */}
      <div className="lg:hidden sticky top-0 z-30 bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
              SR
            </span>
            <span className="font-extrabold text-sm tracking-tight text-white">Admin Control</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {newLeadsCount > 0 && (
            <button
              onClick={() => handleSelectTab('leads')}
              className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1 animate-pulse"
            >
              <span>{newLeadsCount} Leads</span>
            </button>
          )}
          <button
            onClick={() => onNavigate('home')}
            className="p-1.5 rounded-xl bg-slate-800 text-sky-400 hover:text-sky-300"
            title="View Live Website"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4 lg:pt-8 flex flex-col lg:flex-row gap-6 items-start">
        {/* SIDEBAR NAVIGATION (Desktop & Tablet) */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 p-5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-72 lg:rounded-3xl lg:p-5 lg:shadow-xl lg:border lg:border-slate-800 flex flex-col justify-between overflow-y-auto ${
            isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          {/* Top Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-base shadow-md">
                  SR
                </div>
                <div>
                  <h2 className="text-sm font-black text-white leading-tight">SR Aqua Feeds</h2>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                    Admin Manager
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Groups */}
            <div className="space-y-5">
              {navGroups.map((group, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300 px-3">
                    {group.groupTitle}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTab(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer group ${
                            isActive
                              ? 'bg-emerald-700 text-white shadow-md'
                              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`p-1.5 rounded-xl transition-colors ${
                                isActive ? 'bg-emerald-500/30 text-emerald-300' : 'text-slate-400 group-hover:text-emerald-400'
                              }`}
                            >
                              {item.icon}
                            </span>
                            <span className="truncate">{item.label}</span>
                          </div>

                          {typeof item.badge === 'number' && item.badge > 0 && (
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-full ml-1.5 flex-shrink-0 ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : item.badgeColor || 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Bottom Profile & Controls */}
          <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block font-medium">Logged in as</span>
                <strong className="text-xs font-bold text-white truncate block">
                  {siteSettings.proprietor}
                </strong>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate('home')}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-sky-950/80 text-sky-400 hover:text-sky-300 text-[11px] font-bold transition-colors cursor-pointer border border-slate-700/60"
                title="Open live website in public view"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Site</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-rose-950/80 text-rose-400 hover:text-rose-300 text-[11px] font-bold transition-colors cursor-pointer border border-slate-700/60"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isMobileSidebarOpen && (
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 w-full min-w-0 space-y-6">
          {/* Top Breadcrumb & Quick Actions Header */}
          <div className="hidden lg:flex items-center justify-between bg-white px-6 py-4 rounded-3xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                {currentNav.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <span>Admin Control Center</span>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <span className="text-emerald-700 font-bold">{currentNav.label}</span>
                </div>
                <h1 className="text-lg font-black text-slate-900 leading-tight">
                  {currentNav.label}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200/80 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                <span>View Live Site</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-slate-200 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Active Tab Component Container with Smooth Animation */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
            {activeTab === 'dashboard' && (
              <AdminDashboard
                onNavigateTab={(tab) => handleSelectTab(tab)}
                onExitToWebsite={() => onNavigate('home')}
              />
            )}
            {activeTab === 'leads' && <AdminLeads />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'content' && <AdminContent />}
            {activeTab === 'stories' && <AdminStories />}
            {activeTab === 'faqs' && <AdminFAQs />}
            {activeTab === 'gallery' && <AdminGallery />}
            {activeTab === 'settings' && <AdminSettings />}
            {activeTab === 'backup' && <AdminBackup />}
          </div>
        </main>
      </div>
    </div>
  );
};
