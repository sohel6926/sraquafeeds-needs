import React from 'react';
import { PageType } from '../types.ts';
import { BrandLogo } from './BrandLogo.tsx';
import { WhatsAppIcon, PhoneCallIcon, EmailIcon, GstBadgeIcon } from './Icons.tsx';
import { MapPin, ShieldCheck, CheckCircle2, Clock, AlertTriangle, Shield } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';

import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';

import prawnPatternBg from '../assets/images/prawn_pattern_bg_1790103865798.jpg';
import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { siteSettings, leads } = useData();
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  const handleNav = (page: PageType, hash?: string) => {
    onNavigate(page);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden pt-16 pb-12 border-t border-slate-800">
      {/* Background aquatic subtle glow & decorative prawn pattern & clean water caustics */}
      <div className="absolute inset-0 bg-repeat opacity-[0.03] pointer-events-none mix-blend-screen" style={{ backgroundImage: `url(${prawnPatternBg})` }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay">
        <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Prawn Artwork Watermark */}
      <div className="absolute -bottom-10 right-10 w-48 h-48 opacity-[0.04] pointer-events-none filter invert contrast-200">
        <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo variant="full" lightMode={true} />

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Reliable local aquaculture partner dedicated to Andhra Pradesh shrimp and prawn farmers. Supplying high-quality feed, pond minerals, probiotics, and water care chemicals backed by honest guidance and prompt pond-side service.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <GstBadgeIcon className="w-3.5 h-3.5 text-emerald-400" />
                GSTIN: {siteSettings.gstin}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-950/80 text-sky-300 border border-sky-800">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                100% Genuine Sealed Stock
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Newly Established & Growing Fast
              </span>
            </div>

            {/* Proprietor Credit */}
            <div className="pt-2 text-xs text-slate-400">
              Proprietor: <span className="text-white font-semibold">{siteSettings.proprietor}</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-white text-base tracking-wide uppercase text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Products Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Shop Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => handleNav('admin')}
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors text-left text-xs cursor-pointer bg-emerald-950/70 px-2.5 py-1 rounded-lg border border-emerald-800/60"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Panel & Leads</span>
                  {newLeadsCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Store Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-display font-bold text-white text-base tracking-wide uppercase text-xs">
              Get in Touch
            </h4>

            {/* Important Payment Notice as requested */}
            <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-800/80 flex items-start gap-2.5 text-xs text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-amber-300">Important Payment Notice:</strong>
                <p className="mt-0.5 text-[11px] text-amber-200/90 leading-tight">
                  {siteSettings.paymentNotice}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-sm text-slate-300">
              {/* Phone Contacts */}
              <div className="flex items-start gap-3">
                <PhoneCallIcon className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={`tel:${siteSettings.primaryPhone}`}
                      className="text-white hover:text-emerald-400 font-semibold font-mono"
                    >
                      +91 {siteSettings.primaryPhone}
                    </a>
                    <span className="text-xs text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                      Primary & WhatsApp
                    </span>
                  </div>
                  {siteSettings.secondaryPhone && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={`tel:${siteSettings.secondaryPhone}`}
                        className="text-white hover:text-sky-400 font-semibold font-mono"
                      >
                        +91 {siteSettings.secondaryPhone}
                      </a>
                      <span className="text-xs text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded border border-sky-800">
                        Secondary Desk
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <EmailIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a
                  href={`mailto:${siteSettings.primaryEmail}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {siteSettings.primaryEmail}
                </a>
              </div>

              {/* Shop Hours */}
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-xs text-slate-300">
                  {siteSettings.shopHours}
                </span>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-1" />
                <span className="text-xs text-slate-400 leading-relaxed">
                  {siteSettings.address}
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SR Aqua Feeds & Needs. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Ulavapadu, Nellore District</span>
            <span>•</span>
            <span>Prawn & Shrimp Aquaculture</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Nourishing Life. Growing Future.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
