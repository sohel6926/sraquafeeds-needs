import React, { useState } from 'react';
import { Product } from '../types.ts';
import { Package, Droplets, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './Icons.tsx';

import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';

interface ProductCardProps {
  product: Product;
  onSelect?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // If the user clicked directly on the WhatsApp link, don't trigger page change
    if ((e.target as HTMLElement).closest('.stop-propagation')) {
      return;
    }
    if (onSelect) {
      onSelect(product.id);
    } else {
      window.location.hash = `product?id=${product.id}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onSelect) {
        onSelect(product.id);
      } else {
        window.location.hash = `product?id=${product.id}`;
      }
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`View full details and specs for ${product.name}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-500/80 transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 select-none text-left"
    >
      {/* Top subtle aquatic accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      {/* Popular / Recommended Badge */}
      {product.isPopular && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wide uppercase border border-emerald-400/40">
            Top Demand
          </span>
        </div>
      )}

      {/* Category Pill Over Image */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-block bg-slate-900/80 backdrop-blur-md text-emerald-200 border border-emerald-400/30 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
          {product.category}
        </span>
      </div>

      {/* Product Image Slot */}
      <div className="relative w-full h-48 sm:h-52 bg-gradient-to-tr from-slate-100 to-sky-50 overflow-hidden flex items-center justify-center">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 text-xs font-medium">
            Loading...
          </div>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Clean water caustics shimmer overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay group-hover:opacity-30 transition-opacity">
          <img
            src={cleanWaterTexture}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Packaging spec badge */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-medium border border-white/10">
          <Package className="w-3 h-3 text-emerald-400" />
          <span>Pack: {product.packaging}</span>
        </div>

        {/* Curiosity Micro-Badge floating bottom-right of image */}
        {product.curiosityBadge && (
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold border border-emerald-400/40 shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
            <span>{product.curiosityBadge}</span>
          </div>
        )}
      </div>

      {/* Product Card Body: Curiosity-Oriented, Clean & Compelling */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between relative bg-white">
        {/* Faint Stylized Prawn Silhouette Watermark in Card Body */}
        <div className="absolute -bottom-3 -right-3 w-24 h-24 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-105 transition-all duration-300">
          <img
            src={prawnIllustration}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </div>

        <div className="relative z-10 space-y-2.5">
          {/* Product Name */}
          <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-emerald-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Curiosity Highlight / Punchline */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/70">
            <Droplets className="w-3 h-3 text-sky-500 flex-shrink-0" />
            <span className="truncate">{product.curiosityHighlight || product.tagline}</span>
          </div>

          {/* Short Curiosity Teaser */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {product.tagline}
          </p>
        </div>

        {/* Interactive CTA Bar & Quick Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 relative z-10">
          {/* View Details Prompt */}
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">
            <span>View Details & Specs</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Quick WhatsApp Link without opening details */}
          <a
            href={`https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20I'm%20interested%20in%20${encodeURIComponent(product.name)}.%20Please%20share%20current%20batch%20quote.`}
            target="_blank"
            rel="noopener noreferrer"
            title="Instant WhatsApp Quote"
            onClick={(e) => e.stopPropagation()}
            className="stop-propagation w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white flex items-center justify-center transition-colors border border-emerald-200/80 shadow-2xs"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
