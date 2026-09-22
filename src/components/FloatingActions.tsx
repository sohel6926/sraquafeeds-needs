import React, { useState, useRef, useEffect } from 'react';
import { WhatsAppIcon, PhoneCallIcon, EmailIcon } from './Icons.tsx';
import { BrandLogo } from './BrandLogo.tsx';
import { X, MessageCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCallSelector, setShowCallSelector] = useState(false);
  const [showWhatsAppSelector, setShowWhatsAppSelector] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCallSelector(false);
        setShowWhatsAppSelector(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setShowCallSelector(false);
    setShowWhatsAppSelector(false);
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Call Selector Modal/Card */}
      {showCallSelector && (
        <div className="mb-3 p-3.5 bg-white rounded-2xl shadow-2xl border border-sky-200 text-slate-800 w-64 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <PhoneCallIcon className="w-3.5 h-3.5 text-sky-600" />
              Direct Phone Support
            </span>
            <button
              onClick={() => setShowCallSelector(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          </div>
          <div className="mt-2.5 space-y-2">
            <a
              id="fab-call-number-1"
              href="tel:9493243244"
              className="flex items-center justify-between p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 text-xs font-semibold transition-colors"
            >
              <div>
                <div className="font-bold text-sm">9493243244</div>
                <div className="text-[10px] text-sky-600">Primary & Payments Contact</div>
              </div>
              <PhoneCallIcon className="w-4 h-4 text-sky-600" />
            </a>
            <a
              id="fab-call-number-2"
              href="tel:7075838624"
              className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors"
            >
              <div>
                <div className="font-bold text-sm">7075838624</div>
                <div className="text-[10px] text-slate-500">Secondary Desk</div>
              </div>
              <PhoneCallIcon className="w-4 h-4 text-slate-600" />
            </a>
          </div>
        </div>
      )}

      {/* WhatsApp Selector Modal/Card */}
      {showWhatsAppSelector && (
        <div className="mb-3 p-3.5 bg-white rounded-2xl shadow-2xl border border-emerald-200 text-slate-800 w-64 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
              Chat on WhatsApp
            </span>
            <button
              onClick={() => setShowWhatsAppSelector(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          </div>
          <div className="mt-2.5 space-y-2">
            <a
              id="fab-whatsapp-number-1"
              href="https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20I%20need%20inquiry%20regarding%20feed%20and%20chemicals."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold transition-colors"
            >
              <div>
                <div className="font-bold text-sm">9493243244</div>
                <div className="text-[10px] text-emerald-700">Utukuri Rambabu (Main)</div>
              </div>
              <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
            </a>
            <a
              id="fab-whatsapp-number-2"
              href="https://wa.me/917075838624?text=Hi%20SR%20Aqua%20Feeds%2C%20I%20would%20like%20to%20inquire%20about%20aqua%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors"
            >
              <div>
                <div className="font-bold text-sm">7075838624</div>
                <div className="text-[10px] text-slate-600">Store Support</div>
              </div>
              <WhatsAppIcon className="w-4 h-4 text-slate-600" />
            </a>
          </div>
        </div>
      )}

      {/* Expanded Sub-Icons with Staggered Slide-Up & Fan Animation */}
      <div
        className={`flex flex-col items-end gap-3 mb-3 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        {/* Sub-icon 3: Email Icon */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: isOpen ? '120ms' : '0ms' }}
        >
          <span className="bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap">
            Email Us (rams34333@gmail.com)
          </span>
          <a
            id="fab-sub-email"
            href="mailto:rams34333@gmail.com?subject=Aquaculture%20Inquiry%20-%20SR%20Aqua%20Feeds%20%26%20Needs"
            aria-label="Send Email"
            className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          >
            <EmailIcon className="w-5 h-5 text-white" />
          </a>
        </div>

        {/* Sub-icon 2: Call Phone Icon */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: isOpen ? '60ms' : '0ms' }}
        >
          <span className="bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap">
            Call Direct (9493243244)
          </span>
          <button
            id="fab-sub-call"
            onClick={() => setShowCallSelector(!showCallSelector)}
            aria-label="Call SR Aqua Feeds"
            className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-500 active:scale-95 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          >
            <PhoneCallIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Sub-icon 1: WhatsApp Icon */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: isOpen ? '0ms' : '0ms' }}
        >
          <span className="bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap">
            Quick WhatsApp Chat
          </span>
          <button
            id="fab-sub-whatsapp"
            onClick={() => setShowWhatsAppSelector(!showWhatsAppSelector)}
            aria-label="WhatsApp Chat"
            className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          >
            <WhatsAppIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Primary Floating Action Trigger Button with Brand Logo context */}
      <button
        id="global-floating-action-btn"
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close Quick Contact Actions' : 'Open Quick Contact Actions'}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 ${
          isOpen
            ? 'bg-slate-900 text-white rotate-90'
            : 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-sky-600 text-white animate-pulse'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Real brand logo emblem inside FAB */}
            <BrandLogo variant="emblem" className="w-10 h-10" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
          </div>
        )}
      </button>
    </div>
  );
};
