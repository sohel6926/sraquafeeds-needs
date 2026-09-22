import React, { useState } from 'react';
import { WhatsAppIcon, PhoneCallIcon, EmailIcon, GstBadgeIcon } from '../components/Icons.tsx';
import { MapPin, Clock, AlertTriangle, Send, CheckCircle2, ShieldCheck, Droplets, Truck, Sparkles, Navigation, Radio, Phone } from 'lucide-react';

import pondAerationBanner from '../assets/images/pond_aeration_banner_1790103885278.jpg';
import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';
import contactSupportBanner from '../assets/images/contact_support_banner_1790110315472.jpg';

export const ContactPage: React.FC = () => {
  const [farmerName, setFarmerName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [topic, setTopic] = useState('Feed Bulk Order');
  const [message, setMessage] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = `Hi SR Aqua Feeds & Needs,%0A%0A*Name:* ${encodeURIComponent(farmerName || 'Farmer')}%0A*Phone:* ${encodeURIComponent(phone || 'Not provided')}%0A*Village/Mandal:* ${encodeURIComponent(village || 'Ulavapadu area')}%0A*Topic:* ${encodeURIComponent(topic)}%0A*Message:* ${encodeURIComponent(message || 'I need details regarding aqua feed and chemicals.')}`;
    window.open(`https://wa.me/919493243244?text=${formattedText}`, '_blank');
    setSubmittedStatus('Inquiry opened in WhatsApp! Utukuri Rambabu will respond promptly.');
  };

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Aquaculture Inquiry: ${topic} - ${farmerName || 'Farmer'}`);
    const body = encodeURIComponent(
      `Name: ${farmerName}\nPhone: ${phone}\nVillage/Mandal: ${village}\nTopic: ${topic}\n\nMessage:\n${message}\n\nSent via SR Aqua Feeds website.`
    );
    window.location.href = `mailto:rams34333@gmail.com?subject=${subject}&body=${body}`;
    setSubmittedStatus('Inquiry opened in your email app.');
  };

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
              className="w-full h-full object-cover object-center filter brightness-45 contrast-115 scale-105"
            />
            {/* Clean water caustics overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-emerald-950/70" />

            {/* Rising Animated Water Bubbles */}
            <div className="absolute bottom-6 left-1/4 w-3.5 h-3.5 rounded-full bg-emerald-300/40 border border-emerald-200/50 animate-bubble-1 pointer-events-none" />
            <div className="absolute bottom-10 right-1/3 w-4 h-4 rounded-full bg-sky-300/40 border border-sky-200/50 animate-bubble-2 pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Live Farmer Dispatch & Hotline</span>
                </span>
                <span className="hidden sm:inline text-slate-400">·</span>
                <span className="hidden sm:inline text-slate-300">Coastal Andhra Corridor</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Pond Bund Delivery & Immediate Farmer Support
              </h1>

              <p className="text-slate-300 text-base leading-relaxed">
                Located right on Ramayapatnam Road, minutes away from the coastal aquaculture ponds of Ulavapadu and Nellore. Fast feed delivery, emergency oxygen support, and direct pond-side consultations with <strong className="text-white">Utukuri Rambabu</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Open 6:30 AM – 9:00 PM Daily</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>Ramayapatnam Rd, Ulavapadu</span>
                </div>
              </div>

              {/* Instant Call & WhatsApp Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="tel:9493243244"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 9493243244</span>
                </a>
                <a
                  href="https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds,%20I%20need%20urgent%20feed/chemical%20support%20for%20my%20pond."
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
            <div className="relative flex-shrink-0 w-72 sm:w-80 flex items-center justify-center">
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
                  {/* Subtle map grid background */}
                  <div className="absolute inset-0 bg-aqua-pattern opacity-10 pointer-events-none" />

                  <svg className="w-full h-24 overflow-visible" viewBox="0 0 240 90">
                    {/* Background Route Path */}
                    <path
                      d="M 25 70 Q 75 15, 140 45 T 215 25"
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Animated Traveling Route Pulse */}
                    <path
                      d="M 25 70 Q 75 15, 140 45 T 215 25"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="4"
                      strokeDasharray="8 8"
                      strokeLinecap="round"
                      className="animate-route-dash"
                    />

                    {/* Waypoint 1: Ulavapadu Depot Hub */}
                    <g transform="translate(25, 70)">
                      <circle r="7" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.5" />
                      <circle r="3" fill="#38bdf8" />
                      <text x="-4" y="18" fill="#94a3b8" fontSize="8" fontWeight="bold">Depot</text>
                    </g>

                    {/* Waypoint 2: Ramayapatnam Coastal Junction */}
                    <g transform="translate(130, 40)">
                      <circle r="5" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                      <circle r="2" fill="#34d399" />
                      <text x="-16" y="-10" fill="#94a3b8" fontSize="8">Coastal Rd</text>
                    </g>

                    {/* Waypoint 3: Pond Embankment (Destination) with Pulse Beacon */}
                    <g transform="translate(215, 25)">
                      <circle r="9" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-beacon-ping" />
                      <circle r="7" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                      <circle r="3" fill="#10b981" />
                      <text x="-16" y="20" fill="#34d399" fontSize="8" fontWeight="bold">Pond Gate</text>
                    </g>
                  </svg>

                  {/* Route Info Pill */}
                  <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Truck className="w-3 h-3" />
                      Same-Day Van Dispatch
                    </span>
                    <span className="text-slate-400 font-mono">15–45 min delivery</span>
                  </div>
                </div>

                {/* Response & Hours Telemetry Strip */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                    <span className="text-[10px] text-slate-400 block">Typical Response</span>
                    <span className="font-extrabold text-white font-mono">&lt; 5 Minutes</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                    <span className="text-[10px] text-slate-400 block">Emergency O₂</span>
                    <span className="font-extrabold text-emerald-300 font-mono">In-Stock Now</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge (Top Left) */}
              <div className="absolute -top-3 -left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-float-gentle">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Open 6:30 AM – 9:00 PM</span>
              </div>

              {/* Floating Badge (Bottom Right) */}
              <div className="absolute -bottom-3 -right-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-sky-400/40 text-sky-300 text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-float-reverse">
                <Truck className="w-3.5 h-3.5 text-sky-400" />
                <span>Pond Bund Delivery Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Important Payments Security Warning Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 text-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply">
            <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 flex-shrink-0 mt-0.5 shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-950 text-base flex items-center gap-2">
                <span>Official Payments & Billing Advisory</span>
                <span className="text-[11px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full uppercase font-bold">
                  Important
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                All digital transactions, UPI payments, and billing confirmations are handled <strong className="text-slate-950 underline">EXCLUSIVELY via 9493243244</strong> (Utukuri Rambabu). Please do not entertain payment requests from unauthorized third-party numbers.
              </p>
            </div>
          </div>

          <a
            href="tel:9493243244"
            className="relative z-10 whitespace-nowrap px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors"
          >
            Verify Payment Desk
          </a>
        </div>
      </section>

      {/* 3. Contact Detail Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Primary Call & WhatsApp */}
          <div className="group relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Primary Phone & WhatsApp
              </span>
              <div className="space-y-1">
                <a
                  href="tel:9493243244"
                  className="font-display font-extrabold text-xl text-slate-900 hover:text-emerald-700 block transition-colors"
                >
                  9493243244
                </a>
                <p className="text-xs text-slate-500">
                  Direct Line: Utukuri Rambabu (Proprietor)
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex gap-2 relative z-10">
              <a
                id="contact-card-call-1"
                href="tel:9493243244"
                className="flex-1 py-2 text-center rounded-xl bg-sky-50 text-sky-700 font-bold text-xs hover:bg-sky-100 transition-colors"
              >
                Call
              </a>
              <a
                id="contact-card-wa-1"
                href="https://wa.me/919493243244?text=Hi%20Utukuri%20Rambabu%2C%20I'm%20contacting%20from%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Card 2: Secondary Phone Desk */}
          <div className="group relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 shadow-2xs">
                <PhoneCallIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                Secondary Call / WhatsApp
              </span>
              <div className="space-y-1">
                <a
                  href="tel:7075838624"
                  className="font-display font-extrabold text-xl text-slate-900 hover:text-sky-700 block transition-colors"
                >
                  7075838624
                </a>
                <p className="text-xs text-slate-500">
                  Store Desk & Dispatch Coordination
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex gap-2 relative z-10">
              <a
                id="contact-card-call-2"
                href="tel:7075838624"
                className="flex-1 py-2 text-center rounded-xl bg-sky-50 text-sky-700 font-bold text-xs hover:bg-sky-100 transition-colors"
              >
                Call
              </a>
              <a
                id="contact-card-wa-2"
                href="https://wa.me/917075838624?text=Hi%20SR%20Aqua%20Feeds%2C%20I'm%20contacting%20regarding%20store%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Card 3: Email Support */}
          <div className="group relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
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
          <div className="group relative overflow-hidden p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Form (Mailto / WhatsApp composer) */}
          <div className="group relative overflow-hidden lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-60" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
              <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                <span>Farmer Inquiry Desk</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mt-1">
                Send an Inquiry or Request a Quote
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your details below. You can immediately launch the message on WhatsApp or send via Email.
              </p>
            </div>

            {submittedStatus && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 relative z-10">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{submittedStatus}</span>
              </div>
            )}

            <form className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name / Farm Name *
                  </label>
                  <input
                    id="contact-farmer-name"
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder="e.g., Venkat Rao"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="contact-farmer-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Village / Mandal *
                  </label>
                  <input
                    id="contact-farmer-village"
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g., Ulavapadu / Ramayapatnam"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Topic of Inquiry
                  </label>
                  <select
                    id="contact-inquiry-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>Feed Bulk Order (Vannamei/Fish)</option>
                    <option>Pond Minerals & Buffers</option>
                    <option>Probiotics & Soil Sludge Control</option>
                    <option>Emergency DO / Oxygen Tablets</option>
                    <option>Ammonia & Toxic Gas Reducer</option>
                    <option>Payment & Billing Verification</option>
                    <option>General Farm Advisory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message / Quantity Requirements
                </label>
                <textarea
                  id="contact-message-body"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention number of bags, current pond salinity, days of culture (DOC), or specific issues..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  id="btn-send-whatsapp-inquiry"
                  onClick={handleWhatsAppSubmit}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="button"
                  id="btn-send-email-inquiry"
                  onClick={handleMailtoSubmit}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
                >
                  <EmailIcon className="w-4 h-4" />
                  <span>Send via Email</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right: Address & Google Maps Embed */}
          <div className="group relative overflow-hidden lg:col-span-6 flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
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
    </div>
  );
};
