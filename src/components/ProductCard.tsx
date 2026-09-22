import React, { useState } from 'react';
import { Product } from '../types.ts';
import { WhatsAppIcon, PhoneCallIcon } from './Icons.tsx';
import { CheckCircle, Package, Droplets } from 'lucide-react';

import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const encodedProductName = encodeURIComponent(product.name);
  const whatsappUrl = `https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20I'm%20interested%20in%20ordering%20${encodedProductName}.%20Please%20share%20current%20batch%20pricing%20and%20availability.`;
  const callUrl = 'tel:9493243244';

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-400/80 transition-all duration-300 overflow-hidden"
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
        <span className="inline-block bg-slate-900/75 backdrop-blur-md text-emerald-200 border border-emerald-400/30 text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
          {product.category}
        </span>
      </div>

      {/* Product Image Slot */}
      <div className="relative w-full h-52 sm:h-56 bg-gradient-to-tr from-slate-100 to-sky-50 overflow-hidden flex items-center justify-center">
        {/* Placeholder skeleton before load */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 text-xs font-medium">
            Loading {product.name}...
          </div>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Clean water caustics shimmer overlay on product photo */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay group-hover:opacity-30 transition-opacity">
          <img
            src={cleanWaterTexture}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Packaging spec label bottom of photo */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium border border-white/10">
          <Package className="w-3.5 h-3.5 text-emerald-400" />
          <span>Pack: {product.packaging}</span>
        </div>
      </div>

      {/* Product Content Body with Water Texture & Faint Shrimp Watermark */}
      <div className="p-5 flex-1 flex flex-col justify-between relative bg-white">
        {/* Subtle Water Caustics Texture in Card Body */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply overflow-hidden">
          <img
            src={cleanWaterTexture}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Faint Stylized Prawn Silhouette Watermark in Card Body */}
        <div className="absolute -bottom-4 -right-4 w-28 h-28 pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] group-hover:scale-105 transition-all duration-300">
          <img
            src={prawnIllustration}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </div>

        <div className="relative z-10">
          {/* Product Name */}
          <h3 className="font-display font-bold text-slate-900 text-lg leading-snug group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>

          {/* 1-Line Description / Tagline */}
          <p className="mt-1 text-xs sm:text-sm font-medium text-emerald-700 leading-relaxed flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-sky-500 inline flex-shrink-0" />
            <span>{product.tagline}</span>
          </p>

          {/* Short paragraph description */}
          <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Key Benefits Bullet List */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5">
            {product.keyBenefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="leading-tight">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Action Buttons (WhatsApp & Call) with Micro-Animations */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5 relative z-10">
          {/* WhatsApp Button with actual WhatsApp brand icon & hover micro-animation */}
          <a
            id={`btn-whatsapp-${product.id}`}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold tracking-wide shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group/wa"
          >
            <WhatsAppIcon className="w-4 h-4 text-white group-hover/wa:scale-115 transition-transform duration-200" />
            <span>WhatsApp</span>
          </a>

          {/* Call Button with actual Phone icon & hover micro-animation */}
          <a
            id={`btn-call-${product.id}`}
            href={callUrl}
            aria-label={`Call to order ${product.name}`}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-sky-300 hover:border-sky-500 bg-sky-50/80 hover:bg-sky-500 active:bg-sky-700 text-sky-800 hover:text-white text-xs font-semibold tracking-wide shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group/call"
          >
            <PhoneCallIcon className="w-3.5 h-3.5 text-sky-600 group-hover/call:text-white group-hover/call:scale-115 transition-all duration-200" />
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};
