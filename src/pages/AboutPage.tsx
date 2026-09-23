import React from 'react';
import { PageType } from '../types.ts';
import { BrandLogo } from '../components/BrandLogo.tsx';
import { WhatsAppIcon, PhoneCallIcon, GstBadgeIcon } from '../components/Icons.tsx';
import {
  ShieldCheck,
  Target,
  Compass,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Calendar,
  MapPin,
  ArrowRight,
  Droplets,
  Sparkles,
} from 'lucide-react';

// Visual assets
import heroPrawnBanner from '../assets/images/hero_prawn_banner_1790103831232.jpg';
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';
import prawnPatternBg from '../assets/images/prawn_pattern_bg_1790103865798.jpg';
import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import aboutFarmBanner from '../assets/images/about_farm_banner_1790110278351.jpg';
import pondAerationBanner from '../assets/images/pond_aeration_banner_1790103885278.jpg';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const values = [
    {
      title: 'Trust & Transparency',
      desc: 'Transparent product batch numbers, unmanipulated expiry dates, and fair wholesale pricing without hidden charges or unfair markups.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50',
    },
    {
      title: 'Quality-First Sourcing',
      desc: 'Partnering exclusively with certified feed millers and biotech chemical manufacturers to guarantee high water stability and active CFU counts.',
      icon: <Award className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-50',
    },
    {
      title: 'Farmer-First Service',
      desc: 'We put the farmer’s harvest profit before short-term sales. If your pond doesn’t need a costly additive, we honestly advise you against it.',
      icon: <HeartHandshake className="w-6 h-6 text-teal-600" />,
      bg: 'bg-teal-50',
    },
    {
      title: 'Consistency & Reliability',
      desc: 'Dependable inventory ready on Ramayapatnam Road — so your pond feeding cycle is never disrupted by delayed stocks or missing minerals.',
      icon: <CheckCircle2 className="w-6 h-6 text-indigo-600" />,
      bg: 'bg-indigo-50',
    },
    {
      title: 'Community Growth',
      desc: 'Our success is tied directly to the prosperity of local shrimp and prawn farmers in Ulavapadu mandal and the coastal Nellore community.',
      icon: <Users className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50',
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-14 pt-8 pb-12 sm:pb-16">
      {/* 1. Unique Animated Heritage & Farmer Trust Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-14 shadow-2xl border border-white/10">
          {/* Coastal shrimp aquaculture pond at sunrise background with caustics and tidal drift - UNMASKED */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={aboutFarmBanner}
              alt="Coastal shrimp aquaculture pond at sunrise"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-105 scale-105 animate-tide-drift"
            />
            {/* Clean water caustics overlay with subtle shimmer */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            {/* Soft left gradient only behind text for legibility, no dark blanket mask */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/35 to-transparent pointer-events-none" />

            {/* Rising Animated Oxygen Micro-Bubbles */}
            <div className="absolute bottom-6 left-1/4 w-3.5 h-3.5 rounded-full bg-emerald-300/40 border border-emerald-200/50 animate-bubble-1 pointer-events-none" />
            <div className="absolute bottom-10 right-1/3 w-4 h-4 rounded-full bg-sky-300/40 border border-sky-200/50 animate-bubble-2 pointer-events-none" />
            <div className="absolute bottom-14 left-1/3 w-3 h-3 rounded-full bg-amber-300/30 border border-amber-200/40 animate-bubble-3 pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4 Months of High-Growth Momentum</span>
                </span>
                <span className="hidden sm:inline text-slate-400">·</span>
                <span className="hidden sm:inline text-slate-300">Ulavapadu Regional Hub</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Rooted in Pond Experience. Dedicated to Farmer Prosperity.
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                SR Aqua Feeds & Needs was founded by <strong className="text-white">Utukuri Rambabu</strong> to deliver honest pond-side support, unadulterated feed batches, and certified water treatments to coastal shrimp farmers along Ramayapatnam Road.
              </p>

              {/* Verified Trust Strip */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <span className="text-[11px] text-slate-400 block font-medium">GST Registered</span>
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>37AGHPU5940Q1ZF</span>
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <span className="text-[11px] text-slate-400 block font-medium">Farm Gate Network</span>
                  <span className="text-xs font-bold text-sky-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                    <span>+40 Ponds Advised</span>
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <span className="text-[11px] text-slate-400 block font-medium">Stock Assurance</span>
                  <span className="text-xs font-bold text-teal-300 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                    <span>100% Genuine Batches</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bespoke Thematic Showcase: Animated Pond Stewardship & Water Telemetry Console */}
            <div className="relative flex-shrink-0 w-72 sm:w-80 flex items-center justify-center">
              {/* Outer Rotating Compass & Stewardship Orbital Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-emerald-400/35 animate-spin-slow pointer-events-none" />

              {/* Concentric Biological Pulse Wave */}
              <div className="absolute inset-4 rounded-full border border-sky-400/25 animate-radar-pulse pointer-events-none" />

              {/* Golden-Emerald Sunrise Vitality Aura */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-emerald-500/25 via-teal-400/20 to-amber-500/15 blur-2xl pointer-events-none animate-pulse-glow" />

              {/* Central Glass Telemetry Console */}
              <div className="relative z-10 w-full rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/20 p-5 shadow-2xl space-y-4">
                {/* Console Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                      Pond-Side Telemetry
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    Live Standards
                  </span>
                </div>

                {/* Animated Pond Water Parameter Stability Gauges */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Dissolved O₂</span>
                      <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-extrabold text-white font-mono">≥ 5.8</span>
                      <span className="text-[10px] text-sky-300 font-bold">ppm</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-sky-400 h-full rounded-full w-[85%]" />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Water Salinity</span>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-extrabold text-white font-mono">14 – 18</span>
                      <span className="text-[10px] text-emerald-300 font-bold">ppt</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full w-[78%]" />
                    </div>
                  </div>
                </div>

                {/* Founder Integrity Guarantee Strip */}
                <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-white block font-semibold">Utukuri Rambabu</strong>
                    <span className="text-[11px] text-emerald-300/90">Personal pond inspection & dosage advice</span>
                  </div>
                </div>

                {/* Floating Tag Attached to Console */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Certified Feed Bags Only
                  </span>
                  <span>Ulavapadu, AP</span>
                </div>
              </div>

              {/* Floating Badge (Top Left) */}
              <div className="absolute -top-3 -left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-float-gentle">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Adulteration Guarantee</span>
              </div>

              {/* Floating Badge (Bottom Right) */}
              <div className="absolute -bottom-3 -right-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-sky-400/40 text-sky-300 text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-float-reverse">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>Direct Pond Bund Visits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Proprietor Story & Rapid Positive Momentum */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Visual Proprietor & Establishment Card - Slides from Left */}
          <div className="lg:col-span-5 reveal reveal-slide-left">
            <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
              {/* Subtle water caustics overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply overflow-hidden">
                <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              {/* Faint shrimp watermark */}
              <div className="absolute -bottom-6 -right-6 w-36 h-36 pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-sky-600 text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-md border border-white/20">
                  UR
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Utukuri Rambabu
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                    Proprietor & Founder
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    SR Aqua Feeds & Needs
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 backdrop-blur-xs border border-slate-100 space-y-3 text-xs text-slate-700 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Business Setup:</span>
                  <span className="font-semibold text-slate-900">Sole Proprietorship</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">GST Registration:</span>
                  <span className="font-mono font-bold text-emerald-700">37AGHPU5940Q1ZF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Operational Track:</span>
                  <span className="font-semibold text-sky-700">4 Months (Rapid Growth)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Primary Hub:</span>
                  <span className="font-semibold text-slate-900">Ulavapadu, Nellore Dist.</span>
                </div>
              </div>

              {/* Quotation from Rambabu */}
              <div className="relative pl-4 border-l-2 border-emerald-500 italic text-slate-600 text-xs sm:text-sm leading-relaxed z-10">
                &ldquo;Every farmer invests their hard-earned capital into shrimp farming. Our duty at SR Aqua is to ensure every bag of feed and every bottle of probiotic is 100% genuine and helps them harvest healthy crops with maximum profit.&rdquo;
              </div>

              <div className="pt-2 flex flex-col gap-2 relative z-10">
                <a
                  href="tel:9493243244"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <PhoneCallIcon className="w-4 h-4" />
                  <span>Call Utukuri Rambabu (9493243244)</span>
                </a>
                <a
                  href="https://wa.me/919493243244?text=Hello%20Utukuri%20Rambabu%20garu%2C%20I%20would%20like%20to%20consult%20with%20you%20regarding%20my%20aqua%20farm."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-7 space-y-6 reveal reveal-slide-right">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-bold text-emerald-700 tracking-wider uppercase">
                <Droplets className="w-3.5 h-3.5 text-sky-500" />
                <span>The Story Behind SR Aqua</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                Fresh Energy & Dependable Service in Andhra’s Aqua Heart
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Located along the strategic Ramayapatnam coastal aquaculture belt in Ulavapadu mandal, <strong>SR Aqua Feeds & Needs</strong> was founded 4 months ago by <strong>Utukuri Rambabu</strong> to address a critical need for local farmers: easy, immediate access to fresh, uncompromised shrimp feed and fast-acting pond care solutions.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              In just 4 months of active operation, our retail shop has established quick trust among progressive shrimp growers across Chakicherla Peddapattapu Palem and surrounding villages. We keep overheads honest, maintain transparent pricing, and personally inspect every batch of incoming stock so farmers never face compromised yields.
            </p>

            {/* 3 Pillars Highlight with Water Texture */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="relative overflow-hidden p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply">
                  <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <span className="font-display font-extrabold text-2xl text-emerald-700 block relative z-10">
                  100%
                </span>
                <strong className="text-xs font-bold text-slate-900 block mt-1 relative z-10">
                  Sealed Factory Batches
                </strong>
                <span className="text-[11px] text-slate-500 mt-0.5 block relative z-10">
                  Zero loose or tampered items
                </span>
              </div>

              <div className="relative overflow-hidden p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply">
                  <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <span className="font-display font-extrabold text-2xl text-sky-700 block relative z-10">
                  4 Mos
                </span>
                <strong className="text-xs font-bold text-slate-900 block mt-1 relative z-10">
                  Fast Growth Track
                </strong>
                <span className="text-[11px] text-slate-500 mt-0.5 block relative z-10">
                  Trusted by dozens of farms
                </span>
              </div>

              <div className="relative overflow-hidden p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply">
                  <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <span className="font-display font-extrabold text-2xl text-teal-700 block relative z-10">
                  7 Days
                </span>
                <strong className="text-xs font-bold text-slate-900 block mt-1 relative z-10">
                  Dawn to Dusk Open
                </strong>
                <span className="text-[11px] text-slate-500 mt-0.5 block relative z-10">
                  6:30 AM to 9:00 PM daily
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards with Water Caustics Shimmer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-group">
          {/* Vision - Slides in from Left */}
          <div className="reveal reveal-slide-left relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white p-8 sm:p-10 shadow-lg border border-emerald-800 flex flex-col justify-between group">
            <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 pointer-events-none opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain filter invert" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/20">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Our Vision</h3>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                To become the most trusted local partner for aquaculture farmers by delivering reliable, high-quality feed and farm-care solutions that support sustainable and profitable shrimp and prawn farming.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-emerald-800/80 text-xs text-emerald-300 relative z-10">
              Sustainable · Profitable · Farmer-Partnered
            </div>
          </div>

          {/* Mission - Slides in from Right */}
          <div className="reveal reveal-slide-right relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-950 via-slate-950 to-emerald-950 text-white p-8 sm:p-10 shadow-lg border border-sky-800 flex flex-col justify-between group">
            <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 pointer-events-none opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain filter invert" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center border border-sky-400/20">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Our Mission</h3>
              <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
                To supply farmers with a complete, dependable range of feed, minerals, probiotics, and pond-care products — backed by honest guidance and prompt service.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-sky-800/80 text-xs text-sky-300 relative z-10">
              Honest Guidance · Prompt Delivery · Complete Range
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values (All 5 Mandated) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold tracking-wider uppercase shadow-xs">
            <Droplets className="w-3.5 h-3.5 text-sky-500" />
            <span>Our Aquaculture Creed</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Core Values Guiding Every Interaction
          </h2>
          <p className="text-sm text-slate-600">
            Every feed recommendation, price quotation, and product we dispatch is governed by these non-negotiable principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-group">
          {values.map((v, idx) => (
            <div
              key={idx}
              className={`reveal reveal-fade-up reveal-delay-${idx + 1} group relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-400/80 transition-all duration-300 flex flex-col justify-between`}
            >
              {/* Subtle water caustics overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply overflow-hidden">
                <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              {/* Faint prawn watermark */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none opacity-[0.035] group-hover:opacity-[0.08] transition-opacity">
                <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
              </div>

              <div className="space-y-3 relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${v.bg} flex items-center justify-center border border-slate-100`}>
                  {v.icon}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}

          {/* 6th Card: Trust & Compliance Callout */}
          <div className="group relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-sky-50 border border-emerald-200 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-emerald-700 border border-emerald-100">
                <GstBadgeIcon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg">
                GST Compliant & Transparent
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Registered GSTIN: <span className="font-mono font-bold text-slate-900">37AGHPU5940Q1ZF</span>. Complete tax invoice with every bulk feed and chemical order for complete transparency.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200/60 relative z-10">
              <button
                onClick={() => {
                  onNavigate('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>Browse Products Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Coastal Aquaculture Partnership Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 border border-emerald-500/30 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img
              src={pondAerationBanner}
              alt="Coastal shrimp aquaculture pond aeration"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-50"
            />
            <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-emerald-950/90 to-slate-950/80" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pond-Side Partnership Guarantee</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Ready to partner with SR Aqua Feeds & Needs?
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Visit our shop on Ramayapatnam Road or connect directly with Utukuri Rambabu for honest pond diagnostics, fair bulk pricing, and scheduled feeding dispatches.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3.5 flex-shrink-0">
              <a
                href="tel:9493243244"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <PhoneCallIcon className="w-4 h-4 text-slate-950" />
                <span>Call: 9493243244</span>
              </a>
              <a
                href="https://wa.me/919493243244"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs backdrop-blur-sm transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Rambabu</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
