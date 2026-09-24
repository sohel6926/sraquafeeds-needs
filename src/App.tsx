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
import { AdminPage } from './pages/AdminPage.tsx';
import { ContactGateModal, ContactGateData } from './components/ContactGateModal.tsx';
import { useData } from './context/DataContext.tsx';
import { Megaphone, Shield } from 'lucide-react';

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

// Helper to extract page and product ID from either pathname (/admin) or hash (#admin)
const getRouteFromUrl = (): { page: PageType; productId?: string } => {
  // 1. Check window pathname first (e.g. /admin, /about, /products, /gallery, /contact, /product)
  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const pathClean = pathname.replace(/^\//, ''); // e.g. "admin", "products", ""

  if (pathClean === 'admin') {
    return { page: 'admin' };
  }
  if (pathClean === 'about') {
    return { page: 'about' };
  }
  if (pathClean === 'products') {
    return { page: 'products' };
  }
  if (pathClean === 'gallery') {
    return { page: 'gallery' };
  }
  if (pathClean === 'contact') {
    return { page: 'contact' };
  }
  if (pathClean.startsWith('product')) {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id') || pathClean.split('/')[1];
    return { page: 'product-detail', productId: id || 'shrimp-feed-grower' };
  }

  // 2. Check hash fallback for backwards compatibility (e.g. #admin, #about, #product?id=...)
  const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (rawHash.startsWith('product')) {
    const queryPart = rawHash.includes('?') ? rawHash.split('?')[1] : '';
    const params = new URLSearchParams(queryPart);
    const id = params.get('id');
    return { page: 'product-detail', productId: id || 'shrimp-feed-grower' };
  }
  if (rawHash === 'admin') return { page: 'admin' };
  if (rawHash === 'about') return { page: 'about' };
  if (rawHash === 'products') return { page: 'products' };
  if (rawHash === 'gallery') return { page: 'gallery' };
  if (rawHash === 'contact') return { page: 'contact' };
  if (rawHash === 'home') return { page: 'home' };

  return { page: 'home' };
};

export default function App() {
  const initialRoute = getRouteFromUrl();
  const [currentPage, setCurrentPage] = useState<PageType>(initialRoute.page);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialRoute.productId || 'shrimp-feed-grower'
  );

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

  // Sync with both window pathname (popstate) and hash for natural browser navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const { page, productId } = getRouteFromUrl();
      setCurrentPage(page);
      if (productId) {
        setSelectedProductId(productId);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Contact Gate Modal State (Intercepts Call, WhatsApp, Email to capture Name & Mobile)
  const [contactGateData, setContactGateData] = useState<ContactGateData | null>(null);
  const [isContactGateOpen, setIsContactGateOpen] = useState(false);

  // Global click interceptor: Catches any call, WhatsApp, or email action across the entire website
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Do not intercept if currently on the admin page
      if (currentPage === 'admin' || window.location.pathname.startsWith('/admin')) {
        return;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest('a') as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute('href') || '';
      if (!href) return;

      let type: 'whatsapp' | 'call' | 'email' | null = null;
      if (href.startsWith('tel:')) {
        type = 'call';
      } else if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        type = 'whatsapp';
      } else if (href.startsWith('mailto:')) {
        type = 'email';
      }

      if (type) {
        e.preventDefault();
        e.stopPropagation();

        const topic = link.getAttribute('title') || link.innerText?.trim() || undefined;
        setContactGateData({
          type,
          targetUrl: href,
          topic: topic ? topic.slice(0, 60) : undefined,
        });
        setIsContactGateOpen(true);
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, [currentPage]);

  const { siteSettings } = useData();

  const handleNavigate = (page: PageType, productId?: string) => {
    if (page === 'product-detail' && productId) {
      setSelectedProductId(productId);
      setCurrentPage('product-detail');
      window.history.pushState({}, '', `/product?id=${productId}`);
    } else {
      setCurrentPage(page);
      const targetPath = page === 'home' ? '/' : `/${page}`;
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-500 selection:text-white relative">
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

      {/* Live Configurable Top Announcement Bar */}
      {siteSettings.announcementEnabled && siteSettings.announcementText && currentPage !== 'admin' && (
        <div className="relative z-50 bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 text-white text-[11px] sm:text-xs py-1.5 px-4 font-semibold shadow-xs flex items-center justify-between border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center w-full">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse flex-shrink-0" />
            <span className="line-clamp-1">{siteSettings.announcementText}</span>
          </div>
        </div>
      )}

      {/* Sticky Header with Navigation & Quick Actions */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

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
        {currentPage === 'admin' && <AdminPage onNavigate={handleNavigate} />}
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

      {/* Universal Customer Contact Capture Gate Modal */}
      <ContactGateModal
        isOpen={isContactGateOpen}
        data={contactGateData}
        onClose={() => setIsContactGateOpen(false)}
      />

      {/* Hidden persistent DOM image cache to ensure instant tab switching with 0ms lag */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {CRITICAL_BANNER_IMAGES.map((src) => (
          <img key={src} src={src} loading="eager" decoding="sync" alt="" />
        ))}
      </div>
    </div>
  );
}
