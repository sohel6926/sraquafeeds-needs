import React, { useState, useEffect } from 'react';
import { WhatsAppIcon, EmailIcon } from './Icons.tsx';
import { Droplets, CheckCircle2, ShieldCheck, Sparkles, Clock, Send } from 'lucide-react';
import cleanWaterTexture from '../assets/images/clean_water_texture_1790105872350.jpg';
import prawnIllustration from '../assets/images/prawn_illustration_1790103846428.jpg';

interface InquiryFormProps {
  initialTopic?: string;
  productName?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialTopic = 'Feed Bulk Order (Vannamei/Fish)',
  productName,
  className = '',
  title = 'Send an Inquiry or Request a Quote',
  subtitle = 'Fill in your details below. You can immediately launch the message on WhatsApp or send via Email.',
}) => {
  const [farmerName, setFarmerName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [topic, setTopic] = useState(initialTopic);
  const [message, setMessage] = useState(
    productName ? `Inquiring about current pricing, availability, and dosage recommendations for ${productName}.` : ''
  );
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  useEffect(() => {
    if (productName) {
      setMessage(`Inquiring about current pricing, availability, and dosage recommendations for ${productName}.`);
    }
  }, [productName]);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phone.trim()) {
      setSubmittedStatus('Please enter your name and phone number to continue.');
      return;
    }

    const text = `*Farmer Inquiry - SR Aqua Feeds & Needs*%0A%0A*Name:* ${encodeURIComponent(farmerName)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Village/Mandal:* ${encodeURIComponent(village || 'Not specified')}%0A*Topic:* ${encodeURIComponent(topic)}${productName ? `%0A*Product:* ${encodeURIComponent(productName)}` : ''}%0A*Message/Requirements:* ${encodeURIComponent(message || 'Requesting current batch quote and delivery details.')}`;

    window.open(`https://wa.me/919493243244?text=${text}`, '_blank');
    setSubmittedStatus('Inquiry prepared! Launching WhatsApp conversation with Utukuri Rambabu...');
  };

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phone.trim()) {
      setSubmittedStatus('Please enter your name and phone number to continue.');
      return;
    }

    const subject = encodeURIComponent(`Pond Inquiry from ${farmerName} (${village || 'Nellore'}) - ${topic}`);
    const body = encodeURIComponent(
      `Name: ${farmerName}\nPhone: ${phone}\nVillage/Location: ${village}\nTopic: ${topic}\n${productName ? `Product: ${productName}\n` : ''}\nMessage / Requirement:\n${message}\n\nSent via SR Aqua Feeds & Needs Portal`
    );

    window.location.href = `mailto:sraquafeedsneeds@gmail.com?subject=${subject}&body=${body}`;
    setSubmittedStatus('Opening your default email client with pre-filled inquiry details.');
  };

  return (
    <div
      className={`group relative overflow-hidden bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6 ${className}`}
    >
      {/* Top subtle aquatic accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 opacity-80" />

      {/* Water caustics texture background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply">
        <img src={cleanWaterTexture} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
      </div>

      {/* Decorative shrimp watermark */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
        <img src={prawnIllustration} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/60">
          <Droplets className="w-3.5 h-3.5 text-emerald-600" />
          <span>Farmer Inquiry Desk</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-slate-900 mt-1">
          {title}
        </h3>
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Status Alert */}
      {submittedStatus && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 relative z-10 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-medium">{submittedStatus}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="inquiry-farmer-name" className="block text-xs font-semibold text-slate-700 mb-1">
              Your Name / Farm Name <span className="text-emerald-600">*</span>
            </label>
            <input
              id="inquiry-farmer-name"
              type="text"
              required
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              placeholder="e.g., Venkat Rao"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          <div>
            <label htmlFor="inquiry-farmer-phone" className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number <span className="text-emerald-600">*</span>
            </label>
            <input
              id="inquiry-farmer-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g., 9876543210"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="inquiry-farmer-village" className="block text-xs font-semibold text-slate-700 mb-1">
              Village / Mandal <span className="text-emerald-600">*</span>
            </label>
            <input
              id="inquiry-farmer-village"
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              placeholder="e.g., Ulavapadu / Ramayapatnam"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          <div>
            <label htmlFor="inquiry-topic-select" className="block text-xs font-semibold text-slate-700 mb-1">
              Topic of Inquiry
            </label>
            <select
              id="inquiry-topic-select"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-2xs cursor-pointer"
            >
              <option>Feed Bulk Order (Vannamei/Fish)</option>
              <option>Pond Minerals & Buffers</option>
              <option>Probiotics & Soil Sludge Control</option>
              <option>Emergency DO / Oxygen Tablets</option>
              <option>Ammonia & Toxic Gas Reducer</option>
              <option>Water Testing & Pond Diagnosis</option>
              <option>Payment & Billing Verification</option>
              <option>General Farm Advisory</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-message-textarea" className="block text-xs font-semibold text-slate-700 mb-1">
            Message / Quantity Requirements
          </label>
          <textarea
            id="inquiry-message-textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mention number of bags, current pond salinity, days of culture (DOC), or specific issues..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-2xs resize-none"
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleWhatsAppSubmit}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Send via WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleMailtoSubmit}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <EmailIcon className="w-4 h-4" />
            <span>Send via Email</span>
          </button>
        </div>

        {/* Reassurance Footer */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Avg. reply in &lt; 20 mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>100% Genuine GST Dispatch</span>
          </div>
        </div>
      </form>
    </div>
  );
};
