import React from 'react';
import logoEmblem from '../assets/logo-emblem.png';
import logoText from '../assets/logo-text.png';
import logoTextLight from '../assets/logo-text-light.png';

interface BrandLogoProps {
  variant?: 'full' | 'horizontal' | 'compact' | 'emblem' | 'hero';
  lightMode?: boolean; // if true, text is adapted for dark backgrounds
  className?: string;
  height?: number | string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  lightMode = false,
  className = '',
}) => {
  // Variant: Emblem Only (First image alone with background removed, for FAB, mobile mark, etc.)
  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={logoEmblem}
          alt="SR Aqua Feeds & Needs Emblem Logo"
          className="w-full h-full object-contain filter drop-shadow-sm"
          loading="eager"
        />
      </div>
    );
  }

  // Sizing configurations based on variant
  const getSizes = () => {
    switch (variant) {
      case 'hero':
        return {
          emblemClass: 'h-16 sm:h-20 md:h-24 w-auto',
          textClass: 'h-12 sm:h-15 md:h-18 w-auto',
          gapClass: 'gap-3 sm:gap-4 md:gap-5',
        };
      case 'compact':
        return {
          emblemClass: 'h-9 sm:h-10 w-auto',
          textClass: 'h-6 sm:h-7 w-auto',
          gapClass: 'gap-2 sm:gap-2.5',
        };
      case 'horizontal':
      case 'full':
      default:
        return {
          emblemClass: 'h-10 sm:h-12 md:h-13.5 w-auto',
          textClass: 'h-7 sm:h-8.5 md:h-9.5 w-auto',
          gapClass: 'gap-2.5 sm:gap-3.5',
        };
    }
  };

  const { emblemClass, textClass, gapClass } = getSizes();
  const activeTextSrc = lightMode ? logoTextLight : logoText;

  return (
    <div
      className={`inline-flex items-center ${gapClass} select-none transition-transform ${className}`}
      role="img"
      aria-label="SR Aqua Feeds & Needs"
    >
      {/* 1. First Image as Logo (Emblem with transparent background) */}
      <img
        src={logoEmblem}
        alt="SR Aqua Logo"
        className={`${emblemClass} object-contain flex-shrink-0 filter drop-shadow-xs transition-transform hover:scale-105 duration-200`}
        loading="eager"
      />

      {/* 2. Second Image placed beside logo (Typography with transparent background) */}
      <img
        src={activeTextSrc}
        alt="Aqua Feeds & Needs - Nourishing Life. Growing Future."
        className={`${textClass} object-contain flex-shrink-0 transition-opacity`}
        loading="eager"
      />
    </div>
  );
};
