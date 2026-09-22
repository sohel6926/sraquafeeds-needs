import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'emblem' | 'hero';
  lightMode?: boolean; // if true, text is light/white for dark backgrounds
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  lightMode = false,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Emblem: Green Shrimp + Blue 'SR' + Water Droplet + Green Leaf */}
      <div className="relative flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          className={
            variant === 'hero'
              ? 'w-16 h-16 md:w-20 md:h-20 drop-shadow-md'
              : variant === 'compact'
              ? 'w-9 h-9'
              : 'w-11 h-11 md:w-12 md:h-12'
          }
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Blue Gradient */}
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>

            {/* Green Gradient */}
            <linearGradient id="greenGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Water Drop Accent Gradient */}
            <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Leaf Accent Gradient */}
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>

          {/* Background subtle circle ring */}
          <circle cx="50" cy="50" r="46" fill="#f0fdf4" stroke="url(#blueGrad)" strokeWidth="2.5" strokeOpacity="0.4" />

          {/* Green Shrimp Stylized Body curving from bottom-left to top-right */}
          <path
            d="M 24,68 C 16,56 18,36 32,24 C 44,14 62,14 74,24 C 77,27 80,33 78,37 C 76,41 71,40 68,36 C 58,26 42,26 34,36 C 26,45 25,58 32,68 C 34,71 31,75 27,74 C 25,73 24,71 24,68 Z"
            fill="url(#greenGrad)"
          />

          {/* Shrimp segmented dorsal plates & feelers */}
          <path
            d="M 74,24 C 82,18 89,14 94,12 C 95,11 96,13 95,14 C 90,18 84,23 78,28 Z"
            fill="#059669"
          />
          <path
            d="M 76,27 C 84,24 90,22 95,21 C 96,21 96,22 95,23 C 90,26 83,29 78,31 Z"
            fill="#10b981"
          />

          {/* Shrimp tail fan segments */}
          <path
            d="M 23,70 C 18,74 15,79 13,85 C 16,84 21,80 24,76 Z"
            fill="#10b981"
          />
          <path
            d="M 25,73 C 21,79 20,84 20,90 C 23,87 27,82 28,76 Z"
            fill="#059669"
          />

          {/* Stylized Blue 'S' & 'R' Monogram */}
          {/* Blue 'R' bold & modern */}
          <path
            d="M 46,36 L 57,36 C 64,36 68,39 68,45 C 68,50 64,53 58,54 L 68,72 L 60,72 L 52,56 L 46,56 L 46,72 L 39,72 L 39,36 L 46,36 Z M 46,42 L 46,50 L 56,50 C 59,50 61,48 61,45 C 61,42 59,42 56,42 L 46,42 Z"
            fill="url(#blueGrad)"
          />

          {/* Blue 'S' accent intertwined subtly */}
          <path
            d="M 33,48 C 34,44 38,42 42,42 C 43,42 44,42 45,43 L 45,47 C 44,46 43,46 42,46 C 39,46 37,47 37,49 C 37,51 39,52 42,53 C 47,55 49,57 49,61 C 49,66 45,69 40,69 C 36,69 33,67 32,65 L 34,61 C 35,63 38,64 40,64 C 43,64 44,63 44,60 C 44,58 42,57 39,56 C 35,54 33,52 33,48 Z"
            fill="#0284c7"
            opacity="0.9"
          />

          {/* Blue Water Drop Accent at Top Center */}
          <path
            d="M 50,18 C 50,18 45,25 45,29 C 45,32 47,34 50,34 C 53,34 55,32 55,29 C 55,25 50,18 50,18 Z"
            fill="url(#dropGrad)"
          />

          {/* Green Leaf Accent sprouting from the base/side */}
          <path
            d="M 68,62 C 73,59 78,59 82,62 C 81,67 77,71 72,71 C 70,71 68,69 68,62 Z"
            fill="url(#leafGrad)"
          />
          <path
            d="M 69,63 C 73,65 77,66 80,64"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Floating tiny bubble droplets */}
          <circle cx="30" cy="28" r="2" fill="#38bdf8" />
          <circle cx="70" cy="48" r="1.5" fill="#38bdf8" />
        </svg>
      </div>

      {/* Typography Block */}
      {variant !== 'emblem' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-display font-extrabold tracking-tight ${
                variant === 'hero'
                  ? 'text-2xl sm:text-3xl md:text-4xl'
                  : variant === 'compact'
                  ? 'text-lg font-bold'
                  : 'text-xl md:text-2xl'
              } ${lightMode ? 'text-white' : 'text-slate-900'}`}
            >
              <span className="text-emerald-600">SR</span>{' '}
              <span className="text-sky-600">AQUA</span>
            </span>
            <span
              className={`font-semibold uppercase tracking-wider ${
                variant === 'hero'
                  ? 'text-xs sm:text-sm px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600'
                  : 'text-[10px] md:text-xs text-slate-500 font-medium'
              }`}
            >
              Feeds & Needs
            </span>
          </div>

          {(variant === 'full' || variant === 'hero') && (
            <p
              className={`font-sans tracking-wide mt-1 text-[11px] sm:text-xs font-medium ${
                lightMode ? 'text-sky-200' : 'text-emerald-700'
              }`}
            >
              &ldquo;Nourishing Life. Growing Future.&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  );
};
