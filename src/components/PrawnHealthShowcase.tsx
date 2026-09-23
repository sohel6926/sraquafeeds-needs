import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Droplets,
  ShieldCheck,
  Layers,
  Wind,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Activity,
  Play,
  Pause,
  Maximize2,
} from 'lucide-react';
import { WhatsAppIcon } from './Icons.tsx';

// Image assets
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';
import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import productsFeedBanner from '../assets/images/products_feed_banner_1790110292560.jpg';
import prawnPatternBg from '../assets/images/prawn_pattern_bg_1790103865798.jpg';

interface ShowcaseItem {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  summary: string;
  extendedPoints: string[];
  metrics: { label: string; value: string }[];
  image: string;
  imageAlt: string;
  heroTag: string;
  heroHighlight: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'minerals',
    title: 'Ionic Mineral Balance (Ca:Mg:K)',
    badge: 'Ratio 1:3:1',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    icon: <Droplets className="w-4 h-4 text-emerald-300" />,
    summary:
      'Maintains crucial 1:3:1 ratio to prevent soft-shell, white muscle syndrome, and molt mortality.',
    extendedPoints: [
      'Formulated for 2–10 ppt and 15–35 ppt brackish water.',
      'Fast cuticle hardening in 4–6 hours post-ecdysis.',
      'Bio-available Ca & Mg to prevent netting cramps.',
    ],
    metrics: [
      { label: 'Ratio (Ca:Mg:K)', value: '1 : 3 : 1' },
      { label: 'Hardening', value: '< 6 Hrs' },
      { label: 'Survival Boost', value: '+35%' },
    ],
    image: prawnIllustration,
    imageAlt: 'Vannamei shrimp ionic mineral balance illustration',
    heroTag: 'Target DOC 30 – 120+ Days',
    heroHighlight: 'Mineral balance preventing soft-shell & molt mortality.',
  },
  {
    id: 'probiotics',
    title: 'Gut Probiotics & Enzymes',
    badge: 'Bacillus > 5×10⁹ CFU',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
    icon: <ShieldCheck className="w-4 h-4 text-sky-300" />,
    summary:
      'Multi-strain Bacillus colonizes gut mucosa to resist Vibrio pathogens, EHP, and running mortality.',
    extendedPoints: [
      'Competitive exclusion against luminous Vibrio bacteria.',
      'Active protease and amylase accelerate digestion.',
      'Preserves hepatopancreas lipid fullness.',
    ],
    metrics: [
      { label: 'Spore Count', value: '5×10⁹ CFU/g' },
      { label: 'Vibrio Control', value: '94.8%' },
      { label: 'Gut Action', value: '< 90 Mins' },
    ],
    image: cleanWaterTexture,
    imageAlt: 'Aquaculture gut probiotics and clean water biosecurity',
    heroTag: 'Digestive Bio-Defense',
    heroHighlight: 'Microbial shield coating hepatopancreas & gut mucosa.',
  },
  {
    id: 'feeds',
    title: 'High-Stability Feed Pellets',
    badge: '2+ Hours Water Stability',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
    icon: <Layers className="w-4 h-4 text-teal-300" />,
    summary:
      'Sustains 2+ hours water stability, preventing bottom soil deterioration and maximizing assimilation.',
    extendedPoints: [
      'Hydrothermal marine binder eliminates rapid crumble & dusting.',
      'Lowers feed conversion ratio (FCR) to 1.18–1.25.',
      'High attractant squid & krill meal for fast clearance.',
    ],
    metrics: [
      { label: 'Water Stability', value: '120+ Mins' },
      { label: 'Protein', value: '38%–40%' },
      { label: 'Target FCR', value: '1.20 Low' },
    ],
    image: productsFeedBanner,
    imageAlt: 'High-stability shrimp feed pellets and marine nutrition',
    heroTag: 'Zero Pond Bottom Leaching',
    heroHighlight: 'Pellets hold integrity for 2+ hours to keep check-trays clean.',
  },
  {
    id: 'gases',
    title: 'Toxic Gas Neutralization',
    badge: 'Instant NH₃ & H₂S Detox',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    icon: <Wind className="w-4 h-4 text-amber-300" />,
    summary:
      'Concentrated Yucca and active oxygen donors instantly detoxify unionized Ammonia (NH3) & H2S.',
    extendedPoints: [
      'Steroidal saponins bind gaseous toxic Ammonia.',
      'Emergency dissolved oxygen donors prevent pre-dawn asphyxiation.',
      'Eliminates foul sulfur odors and stabilizes bottom soil ORP.',
    ],
    metrics: [
      { label: 'Ammonia Drop', value: '< 2 Hours' },
      { label: 'DO Elevation', value: '+3.5 ppm' },
      { label: 'Yucca Purity', value: '100% Extract' },
    ],
    image: prawnPatternBg,
    imageAlt: 'Aquaculture pond bottom soil gas neutralization and water treatment',
    heroTag: 'Emergency Sludge Detox',
    heroHighlight: 'Quick-acting Yucca saponins binding toxic unionized gases.',
  },
];

interface PrawnHealthShowcaseProps {
  onNavigateProducts?: () => void;
}

export const PrawnHealthShowcase: React.FC<PrawnHealthShowcaseProps> = ({
  onNavigateProducts,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = SHOWCASE_ITEMS[activeIndex];

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      triggerTransition((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying]);

  const triggerTransition = (updater: number | ((prev: number) => number)) => {
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(updater);
      setAnimating(false);
    }, 150);
  };

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setIsAutoPlaying(false);
    triggerTransition(index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Compact Container: Fits comfortably within one screen viewport without scrolling overflow */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-emerald-950 text-white p-5 sm:p-7 lg:p-8 overflow-hidden shadow-2xl border border-slate-800">
        {/* Subtle patterned background - NO MASK, clean and luminous */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <img
            src={prawnPatternBg}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ambient lighting glows */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Compact Header Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                <span>Science of Aquaculture Success</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                Protecting Prawn Health from Hatchery to Harvest
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm line-clamp-1 sm:line-clamp-none">
                Precise water ionic balance, active probiotic colonization, and low-leaching feeds stocked for every farming phase.
              </p>
            </div>

            {/* Autoplay & Play/Pause Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-slate-300 flex-shrink-0">
              <span className="text-[11px] font-medium hidden md:inline">
                {isAutoPlaying ? 'Auto-cycling' : 'Paused'}
              </span>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-1 rounded-full hover:bg-white/10 text-emerald-400 transition-colors cursor-pointer"
                title={isAutoPlaying ? 'Pause rotation' : 'Resume auto rotation'}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Interactive Dual-Panel Showcase: Left is BIGGER & HIGHLIGHTED, Right is COMPACT ACCORDION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
            
            {/* LEFT: ENLARGED & HIGH-GLOW HIGHLIGHTED IMAGE DISPLAY (User Request: Increase size & highlight) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="relative w-full rounded-2xl p-1 bg-gradient-to-tr from-emerald-500/40 via-teal-400/40 to-sky-400/40 shadow-[0_0_35px_rgba(52,211,153,0.3)] ring-1 ring-emerald-400/50 transition-all duration-300">
                
                {/* Visual Image Container with Enhanced Size & Zero Dark Mask */}
                <div className="relative w-full h-[260px] sm:h-[310px] lg:h-[340px] rounded-xl overflow-hidden bg-white flex items-center justify-center group">
                  
                  {/* UNMASKED, FULLY BRIGHT & HIGHLIGHTED IMAGE */}
                  <img
                    key={activeItem.id}
                    src={activeItem.image}
                    alt={activeItem.imageAlt}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover mix-blend-multiply transition-all duration-500 ease-out ${
                      animating
                        ? 'opacity-60 scale-95'
                        : 'opacity-100 scale-100'
                    }`}
                  />

                  {/* Corner Visual Brackets for Scientific Biological HUD Highlight */}
                  <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-emerald-400 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-emerald-400 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-emerald-400 pointer-events-none" />

                  {/* Floating Top Telemetry Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-400/50 text-[11px] font-bold text-emerald-300 shadow-lg">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>{activeItem.heroTag}</span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{activeItem.badge}</span>
                  </div>

                  {/* Clean Bottom Glass Info Bar (Does NOT cover the prawn, stays compact at bottom) */}
                  <div className="absolute bottom-3 inset-x-3 bg-slate-950/85 backdrop-blur-md rounded-xl p-2.5 border border-white/15 flex items-center justify-between gap-3 shadow-xl">
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-extrabold text-white truncate flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>{activeItem.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 line-clamp-1 font-medium">
                        {activeItem.heroHighlight}
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 flex-shrink-0 text-right">
                      {activeItem.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="bg-white/10 px-2 py-1 rounded-md text-center">
                          <span className="block text-[9px] text-slate-400 font-bold uppercase">{m.label}</span>
                          <span className="block text-xs font-black text-emerald-400">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Micro Animated Progress Bar when autoplaying */}
                {isAutoPlaying && (
                  <div className="w-full bg-white/10 rounded-full h-1 mt-1 overflow-hidden">
                    <div
                      key={`bar-${activeIndex}`}
                      className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 animate-progress-fill rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: COMPACT ACCORDION LIST (Fits tightly in one view without expanding off page) */}
            <div className="lg:col-span-6 space-y-2.5">
              {SHOWCASE_ITEMS.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(index)}
                    className={`group cursor-pointer rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isActive
                        ? 'bg-slate-900/95 border-emerald-400/80 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/40'
                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                    }`}
                  >
                    {/* Compact Accordion Header */}
                    <div className="p-3 sm:p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            isActive
                              ? 'bg-emerald-500/25 border border-emerald-400/60'
                              : 'bg-white/5 border border-white/10 group-hover:bg-white/10'
                          }`}
                        >
                          {item.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-bold text-xs sm:text-sm transition-colors ${
                              isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide border ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isActive
                              ? 'rotate-180 bg-emerald-500/30 text-emerald-300'
                              : 'bg-white/5 text-slate-400 group-hover:text-white'
                          }`}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Compact Active Body */}
                    {isActive && (
                      <div className="px-3 sm:px-3.5 pb-3.5 pt-0 animate-fade-in">
                        <div className="pt-2 border-t border-white/10 space-y-2">
                          <p className="text-xs text-slate-300 leading-snug">
                            {item.summary}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                            {item.extendedPoints.map((point, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Compact Bottom Action Controls */}
              <div className="pt-2 flex items-center flex-wrap gap-2.5">
                <button
                  onClick={onNavigateProducts}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Browse Products & Feeds</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://wa.me/919493243244?text=Hi%20Utukuri%20Rambabu%2C%20I%20want%20to%20discuss%20feed%20and%20minerals%20for%20my%20prawn%20pond."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ask Rambabu on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
