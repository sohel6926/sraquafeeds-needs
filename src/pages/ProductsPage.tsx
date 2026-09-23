import React, { useState, useMemo } from 'react';
import { ProductCategory, Product, PageType } from '../types.ts';
import { PRODUCTS_DATA } from '../data/products.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { WhatsAppIcon, PhoneCallIcon } from '../components/Icons.tsx';
import { Search, Filter, HelpCircle, Phone, Sparkles, Droplets, ShieldCheck, CheckCircle2, Activity, Zap } from 'lucide-react';

// Visual image assets
import heroPrawnBanner from '../assets/images/hero_prawn_banner_1790103831232.jpg';
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';
import pondAerationBanner from '../assets/images/pond_aeration_banner_1790103885278.jpg';
import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import productsFeedBanner from '../assets/images/products_feed_banner_1790110292560.jpg';

interface ProductsPageProps {
  onNavigate?: (page: PageType, productId?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProductCategory[] = [
    'All',
    'Shrimp & Fish Feed',
    'Pond Minerals',
    'Probiotics & Enzymes',
    'Ammonia & Gas Control',
    'Oxygen Enhancers',
    'Disinfectants & Sanitizers',
    'Growth Promoters & Immunity',
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-10 sm:space-y-14 pt-8 pb-16 sm:pb-24">
      {/* 1. Unique Animated Precision Nutrition & Water Stability Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-white/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={productsFeedBanner}
              alt="Scientific shrimp aquaculture feed and water conditioning"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
            />
            {/* Clean water caustics texture shimmer overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            {/* Soft left gradient only behind text, no heavy opaque mask */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/35 to-transparent pointer-events-none" />

            {/* Rising Animated Oxygen & Nutrient Micro-Bubbles */}
            <div className="absolute bottom-6 left-1/4 w-3.5 h-3.5 rounded-full bg-emerald-300/40 border border-emerald-200/50 animate-bubble-1 pointer-events-none" />
            <div className="absolute bottom-10 right-1/3 w-4 h-4 rounded-full bg-sky-300/40 border border-sky-200/50 animate-bubble-2 pointer-events-none" />
            <div className="absolute bottom-16 right-16 w-3 h-3 rounded-full bg-teal-300/40 border border-teal-200/50 animate-bubble-3 pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl space-y-4 reveal reveal-slide-left">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30">
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  <span>Precision Aquaculture Nutrition</span>
                </span>
                <span className="hidden sm:inline text-slate-400">·</span>
                <span className="hidden sm:inline text-slate-300">Batch-Tested Inventory</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                High-Performance Aqua Feeds & Bio-Active Water Care
              </h1>

              <p className="text-slate-300 text-base leading-relaxed">
                Complete, laboratory-formulated nutrition for Vannamei and Tiger Shrimp. Engineered for rapid assimilation, <strong className="text-white">3-hour water stability without nutrient leaching</strong>, and minimal pond bottom pollution.
              </p>

              {/* Informational Direct Order Notice */}
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-sky-200 flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-sky-300 flex-shrink-0" />
                <span>
                  <strong>Wholesale & Retail Bags:</strong> We maintain fresh moisture-proof stock on Ramayapatnam Road. Click <strong>WhatsApp</strong> or <strong>Call</strong> on any product card below for farm-gate pricing and immediate pond-side dispatch.
                </span>
              </div>
            </div>

            {/* Bespoke Thematic Showcase: Animated Bio-Nutrition & 3-Hour Stability Lab Console */}
            <div className="relative flex-shrink-0 w-72 sm:w-80 flex items-center justify-center reveal reveal-slide-right">
              {/* Outer Animated Molecular Orbital Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-sky-400/35 animate-spin-slow pointer-events-none" />

              {/* Concentric Radar Dissolution Ring */}
              <div className="absolute inset-4 rounded-full border border-emerald-400/25 animate-radar-pulse pointer-events-none" />

              {/* Center Bio-Luminescence Glow */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-sky-500/25 via-emerald-500/20 to-teal-400/15 blur-2xl pointer-events-none animate-pulse-glow" />

              {/* Central Glass Lab Console */}
              <div className="relative z-10 w-full rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/20 p-5 shadow-2xl space-y-4">
                {/* Console Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
                      Nutritional Potency Lab
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    FCR Standards
                  </span>
                </div>

                {/* Animated 3-Hour Water Stability Gauge & Micro-Pellets */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 block">Water Stability Guarantee</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-extrabold text-sky-300 font-mono">180 Mins</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">(3.0 Hours)</span>
                    </div>
                    <span className="text-[10px] text-slate-300 block">Zero nutrient leaching into pond sludge</span>
                  </div>

                  {/* Circular Stability Timer Gauge */}
                  <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-sky-400"
                        strokeDasharray="88, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <Activity className="w-5 h-5 text-sky-300 absolute" />
                  </div>
                </div>

                {/* Protein & FCR Telemetry Bars */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Crude Protein</span>
                      <Zap className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <span className="text-base font-extrabold text-white font-mono block">38% – 40%</span>
                    <span className="text-[10px] text-sky-300">Fast muscle gain</span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Target FCR</span>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-base font-extrabold text-emerald-300 font-mono block">1.2 – 1.4</span>
                    <span className="text-[10px] text-emerald-400">Proven conversion</span>
                  </div>
                </div>

                {/* Compatibility Footer Note */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-sky-300 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    CP & Grobest Compatible
                  </span>
                  <span className="text-emerald-300 font-semibold">100% Pathogen Free</span>
                </div>
              </div>

              {/* Floating Badge (Top Left) */}
              <div className="absolute -top-3 -left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-sky-400/40 text-sky-300 text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-float-gentle">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>3-Hr Zero Leaching</span>
              </div>

              {/* Floating Badge (Bottom Right) */}
              <div className="absolute -bottom-3 -right-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-float-reverse">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>1.2 – 1.4 FCR Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          {/* Subtle water caustics background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply">
            <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>

          {/* Search Bar & Stats */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="product-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search feed, mineral, probiotic..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Result Count and Quick Call */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs font-semibold text-slate-500">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
              </span>
              <a
                href="tel:9493243244"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Bulk Inquiries: 9493243244</span>
              </a>
            </div>
          </div>

          {/* Category Pills Slider/Wrap */}
          <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? PRODUCTS_DATA.length
                  : PRODUCTS_DATA.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  id={`cat-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'bg-slate-100/80 text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200/70 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Product Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 reveal-group">
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                className={`reveal reveal-fade-up ${
                  idx < 12 ? `reveal-delay-${(idx % 4) + 1}` : ''
                }`}
              >
                <ProductCard
                  product={product}
                  onSelect={(id) => {
                    if (onNavigate) {
                      onNavigate('product-detail', id);
                    } else {
                      window.location.hash = `product?id=${id}`;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800">
              No products found matching &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We may still have this item in our shop stock on Ramayapatnam Road. Contact Utukuri Rambabu directly.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Reset Filters
              </button>
              <a
                href="https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20do%20you%20have%20stock%20for..."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </section>

      {/* 4. Bulk Feeding & Pond Advisory Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl group">
          {/* Real Aquaculture Feed & Warehouse Photo Backdrop */}
          <div className="absolute inset-0 z-0">
            <img
              src={productsFeedBanner}
              alt="Scientific Feed warehouse storage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-45"
            />
            {/* Clean water caustics overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-emerald-950/80" />
          </div>

          {/* Faint shrimp watermark */}
          <div className="absolute -bottom-8 -right-8 w-44 h-44 pointer-events-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity z-10">
            <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain filter invert" />
          </div>

          <div className="space-y-2 text-center md:text-left max-w-2xl relative z-10 reveal reveal-slide-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Season Pond Stocking Packages</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Need complete nursery-to-harvest feed contracts?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              We arrange scheduled bulk deliveries to your pond embankments across Ulavapadu and coastal Nellore. Get transparent quotes directly from Utukuri Rambabu.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10 reveal reveal-slide-right">
            <a
              href="tel:9493243244"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <PhoneCallIcon className="w-4 h-4" />
              <span>Call: 9493243244</span>
            </a>
            <a
              href="https://wa.me/919493243244?text=Hi%2C%20I'm%20interested%20in%20a%20full%20crop%20season%20feed%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Request Quote</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
