import React from 'react';
import { WhatsAppIcon, PhoneCallIcon, EmailIcon, GstBadgeIcon } from '../components/Icons.tsx';
import { MapPin, Clock, Truck, Droplets, Sparkles, Navigation, Phone } from 'lucide-react';
import { InquiryForm } from '../components/InquiryForm.tsx';
import { ProductFarmingFAQ } from '../components/ProductFarmingFAQ.tsx';

import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';
import contactSupportBanner from '../assets/images/contact_support_banner_1790110315472.jpg';

export const ContactPage: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 pt-8 pb-16 sm:pb-24">
      {/* 1. Unique Animated Coastal Dispatch & Live GPS Radar Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-white/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={contactSupportBanner}
              alt="Coastal pond aeration and customer support scenery"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-105 scale-105"
            />
            {/* Clean water caustics overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            {/* Soft left gradient only behind text for legibility, no dark blanket mask */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/35 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Prompt Farmer Communication & Pond Dispatch</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Connect Directly with Utukuri Rambabu
              </h1>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Whether you need early morning feed loading at our Ulavapadu showroom or urgent midnight pond delivery of oxygen tablets & gas binders, our team is always within reach.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="tel:9493243244"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 9493243244</span>
                </a>

                <a
                  href="https://wa.me/919493243244?text=Hi%20Utukuri%20Rambabu%2C%20I%20am%20reaching%20out%20from%20your%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold border border-emerald-400/40 shadow-md transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp Utukuri Rambabu</span>
                </a>
              </div>
            </div>

            {/* Bespoke Thematic Showcase: Animated Live Coastal Dispatch Route & GPS Radar Beacon */}
            <div className="relative flex-shrink-0 w-72 sm:w-80 flex items-center justify-center reveal reveal-slide-right">
              {/* Outer Animated Compass & Navigation Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-emerald-400/35 animate-spin-slow pointer-events-none" />

              {/* Concentric Animated Radar Sweep */}
              <div className="absolute inset-4 rounded-full border border-sky-400/25 animate-radar-pulse pointer-events-none" />

              {/* Pulsing Beacon Glow */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-emerald-500/25 via-teal-500/20 to-sky-500/15 blur-2xl pointer-events-none animate-pulse-glow" />

              {/* Central Glass Radar Console */}
              <div className="relative z-10 w-full rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/20 p-5 shadow-2xl space-y-3.5">
                {/* Radar Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
                      <span className="absolute w-5 h-5 rounded-full border border-emerald-400 animate-beacon-ping" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                      Live Dispatch Radar
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    Online
                  </span>
                </div>

                {/* Animated Interactive SVG Coastal Delivery Route */}
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-aqua-pattern opacity-10 pointer-events-none" />

                  <svg className="w-full h-24 overflow-visible" viewBox="0 0 240 90">
                    <path
                      d="M 25 70 Q 75 15, 140 45 T 215 25"
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    <path
                      d="M 25 70 Q 75 15, 140 45 T 215 25"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="4"
                      strokeDasharray="8 8"
                      strokeLinecap="round"
                      className="animate-route-dash"
                    />

                    <g transform="translate(25, 70)">
                      <circle r="7" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.5" />
                      <circle r="3" fill="#38bdf8" />
                      <text x="-4" y="18" fill="#94a3b8" fontSize="8" fontWeight="bold">Depot</text>
                    </g>

                    <g transform="translate(130, 40)">
                      <circle r="5" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                      <circle r="2" fill="#34d399" />
                      <text x="-16" y="-10" fill="#94a3b8" fontSize="8">Coastal Rd</text>
                    </g>

                    <g transform="translate(215, 25)">
                      <circle r="9" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-beacon-ping" />
                      <circle r="6" fill="#10b981" />
                      <text x="-18" y="18" fill="#34d399" fontSize="8" fontWeight="bold">Pond Site</text>
                    </g>

                    <g transform="translate(140, 45)">
                      <circle r="3" fill="#38bdf8" className="animate-ping" />
                    </g>
                  </svg>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Truck className="w-3 h-3 text-emerald-400" />
                      Transit Active
                    </span>
                    <span>ETA &lt; 45 Mins</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-slate-400 block">Covered Radius</span>
                    <strong className="text-white font-mono">35 km Coast</strong>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-slate-400 block">Dispatch Lead</span>
                    <strong className="text-emerald-400 font-mono">Immediate</strong>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 z-20 px-3 py-1 rounded-xl bg-slate-900/95 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1 animate-float-gentle">
                <Navigation className="w-3 h-3 text-emerald-400" />
                <span>GPS Monitored</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct Channels Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-group">
          {/* Card 1: Primary Phone Call */}
          <div className="reveal reveal-fade-up reveal-delay-1 group relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
                <PhoneCallIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Direct Calling
              </span>
              <div className="space-y-1">
                <a
                  href="tel:9493243244"
                  className="font-display font-bold text-lg text-slate-900 hover:text-emerald-700 block transition-colors"
                >
                  9493243244
                </a>
                <a
                  href="tel:7075838624"
                  className="font-display font-medium text-sm text-slate-600 hover:text-emerald-700 block transition-colors"
                >
                  7075838624 (Alt)
                </a>
                <p className="text-xs text-slate-500 pt-1">
                  Immediate proprietor consultation with Utukuri Rambabu
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 relative z-10">
              <a
                href="tel:9493243244"
                className="w-full inline-block py-2 text-center rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs transition-colors"
              >
                Call Primary Mobile
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="reveal reveal-fade-up reveal-delay-2 group relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Instant WhatsApp
              </span>
              <div className="space-y-1">
                <strong className="font-display font-bold text-lg text-slate-900 block">
                  +91 94932 43244
                </strong>
                <p className="text-xs text-slate-500">
                  Send feed bag requirements, pond photos, or salinity reports
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 relative z-10">
              <a
                href="https://wa.me/919493243244?text=Hi%20Utukuri%20Rambabu%2C%20I%20am%20checking%20feed%20availability%20and%20prices."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block py-2 text-center rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Start WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Card 3: Email Support */}
          <div className="reveal reveal-fade-up reveal-delay-3 group relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-2xs">
                <EmailIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Official Email
              </span>
              <div className="space-y-1">
                <a
                  href="mailto:rams34333@gmail.com"
                  className="font-display font-semibold text-base text-slate-900 hover:text-amber-700 block transition-colors break-all"
                >
                  rams34333@gmail.com
                </a>
                <p className="text-xs text-slate-500">
                  For formal quotation requests & supplier bills
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 relative z-10">
              <a
                href="mailto:rams34333@gmail.com?subject=Aquaculture%20Inquiry%20-%20SR%20Aqua%20Feeds"
                className="w-full inline-block py-2 text-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* Card 4: Shop Hours & Business Identity */}
          <div className="reveal reveal-fade-up reveal-delay-4 group relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shadow-2xs">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Daily Shop Timings
              </span>
              <div className="space-y-1">
                <strong className="font-display font-bold text-base text-slate-900 block">
                  6:30 AM – 9:00 PM
                </strong>
                <p className="text-xs text-slate-500">
                  Open all 7 days for early morning pond feeding cycles
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 text-xs font-medium text-emerald-700 flex items-center gap-1.5 relative z-10">
              <GstBadgeIcon className="w-4 h-4" />
              <span>GST: 37AGHPU5940Q1ZF</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Coastal Route & Emergency Delivery Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 text-white">
          <div className="absolute inset-0 z-0">
            <img
              src={contactSupportBanner}
              alt="Coastal delivery route and emergency aqua supplies"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-50 contrast-110"
            />
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-14 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Road Connectivity · Farm Gate Delivery</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Located Centrally on Ramayapatnam Road for Instant Pond Access
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Serving shrimp ponds across Chakicherla, Ulavapadu, Singarayakonda, and coastal Nellore. When oxygen levels dip or you need immediate probiotic refills, our dispatch reaches your pond embankments with zero delay.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="tel:9493243244"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <PhoneCallIcon className="w-4 h-4 text-slate-950" />
                <span>Urgent Delivery Helpline</span>
              </a>
              <a
                href="https://wa.me/919493243244?text=Hi%20Utukuri%20Rambabu%2C%20I%20need%20urgent%20supplies%20at%20my%20pond."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs backdrop-blur-sm transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span>Share Pond Location</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Inquiry Form + Google Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 reveal-group">
          {/* Left: Reusable Farmer Inquiry Form */}
          <div className="reveal reveal-slide-left lg:col-span-6">
            <InquiryForm />
          </div>

          {/* Right: Address & Google Maps Embed - Slides from Right */}
          <div className="reveal reveal-slide-right group relative overflow-hidden lg:col-span-6 flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-teal-400 opacity-60" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/70 text-sky-800 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>Store Location</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Ramayapatnam Road, Ulavapadu
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>SR Aqua Feeds & Needs</strong>
                <br />
                Chakicherla Peddapattapu Palem, Ulavapadu (Mandal), Ramayapatnam Road, SPSR Nellore District, Andhra Pradesh – 523292
              </p>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100 shadow-inner z-10">
              <iframe
                title="SR Aqua Feeds & Needs Location Map"
                src="https://maps.google.com/maps?q=Chakicherla,Ulavapadu,Nellore,Andhra+Pradesh,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs relative z-10">
              <div>
                <span className="text-slate-500 block">Pin Code:</span>
                <strong className="text-slate-900 font-bold">523292 (Nellore Dist)</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Transport:</span>
                <span className="text-emerald-700 font-semibold">Direct Road Access</span>
              </div>
              <a
                href="https://maps.google.com/?q=Chakicherla,Ulavapadu,Nellore,Andhra+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-sky-700 hover:text-sky-800"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive Aquaculture Knowledge Base & FAQ at Bottom of Contact Page */}
      <ProductFarmingFAQ />
    </div>
  );
};
