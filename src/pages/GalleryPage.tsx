import React, { useState } from 'react';
import { GalleryItem } from '../types.ts';
import { WhatsAppIcon, PhoneCallIcon } from '../components/Icons.tsx';
import { useData } from '../context/DataContext.tsx';
import { MapPin, ZoomIn, X, Clock, Layers, Camera, Droplets } from 'lucide-react';

import pondAerationBanner from '../assets/images/pond_aeration_banner_1790103885278.jpg';
import heroPrawnBanner from '../assets/images/hero_prawn_banner_1790103831232.jpg';
import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';
import galleryFacilityBanner from '../assets/images/gallery_facility_banner_1790110304653.jpg';

export const GalleryPage: React.FC = () => {
  const { gallery } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Prawn & Crop Vitality',
    'Pond & Farm Scenery',
    'Shop Interior',
    'Stock & Warehouse',
    'Products Display',
    'Farmer Support',
  ];

  const filteredItems = activeCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);


  return (
    <div className="space-y-12 sm:space-y-16 pt-8 pb-16 sm:pb-24">
      {/* 1. Unique Animated Optical Viewfinder & Facility Tour Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-white/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={galleryFacilityBanner}
              alt="Aquaculture showroom and pond facility backdrop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-105 scale-105"
            />
            {/* Clean water caustics overlay with subtle optical shimmer */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            {/* Soft left gradient only behind text for crisp contrast, no heavy dark mask */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/35 to-transparent pointer-events-none" />

            {/* Rising Animated Water Bubbles */}
            <div className="absolute bottom-6 left-1/4 w-3.5 h-3.5 rounded-full bg-emerald-300/40 border border-emerald-200/50 animate-bubble-1 pointer-events-none" />
            <div className="absolute bottom-12 right-1/3 w-4 h-4 rounded-full bg-sky-300/40 border border-sky-200/50 animate-bubble-2 pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30">
                  <Camera className="w-3.5 h-3.5 text-teal-400" />
                  <span>Optical Verification & Facility Tour</span>
                </span>
                <span className="hidden sm:inline text-slate-400">·</span>
                <span className="hidden sm:inline text-slate-300">Ramayapatnam Road</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Aqua Retail Showroom, Pallet Warehousing & Pond Facilities
              </h1>

              <p className="text-slate-300 text-base leading-relaxed">
                Take an authentic photographic tour through SR Aqua Feeds & Needs. Inspect our moisture-controlled feed bays, genuine CP & Grobest pallet stocks, chemical display shelves, and coastal shrimp farm networks in Ulavapadu.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Chakicherla Peddapattapu Palem</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span>Open 6:30 AM to 9:00 PM Daily</span>
                </div>
              </div>
            </div>

            {/* Bespoke Thematic Showcase: Animated Optical Viewfinder & Multi-Perspective Frame HUD */}
            <div className="relative flex-shrink-0 w-72 sm:w-80 flex items-center justify-center">
              {/* Outer Optical Aperture Graduation Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-teal-400/35 animate-spin-slow pointer-events-none" />

              {/* Concentric Focal Ring */}
              <div className="absolute inset-4 rounded-full border border-sky-400/25 animate-radar-pulse pointer-events-none" />

              {/* Shutter Glow */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-teal-500/25 via-sky-500/20 to-emerald-400/15 blur-2xl pointer-events-none animate-pulse-glow" />

              {/* Central Glass Viewfinder Console */}
              <div className="relative z-10 w-full rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/20 p-5 shadow-2xl space-y-3.5">
                {/* Viewfinder Reticle Bar */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-teal-300">
                      Optical Viewfinder
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    f/2.8 · 4K Optic
                  </span>
                </div>

                {/* Dual Floating Perspective Frames */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Angle 1: Warehouse Bay */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-md group aspect-[4/3] bg-slate-950">
                    <img
                      src={galleryFacilityBanner}
                      alt="Pallet Warehouse"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-sky-300">
                      Pallet Storage
                    </span>
                  </div>

                  {/* Angle 2: Coastal Pond Aeration */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-md group aspect-[4/3] bg-slate-950">
                    <img
                      src={pondAerationBanner}
                      alt="Coastal Pond Aeration"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-emerald-300">
                      Pond Aerators
                    </span>
                  </div>
                </div>

                {/* Camera HUD Telemetry Strip */}
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 block font-medium">Facility Verification</span>
                    <span className="text-xs font-bold text-teal-300 flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-teal-400" />
                      <span>8 Angles Documented</span>
                    </span>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="text-[10px] text-slate-400 block font-medium">Storage Moisture</span>
                    <span className="text-xs font-mono font-bold text-emerald-300">&lt; 10% Dry Stored</span>
                  </div>
                </div>

                {/* Console Footer */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1 text-teal-300">
                    <ZoomIn className="w-3 h-3" />
                    Click Any Card to Zoom
                  </span>
                  <span>Unfiltered Real Photos</span>
                </div>
              </div>

              {/* Floating Badge (Top Left) */}
              <div className="absolute -top-3 -left-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-teal-400/40 text-teal-300 text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-float-gentle">
                <Camera className="w-3.5 h-3.5 text-teal-400" />
                <span>In-Person Visits Welcomed</span>
              </div>

              {/* Floating Badge (Bottom Right) */}
              <div className="absolute -bottom-3 -right-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-sky-400/40 text-sky-300 text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-float-reverse">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>Fresh Pallets Daily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Filters in stylized aquatic bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply">
            <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/30'
                    : 'bg-slate-100/80 text-slate-600 border border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Photo Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-group">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => setSelectedPhoto(item)}
              className={`reveal reveal-fade-up reveal-delay-${(idx % 6) + 1} group cursor-pointer relative bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col`}
            >
              {/* Top aquatic accent bar on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

              {/* Photo Frame */}
              <div className="relative h-60 bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Clean water caustics overlay shimmer */}
                <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay">
                  <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/95 text-slate-900 shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs border border-white/10">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Caption with Water Texture & Faint Shrimp Watermark */}
              <div className="relative p-5 flex-1 flex flex-col justify-between overflow-hidden">
                {/* Subtle water caustics background */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply">
                  <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                {/* Faint shrimp watermark */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none opacity-[0.035] group-hover:opacity-[0.08] transition-opacity">
                  <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-display font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-semibold relative z-10">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-sky-500" />
                    <span>Click to view photo</span>
                  </span>
                  <span>SR Aqua Store</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] bg-slate-900 overflow-hidden flex items-center justify-center relative">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[60vh] object-cover"
              />
              <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay">
                <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                  {selectedPhoto.category}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedPhoto.description}
              </p>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-500">
                  Location: Ramayapatnam Road, Ulavapadu
                </span>
                <a
                  href="tel:9493243244"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors"
                >
                  <PhoneCallIcon className="w-3.5 h-3.5" />
                  <span>Call Store: 9493243244</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. In-Person Store Visit Invitation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-slate-950 text-white border border-emerald-500/30 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl group">
          {/* Real Aquaculture Facility & Showroom Photo Backdrop */}
          <div className="absolute inset-0 z-0">
            <img
              src={galleryFacilityBanner}
              alt="SR Aqua Feeds showroom facility on Ramayapatnam Road"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-50"
            />
            {/* Clean water caustics overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
              <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-emerald-950/85 to-slate-950/80" />
          </div>

          <div className="space-y-3 text-center lg:text-left max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>Direct Pond Consultation & Physical Store</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Visiting from your farm site?
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              We welcome aquaculture farmers to inspect product batches, check manufacturing dates, and discuss feeding protocols in person with Utukuri Rambabu at Chakicherla Peddapattapu Palem, Ramayapatnam Road.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 relative z-10 flex-shrink-0">
            <a
              href="tel:9493243244"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <PhoneCallIcon className="w-4 h-4 text-slate-950" />
              <span>Call: 9493243244</span>
            </a>
            <a
              href="https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20I%20am%20coming%20to%20visit%20your%20shop."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-slate-950" />
              <span>Notify on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
