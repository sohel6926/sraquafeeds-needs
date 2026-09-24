import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext.tsx';
import { Phone, Mail, X, ShieldCheck, User, MapPin, ArrowRight, Layers, Scale } from 'lucide-react';
import { WhatsAppIcon, PhoneCallIcon } from './Icons.tsx';

export interface ContactGateData {
  type: 'whatsapp' | 'call' | 'email';
  targetUrl: string;
  topic?: string;
}

interface ContactGateModalProps {
  isOpen: boolean;
  data: ContactGateData | null;
  onClose: () => void;
}

const AQUA_CATEGORIES = [
  { label: '🦐 Shrimp & Fish Feed', value: '🦐 Aqua Feed', sample: 'e.g. 50 Bags / DOC 45' },
  { label: '⚡ Emergency DO (Oxygen Tablets)', value: '⚡ Emergency DO', sample: 'e.g. 8 Buckets / Urgent' },
  { label: '🌱 Pond Minerals & Salts', value: '🌱 Pond Minerals', sample: 'e.g. 20 Bags / Salinity 8 ppt' },
  { label: '🧪 Ammonia & Toxic Gas Reducer', value: '🧪 Gas Control', sample: 'e.g. 4-Acre Pond Sluice' },
  { label: '🦠 Probiotics & Sludge Control', value: '🦠 Probiotics', sample: 'e.g. Bottom Soil Cleanser' },
  { label: '🔬 Water Sample Parameter Testing', value: '🔬 Testing Lab', sample: 'e.g. Free Lab Testing' },
  { label: '💬 General Farm Inquiry', value: '💬 General Inquiry', sample: 'e.g. Consultation' },
];

export const ContactGateModal: React.FC<ContactGateModalProps> = ({ isOpen, data, onClose }) => {
  const { addLead, siteSettings } = useData();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(AQUA_CATEGORIES[0].value);
  const [amountOrAcres, setAmountOrAcres] = useState('');
  const [village, setVillage] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Pre-load saved contact info from previous interactions
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sr_farmer_contact');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.village) setVillage(parsed.village);
      }
    } catch {
      // Ignore parse errors
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  const currentCategoryObj = AQUA_CATEGORIES.find((c) => c.value === category) || AQUA_CATEGORIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    if (!trimmedName) {
      setError('Please enter your name');
      return;
    }

    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // 1. Save to local storage for future pre-fills
    try {
      localStorage.setItem(
        'sr_farmer_contact',
        JSON.stringify({
          name: trimmedName,
          phone: cleanPhone,
          village: village.trim(),
        })
      );
    } catch {
      // Ignore storage errors
    }

    // 2. Log lead into Admin Panel CRM immediately
    const channelLabel =
      data.type === 'whatsapp' ? 'WhatsApp Lead' : data.type === 'call' ? 'Direct Phone Call' : 'Online Form';

    const selectedTopic = data.topic || category.replace(/[^\w\s&]/gi, '').trim();
    const qtyText = amountOrAcres.trim() ? ` (${amountOrAcres.trim()})` : '';

    addLead({
      farmerName: trimmedName,
      phone: cleanPhone,
      village: village.trim() || 'Chakicherla / Ulavapadu Belt',
      topic: selectedTopic,
      productName: `${category}${qtyText}`,
      category: category,
      amountOrAcres: amountOrAcres.trim() || 'Direct Inquiry',
      leadType: data.type === 'call' ? 'call' : data.type === 'email' ? 'email' : 'whatsapp',
      farmerProfile: 'Coastal Aqua Farmer',
      message: `Farmer connected via ${data.type.toUpperCase()} seeking ${category}. ${
        amountOrAcres.trim() ? `Requirement: ${amountOrAcres.trim()}.` : ''
      }`,
      source: channelLabel,
    });

    // 3. Close modal
    onClose();

    // 4. Proceed to intended communication channel with enriched greeting
    if (data.type === 'whatsapp') {
      let finalUrl = data.targetUrl;
      const greeting = `Namaste Utukuri Rambabu garu, I am ${trimmedName}${
        village.trim() ? ` from ${village.trim()}` : ''
      }. I am interested in ${category}${
        amountOrAcres.trim() ? ` (${amountOrAcres.trim()})` : ''
      }. Please share price & dispatch details.`;

      if (finalUrl.includes('text=')) {
        finalUrl = finalUrl.replace(
          /text=([^&]*)/,
          (_match, existing) => `text=${encodeURIComponent(greeting + ' ' + decodeURIComponent(existing))}`
        );
      } else {
        finalUrl += `${finalUrl.includes('?') ? '&' : '?'}text=${encodeURIComponent(greeting)}`;
      }

      window.open(finalUrl, '_blank');
    } else if (data.type === 'call') {
      window.location.href = data.targetUrl;
    } else if (data.type === 'email') {
      const emailSubject = encodeURIComponent(`Aquaculture Inquiry: ${category} - ${trimmedName}`);
      const emailBody = encodeURIComponent(
        `Dear Utukuri Rambabu,\n\nI am contacting you from the SR Aqua Feeds website.\n\nName: ${trimmedName}\nPhone: ${cleanPhone}\nVillage: ${
          village.trim() || 'N/A'
        }\nInterested In: ${category}\nQuantity/Need: ${
          amountOrAcres.trim() || 'Not specified'
        }\n\nPlease contact me regarding product availability and rates.\n\nThank you.`
      );
      window.location.href = `mailto:${siteSettings.primaryEmail}?subject=${emailSubject}&body=${emailBody}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-2xl border border-slate-700/80 relative overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Top subtle aquatic accent line */}
        <div
          className={`absolute top-0 inset-x-0 h-1.5 ${
            data.type === 'whatsapp'
              ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400'
              : data.type === 'call'
              ? 'bg-gradient-to-r from-sky-500 to-blue-600'
              : 'bg-gradient-to-r from-amber-500 to-orange-400'
          }`}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pb-3 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5">
            {data.type === 'whatsapp' && (
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp Direct Connect
              </span>
            )}
            {data.type === 'call' && (
              <span className="bg-sky-950 text-sky-300 border border-sky-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                <PhoneCallIcon className="w-3.5 h-3.5 text-sky-400" />
                Direct Store Hotline Call
              </span>
            )}
            {data.type === 'email' && (
              <span className="bg-amber-950 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                Official Email Desk
              </span>
            )}
          </div>

          <h3 className="text-lg font-black text-white leading-tight">
            Connect with Utukuri Rambabu
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Please share your details to log this inquiry into our CRM for prompt pond-side support.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-3 p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Customer / Farmer Name <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Gandam Bhagyalaxmi / Venkat Rao"
                className="w-full pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Mobile Number (10 digits) <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9989715441"
                maxLength={13}
                className="w-full pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                What You Need / Service
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-9 pr-2 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {AQUA_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Quantity / Pond Size
              </label>
              <div className="relative">
                <Scale className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={amountOrAcres}
                  onChange={(e) => setAmountOrAcres(e.target.value)}
                  placeholder={currentCategoryObj.sample}
                  className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Village / Farm Location <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g. Chakicherla / Ulavapadu / Ramayapatnam"
                className="w-full pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 ${
                data.type === 'whatsapp'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30'
                  : data.type === 'call'
                  ? 'bg-sky-600 hover:bg-sky-500 shadow-sky-900/30'
                  : 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/30'
              }`}
            >
              {data.type === 'whatsapp' && (
                <>
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Continue to WhatsApp Chat</span>
                </>
              )}
              {data.type === 'call' && (
                <>
                  <Phone className="w-4 h-4 text-white" />
                  <span>Start Phone Call Now</span>
                </>
              )}
              {data.type === 'email' && (
                <>
                  <Mail className="w-4 h-4 text-white" />
                  <span>Send Email Inquiry</span>
                </>
              )}
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant update to SR Aqua Feeds Customer Leads CRM</span>
          </p>
        </form>
      </div>
    </div>
  );
};
