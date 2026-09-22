import React, { useState } from 'react';
import { PageType } from '../types.ts';
import { BrandLogo } from './BrandLogo.tsx';
import { WhatsAppIcon, PhoneCallIcon, GstBadgeIcon } from './Icons.tsx';
import { Menu, X, MapPin, Clock } from 'lucide-react';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 transition-all">
      {/* Top Advisory & Business Identity Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-emerald-950 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* GSTIN & Proprietor */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-emerald-400 font-medium">
              <GstBadgeIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>GSTIN: 37AGHPU5940Q1ZF</span>
            </div>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="text-slate-300 hidden sm:inline">
              Proprietor: <strong className="text-white font-semibold">Utukuri Rambabu</strong>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <div className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-sky-400" />
              <span>Ramayapatnam Road, Ulavapadu, Nellore</span>
            </div>
          </div>

          {/* Quick Direct Contacts */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>Open Daily: 6:30 AM – 9:00 PM</span>
            </div>
            <a
              href="tel:9493243244"
              className="flex items-center gap-1 text-sky-300 hover:text-white transition-colors font-medium"
              title="Call Main Contact"
            >
              <PhoneCallIcon className="w-3 h-3 text-sky-400" />
              <span>9493243244</span>
            </a>
            <span className="text-slate-600">/</span>
            <a
              href="tel:7075838624"
              className="flex items-center gap-1 text-sky-300 hover:text-white transition-colors font-medium"
              title="Call Secondary Contact"
            >
              <span>7075838624</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo Clickable */}
        <button
          id="header-brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5 transition-transform hover:opacity-95"
        >
          <BrandLogo variant="full" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/90 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Action Buttons (Call & WhatsApp Direct) */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            id="header-call-btn"
            href="tel:9493243244"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-sky-300 text-sky-700 bg-sky-50/60 hover:bg-sky-100 hover:border-sky-400 font-semibold text-xs tracking-wide transition-all shadow-xs active:scale-95"
          >
            <PhoneCallIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Call: 9493243244</span>
          </a>

          <a
            id="header-whatsapp-btn"
            href="https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20I%20am%20an%20aquaculture%20farmer%20and%20need%20inquiry%20regarding%20feed%20and%20chemicals."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95 group"
          >
            <WhatsAppIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="tel:9493243244"
            aria-label="Call SR Aqua Feeds"
            className="p-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-200"
          >
            <PhoneCallIcon className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/919493243244"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp SR Aqua Feeds"
            className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1 pb-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-emerald-600 font-bold">Active</span>}
                </button>
              );
            })}
          </div>

          {/* Mobile CTA Buttons */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              id="mobile-drawer-call-1"
              href="tel:9493243244"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-600 text-white font-semibold text-sm shadow-sm"
            >
              <PhoneCallIcon className="w-4 h-4" />
              <span>Call Primary: 9493243244</span>
            </a>
            <a
              id="mobile-drawer-call-2"
              href="tel:7075838624"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-sky-300 text-sky-800 bg-sky-50 font-semibold text-sm"
            >
              <PhoneCallIcon className="w-4 h-4 text-sky-700" />
              <span>Call Secondary: 7075838624</span>
            </a>
            <a
              id="mobile-drawer-whatsapp"
              href="https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20I%20need%20details%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-sm"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
