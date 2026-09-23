import React, { useState } from 'react';
import { PageType } from '../types.ts';
import { PRODUCTS_DATA } from '../data/products.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { PrawnHealthShowcase } from '../components/PrawnHealthShowcase.tsx';
import { FarmerSuccessStories } from '../components/FarmerSuccessStories.tsx';
import { ProductFarmingFAQ } from '../components/ProductFarmingFAQ.tsx';
import { InquiryForm } from '../components/InquiryForm.tsx';
import { WhatsAppIcon, PhoneCallIcon, GstBadgeIcon } from '../components/Icons.tsx';
import {
  ShieldCheck,
  Award,
  Truck,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  Droplets,
  Layers,
  Image as ImageIcon,
  MessageCircle,
  TrendingUp,
  Activity,
  CheckCircle2,
  Wind,
} from 'lucide-react';

// Visual image assets
import heroPrawnBanner from '../assets/images/hero_prawn_banner_1790103831232.jpg';
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';
import pondAerationBanner from '../assets/images/pond_aeration_banner_1790103885278.jpg';
import prawnPatternBg from '../assets/images/prawn_pattern_bg_1790103865798.jpg';
import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import galleryFacilityBanner from '../assets/images/gallery_facility_banner_1790110304653.jpg';
import productsFeedBanner from '../assets/images/products_feed_banner_1790110292560.jpg';

interface HomePageProps {
  onNavigate: (page: PageType, productId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [heroActiveTab, setHeroActiveTab] = useState<'shrimp' | 'pond'>('shrimp');
  const featuredProducts = PRODUCTS_DATA.filter((p) => p.isPopular).slice(0, 4);

  return (
    <div className="space-y-8 sm:space-y-12 pb-12 sm:pb-16">
      {/* 1. Full-Width Premium Hero Banner with High-Quality Aquatic Background & Brand Identity */}
      <section className="relative w-full overflow-hidden bg-slate-950 text-white pt-8 pb-20 sm:pt-14 sm:pb-28">
        {/* Full-bleed High-Quality Aquatic Background Image & Water Caustics Shimmer - UNMASKED */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroPrawnBanner}
            alt="Healthy Vannamei prawns swimming underwater in aerated aquaculture pond"
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
          />
          {/* Authentic Clean Water Caustics Shimmer Layer */}
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
            <img
              src={cleanWaterTexture}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Soft directional gradient only behind text, no heavy opaque mask */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/30 to-transparent pointer-events-none" />
        </div>

        {/* Ambient Aquatic Light Flares & Animated Rising Bubbles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none z-1" />

        {/* Floating Animated Oxygen Micro-Bubbles in Hero Background */}
        <div className="absolute bottom-16 left-12 w-4 h-4 rounded-full bg-sky-300/30 border border-sky-200/40 animate-bubble-1 pointer-events-none z-1" />
        <div className="absolute bottom-24 left-1/4 w-3 h-3 rounded-full bg-emerald-300/30 border border-emerald-200/40 animate-bubble-2 pointer-events-none z-1" />
        <div className="absolute bottom-20 right-1/4 w-5 h-5 rounded-full bg-teal-300/25 border border-teal-200/30 animate-bubble-3 pointer-events-none z-1" />
        <div className="absolute bottom-32 right-16 w-3.5 h-3.5 rounded-full bg-sky-200/30 border border-sky-100/40 animate-bubble-1 pointer-events-none z-1" />

        {/* Subtle decorative wave divider at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-1" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Brand Identity, Value Proposition & Prominent CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Positive Growth Tag & Aquaculture Hub */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Newly Established & Rapidly Growing Aquaculture Partner</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-xs font-bold animate-float-gentle">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Fresh Stock Daily</span>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold backdrop-blur-md">
                  <Droplets className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  <span>Ulavapadu · Ramayapatnam Road</span>
                </div>
              </div>

              {/* Core Brand Identity Showcase */}
              <div className="space-y-4">
                {/* Brand Typography & Tagline */}
                <div className="text-center sm:text-left space-y-1.5">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                    Aquaculture Feeds, Chemicals & Diagnostics
                  </div>
                  <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none drop-shadow-md">
                    <span className="text-white">SR AQUA</span>{' '}
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 bg-clip-text text-transparent">
                      FEEDS & NEEDS
                    </span>
                  </h1>
                  <p className="font-display text-lg sm:text-2xl text-emerald-300 font-semibold tracking-wide flex items-center justify-center sm:justify-start gap-2 pt-0.5">
                    <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>&ldquo;Nourishing Life. Growing Future.&rdquo;</span>
                  </p>
                </div>
              </div>

              {/* Value proposition paragraph */}
              <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-xs">
                Your trusted retail partner in Ulavapadu for certified Vannamei and Tiger shrimp feeds, essential pond ionic minerals, bio-secure probiotics, and 24/7 emergency water care solutions. Supporting coastal farmers with reliable stock and rapid farm delivery.
              </p>

              {/* Prominent Primary Call & WhatsApp CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
                {/* 1. Primary Call CTA Button */}
                <a
                  id="hero-call-now-btn"
                  href="tel:9493243244"
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-teal-500 hover:from-sky-300 hover:to-teal-400 text-slate-950 font-extrabold text-base sm:text-lg shadow-xl shadow-sky-500/30 hover:shadow-sky-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <div className="p-2 rounded-xl bg-slate-950/15 flex items-center justify-center flex-shrink-0">
                    <PhoneCallIcon className="w-5 h-5 text-slate-950" />
                  </div>
                  <div className="text-left leading-tight">
                    <span className="block text-[11px] uppercase tracking-wider font-bold text-slate-900/80">
                      Direct Store Line
                    </span>
                    <span className="text-base sm:text-lg font-black tracking-tight">
                      Call: 9493243244
                    </span>
                  </div>
                </a>

                {/* 2. Primary WhatsApp CTA Button */}
                <a
                  id="hero-whatsapp-btn"
                  href="https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20I'm%20contacting%20you%20from%20your%20website.%20I%20need%20details%20about%20aqua%20feed%20and%20chemicals."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-600/35 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                >
                  <div className="relative p-2 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                  </div>
                  <div className="text-left leading-tight">
                    <span className="block text-[11px] uppercase tracking-wider font-bold text-emerald-100">
                      Fast Response
                    </span>
                    <span className="text-base sm:text-lg font-black tracking-tight">
                      WhatsApp Us
                    </span>
                  </div>
                </a>
              </div>

              {/* Secondary Navigation & Alternate Phone Action */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
                <button
                  id="hero-view-products-btn"
                  onClick={() => {
                    onNavigate('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-300 hover:text-emerald-200 py-1 transition-colors group"
                >
                  <span>Explore 20+ Feed & Chemical Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <a
                  href="tel:7075838624"
                  className="text-xs sm:text-sm font-medium text-slate-300 hover:text-sky-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Alt Phone:</span>
                  <strong className="text-white font-bold">7075838624</strong>
                </a>
              </div>

              {/* Micro Trust Pills & Verified Registration */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-slate-300 border-t border-white/10 mt-6">
                <div className="flex items-center gap-1.5">
                  <GstBadgeIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>GSTIN: 37AGHPU5940Q1ZF</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Daily Dispatch: 6:30 AM – 9:00 PM</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Ramayapatnam Rd, Ulavapadu</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Interactive Visual Banner Showcase Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-slate-900/85 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl overflow-hidden group">
                {/* Subtle water caustics texture on card */}
                <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay">
                  <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>

                {/* Visual Tab Switcher: Shrimp Vitality vs Pond Aeration */}
                <div className="relative z-10 flex items-center justify-between p-1 rounded-2xl bg-slate-800/90 border border-white/10 mb-4">
                  <button
                    onClick={() => setHeroActiveTab('shrimp')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      heroActiveTab === 'shrimp'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Shrimp Vitality</span>
                  </button>
                  <button
                    onClick={() => setHeroActiveTab('pond')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      heroActiveTab === 'pond'
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Wind className="w-3.5 h-3.5" />
                    <span>Pond Aeration</span>
                  </button>
                </div>

                {/* Tab 1 Content: Detailed Illustrative Prawn Artwork & Health Metrics with Live Swimming Animation */}
                {heroActiveTab === 'shrimp' && (
                  <div className="relative z-10 space-y-4 animate-in fade-in duration-300">
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 border border-white/10 p-3 flex flex-col items-center">
                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                        {/* Glow halo behind prawn illustration with pulsing animation */}
                        <div className="absolute inset-0 bg-emerald-500/25 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />
                        
                        {/* Floating Micro Oxygen Bubbles inside container */}
                        <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-emerald-300/50 border border-emerald-200/60 animate-bubble-1 pointer-events-none z-20" />
                        <div className="absolute top-12 right-6 w-3.5 h-3.5 rounded-full bg-sky-300/50 border border-sky-200/60 animate-bubble-2 pointer-events-none z-20" />
                        <div className="absolute bottom-8 left-10 w-2.5 h-2.5 rounded-full bg-teal-300/50 border border-teal-200/60 animate-bubble-3 pointer-events-none z-20" />

                        {/* Animated Swimming Prawn Artwork */}
                        <img
                          src={prawnIllustration}
                          alt="Detailed Vannamei prawn biological illustration"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain relative z-10 filter drop-shadow-2xl animate-swim animate-float-gentle hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Biological Callouts overlay */}
                      <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40 text-[10px] font-bold text-emerald-300 flex items-center gap-1.5 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Litopenaeus Vannamei</span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-sky-500/40 text-[10px] font-bold text-sky-300 shadow-md">
                        Target FCR: 1.2 – 1.4
                      </div>
                    </div>

                    {/* Quality Indicators Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors">
                        <span className="text-[10px] text-slate-400 block">Shell Hardness</span>
                        <strong className="text-emerald-300 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>Ionic Ca:Mg Rich</span>
                        </strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors">
                        <span className="text-[10px] text-slate-400 block">Gut Fullness</span>
                        <strong className="text-emerald-300 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>Active Bacillus</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2 Content: Pond Aerator Scenery & Water Parameters with Animated Ripple */}
                {heroActiveTab === 'pond' && (
                  <div className="relative z-10 space-y-4 animate-in fade-in duration-300">
                    <div className="relative rounded-2xl overflow-hidden h-52 border border-white/10 group/pond">
                      <img
                        src={pondAerationBanner}
                        alt="Coastal shrimp aquaculture pond aeration at sunrise"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/pond:scale-105 transition-transform duration-700"
                      />
                      {/* Animated Oxygen Ripples & Splash Glow */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-sky-300/40 animate-radar-pulse pointer-events-none" />
                      <div className="absolute top-6 right-8 w-3 h-3 rounded-full bg-sky-300/60 border border-sky-200 animate-bubble-1 pointer-events-none" />
                      <div className="absolute top-12 left-10 w-2.5 h-2.5 rounded-full bg-emerald-300/60 border border-emerald-200 animate-bubble-2 pointer-events-none" />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[11px] font-bold text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-400/30 inline-block mb-1">
                          Coastal Aquaculture Aeration
                        </span>
                        <p className="text-xs text-white font-medium">
                          Ulavapadu & Ramayapatnam Farm Network
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Dissolved Oxygen</span>
                        <strong className="text-sky-300 font-semibold">&gt; 5.5 ppm maintained</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Emergency DO</span>
                        <strong className="text-sky-300 font-semibold">24/7 Tablet Stocks</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Proprietor Guarantee Footer */}
                <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Proprietor Desk</span>
                    <strong className="text-white text-xs font-semibold">Utukuri Rambabu</strong>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold text-xs"
                  >
                    <span>View Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Highlights / Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 lg:mt-14 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-group">
          <div className="reveal reveal-fade-up reveal-delay-1 group relative overflow-hidden p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-emerald-400/80 transition-all duration-300 flex items-start gap-4">
            {/* Water caustics backdrop */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply overflow-hidden">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            {/* Faint shrimp watermark */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 pointer-events-none opacity-[0.035] group-hover:opacity-[0.08] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 relative z-10 border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">Quality-First Sourcing</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Direct procurement of tested, high-water-stability feeds and certified minerals.
              </p>
            </div>
          </div>

          <div className="reveal reveal-fade-up reveal-delay-2 group relative overflow-hidden p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-sky-400/80 transition-all duration-300 flex items-start gap-4">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply overflow-hidden">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-16 h-16 pointer-events-none opacity-[0.035] group-hover:opacity-[0.08] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>
            <div className="p-3 rounded-xl bg-sky-50 text-sky-600 relative z-10 border border-sky-100">
              <Truck className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-700 transition-colors">Prompt Pond Delivery</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Swift dispatch along Ramayapatnam road & Ulavapadu mandal farming belts.
              </p>
            </div>
          </div>

          <div className="reveal reveal-fade-up reveal-delay-3 group relative overflow-hidden p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-teal-400/80 transition-all duration-300 flex items-start gap-4">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply overflow-hidden">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-16 h-16 pointer-events-none opacity-[0.035] group-hover:opacity-[0.08] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>
            <div className="p-3 rounded-xl bg-teal-50 text-teal-600 relative z-10 border border-teal-100">
              <Droplets className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">Emergency DO & Gas Care</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Instant oxygen tablets and concentrated Yucca kept ready 24/7 for low DO crises.
              </p>
            </div>
          </div>

          <div className="reveal reveal-fade-up reveal-delay-4 group relative overflow-hidden p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-amber-400/80 transition-all duration-300 flex items-start gap-4">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply overflow-hidden">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-16 h-16 pointer-events-none opacity-[0.035] group-hover:opacity-[0.08] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600 relative z-10 border border-amber-100">
              <Award className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">Farmer-First Guidance</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Honest recommendations tailored to your pond salinity, days of culture & biomass.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Vannamei Prawn Health & Biological Nutrition Interactive Showcase */}
      <PrawnHealthShowcase
        onNavigateProducts={() => {
          onNavigate('products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 3. Top Demanded Aqua Products Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              <span>Proven Crop Formulations</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              Top Demanded Feeds & Pond Care
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              High-frequency items trusted by local farmers across Ulavapadu and Ramayapatnam ponds.
            </p>
          </div>

          <button
            onClick={() => {
              onNavigate('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 whitespace-nowrap group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-group">
          {featuredProducts.map((product, idx) => (
            <div
              key={product.id}
              className={`reveal reveal-fade-up ${
                idx === 0
                  ? 'reveal-delay-1'
                  : idx === 1
                  ? 'reveal-delay-2'
                  : idx === 2
                  ? 'reveal-delay-3'
                  : 'reveal-delay-4'
              }`}
            >
              <ProductCard
                product={product}
                onSelect={(id) => onNavigate('product-detail', id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Visual Mid-Page Aquaculture Facility & Warehouse Logistics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="reveal reveal-scale relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 text-white">
          <div className="absolute inset-0 z-0">
            <img
              src={galleryFacilityBanner}
              alt="SR Aqua Feeds warehouse and retail showroom facility"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-50 contrast-110"
            />
            {/* Water texture caustics */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-14 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Modern Retail & Moisture-Controlled Warehouse</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Direct Sourcing. Fast Doorstep Delivery to Pond Bunds.
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Our dedicated facility on Ramayapatnam Road stocks high-protein micro-crumbles, grower feeds, and emergency oxygen tablets with zero moisture damage. Verified batch dispatch within hours.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  onNavigate('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Tour Facility & Warehouse</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs backdrop-blur-sm transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Pond Delivery Route</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust-Building Local Aquaculture Client Feedback Carousel */}
      <FarmerSuccessStories />

      {/* 4. Homepage Cross-Navigation Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold tracking-wider uppercase shadow-xs">
            <Droplets className="w-3.5 h-3.5 text-sky-500" />
            <span>Aquaculture Operations Hub</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Dedicated Service Across Every Touchpoint
          </h2>
          <p className="text-sm text-slate-600">
            Browse our core modules to discover our story, comprehensive aqua products, shop facilities, and contact details.
          </p>
        </div>

        {/* 4 Summary Blocks for About Us, Products, Gallery, and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-group">
          {/* Block 1: About Us Teaser - Slides in from Left */}
          <div className="reveal reveal-slide-left reveal-delay-1 group relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-400/80 transition-all duration-300 flex flex-col justify-between">
            {/* Top subtle aquatic accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            {/* Water caustics texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply overflow-hidden">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            {/* Prawn watermark silhouette */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full border border-emerald-200/50">
                  Proprietor Story
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  About Us & Proprietor Journey
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Founded by <strong>Utukuri Rambabu</strong>, SR Aqua Feeds & Needs has grown rapidly over the last 4 months as a transparent, farmer-first aqua hub in Ulavapadu with full GST compliance and reliable brand partnerships.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 relative z-10">
              <button
                id="home-teaser-about-btn"
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold text-sm group/btn"
              >
                <span>Learn More About Our Story</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Block 2: Products Teaser - Slides in from Right */}
          <div className="reveal reveal-slide-right reveal-delay-2 group relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-sky-400/80 transition-all duration-300 flex flex-col justify-between">
            {/* Top subtle aquatic accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply overflow-hidden">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100 shadow-xs">
                  <Layers className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold text-sky-700 bg-sky-100/60 px-2.5 py-1 rounded-full border border-sky-200/50">
                  Full Catalog
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  Aqua Feeds, Minerals & Chemicals
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Explore our complete inventory of high-FCR Vannamei feeds, essential ionic pond minerals (Ca, Mg, K), benthic soil probiotics, and emergency DO enhancers designed for high survival.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 relative z-10">
              <button
                id="home-teaser-products-btn"
                onClick={() => {
                  onNavigate('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-800 font-bold text-sm group/btn"
              >
                <span>Learn More & View Products</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Block 3: Gallery Teaser - Slides in from Left */}
          <div className="reveal reveal-slide-left reveal-delay-3 group relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-teal-400/80 transition-all duration-300 flex flex-col justify-between">
            {/* Top subtle aquatic accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply overflow-hidden">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-2xl bg-teal-50 text-teal-700 border border-teal-100 shadow-xs">
                  <ImageIcon className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold text-teal-700 bg-teal-100/60 px-2.5 py-1 rounded-full border border-teal-200/50">
                  Inside Our Store
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Shop Interior & Warehouse Facility
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Take a visual tour of our clean retail showroom on Ramayapatnam Road, moisture-controlled feed stacks, bulk mineral bays, and customer consultation counter.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 relative z-10">
              <button
                id="home-teaser-gallery-btn"
                onClick={() => {
                  onNavigate('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-bold text-sm group/btn"
              >
                <span>Learn More & View Gallery</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Block 4: Contact Teaser - Slides in from Right */}
          <div className="reveal reveal-slide-right reveal-delay-4 group relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-400/80 transition-all duration-300 flex flex-col justify-between">
            {/* Top subtle aquatic accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply overflow-hidden">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-xs">
                  <MessageCircle className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full border border-emerald-200/50">
                  Direct Farmer Support
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Contact Us & Map Directions
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Reach out directly via phone or WhatsApp at <strong>9493243244</strong> or <strong>7075838624</strong>. View our exact Google Maps coordinates in Chakicherla Peddapattapu Palem.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 relative z-10">
              <button
                id="home-teaser-contact-btn"
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold text-sm group/btn"
              >
                <span>Learn More & Contact Details</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 Dedicated Farmer Inquiry Desk & Rapid Quotation on Homepage */}
      <section id="homepage-inquiry-desk" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal-group">
          {/* Left Column: Direct Consultation Reassurance */}
          <div className="reveal reveal-slide-left lg:col-span-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-white/10 shadow-xl relative overflow-hidden">
            {/* Water caustics texture */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 pointer-events-none opacity-10">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain filter invert" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Quotation & Advisory</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Get Bulk Feed Rates & Direct Pond Delivery
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Whether you need a 10-bag grower feed refill, urgent dissolved oxygen tablets, or water parameter calculation, submit your inquiry here for an instant quotation directly from Utukuri Rambabu.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Doorstep delivery to Ulavapadu, Ramayapatnam & Nellore</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Complimentary water testing at Ramayapatnam Road store</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Transparent GST invoices for every single batch</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 relative z-10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Direct Helpline:</span>
                <a href="tel:9493243244" className="text-emerald-400 font-bold hover:underline">
                  +91 94932 43244
                </a>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Response Time:</span>
                <span className="text-sky-300 font-semibold">&lt; 20 Minutes (8 AM – 9 PM)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Reusable Inquiry Form */}
          <div className="reveal reveal-slide-right lg:col-span-7">
            <InquiryForm
              title="Request a Crop Quote or Pond Advice"
              subtitle="Submit your requirements below to instantly launch the message on WhatsApp or send via Email."
            />
          </div>
        </div>
      </section>

      {/* 5. Direct Pond-Side Advisory & Order Callout with Coastal Pond Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-emerald-800">
          {/* Real Aquaculture Aeration Pond Photo Background - UNMASKED & BRIGHT */}
          <div className="absolute inset-0 z-0">
            <img
              src={pondAerationBanner}
              alt="Coastal shrimp aquaculture pond aeration"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-100 contrast-105"
            />
            {/* Clean water caustics texture shimmer overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            {/* Subtle soft gradient only behind text for crisp readability without masking the photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              <span>Farmer Advisory Service</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Facing sudden pond water issues or need bulk feed supply?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Whether you are observing low dissolved oxygen, high ammonia spikes, molting cramps, or planning your feed requirement for the upcoming week — connect directly with Utukuri Rambabu for transparent guidance and batch delivery.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/919493243244?text=Hi%20Utukuri%20Rambabu%2C%20I%20need%20urgent%20guidance%20for%20my%20shrimp%20pond."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-5 h-5 text-slate-950" />
                <span>Instant WhatsApp Advisory</span>
              </a>

              <a
                href="tel:9493243244"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 hover:border-white/60 bg-white/10 text-white font-bold text-sm backdrop-blur-xs transition-all active:scale-95"
              >
                <PhoneCallIcon className="w-4 h-4 text-emerald-300" />
                <span>Call Proprietor Directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Top Aquaculture FAQs on Home Page with direct link to full library on Contact Page */}
      <ProductFarmingFAQ
        limit={3}
        showViewAllButton={true}
        onNavigate={onNavigate}
      />
    </div>
  );
};
