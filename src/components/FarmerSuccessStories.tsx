import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext.tsx';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Activity,
  Droplets,
  Quote,
  Layers,
  Pause,
  Play,
} from 'lucide-react';
import { WhatsAppIcon } from './Icons.tsx';
import { FarmerStory } from '../types.ts';

export type { FarmerStory };


const FARMER_STORIES: FarmerStory[] = [
  {
    id: 'story-1',
    name: 'K. Venkateswara Rao',
    village: 'Chakicherla Peddapattapu Palem',
    region: 'Ulavapadu Mandal',
    cultureType: 'L. vannamei Semi-Intensive',
    farmSize: '16 Acres (4 Ponds)',
    docDays: 'DOC 112 Harvest',
    stars: 5,
    highlightCategory: 'Minerals & Molting',
    quote:
      'During the full-moon molting cycle in low salinity (4 ppt), my shrimp were struggling with soft-shell and cramping. Rambabu personally analyzed our water hardness and provided the exact Calcium to Magnesium ionic balance minerals. Within 5 hours of broadcasting, the prawns hardened completely with zero mortality.',
    keyOutcomes: [
      { label: 'Survival Rate', value: '91.5%' },
      { label: 'Harvest Count', value: '28 Count/kg' },
      { label: 'Molt Mortality', value: '0% Soft-shell' },
    ],
    verifiedCropCount: '4th Consecutive Crop',
    date: 'Harvested August 2026',
  },
  {
    id: 'story-2',
    name: 'P. Suresh Reddy',
    village: 'Indukurpet Coastal Belt',
    region: 'Nellore Coastal District',
    cultureType: 'Intensive Vannamei Culture',
    farmSize: '22 Acres (6 Ponds)',
    docDays: 'DOC 120 Harvest',
    stars: 5,
    highlightCategory: 'Feed & Low FCR',
    quote:
      'We switched to high-stability shrimp feed from SR Aqua Feeds & Needs. The pellets held together in the check-trays for over two hours without crumbling or leaching into the black bottom soil. Our Feed Conversion Ratio dropped from 1.34 to 1.18, which saved us more than ₹1.8 Lakhs in feed expense this season alone.',
    keyOutcomes: [
      { label: 'Feed Conversion (FCR)', value: '1.18 Ratio' },
      { label: 'Net Biomass', value: '26.4 Metric Tons' },
      { label: 'Feed Savings', value: '₹1.85L Saved' },
    ],
    verifiedCropCount: '3 Crops with SR Aqua',
    date: 'Harvested July 2026',
  },
  {
    id: 'story-3',
    name: 'M. Subrahmanyam',
    village: 'Ramayapatnam Coastal Road',
    region: 'Prakasam / Nellore Border',
    cultureType: 'Vannamei Brackish Pond',
    farmSize: '12 Acres (3 Ponds)',
    docDays: 'DOC 98 Ongoing',
    stars: 5,
    highlightCategory: 'Emergency DO',
    quote:
      'At 2:30 AM during an intense thunderstorm, our coastal grid power tripped and our generator developed a starter fault. Dissolved oxygen plunged below 2.2 ppm. I called Rambabu at 3:00 AM — he dispatched emergency sodium percarbonate oxygen donor tablets to my pond bund within 35 minutes. He literally saved our entire crop from asphyxiation.',
    keyOutcomes: [
      { label: 'Emergency Response', value: '35 Minutes' },
      { label: 'Pond DO Restored', value: '5.8 PPM' },
      { label: 'Crop Saved', value: '100% Retained' },
    ],
    verifiedCropCount: 'Trusted Emergency Partner',
    date: 'September 2026',
  },
  {
    id: 'story-4',
    name: 'Sk. Abdul Kareem',
    village: 'Kota Mandal Coastal Ponds',
    region: 'Nellore District',
    cultureType: 'L. vannamei High Density',
    farmSize: '14 Acres (4 Ponds)',
    docDays: 'DOC 108 Harvest',
    stars: 5,
    highlightCategory: 'Vibrio Defense',
    quote:
      'In our 60th day of culture, neighboring ponds had severe white gut and running mortality (RMS). Rambabu recommended a multi-strain Bacillus gut probiotic combined with Yucca ammonia bind for the pond bottom. Our prawns showed zero luminescence on TCBS agar plates, hepatopancreas remained dark and full, and we harvested 32 count without any dropouts.',
    keyOutcomes: [
      { label: 'Gut Health Score', value: '100% Full' },
      { label: 'TCBS Colony Count', value: 'Zero Luminous' },
      { label: 'Harvest Average', value: '32 Count/kg' },
    ],
    verifiedCropCount: '2 Years Regular Client',
    date: 'June 2026',
  },
  {
    id: 'story-5',
    name: 'Ch. Harikrishna Naidu',
    village: 'Vakadu Aquaculture Zone',
    region: 'Tirupati / Nellore Border',
    cultureType: 'Brackish Water Vannamei',
    farmSize: '18 Acres (5 Ponds)',
    docDays: 'DOC 115 Harvest',
    stars: 5,
    highlightCategory: 'Feed & Low FCR',
    quote:
      'What sets SR Aqua Feeds & Needs apart is total transparency. Every single bag arrives with clear batch codes and proper GST billing. When other dealers push unnecessary high-cost chemical cocktails, Utukuri Rambabu gives honest advice and tells us what NOT to buy. That integrity is why we buy 100% of our feed from him.',
    keyOutcomes: [
      { label: 'Billing Integrity', value: '100% GST Invoiced' },
      { label: 'Final Yield', value: '21.5 Tons' },
      { label: 'Quality Rating', value: 'A+ Grade' },
    ],
    verifiedCropCount: 'Verified Key Account',
    date: 'Harvested July 2026',
  },
  {
    id: 'story-6',
    name: 'G. Ravi Teja',
    village: 'Vidavalur Coastal Creek',
    region: 'Nellore Coastal Belt',
    cultureType: 'Vannamei Semi-Intensive',
    farmSize: '10 Acres (2 Ponds)',
    docDays: 'DOC 104 Harvest',
    stars: 5,
    highlightCategory: 'Minerals & Molting',
    quote:
      'Our borewater had high alkalinity (220 ppm) but critically low potassium (K+ was only 80 ppm). Prawns were failing ecdysis and getting stuck in their exuviae. Rambabu tested our water sample on the spot, gave us pharmaceutical-grade KCl and magnesium sulphate with exact broadcasting hours. We had the smoothest synchronous molt of our 6-year farming career.',
    keyOutcomes: [
      { label: 'K+ Ion Correction', value: '350 ppm Target' },
      { label: 'Molting Sync', value: '98% Smooth' },
      { label: 'Survival Rate', value: '89.4%' },
    ],
    verifiedCropCount: 'Regular Client',
    date: 'August 2026',
  },
];

export const FarmerSuccessStories: React.FC = () => {
  const { farmerStories } = useData();
  const sourceStories = farmerStories && farmerStories.length > 0 ? farmerStories : FARMER_STORIES;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filteredStories =
    selectedFilter === 'All'
      ? sourceStories
      : sourceStories.filter((s) => s.highlightCategory === selectedFilter);

  // Auto rotate carousel
  useEffect(() => {
    if (!isAutoPlay) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay, filteredStories.length]);

  // Adjust index if out of bounds on filter switch
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  const categories = [
    'All',
    'Minerals & Molting',
    'Feed & Low FCR',
    'Emergency DO',
    'Vibrio Defense',
  ];

  return (
    <section id="farmer-success-stories" className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6">
        <div className="max-w-2xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold tracking-wider uppercase shadow-xs">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Real Pond Results & Harvest Yields</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Farmer Success Stories & Field Feedback
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            See how coastal shrimp farmers across Ulavapadu, Kota, Indukurpet, and Nellore achieve low FCR, synchronized molting, and zero-mortality crops with SR Aqua Feeds & Needs.
          </p>
        </div>

        {/* Carousel Controls & Autoplay Button */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
            title={isAutoPlay ? 'Pause auto-slide' : 'Resume auto-slide'}
          >
            {isAutoPlay ? <Pause className="w-4 h-4 text-emerald-600" /> : <Play className="w-4 h-4 text-emerald-600" />}
            <span className="hidden sm:inline">{isAutoPlay ? 'Auto-playing' : 'Paused'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous story"
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-slate-700 flex items-center justify-center transition-all shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next story"
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-slate-700 flex items-center justify-center transition-all shadow-xs active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none text-xs font-semibold">
        <span className="text-slate-400 uppercase tracking-wider text-[11px] font-bold mr-1 flex-shrink-0">
          Filter by:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedFilter(cat);
              setIsAutoPlay(false);
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all flex-shrink-0 whitespace-nowrap ${
              selectedFilter === cat
                ? 'bg-emerald-600 text-white shadow-sm font-bold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Active Card Showcase with Fluid Layout */}
        <div className="transition-all duration-500 ease-out">
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Main Detailed Review Spotlight (8 cols) - Naturally fitted height without empty whitespace */}
              <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 md:p-9 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden flex flex-col justify-start">
                {/* Decorative Top Gradient Accent */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />
                
                {/* Subtle Quote Watermark */}
                <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-100 pointer-events-none -rotate-12" />

                <div className="space-y-5 relative z-10">
                  {/* Top Bar: Badges, Stars, Date */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {filteredStories[currentIndex].verifiedCropCount}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold">
                        {filteredStories[currentIndex].highlightCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(filteredStories[currentIndex].stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-xs font-bold text-slate-700">5.0</span>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="text-base sm:text-lg lg:text-xl text-slate-800 font-medium leading-relaxed italic">
                    "{filteredStories[currentIndex].quote}"
                  </blockquote>

                  {/* Harvest Metric Highlights */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {filteredStories[currentIndex].keyOutcomes.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="rounded-2xl bg-slate-50 border border-slate-100 p-3 text-center transition-colors hover:bg-emerald-50/50"
                      >
                        <span className="block text-[11px] text-slate-500 font-medium uppercase tracking-tight">
                          {metric.label}
                        </span>
                        <span className="block text-sm sm:text-base font-extrabold text-emerald-700 mt-1">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Farmer Identity & Pond Specs Footer - positioned directly under metrics */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3.5">
                    {/* Farmer Avatar Initial */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold text-base flex items-center justify-center shadow-md flex-shrink-0">
                      {filteredStories[currentIndex].name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                        <span>{filteredStories[currentIndex].name}</span>
                        <span title="Verified Farmer">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>
                          {filteredStories[currentIndex].village},{' '}
                          {filteredStories[currentIndex].region}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                      {filteredStories[currentIndex].farmSize}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {filteredStories[currentIndex].docDays}
                    </span>
                  </div>
                </div>
              </div>

              {/* Side Column: Quick Snapshot Carousel Navigation (4 cols) - Smooth Scrolling Animation & No Repeated Cards */}
              <div className="lg:col-span-4 flex flex-col gap-3 justify-start">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      More Client Reviews ({Math.max(0, filteredStories.length - 1)})
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Click to Swap
                    </span>
                  </div>

                  {/* Smooth Scrolling Container - Hides currently featured story to eliminate duplication */}
                  <div className="max-h-[300px] overflow-y-auto pr-1.5 space-y-2.5 scrollbar-thin scrollbar-thumb-emerald-200 hover:scrollbar-thumb-emerald-400 scroll-smooth">
                    {filteredStories.map((story, idx) => {
                      // Hide the currently active story from the side list so it is not repeated
                      if (idx === currentIndex) return null;

                      return (
                        <div
                          key={story.id}
                          onClick={() => {
                            setCurrentIndex(idx);
                            setIsAutoPlay(false);
                          }}
                          className="p-3.5 rounded-2xl border transition-all cursor-pointer bg-white/95 border-slate-200/90 hover:border-emerald-400 hover:bg-emerald-50/40 hover:shadow-md group active:scale-[0.99]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 truncate">
                              {story.name}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex-shrink-0">
                              {story.highlightCategory}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 group-hover:text-slate-600">
                            {story.village} • {story.farmSize}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Farmer-to-Farmer Consult Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white shadow-md border border-slate-800 space-y-3 mt-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Activity className="w-4 h-4" />
                    <span>Need pond-specific advice?</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Share your pond salinity, DOC, and biomass with Utukuri Rambabu for customized feed tables and mineral ratios.
                  </p>
                  <a
                    href="https://wa.me/919493243244?text=Hi%20Utukuri%20Rambabu%2C%20I%20saw%20the%20farmer%20success%20stories%20and%20want%20to%20discuss%20feed%20and%20minerals%20for%20my%20pond."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                    <span>WhatsApp Rambabu Directly</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-sm text-slate-500">No stories found for this category.</p>
            </div>
          )}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {filteredStories.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                setCurrentIndex(dotIdx);
                setIsAutoPlay(false);
              }}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIdx === currentIndex ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
