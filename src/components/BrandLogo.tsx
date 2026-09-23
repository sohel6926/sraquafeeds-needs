import React from 'react';

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
  // Common vector gradients and defs used for the SR Aqua Feeds & Needs brand identity
  const LogoDefs = () => (
    <defs>
      {/* 3D Green Monogram 'S' Gradients */}
      <linearGradient id="srGreen3D" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="35%" stopColor="#22c55e" />
        <stop offset="75%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#0f5127" />
      </linearGradient>
      <linearGradient id="srGreenBevel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
      </linearGradient>

      {/* 3D Blue Monogram 'R' Gradients */}
      <linearGradient id="srBlue3D" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="30%" stopColor="#0284c7" />
        <stop offset="75%" stopColor="#1d4ed8" />
        <stop offset="100%" stopColor="#0f2b6b" />
      </linearGradient>
      <linearGradient id="srBlueBevel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
      </linearGradient>

      {/* Vannamei Shrimp Gradients */}
      <linearGradient id="srShrimpBody" x1="0.2" y1="0.1" x2="0.8" y2="0.9">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="35%" stopColor="#34d399" />
        <stop offset="70%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>
      <linearGradient id="srShrimpHighlight" x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
      </linearGradient>

      {/* Rolling Aquaculture Waves Gradients */}
      <linearGradient id="srWaveCyan" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="40%" stopColor="#38bdf8" />
        <stop offset="80%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="srWaveDeep" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0369a1" />
        <stop offset="50%" stopColor="#1d4ed8" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>

      {/* Typography Gradients */}
      <linearGradient id="srAquaFeedsGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={lightMode ? '#7dd3fc' : '#1e3a8a'} />
        <stop offset="45%" stopColor={lightMode ? '#38bdf8' : '#1d4ed8'} />
        <stop offset="100%" stopColor={lightMode ? '#bae6fd' : '#0b1b4f'} />
      </linearGradient>
      <linearGradient id="srAndNeedsGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={lightMode ? '#4ade80' : '#16a34a'} />
        <stop offset="50%" stopColor={lightMode ? '#86efac' : '#15803d'} />
        <stop offset="100%" stopColor={lightMode ? '#4ade80' : '#16a34a'} />
      </linearGradient>

      {/* Sprouting Green Leaves */}
      <linearGradient id="srLeafGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="60%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>

      {/* Splashing Water Droplets */}
      <linearGradient id="srSplashGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="60%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
    </defs>
  );

  // SVG Emblem Mark (S + R + Vannamei Shrimp + Ocean Waves + Leaves + Splashing Droplets)
  const EmblemMark = () => (
    <g id="sr-emblem-mark">
      {/* S Shadow Depth */}
      <path
        d="M 235 95 C 190 70, 135 85, 120 125 C 105 165, 130 200, 185 210 C 230 220, 245 235, 235 260 C 220 295, 160 300, 125 280 L 105 315 C 150 345, 245 340, 275 285 C 295 245, 270 200, 215 190 C 175 180, 155 165, 165 140 C 175 115, 210 110, 240 125 Z"
        fill="#0c4a22"
        opacity="0.35"
      />

      {/* S Main Body */}
      <path
        d="M 230 90 C 185 65, 130 80, 115 120 C 100 160, 125 195, 180 205 C 225 215, 240 230, 230 255 C 215 290, 155 295, 120 275 L 100 310 C 145 340, 240 335, 270 280 C 290 240, 265 195, 210 185 C 170 175, 150 160, 160 135 C 170 110, 205 105, 235 120 Z"
        fill="url(#srGreen3D)"
      />

      {/* S Bevel Highlight */}
      <path
        d="M 230 90 C 185 65, 130 80, 115 120 C 120 100, 175 80, 220 98 Z"
        fill="url(#srGreenBevel)"
      />

      {/* R Shadow Depth */}
      <path
        d="M 285 95 L 390 95 C 445 95, 480 125, 480 175 C 480 215, 455 240, 415 250 L 485 340 L 425 340 L 365 260 L 335 260 L 335 340 L 285 340 Z M 335 140 L 335 215 L 385 215 C 415 215, 430 200, 430 175 C 430 150, 415 140, 385 140 Z"
        fill="#091e4a"
        opacity="0.35"
        transform="translate(4, 5)"
      />

      {/* R Main Body */}
      <path
        d="M 285 90 L 390 90 C 445 90, 480 120, 480 170 C 480 210, 455 235, 415 245 L 485 335 L 425 335 L 365 255 L 335 255 L 335 335 L 285 335 Z M 335 135 L 335 210 L 385 210 C 415 210, 430 195, 430 170 C 430 145, 415 135, 385 135 Z"
        fill="url(#srBlue3D)"
      />

      {/* R Bevel Highlight on Loop */}
      <path
        d="M 285 90 L 390 90 C 445 90, 475 115, 478 140 C 470 120, 435 105, 385 105 L 300 105 L 300 135 L 285 135 Z"
        fill="url(#srBlueBevel)"
      />

      {/* Rolling Water Waves at Base */}
      <path
        d="M 55 295 C 135 250, 210 325, 320 280 C 390 250, 445 285, 485 305 C 450 325, 380 295, 310 320 C 205 355, 125 280, 55 295 Z"
        fill="url(#srWaveDeep)"
      />
      <path
        d="M 45 285 C 125 240, 205 315, 315 270 C 395 235, 445 275, 490 295 C 440 315, 375 280, 305 305 C 195 345, 115 265, 45 285 Z"
        fill="url(#srWaveCyan)"
      />
      <path
        d="M 60 280 C 135 245, 215 305, 310 265 C 375 235, 430 265, 475 285 C 440 270, 380 250, 320 275 C 220 315, 140 260, 60 280 Z"
        fill="#7dd3fc"
        opacity="0.9"
      />
      <path
        d="M 80 275 C 145 245, 215 295, 305 260 C 355 240, 415 255, 460 275 C 425 262, 370 248, 315 268 C 230 300, 150 258, 80 275 Z"
        fill="#ffffff"
        opacity="0.8"
      />

      {/* Water Droplet Splashes (Top-Right) */}
      <g id="sr-splash-drops" fill="url(#srSplashGrad)">
        <path d="M 475 80 C 475 80, 495 95, 495 105 C 495 116, 486 125, 475 125 C 464 125, 455 116, 455 105 C 455 95, 475 80, 475 80 Z" />
        <circle cx="470" cy="100" r="3" fill="#ffffff" opacity="0.7" />
        <path d="M 495 65 C 495 65, 510 75, 510 85 C 510 93, 503 100, 495 100 C 487 100, 480 93, 480 85 C 480 75, 495 65, 495 65 Z" />
        <path d="M 520 85 C 520 85, 532 95, 530 102 C 528 108, 521 112, 515 110 C 509 108, 508 101, 510 95 C 512 89, 520 85, 520 85 Z" />
        <circle cx="460" cy="140" r="4.5" />
        <circle cx="488" cy="132" r="3" />
      </g>

      {/* Sprouting Green Eco Leaves (Bottom-Right) */}
      <g id="sr-leaves">
        <path
          d="M 455 250 C 455 210, 495 195, 500 230 C 502 265, 465 280, 455 250 Z"
          fill="url(#srLeafGrad)"
        />
        <path d="M 457 252 Q 478 232 498 228" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M 470 260 C 475 240, 505 240, 505 260 C 505 278, 480 282, 470 260 Z"
          fill="url(#srLeafGrad)"
        />
        <path d="M 473 261 Q 488 252 502 256" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Vannamei Shrimp Leaping in Center */}
      <g id="sr-shrimp">
        {/* Antennae sweeping gracefully */}
        <path
          d="M 255 125 C 240 100, 215 70, 220 50 C 225 35, 255 50, 275 80"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 258 128 C 235 95, 200 65, 205 40 C 210 20, 245 35, 280 75"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 262 135 C 248 115, 235 90, 245 75 C 255 60, 270 70, 285 95"
          fill="none"
          stroke="#15803d"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Rostrum */}
        <path d="M 240 120 L 265 128 L 260 135 L 235 124 Z" fill="#15803d" />

        {/* Carapace (Head) */}
        <path
          d="M 250 122 C 275 125, 320 135, 335 155 C 342 165, 340 178, 330 185 C 315 195, 280 190, 260 175 C 245 162, 240 145, 250 122 Z"
          fill="url(#srShrimpBody)"
        />
        {/* Eye */}
        <circle cx="282" cy="138" r="5" fill="#064e3b" stroke="#ffffff" strokeWidth="1" />
        <circle cx="280.5" cy="136.5" r="1.5" fill="#ffffff" />

        {/* Walking Legs */}
        <g stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M 285 180 L 270 205 L 260 215" />
          <path d="M 298 182 L 285 210 L 278 220" />
          <path d="M 312 182 L 305 212 L 298 222" />
        </g>

        {/* Segmented Abdomen */}
        <path
          d="M 330 160 C 350 170, 365 185, 360 200 C 355 212, 335 210, 320 195 C 310 185, 315 170, 330 160 Z"
          fill="url(#srShrimpBody)"
        />
        <path
          d="M 355 190 C 370 202, 380 220, 372 235 C 365 245, 345 240, 332 225 C 325 215, 335 198, 355 190 Z"
          fill="url(#srShrimpBody)"
        />
        <path
          d="M 368 225 C 378 238, 378 255, 368 268 C 358 278, 340 270, 332 255 C 328 245, 345 230, 368 225 Z"
          fill="url(#srShrimpBody)"
        />
        <path
          d="M 362 258 C 368 272, 362 288, 350 298 C 340 305, 325 295, 322 282 C 320 272, 338 260, 362 258 Z"
          fill="url(#srShrimpBody)"
        />
        <path
          d="M 345 290 C 348 302, 338 315, 325 320 C 315 325, 305 315, 305 305 C 305 295, 325 285, 345 290 Z"
          fill="url(#srShrimpBody)"
        />

        {/* Segment Divides */}
        <path d="M 330 160 C 320 175, 320 190, 320 195" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" />
        <path d="M 355 190 C 342 205, 335 220, 332 225" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" />
        <path d="M 368 225 C 352 240, 340 250, 332 255" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" />
        <path d="M 362 258 C 345 272, 330 280, 322 282" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" />

        {/* Tail Fan */}
        <g fill="url(#srShrimpBody)">
          <path d="M 315 315 C 300 325, 275 330, 260 338 C 275 328, 298 318, 315 315 Z" />
          <path d="M 320 318 C 305 335, 280 348, 265 355 C 285 342, 305 328, 320 318 Z" fill="#047857" />
          <path d="M 325 320 C 315 340, 295 355, 275 362 C 295 348, 318 335, 325 320 Z" />
        </g>

        {/* Dorsal Specular Spine Highlight */}
        <path
          d="M 270 132 C 305 140, 355 170, 368 215 C 375 240, 370 270, 348 295"
          fill="none"
          stroke="url(#srShrimpHighlight)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
    </g>
  );

  // Typography Group
  const TypographyGroup = () => (
    <g id="sr-typography-group">
      {/* "AQUA FEEDS" */}
      <text
        x="300"
        y="420"
        textAnchor="middle"
        fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="62"
        letterSpacing="5"
        fill="url(#srAquaFeedsGrad)"
      >
        AQUA FEEDS
      </text>

      {/* "— AND NEEDS —" */}
      <line
        x1="85"
        y1="462"
        x2="160"
        y2="462"
        stroke={lightMode ? '#4ade80' : '#16a34a'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="300"
        y="472"
        textAnchor="middle"
        fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="36"
        letterSpacing="9"
        fill="url(#srAndNeedsGrad)"
      >
        AND NEEDS
      </text>
      <line
        x1="440"
        y1="462"
        x2="515"
        y2="462"
        stroke={lightMode ? '#4ade80' : '#16a34a'}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* "NOURISHING LIFE. GROWING FUTURE." */}
      <text
        x="300"
        y="515"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="19"
        letterSpacing="3.5"
        fill={lightMode ? '#e2e8f0' : '#0f172a'}
      >
        NOURISHING LIFE. GROWING FUTURE.
      </text>

      {/* Curved Bottom Swoosh Underline */}
      <path
        d="M 180 535 C 240 550, 360 550, 420 535 C 365 545, 235 545, 180 535 Z"
        fill="url(#srWaveCyan)"
      />
    </g>
  );

  // Variant: Emblem Only (Square icon for FAB, Mobile, Buttons)
  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <svg
          viewBox="30 25 510 350"
          className="w-full h-full object-contain filter drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <LogoDefs />
          <EmblemMark />
        </svg>
      </div>
    );
  }

  // Variant: Compact / Horizontal (Emblem on left + Typography on right)
  if (variant === 'compact' || variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <div className="relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12">
          <svg
            viewBox="30 25 510 350"
            className="w-full h-full object-contain"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <LogoDefs />
            <EmblemMark />
          </svg>
        </div>

        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display text-lg sm:text-xl font-black tracking-tight ${
                lightMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              <span className="text-emerald-500">SR</span>{' '}
              <span className="text-sky-500">AQUA</span>
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Feeds & Needs
            </span>
          </div>
          <span
            className={`text-[10px] tracking-wider font-semibold uppercase ${
              lightMode ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Nourishing Life. Growing Future.
          </span>
        </div>
      </div>
    );
  }

  // Variant: Full Official Logo (Exactly matches provided image, with 100% transparent background)
  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="30 25 540 540"
        className={
          variant === 'hero'
            ? 'w-64 h-64 sm:w-80 sm:h-80'
            : 'h-12 sm:h-14 md:h-16 w-auto max-w-full'
        }
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <LogoDefs />
        <EmblemMark />
        <TypographyGroup />
      </svg>
    </div>
  );
};
