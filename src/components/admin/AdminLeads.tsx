import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext.tsx';
import { Lead, LeadStatus } from '../../types.ts';
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Package,
  Calendar,
  Download,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Send,
  Save,
  RotateCcw,
  Layers,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { WhatsAppIcon } from '../Icons.tsx';

export const AdminLeads: React.FC = () => {
  const { leads, addLead, updateLeadStatus, updateLeadNotes, deleteLead, resetLeads } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<'all' | 'form' | 'whatsapp_call'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New lead form state (for Add Walk-in Lead)
  const [newFarmerName, setNewFarmerName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newVillage, setNewVillage] = useState('');
  const [newCategory, setNewCategory] = useState('🦐 Aqua Feed');
  const [newProductName, setNewProductName] = useState('Supreme Vannamei Feed');
  const [newAmountOrAcres, setNewAmountOrAcres] = useState('50 Bags (DOC 40)');
  const [newFarmerProfile, setNewFarmerProfile] = useState('Vannamei Semi-Intensive');
  const [newMessage, setNewMessage] = useState('Walk-in farmer visited Ulavapadu showroom counter.');
  const [newNotes, setNewNotes] = useState('Inquired about bulk discount and doorstep transport.');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // 1. Channel filter
      if (channelFilter === 'form' && lead.leadType !== 'form' && !lead.source?.toLowerCase().includes('form')) {
        return false;
      }
      if (
        channelFilter === 'whatsapp_call' &&
        lead.leadType === 'form' &&
        !lead.source?.toLowerCase().includes('whatsapp') &&
        !lead.source?.toLowerCase().includes('call')
      ) {
        return false;
      }

      // 2. Status filter
      if (statusFilter !== 'all' && lead.status !== statusFilter) {
        return false;
      }

      // 3. Search query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matches =
          lead.farmerName.toLowerCase().includes(query) ||
          lead.phone.includes(query) ||
          lead.village.toLowerCase().includes(query) ||
          (lead.productName && lead.productName.toLowerCase().includes(query)) ||
          lead.topic.toLowerCase().includes(query) ||
          (lead.category && lead.category.toLowerCase().includes(query)) ||
          (lead.farmerProfile && lead.farmerProfile.toLowerCase().includes(query)) ||
          lead.message.toLowerCase().includes(query);

        if (!matches) return false;
      }

      return true;
    });
  }, [leads, searchTerm, statusFilter, channelFilter]);

  // Counts
  const counts = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === 'new').length;
    const formsCount = leads.filter(
      (l) => l.leadType === 'form' || l.source?.toLowerCase().includes('form')
    ).length;
    const whatsappCallCount = leads.filter(
      (l) =>
        l.leadType === 'whatsapp' ||
        l.leadType === 'call' ||
        l.source?.toLowerCase().includes('whatsapp') ||
        l.source?.toLowerCase().includes('call')
    ).length;

    return { total, newCount, formsCount, whatsappCallCount };
  }, [leads]);

  // Export to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      showToast('No leads available to export.');
      return;
    }

    const headers = [
      'Lead ID',
      'Farmer Name',
      'Phone',
      'Village / Location',
      'Category',
      'Enquired Product / Topic',
      'Amount / Pond Size',
      'Channel Type',
      'Farmer Profile',
      'Pipeline Status',
      'Date Received',
      'Notes & Dossier',
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.farmerName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.village.replace(/"/g, '""')}"`,
      `"${(l.category || 'Aqua Feed').replace(/"/g, '""')}"`,
      `"${(l.productName || l.topic).replace(/"/g, '""')}"`,
      `"${(l.amountOrAcres || '').replace(/"/g, '""')}"`,
      `"${(l.source || l.leadType || 'Direct Inquiry').replace(/"/g, '""')}"`,
      `"${(l.farmerProfile || 'Pond Cultivator').replace(/"/g, '""')}"`,
      `"${l.status.toUpperCase()}"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sr_aqua_farmer_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported successfully as CSV spreadsheet!');
  };

  // Launch pre-filled WhatsApp message to the farmer
  const handleWhatsAppFarmer = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const greeting = `Namaste ${lead.farmerName} garu, this is Utukuri Rambabu from SR Aqua Feeds & Needs, Ulavapadu. I received your inquiry regarding "${lead.topic}${
      lead.productName ? ` - ${lead.productName}` : ''
    }". We have fresh stock ready for immediate pond delivery. How can I assist you today?`;
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(greeting)}`, '_blank');

    if (lead.status === 'new') {
      updateLeadStatus(lead.id, 'contacted');
    }
  };

  const handleAddWalkinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmerName.trim() || !newPhone.trim()) {
      alert('Farmer name and phone number are required');
      return;
    }

    addLead({
      farmerName: newFarmerName.trim(),
      phone: newPhone.trim(),
      village: newVillage.trim() || 'Ulavapadu Mandal',
      topic: newProductName.trim() || newCategory,
      productName: newProductName.trim(),
      category: newCategory,
      amountOrAcres: newAmountOrAcres.trim() || 'Walk-in Inquiry',
      leadType: 'form',
      farmerProfile: newFarmerProfile.trim() || 'Pond Owner',
      message: newMessage.trim(),
      notes: newNotes.trim(),
      source: 'Walk-in Counter Lead',
      status: 'new',
    });

    setIsAddModalOpen(false);
    showToast(`Added walk-in lead for "${newFarmerName}"`);

    // Reset fields
    setNewFarmerName('');
    setNewPhone('');
    setNewVillage('');
    setNewAmountOrAcres('');
    setNewNotes('');
  };

  const getStatusBadgeStyle = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return 'bg-rose-950/80 text-rose-300 border-rose-800/80 hover:bg-rose-900';
      case 'contacted':
        return 'bg-sky-950/80 text-sky-300 border-sky-800/80 hover:bg-sky-900';
      case 'quote_sent':
        return 'bg-amber-950/80 text-amber-300 border-amber-800/80 hover:bg-amber-900';
      case 'order_placed':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900';
      case 'closed':
        return 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-5 text-slate-100 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Main Title Card Block (Matching Screenshot) */}
      <div className="bg-slate-950/90 rounded-3xl p-5 sm:p-7 border border-slate-800/90 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Customer Inquiries & Leads CRM
            </h2>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              {counts.total} Total Leads
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Real-time table tracking online inquiries, walk-ins, and free WhatsApp / Call button inquiries across all products.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap self-start md:self-auto">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-black shadow-lg shadow-orange-950/40 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Walk-in Lead</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Pills & Search Filter Row */}
      <div className="space-y-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setChannelFilter('all')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              channelFilter === 'all'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md ring-2 ring-emerald-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Inquiries ({counts.total})
          </button>

          <button
            onClick={() => setChannelFilter('form')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              channelFilter === 'form'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 shadow-md ring-2 ring-emerald-500/20'
                : 'bg-slate-900/60 text-emerald-400 hover:text-emerald-300 border border-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Online Forms ({counts.formsCount})</span>
          </button>

          <button
            onClick={() => setChannelFilter('whatsapp_call')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              channelFilter === 'whatsapp_call'
                ? 'bg-sky-950 text-sky-300 border border-sky-500/50 shadow-md ring-2 ring-sky-500/20'
                : 'bg-slate-900/60 text-sky-400 hover:text-sky-300 border border-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>WhatsApp / Call Leads ({counts.whatsappCallCount})</span>
          </button>
        </div>

        {/* Search Bar & Status Dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads by client name, mobile, service, enquired property, or village..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="w-full sm:w-64">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs font-semibold text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Pipeline Statuses ({counts.total})</option>
              <option value="new">New ({leads.filter((l) => l.status === 'new').length})</option>
              <option value="contacted">
                Contacted ({leads.filter((l) => l.status === 'contacted').length})
              </option>
              <option value="quote_sent">
                Quote Sent ({leads.filter((l) => l.status === 'quote_sent').length})
              </option>
              <option value="order_placed">
                Order Placed ({leads.filter((l) => l.status === 'order_placed').length})
              </option>
              <option value="closed">Closed ({leads.filter((l) => l.status === 'closed').length})</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Table Header & Subtext */}
      <div className="flex items-center justify-between text-xs px-2 pt-2 text-slate-400">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
          SHOWING {filteredLeads.length} INQUIRIES
        </span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Click any row to open full client notes & discussion dossier
        </span>
      </div>

      {/* 4. CRM Leads Data Table */}
      <div className="bg-slate-950/90 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="py-3.5 px-4">CUSTOMER DETAILS</th>
                <th className="py-3.5 px-4">WHAT THEY SELECTED</th>
                <th className="py-3.5 px-4">PAYMENT & LEAD TYPE</th>
                <th className="py-3.5 px-4">CITY / PROFILE</th>
                <th className="py-3.5 px-4">PIPELINE STATUS</th>
                <th className="py-3.5 px-4">DATE</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-slate-500">
                    <Users className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-60" />
                    <p className="font-semibold text-slate-400">No matching customer leads found</p>
                    <p className="text-[11px] mt-1 text-slate-600">
                      When farmers contact via WhatsApp, Call, or forms, they will show up here.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const dateShort = new Date(lead.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  });

                  const isLeadTypeForm =
                    lead.leadType === 'form' || lead.source?.toLowerCase().includes('form');

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-900/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* Column 1: Customer Details */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1">
                          <strong className="text-white text-sm font-bold block group-hover:text-emerald-300 transition-colors">
                            {lead.farmerName}
                          </strong>
                          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                            <Phone className="w-3 h-3 text-slate-500" />
                            <span>{lead.phone}</span>
                          </div>
                          {lead.village && (
                            <span className="text-[10px] text-slate-500 block truncate max-w-[150px]">
                              {lead.village}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Column 2: What They Selected */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-950/80 border border-sky-600/40 text-sky-300 text-[10px] font-bold">
                            {lead.category || '🦐 Aqua Feed'}
                          </span>
                          <div className="text-white font-semibold text-xs leading-snug">
                            {lead.productName || lead.topic}
                          </div>
                          {lead.amountOrAcres && (
                            <div className="text-[11px] text-slate-400 font-mono">
                              {lead.amountOrAcres}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Column 3: Payment & Lead Type */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1">
                          {isLeadTypeForm ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-xs">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              <span>Online Form</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-sky-400 font-bold text-xs">
                              <span className="w-2 h-2 rounded-full bg-sky-400" />
                              <span>Direct WhatsApp / Call</span>
                            </span>
                          )}
                          <span className="text-[10px] text-slate-500 block">
                            {lead.source || (lead.leadType === 'call' ? 'Store Line' : 'WhatsApp Lead')}
                          </span>
                        </div>
                      </td>

                      {/* Column 4: City / Profile */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-0.5">
                          <span className="text-slate-200 font-semibold block text-xs">
                            {lead.village || 'Coastal Belt'}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            {lead.farmerProfile || 'Pond Cultivator'}
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Pipeline Status (Interactive Dropdown Badge) */}
                      <td
                        className="py-4 px-4 align-top"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative inline-block">
                          <select
                            value={lead.status}
                            onChange={(e) => {
                              updateLeadStatus(lead.id, e.target.value as LeadStatus);
                              showToast(`Status updated to ${e.target.value.toUpperCase()}`);
                            }}
                            className={`appearance-none px-3 py-1 pr-6 rounded-xl border text-[11px] font-black uppercase tracking-wider cursor-pointer focus:outline-hidden transition-all shadow-sm ${getStatusBadgeStyle(
                              lead.status
                            )}`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="quote_sent">Quote Sent</option>
                            <option value="order_placed">Order Placed</option>
                            <option value="closed">Closed</option>
                          </select>
                          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>

                      {/* Column 6: Date */}
                      <td className="py-4 px-4 align-top text-slate-400 text-xs font-mono whitespace-nowrap">
                        {dateShort}
                      </td>

                      {/* Column 7: Actions */}
                      <td
                        className="py-4 px-4 align-top text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Open dossier button */}
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                            title="Open Client Dossier & Discussion Notes"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>

                          {/* Direct WhatsApp button */}
                          <button
                            onClick={() => handleWhatsAppFarmer(lead)}
                            className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800/80 transition-colors cursor-pointer"
                            title="Chat with Farmer on WhatsApp"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                          </button>

                          {/* Direct Phone Call button */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded-lg bg-sky-950 text-sky-400 hover:bg-sky-900 border border-sky-800/80 transition-colors"
                            title="Dial Farmer Phone"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          {/* Delete Lead button */}
                          <button
                            onClick={() => {
                              if (confirm(`Delete inquiry from ${lead.farmerName}?`)) {
                                deleteLead(lead.id);
                                showToast(`Deleted inquiry for ${lead.farmerName}`);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Client Dossier & Discussion Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-700/80 space-y-5 my-6 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Client Notes & Discussion Dossier
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Lead ID: <strong className="font-mono text-slate-300">{selectedLead.id}</strong>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Farmer Name</span>
                <strong className="text-sm text-white block mt-0.5">{selectedLead.farmerName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Mobile Number</span>
                <span className="font-mono text-emerald-400 font-bold block mt-0.5">
                  {selectedLead.phone}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Location</span>
                <span className="text-slate-300 block mt-0.5">{selectedLead.village || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Category</span>
                <span className="text-sky-300 font-semibold block mt-0.5">
                  {selectedLead.category || selectedLead.topic}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Amount / Acres</span>
                <span className="text-amber-300 font-mono block mt-0.5">
                  {selectedLead.amountOrAcres || 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Pipeline Status</span>
                <span
                  className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold mt-0.5 border ${getStatusBadgeStyle(
                    selectedLead.status
                  )}`}
                >
                  {selectedLead.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Farmer Inquiry Message */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Farmer Inquiry Details</label>
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 leading-relaxed font-sans">
                {selectedLead.message || 'No specific text submitted.'}
              </div>
            </div>

            {/* Internal Admin Discussion Dossier Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Internal Discussion Dossier & Price Quote Notes</span>
                <span className="text-[10px] text-slate-500 font-normal">Private to Admin</span>
              </label>
              <textarea
                rows={3}
                defaultValue={selectedLead.notes || ''}
                id="modal-lead-notes"
                placeholder="Write negotiation notes, delivery address details, vehicle driver phone, or batch numbers..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleWhatsAppFarmer(selectedLead)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp Farmer</span>
                </button>

                <a
                  href={`tel:${selectedLead.phone}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md"
                >
                  <Phone className="w-3.5 h-3.5 text-white" />
                  <span>Call Direct</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const notesVal = (
                      document.getElementById('modal-lead-notes') as HTMLTextAreaElement
                    )?.value;
                    updateLeadNotes(selectedLead.id, notesVal || '');
                    showToast('Saved discussion dossier notes.');
                    setSelectedLead(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Dossier Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Add Walk-in Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-700/80 space-y-4 my-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Record New Walk-in Farmer Lead</h3>
                  <span className="text-[11px] text-slate-400">
                    Counter visit or phone inquiry log
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWalkinSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Farmer Name <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newFarmerName}
                    onChange={(e) => setNewFarmerName(e.target.value)}
                    placeholder="e.g. Gandam Bhagyalaxmi"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Mobile Number <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="e.g. 9989715441"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Category Tag
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="🦐 Aqua Feed">🦐 Aqua Feed</option>
                    <option value="⚡ Emergency DO">⚡ Emergency DO</option>
                    <option value="🌱 Pond Minerals">🌱 Pond Minerals</option>
                    <option value="🧪 Gas Control">🧪 Gas Control</option>
                    <option value="🦠 Probiotics">🦠 Probiotics</option>
                    <option value="🔬 Testing Lab">🔬 Testing Lab</option>
                    <option value="💬 General Need">💬 General Need</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Quantity / Acreage
                  </label>
                  <input
                    type="text"
                    value={newAmountOrAcres}
                    onChange={(e) => setNewAmountOrAcres(e.target.value)}
                    placeholder="e.g. 60 Bags (DOC 55)"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Village / Mandal
                  </label>
                  <input
                    type="text"
                    value={newVillage}
                    onChange={(e) => setNewVillage(e.target.value)}
                    placeholder="e.g. Chakicherla / Ulavapadu"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Farmer Profile / Culture
                  </label>
                  <input
                    type="text"
                    value={newFarmerProfile}
                    onChange={(e) => setNewFarmerProfile(e.target.value)}
                    placeholder="e.g. Semi-Intensive Vannamei"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Enquired Product / Service
                </label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="e.g. Ultra Vannamei Feed 40 (38% Protein)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Discussion Dossier Notes
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Inquired about delivery timing and payment upon receipt."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Add Walk-in Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
