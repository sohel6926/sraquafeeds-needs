import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext.tsx';
import {
  ChevronDown,
  HelpCircle,
  Search,
  CheckCircle2,
  Droplets,
  PackageCheck,
  ShieldCheck,
  Zap,
  Activity,
  PhoneCall,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PageType, FAQItem } from '../types.ts';
import { WhatsAppIcon, PhoneCallIcon } from './Icons.tsx';

export type { FAQItem };


const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-prod-1',
    category: 'Products & Nutrition',
    question: 'Why is 3-hour water stability critical in shrimp feed, and how does it prevent pond sludge?',
    answer:
      'Low-grade feeds quickly turn to mush within 30 to 45 minutes, leaching precious water-soluble amino acids and marine proteins into the bottom water before the prawns can consume them. This creates toxic black anaerobic sludge, fuels pathogenic Vibrio, and elevates ammonia. Our Supreme Vannamei and grower feeds are conditioned with hydrothermal marine binders that maintain complete physical pellet integrity for over 3 hours. This ensures 100% nutrient assimilation and consistently delivers optimal FCR between 1.1 and 1.25.',
    keyPoints: [
      '3+ hours water stability with zero check-tray disintegration or dusting.',
      'Prevents nutrient leaching into pond bottom mud.',
      'Saves up to 15% in overall feed costs by lowering FCR.',
    ],
    recommendedAction: {
      label: 'Ask About Feed Stock & Prices',
      waText: 'Hi Utukuri Rambabu, I want details on high-stability feed pricing and FCR performance.',
    },
  },
  {
    id: 'faq-farm-1',
    category: 'Pond Farming Practices',
    question: 'How do I calculate and maintain the correct Calcium, Magnesium, and Potassium ratios for molting?',
    answer:
      'In low and medium salinity coastal ponds (2 to 15 ppt), maintaining the golden 3:1 Magnesium (Mg²⁺) to Calcium (Ca²⁺) ratio and 1:1 Potassium (K⁺) to Sodium (Na⁺) ionic proportion is vital for synchronized molting and hard exoskeleton formation. When Mg or K is deficient, shrimp suffer from white muscle syndrome, body cramps, and post-molt cannibalism. We recommend broadcasting Aqua-CalMag ionic minerals during late evening or pre-dawn hours corresponding with the new moon and full moon molt cycles.',
    keyPoints: [
      'Maintain 3:1 Mg:Ca ratio for complete, hard-shell molting.',
      'Broadcast ionic minerals during late evening (6:00 PM – 9:00 PM) before night molts.',
      'Bring a 500ml water sample to our Ulavapadu counter for complimentary hardness testing.',
    ],
    recommendedAction: {
      label: 'Request Mineral Dosage Chart',
      waText: 'Hi Utukuri Rambabu, please share the mineral dosage chart for my pond salinity.',
    },
  },
  {
    id: 'faq-farm-2',
    category: 'Pond Farming Practices',
    question: 'What immediate steps should I take if pond dissolved oxygen (DO) drops below 3.0 ppm at midnight?',
    answer:
      'A dissolved oxygen crash below 3.0 ppm causes immediate shrimp distress, surface gasping, and rapid mortality. Immediately switch on all paddle-wheel and spiral aerators. Next, broadcast fast-sinking Oxy-Burst Sodium Percarbonate tablets directly into feeding zones and aerator corners (where DO is lowest). Sodium percarbonate dissolves into concentrated pure active oxygen directly on the pond floor within minutes. For night crises, call our emergency hotline at 9493243244 for immediate dispatch.',
    keyPoints: [
      'Run 100% aeration capacity immediately.',
      'Broadcast sinking sodium percarbonate tablets (5–10 kg/acre) in low-flow sludge zones.',
      '24/7 on-call dispatch available for midnight emergency oxygen replenishment.',
    ],
    recommendedAction: {
      label: 'Emergency Hotline: 9493243244',
      waText: 'Hi Utukuri Rambabu, saving your number for emergency dissolved oxygen dispatch.',
    },
  },
  {
    id: 'faq-prod-2',
    category: 'Products & Nutrition',
    question: 'How do I choose between starter micro-crumbles and grower pellets for early stocking?',
    answer:
      'For newly stocked post-larvae (PL12 to PL30, DOC 1 to DOC 30), ultra-digestible micro-granules (0.5mm to 1.0mm) enriched with krill meal and immune stimulants are required because juvenile prawns have small mouths and fast metabolic rates. Once shrimp reach 3.0 to 5.0 grams (DOC 30+), transition smoothly over 4 days to 1.2mm–1.4mm extruded grower pellets with 38% crude protein to stimulate accelerated daily weight gain without particle size variation.',
    keyPoints: [
      'DOC 1–30: Use Aqua-Start Nursery Crumbles (0.5mm–1.0mm, 40% marine protein).',
      'DOC 30+: Transition gradually to Supreme Vannamei Grower Feed (38% protein).',
      'Gradual transition prevents digestive shock and size scattering.',
    ],
    recommendedAction: {
      label: 'Inquire About Starter Crumbles',
      waText: 'Hi Utukuri Rambabu, I need starter crumbles and grower feed for my new stocking.',
    },
  },
  {
    id: 'faq-farm-3',
    category: 'Pond Farming Practices',
    question: 'How do I adjust feed check trays to prevent overfeeding and keep FCR under 1.2?',
    answer:
      'Place 4 to 6 check trays per acre along pond dykes, keeping them 3 to 4 meters away from aerators. Place approximately 0.8% to 1.0% of the total meal on the trays. Check after 2.0 to 2.5 hours: if trays are completely clean with empty shrimp guts, increase feed by 5%; if 10% feed remains, maintain feed; if more than 20% remains, reduce the next feeding by 25% to prevent water fouling. Always cut feeding by 30% to 50% during cloudy monsoon days, molting peaks, or sudden salinity swings.',
    keyPoints: [
      'Check trays at 2.0 to 2.5 hours after broadcast.',
      'Inspect prawn gut fullness (full dark line indicates active healthy feeding).',
      'Cut feeding during overcast, low DO, or heavy rain periods.',
    ],
    recommendedAction: {
      label: 'Get Check-Tray Feeding Table',
      waText: 'Hi Utukuri Rambabu, please send the check-tray feed adjustment formula.',
    },
  },
  {
    id: 'faq-water-1',
    category: 'Water Quality & Minerals',
    question: 'What is the fastest way to neutralize toxic Ammonia (NH3) and Hydrogen Sulfide (H2S)?',
    answer:
      'Total ammonia becomes extremely toxic at higher pH (> 8.2). First, apply natural Yucca schidigera extract (Toxic-Gas Binder) at 1–2 liters per acre; its saponin sterols immediately cross-link and bind free NH3 and smelly H2S molecules. Simultaneously apply active Bacillus subtilis and Bacillus licheniformis probiotics (Bacto-Clean Pro) with fermented jaggery in the morning to permanently metabolize organic pond floor sludge into harmless nitrogen gas.',
    keyPoints: [
      'Yucca extract binds free ammonia and toxic gases within 2 hours.',
      'Active Bacillus strains digest accumulated sludge and prevent black soil.',
      'Maintain pond water pH between 7.5 and 8.2 to prevent free unionized NH3 spikes.',
    ],
    recommendedAction: {
      label: 'Request Ammonia Neutralizer',
      waText: 'Hi Utukuri Rambabu, my pond ammonia is rising. Need immediate Yucca and Bacillus solution.',
    },
  },
  {
    id: 'faq-water-2',
    category: 'Water Quality & Minerals',
    question: 'How do I correctly brew and activate pond probiotics before broadcasting?',
    answer:
      'For maximum bacterial colony multiplying, dissolve 1 kg of spore probiotic powder into 50 liters of clean, non-chlorinated pond water mixed with 2 to 3 kg of organic jaggery. Aerate vigorously with an aquarium bubbler or paddle aerator for 12 to 18 hours until a rich aromatic, slightly sour fermentation odor develops. Broadcast across the pond between 9:00 AM and 11:00 AM on a sunny day when sunlight accelerates beneficial microbial bloom.',
    keyPoints: [
      'Brew for 12–18 hours with 2–3 kg jaggery for 100x colony multiplication.',
      'Broadcast during bright sunny mornings for optimal microbial establishment.',
      'Never mix live probiotics with chemical disinfectants or copper sulfate.',
    ],
    recommendedAction: {
      label: 'Ask for Fermentation Guide',
      waText: 'Hi Utukuri Rambabu, please share the probiotic brewing recipe for my pond.',
    },
  },
  {
    id: 'faq-order-1',
    category: 'Ordering & Delivery',
    question: 'How quickly can feed and chemicals be delivered directly to my pond bund?',
    answer:
      'For farmers located in Ulavapadu, Ramayapatnam, Chakicherla, Singarayakonda, and surrounding Nellore belts, we offer direct farm-gate and pond bund delivery. Standard orders placed by 10:00 AM are delivered the very same afternoon. For emergency requirements such as midnight oxygen tablets or emergency toxic gas binders, our dispatch operates 24/7 with immediate vehicle loading.',
    keyPoints: [
      'Same-day farm-gate delivery for Ulavapadu & Ramayapatnam belt.',
      'Emergency midnight dispatch for DO tablets and crisis products.',
      'Transport options from single bag pickups to 10-ton mini-truck loads.',
    ],
    recommendedAction: {
      label: 'Check Delivery to My Village',
      waText: 'Hi Utukuri Rambabu, I want to check delivery timing to my pond location.',
    },
  },
  {
    id: 'faq-order-2',
    category: 'Ordering & Delivery',
    question: 'Do you provide formal GST tax invoices and batch test reports for corporate audit?',
    answer:
      'Yes, absolutely. SR Aqua Feeds & Needs is fully registered under GSTIN: 37AGHPU5940Q1ZF. Every purchase—from single mineral sacks to full truckloads—comes with a valid computer-generated GST tax invoice clearly stating batch numbers, expiry dates, and manufacturer certification. This allows farm owners and corporate aquaculture companies to claim full input tax credit (ITC) and verify batch authenticity.',
    keyPoints: [
      '100% genuine products with manufacturer batch numbers and expiry seals.',
      'Computerized GST tax invoice issued with every dispatch.',
      'Eligible for input tax credit and bank agricultural loan documentation.',
    ],
    recommendedAction: {
      label: 'Inquire for GST Invoice & Rates',
      waText: 'Hi Utukuri Rambabu, I need a GST invoice quote for a bulk order.',
    },
  },
  {
    id: 'faq-water-3',
    category: 'Water Quality & Minerals',
    question: 'Can I bring water samples to your store for free parameter testing?',
    answer:
      'Yes! We offer complimentary water parameter testing at our main showroom on Ramayapatnam Road, Chakicherla, Ulavapadu. Bring 500ml of surface water and bottom water collected early in the morning in a clean, rinsed bottle. We test salinity (ppt), pH, total alkalinity, dissolved hardness (Ca²⁺, Mg²⁺), and toxic ammonia on the spot and provide instant corrective dosage advice.',
    keyPoints: [
      'Free testing for Salinity, pH, Alkalinity, Hardness, and Ammonia.',
      'Instant dosage guidance tailored to your pond acreage and DOC.',
      'Counter open daily 6:30 AM – 9:00 PM for water testing.',
    ],
    recommendedAction: {
      label: 'Get Store Directions on WhatsApp',
      waText: 'Hi Utukuri Rambabu, I would like to visit the store with my pond water sample.',
    },
  },
];

export interface ProductFarmingFAQProps {
  className?: string;
  limit?: number; // When provided (e.g. 4 on homepage), shows only a few FAQs and redirects to contact page
  showViewAllButton?: boolean;
  onNavigate?: (page: PageType) => void;
  initialOpenId?: string;
}

export const ProductFarmingFAQ: React.FC<ProductFarmingFAQProps> = ({
  className = '',
  limit,
  showViewAllButton = false,
  onNavigate,
  initialOpenId,
}) => {
  const { faqs } = useData();
  const sourceFAQs = faqs && faqs.length > 0 ? faqs : FAQ_DATA;

  // CRITICAL REQUIREMENT: Single active openId ensures that opening any FAQ automatically closes the previous one!
  const [openId, setOpenId] = useState<string | null>(initialOpenId ?? 'faq-prod-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Products & Nutrition',
    'Pond Farming Practices',
    'Water Quality & Minerals',
    'Ordering & Delivery',
  ];

  const filteredFAQs = useMemo(() => {
    return sourceFAQs.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyPoints?.some((kp) => kp.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [sourceFAQs, activeCategory, searchQuery]);

  // When limit is provided, only show the specified few FAQs
  const displayedFAQs = useMemo(() => {
    if (limit && limit > 0) {
      return filteredFAQs.slice(0, limit);
    }
    return filteredFAQs;
  }, [filteredFAQs, limit]);

  // Toggling an FAQ: If already open, close it (null). If clicking another, set new ID, closing previous!
  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleNavigateToContactFAQs = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      window.location.hash = 'contact';
    }
    // Smooth scroll down to the full FAQ section on the contact page
    setTimeout(() => {
      const faqsEl = document.getElementById('faqs-section');
      if (faqsEl) {
        faqsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <section id="faqs-section" className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>
      <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xs">
        {/* Subtle decorative background water ripple */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Aquaculture Knowledge Base</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Products & Farming Practices FAQ
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              {limit
                ? 'Key questions on high-stability feed, mineral ratios, DO crises, and farm delivery.'
                : 'Clear, practical answers regarding high-stability feed, mineral ratios, DO emergencies, check tray adjustments, and doorstep pond delivery.'}
            </p>
          </div>

          {/* Search & Category Filter Controls (Hide category pills on compact homepage limit if desired, or keep clean) */}
          <div className="max-w-3xl mx-auto mb-8 space-y-4">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search inquiries (e.g., stability, minerals, oxygen, check trays, FCR, GST)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills & Single-Accordion Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Informative single-accordion counter (Replaced multi-expand with single focus guidance) */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {limit && filteredFAQs.length > limit
                    ? `Showing ${displayedFAQs.length} of ${filteredFAQs.length} FAQs`
                    : `${filteredFAQs.length} answers available`}
                </span>
              </div>
            </div>
          </div>

          {/* Accordion FAQ List - ONLY ONE CAN BE OPEN AT A TIME */}
          <div className="max-w-3xl mx-auto space-y-3.5">
            {displayedFAQs.length > 0 ? (
              displayedFAQs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-emerald-400/80 shadow-md ring-1 ring-emerald-400/20'
                        : 'bg-white/90 border-slate-200/90 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {/* Question Header */}
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors ${
                            isOpen ? 'bg-emerald-600 ring-4 ring-emerald-100' : 'bg-slate-300'
                          }`}
                        />
                        <span className="font-bold text-xs sm:text-sm md:text-base text-slate-900 leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="hidden sm:inline-block text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {faq.category}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
                            isOpen ? 'rotate-180 bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </button>

                    {/* Answer Accordion Body */}
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 animate-fade-in">
                        <div className="pt-2 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          <p>{faq.answer}</p>

                          {/* Bullet points if present */}
                          {faq.keyPoints && faq.keyPoints.length > 0 && (
                            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-1.5 text-xs text-slate-700">
                              {faq.keyPoints.map((point, pIdx) => (
                                <div key={pIdx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span>{point}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Recommended WhatsApp Advisory Action */}
                          {faq.recommendedAction && (
                            <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                              <span className="text-xs text-slate-500 font-medium">
                                Have questions on this topic?
                              </span>
                              <a
                                href={`https://wa.me/919493243244?text=${encodeURIComponent(
                                  faq.recommendedAction.waText
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 font-semibold text-xs transition-colors border border-emerald-200"
                              >
                                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{faq.recommendedAction.label}</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                <p className="text-sm font-semibold text-slate-700">No FAQs match your search.</p>
                <p className="text-xs text-slate-500">
                  Call Utukuri Rambabu directly at <a href="tel:9493243244" className="text-emerald-700 font-bold underline">9493243244</a> for immediate technical advice.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="mt-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>

          {/* User Request: When showing a few FAQs on homepage, provide redirect card to contact page */}
          {(showViewAllButton || (limit && filteredFAQs.length > limit)) && (
            <div className="max-w-3xl mx-auto mt-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 border border-emerald-500/30 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 max-w-xl space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Have More Aquaculture Queries?</span>
                </div>
                <h4 className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
                  Explore All 10+ Technical FAQs & Advisory on Contact Page
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Browse in-depth solutions for sludge decomposition, ammonia binding, check-tray tables, and dispatch schedules.
                </p>
              </div>

              <button
                type="button"
                id="btn-faq-redirect-contact"
                onClick={handleNavigateToContactFAQs}
                className="relative z-10 px-5 sm:px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap cursor-pointer flex-shrink-0"
              >
                <span>View All FAQs on Contact Page</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          )}

          {/* Quick Help Footer Callout */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Still have a specific water or crop condition question?
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Utukuri Rambabu is available on phone and WhatsApp 7 days a week.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/919493243244?text=Hi%20SR%20Aqua%20Feeds%2C%20I%20have%20a%20question%20regarding%20my%20pond%20culture."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span>Ask on WhatsApp</span>
              </a>
              <a
                href="tel:9493243244"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-800 text-xs font-bold transition-all cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 9493243244</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
