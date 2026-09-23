import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Search,
  MessageCircle,
  CheckCircle2,
  Droplets,
  Truck,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Clock,
} from 'lucide-react';
import { WhatsAppIcon, PhoneCallIcon } from './Icons.tsx';

export interface FAQItem {
  id: string;
  category: 'Feed & Nutrition' | 'Water & Mineral Balance' | 'Delivery & Logistics' | 'Billing & Quality';
  question: string;
  answer: string;
  keyPoints?: string[];
  recommendedAction?: {
    label: string;
    waText: string;
  };
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Water & Mineral Balance',
    question: 'How do I calculate mineral dosage for low-salinity (2 to 6 ppt) Vannamei ponds?',
    answer:
      'In low-salinity borewater ponds, natural marine ions are severely diluted. Maintaining the 1:3:1 ratio of Calcium (Ca²⁺) to Magnesium (Mg²⁺) to Potassium (K⁺) is vital to prevent soft-shell, blue shrimp syndrome, and post-molt mortality. Bring a fresh 500ml pond water sample to our Ulavapadu shop — we test hardness and provide an exact per-acre broadcast schedule of Calcium Chloride, Magnesium Sulphate, and agricultural-grade Potassium Chloride calibrated for your target salinity.',
    keyPoints: [
      'Maintain Ca:Mg:K in 1:3:1 stoichiometric balance.',
      'Broadcast minerals during post-molt hours (late evening or early morning).',
      'Prevents muscle cramps, soft shells, and uneven harvesting sizes.',
    ],
    recommendedAction: {
      label: 'Request Mineral Dosage Chart',
      waText: 'Hi Utukuri Rambabu, I need help calculating mineral dosage for my low-salinity pond.',
    },
  },
  {
    id: 'faq-2',
    category: 'Delivery & Logistics',
    question: 'Do you deliver bulk feed bags and chemicals directly to pond bunds?',
    answer:
      'Yes! We operate dedicated coastal tempo transport serving shrimp farms across Ulavapadu, Chakicherla Peddapattapu Palem, Ramayapatnam, Kota, Indukurpet, and neighboring coastal belts. Bulk feed orders (10+ bags) and emergency mineral batches are delivered directly to your farm gate or pond bund to save you transportation hassle and time.',
    keyPoints: [
      'Direct farm gate and pond bund delivery across coastal Nellore & Prakasam.',
      'Moisture-shielded transit so feed pellets remain completely dry.',
      'Flexible delivery scheduling aligned with your morning and evening feed checks.',
    ],
    recommendedAction: {
      label: 'Check Delivery to Your Village',
      waText: 'Hi Utukuri Rambabu, do you deliver feed bags to my village/pond location?',
    },
  },
  {
    id: 'faq-3',
    category: 'Delivery & Logistics',
    question: 'What are your store timings, and is emergency night oxygen support available?',
    answer:
      'Our retail showroom on Ramayapatnam Road, Ulavapadu is open daily from 6:30 AM to 9:00 PM. Crucially, proprietor Utukuri Rambabu maintains 24/7 on-call emergency dispatch for dissolved oxygen tablets (sodium percarbonate) and toxic gas binders. If power cuts or aerator failures strike at 2:00 AM, call 9493243244 immediately for urgent pond rescue.',
    keyPoints: [
      'Store hours: 6:30 AM to 9:00 PM open all 7 days.',
      '24/7 emergency dispatch for sodium percarbonate O2 tablets.',
      'Immediate phone assistance for sudden pre-dawn oxygen drops.',
    ],
    recommendedAction: {
      label: 'Save Emergency Number: 9493243244',
      waText: 'Hi Utukuri Rambabu, saving your contact for emergency pond support.',
    },
  },
  {
    id: 'faq-4',
    category: 'Feed & Nutrition',
    question: 'Why is high-stability feed critical, and how long do your pellets last in water?',
    answer:
      'Cheap or low-grade feed disintegrates inside 30 to 45 minutes, leaching precious protein and amino acids into the pond bottom and creating black anaerobic sludge. Our premium shrimp starter and grower feeds are steam-conditioned with marine hydrothermal binders, sustaining 2+ hours of complete water stability. This ensures 100% assimilation by the prawns and delivers optimal FCR between 1.15 and 1.25.',
    keyPoints: [
      '2+ hours water stability with zero check-tray mush.',
      'High attractant marine squid and krill hydrolysate.',
      'Significantly lowers overall feed cost per kilogram of harvested prawn.',
    ],
    recommendedAction: {
      label: 'Ask About Feed Samples & Prices',
      waText: 'Hi Utukuri Rambabu, I want details on high-stability feed pricing and FCR performance.',
    },
  },
  {
    id: 'faq-5',
    category: 'Billing & Quality',
    question: 'Are all feeds and chemicals supplied with genuine GST invoices and unexpired batches?',
    answer:
      'Yes, 100%. SR Aqua Feeds & Needs operates with full GST registration (GSTIN: 37AGHPU5940Q1ZF). Every feed consignment and chemical bucket is sourced through verified manufacturer channels with clear batch numbers, manufacturing dates, and active ingredient guarantees. We strictly reject near-expiry or relabeled products so your investment is completely safe.',
    keyPoints: [
      'Official GST tax invoice issued for every purchase.',
      'Authentic manufacturer seal with transparent batch coding.',
      'Zero relabeled, expired, or adulterated chemicals.',
    ],
    recommendedAction: {
      label: 'Inquire About GST Billing',
      waText: 'Hi Utukuri Rambabu, I need a GST quotation for upcoming crop chemicals.',
    },
  },
  {
    id: 'faq-6',
    category: 'Water & Mineral Balance',
    question: 'How long should I wait after pond sanitization before applying gut probiotics?',
    answer:
      'Always wait at least 48 to 72 hours after applying oxidizers or sanitizers such as BKC, Chlorine Dioxide, or Iodine before introducing beneficial Bacillus and enzyme cultures. Introducing probiotics too early will kill the live bacterial spores, wasting your investment. After 48 hours, activate the probiotics with jaggery and aerate for 4–6 hours prior to pond broadcasting.',
    keyPoints: [
      'Wait 48 to 72 hours after chemical sanitizers.',
      'Ferment with clean jaggery and aeration for maximum CFU activation.',
      'Broadcast during mid-morning when pond algae and temperature are stable.',
    ],
    recommendedAction: {
      label: 'Ask for Probiotic Fermentation Protocol',
      waText: 'Hi Utukuri Rambabu, please share the recommended probiotic activation protocol.',
    },
  },
  {
    id: 'faq-7',
    category: 'Water & Mineral Balance',
    question: 'What is the fastest way to neutralize toxic Ammonia (NH3) and Hydrogen Sulfide (H2S)?',
    answer:
      'Unionized Ammonia (NH3) and Hydrogen Sulfide (H2S) are lethal to shrimp at levels above 0.05 ppm. For immediate crisis remediation, broadcast concentrated Yucca schidigera extract (which chemically binds ammonia molecules within 30 minutes) combined with slow-release oxygen donors at the pond sludge zone. Follow up with Rhodococcus and Nitrosomonas water probiotics to digest organic muck.',
    keyPoints: [
      'Yucca extract provides rapid 30-minute chemical binding of NH3.',
      'Increase aeration immediately to strip toxic gases from pond water.',
      'Maintain pH below 8.2 to keep ammonia in the non-toxic NH4+ ionic state.',
    ],
    recommendedAction: {
      label: 'Get Ammonia Control Products',
      waText: 'Hi Utukuri Rambabu, I have high ammonia in my pond and need urgent gas control.',
    },
  },
  {
    id: 'faq-8',
    category: 'Feed & Nutrition',
    question: 'Can I get free pond water parameter testing at the store counter?',
    answer:
      'Yes, complimentary water testing is available for all local farmers. Collect a 500ml water sample from 1 foot below the pond surface between 6:00 AM and 7:00 AM, keep it in a sealed clean container, and bring it to our showroom. We test pH, Salinity (ppt), Total Alkalinity, Calcium/Magnesium Hardness, and Ammonia on the spot.',
    keyPoints: [
      'Free testing of pH, Salinity, Hardness, and Ammonia.',
      'Instant diagnostic recommendations tailored to your pond DOC.',
      'Honest guidance without pushing unneeded chemicals.',
    ],
    recommendedAction: {
      label: 'Book a Water Sample Test',
      waText: 'Hi Utukuri Rambabu, I am bringing a pond water sample for testing today.',
    },
  },
];

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Feed & Nutrition',
    'Water & Mineral Balance',
    'Delivery & Logistics',
    'Billing & Quality',
  ];

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyPoints?.some((kp) => kp.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(filteredFAQs.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  return (
    <section id="faqs-section" className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xs">
        {/* Subtle decorative background water ripple */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Aquaculture Knowledge Base</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Clear, practical answers regarding mineral ratios, high-stability feeds, night delivery, pond testing, and official GST billing.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="max-w-3xl mx-auto mb-8 space-y-4">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions by keyword (e.g. oxygen, minerals, delivery, FCR, GST)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills & Toggle All */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <button
                  onClick={expandAll}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Expand All
                </button>
                <span>•</span>
                <button
                  onClick={collapseAll}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>

          {/* Accordion FAQ List */}
          <div className="max-w-3xl mx-auto space-y-3.5">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => {
                const isOpen = openIds.includes(faq.id);

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
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                            isOpen ? 'bg-emerald-600 ring-4 ring-emerald-100' : 'bg-slate-300'
                          }`}
                        />
                        <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
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
                    <div
                      className={`transition-all duration-300 ease-in-out px-4 sm:px-5 ${
                        isOpen ? 'max-h-[500px] opacity-100 pb-5 pt-1' : 'max-h-0 opacity-0 overflow-hidden py-0'
                      }`}
                    >
                      <div className="pt-2 border-t border-slate-100 space-y-3 text-sm text-slate-600 leading-relaxed">
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
                              Need more specifics for your pond?
                            </span>
                            <a
                              href={`https://wa.me/919493243244?text=${encodeURIComponent(
                                faq.recommendedAction.waText
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{faq.recommendedAction.label}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
                <p className="text-sm font-semibold text-slate-700">
                  No questions match "{searchQuery}"
                </p>
                <p className="text-xs text-slate-500">
                  Try searching for different keywords or browse our categories above.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="mt-2 px-4 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Bottom Still Have Questions Banner */}
          <div className="max-w-3xl mx-auto mt-10 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                Have a unique pond water or feed requirement?
              </h4>
              <p className="text-xs text-slate-500">
                Utukuri Rambabu is available on call and WhatsApp to give personalized advice.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="https://wa.me/919493243244?text=Hi%20Utukuri%20Rambabu%2C%20I%20have%20a%20question%20regarding%20my%20prawn%20pond."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href="tel:9493243244"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-2 transition-colors"
              >
                <PhoneCallIcon className="w-3.5 h-3.5 text-slate-700" />
                <span>Call 9493243244</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
