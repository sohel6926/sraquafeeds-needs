import React, { useState } from 'react';
import { Product, PageType } from '../types.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { InquiryForm } from '../components/InquiryForm.tsx';
import { WhatsAppIcon, PhoneCallIcon } from '../components/Icons.tsx';
import { useData } from '../context/DataContext.tsx';
import {
  ArrowLeft,
  Package,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Calculator,
  Activity,
  Layers,
  Thermometer,
  Truck,
  FileText,
  Clock,
} from 'lucide-react';

import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: PageType, productId?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
}) => {
  const { products, siteSettings } = useData();
  const product = products.find((p) => p.id === productId) || products[0];

  // Interactive Pond Calculator State
  const [pondAcres, setPondAcres] = useState<number>(1);
  const [docStage, setDocStage] = useState<'early' | 'mid' | 'late'>('mid');


  // Calculate estimated requirement
  const isFeed = product.category === 'Shrimp & Fish Feed';
  const isMineral = product.category === 'Pond Minerals';
  const isProbiotic = product.category === 'Probiotics & Enzymes';
  const isOxygen = product.category === 'Oxygen Enhancers';

  const calculateRequirement = () => {
    if (isFeed) {
      if (docStage === 'early') return { amount: (pondAcres * 1.5).toFixed(1), unit: 'Bags (25kg) / Day' };
      if (docStage === 'mid') return { amount: (pondAcres * 3.5).toFixed(1), unit: 'Bags (25kg) / Day' };
      return { amount: (pondAcres * 5.0).toFixed(1), unit: 'Bags (25kg) / Day' };
    }
    if (isMineral) {
      return { amount: (pondAcres * 25).toFixed(0), unit: 'kg per Lunar Molting Broadcast' };
    }
    if (isProbiotic) {
      return { amount: (pondAcres * 500).toFixed(0), unit: 'grams per 7-day Cycle' };
    }
    if (isOxygen) {
      return { amount: (pondAcres * 5).toFixed(0), unit: 'kg per Emergency Broadcast' };
    }
    return { amount: (pondAcres * 1).toFixed(0), unit: 'Litre / kg per Treatment' };
  };

  const req = calculateRequirement();

  // Related products
  const relatedProducts = products.filter((p) => p.id !== product.id && (p.category === product.category || p.isPopular)).slice(0, 3);


  const encodedProductName = encodeURIComponent(product.name);
  const whatsappOrderUrl = `https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20I'm%20interested%20in%20ordering%20${encodedProductName}.%20Please%20share%20current%20batch%20quote%20and%20pond%20delivery%20details.`;

  return (
    <div className="space-y-10 sm:space-y-14 pt-4 sm:pt-6 pb-14 sm:pb-20">
      {/* 1. Breadcrumbs & Quick Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-slate-200/80">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('products')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Products
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </nav>

          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Showcase: High-Res Image, Verification Badges & Immediate Action Desk */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Imagery & Physical Guarantee */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-slate-900 via-slate-800 to-sky-950 border border-slate-200/90 shadow-xl aspect-4/3 flex items-center justify-center group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Water caustics overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay">
                <img
                  src={cleanWaterTexture}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

              {/* Category Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block bg-slate-900/85 backdrop-blur-md text-emerald-300 border border-emerald-400/40 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {product.category}
                </span>
              </div>

              {/* Popular Badge */}
              {product.isPopular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase border border-emerald-400/40">
                    <Sparkles className="w-3 h-3" />
                    <span>Top Demand</span>
                  </span>
                </div>
              )}

              {/* Packaging Badge Bottom Left */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                <Package className="w-4 h-4 text-emerald-400" />
                <span>Pack: {product.packaging}</span>
              </div>

              {/* Curiosity Highlight Badge Bottom Right */}
              {product.curiosityBadge && (
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600/95 backdrop-blur-md text-white text-xs font-bold border border-emerald-400/40 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>{product.curiosityBadge}</span>
                </div>
              )}
            </div>

            {/* Verification Reassurance Chips */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold">Official GSTIN Billed</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5 text-xs text-slate-700">
                <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span className="font-semibold">Direct Pond Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Product Header & Fast Order Action Desk */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pond-Tested Technical Specifications</span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base font-medium text-emerald-800 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Full Technical Overview */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500">
                Product Formulation & Overview
              </span>
              <p>{product.fullDescription || product.description}</p>
            </div>

            {/* Key Field Benefits Checkmarks */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Primary Field Advantages:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.keyBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-800 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Immediate Action Buttons (WhatsApp & Call) */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Order on WhatsApp (Instant Quote)</span>
              </a>

              <a
                href="tel:9493243244"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-900 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                <PhoneCallIcon className="w-4 h-4 text-sky-600" />
                <span>Call Proprietor (9493243244)</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Orders dispatched same-day to pond bunds across Ulavapadu, Ramayapatnam & Nellore coast.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Tabs / Structured Panels: Lab Specs, Dosage Schedule & Water Parameters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Columns: Lab Specifications & Dosage Guidelines */}
          <div className="lg:col-span-7 space-y-6">
            {/* Laboratory Technical Specifications */}
            {product.specs && product.specs.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  <h3>Laboratory Nutritional & Chemical Analysis</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.specs.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1"
                    >
                      <span className="text-[11px] text-slate-500 block font-medium">
                        {item.label}
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 block font-mono">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Composition Breakdown */}
            {product.composition && product.composition.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
                  <Layers className="w-5 h-5 text-sky-600" />
                  <h3>Formulation Ingredients & Active Matrix</h3>
                </div>

                <div className="space-y-2">
                  {product.composition.map((comp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs border border-slate-100"
                    >
                      <span className="font-semibold text-slate-800">{comp.component}</span>
                      <span className="font-bold text-emerald-700 font-mono">{comp.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application & Dosage Schedule */}
            {product.dosageSchedule && product.dosageSchedule.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <h3>Recommended Pond Dosage Schedule</h3>
                </div>

                <div className="space-y-3">
                  {product.dosageSchedule.map((sched, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-slate-900 text-sm">{sched.stage}</span>
                        <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-mono">
                          {sched.dose}
                        </span>
                      </div>
                      <div className="text-slate-600">
                        <strong>Frequency:</strong> {sched.frequency}
                      </div>
                      <div className="text-slate-500 text-[11px] italic">
                        Tip: {sched.notes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Interactive Pond Calculator & Ideal Water Parameters */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Pond Requirement Calculator */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-sky-950 text-white shadow-xl border border-white/10 space-y-5">
              <div className="flex items-center gap-2 text-sky-300 font-bold text-base">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <h3>Pond Requirement Calculator</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Estimate how much {product.name} your culture requires based on pond acreage.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Pond Surface Area:</span>
                    <span className="font-bold text-emerald-300 font-mono text-sm">{pondAcres} Acre(s)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={pondAcres}
                    onChange={(e) => setPondAcres(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Acre</span>
                    <span>5 Acres</span>
                    <span>10 Acres</span>
                  </div>
                </div>

                {isFeed && (
                  <div>
                    <span className="text-xs text-slate-300 font-medium block mb-1.5">Culture Stage:</span>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {(['early', 'mid', 'late'] as const).map((stage) => (
                        <button
                          key={stage}
                          onClick={() => setDocStage(stage)}
                          className={`py-2 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
                            docStage === stage
                              ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {stage} (DOC)
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimated Output Result */}
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1 text-center">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                    Estimated Pond Allocation
                  </span>
                  <div className="text-2xl font-black text-emerald-300 font-mono">
                    {req.amount}
                  </div>
                  <span className="text-xs text-slate-200 block font-medium">
                    {req.unit}
                  </span>
                </div>

                <a
                  href={`https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20I%20used%20the%20calculator%20for%20${pondAcres}%20acres%20of%20${encodedProductName}.%20Estimated%20need:%20${req.amount}%20${encodeURIComponent(req.unit)}.%20Please%20send%20pricing.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Request Delivery for {pondAcres} Acre(s)</span>
                </a>
              </div>
            </div>

            {/* Ideal Pond Water Parameter Targets */}
            {product.idealWaterParams && product.idealWaterParams.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
                  <Thermometer className="w-5 h-5 text-sky-600" />
                  <h3>Target Pond Water Parameters</h3>
                </div>

                <div className="space-y-2.5">
                  {product.idealWaterParams.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{item.param}</span>
                        <span className="text-[11px] text-slate-500">{item.note}</span>
                      </div>
                      <span className="font-mono font-extrabold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {item.target}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Storage & Shelf Life Note */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
              <span className="font-bold block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Storage & Quality Assurance
              </span>
              <p className="text-[11px] leading-relaxed text-amber-800">
                {product.handlingAndStorage ||
                  'Keep bags on elevated wooden pallets in a cool, ventilated warehouse away from direct sunlight. All products are verified with current manufacturing batch seals.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pre-filled Farmer Inquiry Desk for this Specific Product */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <InquiryForm
          productName={product.name}
          title={`Order Inquiry for ${product.name}`}
          subtitle={`Fill out the form below to receive immediate batch pricing, truck availability, or technical application advice for ${product.name}.`}
        />
      </section>

      {/* 5. Related Recommended Products (Curiosity Cards) */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="space-y-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Complementary Pond Essentials</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900">
              Frequently Paired with {product.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onSelect={(id) => {
                  onNavigate('product-detail', id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
