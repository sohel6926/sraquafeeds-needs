import React, { useState, useEffect } from 'react';
import { PageType } from './types.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingActions } from './components/FloatingActions.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import { GlobalScrollRevealObserver } from './components/ScrollReveal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ProductsPage } from './pages/ProductsPage.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { ProductDetailPage } from './pages/ProductDetailPage.tsx';

// Background image asset for entire website
import prawnPatternBg from './assets/images/prawn_pattern_bg_1790103865798.jpg';
import prawnIllustration from './assets/images/prawn_illustration_1790103846428.jpg';

// Core banner images for instant preloading and zero-lag tab transitions
import heroPrawnBanner from './assets/images/hero_prawn_banner_1790103831232.jpg';
import aboutFarmBanner from './assets/images/about_farm_banner_1790110278351.jpg';
import productsFeedBanner from './assets/images/products_feed_banner_1790110292560.jpg';
import galleryFacilityBanner from './assets/images/gallery_facility_banner_1790110304653.jpg';
import contactSupportBanner from './assets/images/contact_support_banner_1790110315472.jpg';
import pondAerationBanner from './assets/images/pond_aeration_banner_1790103885278.jpg';
import cleanWaterTexture from './assets/images/clean_water_texture_1790105872350.jpg';

const CRITICAL_BANNER_IMAGES = [
  heroPrawnBanner,
  aboutFarmBanner,
  productsFeedBanner,
  galleryFacilityBanner,
  contactSupportBanner,
  pondAerationBanner,
  cleanWaterTexture,
  prawnPatternBg,
  prawnIllustration,
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('shrimp-feed-grower');

  // Pre-load and hardware pre-decode all banner images immediately on app startup
  useEffect(() => {
    CRITICAL_BANNER_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {
          // Fallback gracefully if decode fails
        });
      }
    });
  }, []);

  // Sync with window hash for natural multi-page browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (rawHash.startsWith('product')) {
        const queryPart = rawHash.includes('?') ? rawHash.split('?')[1] : '';
        const params = new URLSearchParams(queryPart);
        const id = params.get('id');
        if (id) {
          setSelectedProductId(id);
          setCurrentPage('product-detail');
          return;
        }
      }
      if (['home', 'about', 'products', 'gallery', 'contact', 'product-detail'].includes(rawHash)) {
        setCurrentPage(rawHash as PageType);
      }
    };

    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType, productId?: string) => {
    if (page === 'product-detail' && productId) {
      setSelectedProductId(productId);
      setCurrentPage('product-detail');
      window.location.hash = `product?id=${productId}`;
    } else {
      setCurrentPage(page);
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Universal Background Image & Prawn Aquatic Atmosphere Across Entire Website */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Full-bleed textured prawn pattern background image with gentle oceanic overlay */}
        <img
          src={prawnPatternBg}
          alt=""
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.05] mix-blend-multiply filter contrast-125"
        />

        {/* Ambient radial color glows */}
        <div className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] bg-gradient-to-bl from-sky-400/10 via-emerald-400/5 to-transparent rounded-full blur-3xl pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute top-1/3 left-0 w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-gradient-to-tr from-emerald-500/8 via-teal-400/5 to-transparent rounded-full blur-3xl pointer-events-none transform -translate-x-1/4" />
        <div className="absolute bottom-10 right-10 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-tl from-sky-500/8 via-teal-400/4 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Subtle decorative floating illustrative prawn watermark accents at side edges */}
        <div className="absolute top-48 -right-16 w-64 h-64 opacity-[0.04] pointer-events-none select-none rotate-12">
          <img
            src={prawnIllustration}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </div>
        <div className="absolute top-2/3 -left-20 w-80 h-80 opacity-[0.035] pointer-events-none select-none -rotate-12 scale-x-[-1]">
          <img
            src={prawnIllustration}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </div>
      </div>

      {/* Sticky Header with Navigation & Quick Actions */}
      <div className="relative z-30">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      </div>

      {/* Main Multi-Page Content Outlet */}
      <main className="flex-1 relative z-10">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'products' && <ProductsPage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'product-detail' && (
          <ProductDetailPage productId={selectedProductId} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Comprehensive Business Footer */}
      <div className="relative z-20">
        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Smooth Scroll-to-Reveal Universal Observer */}
      <GlobalScrollRevealObserver />

      {/* Global Scroll-to-Top Button with Circular Progress Ring */}
      <ScrollToTop />

      {/* Global Floating Action Button (FAB) with Animated Sub-Icons */}
      <FloatingActions />

      {/* Hidden persistent DOM image cache to ensure instant tab switching with 0ms lag */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {CRITICAL_BANNER_IMAGES.map((src) => (
          <img key={src} src={src} loading="eager" decoding="sync" alt="" />
        ))}
      </div>
    </div>
  );
}
