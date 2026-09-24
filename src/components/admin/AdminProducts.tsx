import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext.tsx';
import { Product, ProductCategory } from '../../types.ts';
import { ImageUploader } from './ImageUploader.tsx';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  X,
  RotateCcw,
  Copy,
  Table,
  Layers,
  Droplet,
  FileText,
  ShieldCheck,
} from 'lucide-react';

const CATEGORIES: ProductCategory[] = [
  'All',
  'Shrimp & Fish Feed',
  'Pond Minerals',
  'Probiotics & Enzymes',
  'Ammonia & Gas Control',
  'Oxygen Enhancers',
  'Disinfectants & Sanitizers',
  'Growth Promoters & Immunity',
];

const PRESET_IMAGES = [
  { label: 'Shrimp Feed Pellets', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Nursery Crumbles', url: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pond Minerals Salt', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Probiotic Bacteria', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80' },
  { label: 'Oxygen DO Effervescent', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Gas Reducer Zeolite', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
  { label: 'Clean Aquatic Pond', url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80' },
];

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit / Add modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [modalTab, setModalTab] = useState<'general' | 'specs' | 'composition' | 'dosage_water'>('general');

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Shrimp & Fish Feed',
    tagline: '',
    description: '',
    packaging: '25 kg Bag',
    keyBenefits: ['High Protein Formulation', 'Rapid Digestion', 'Clean Water Formula'],
    imageUrl: PRESET_IMAGES[0].url,
    isPopular: false,
    curiosityBadge: 'Premium Grade',
    curiosityHighlight: 'High Bio-Availability',
    fullDescription: '',
    handlingAndStorage: 'Store on elevated pallets in a dry, ventilated coastal warehouse.',
  });

  const [benefitsInput, setBenefitsInput] = useState('');
  const [specsList, setSpecsList] = useState<{ label: string; value: string }[]>([]);
  const [compositionList, setCompositionList] = useState<{ component: string; percentage: string }[]>([]);
  const [dosageList, setDosageList] = useState<{ stage: string; dose: string; frequency: string; notes: string }[]>([]);
  const [waterParamsList, setWaterParamsList] = useState<{ param: string; target: string; note: string }[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setModalTab('general');
    setFormData({
      name: '',
      category: 'Shrimp & Fish Feed',
      tagline: '',
      description: '',
      packaging: '25 kg Bag',
      keyBenefits: ['High Protein Formulation', 'Rapid Water Stability', 'Optimal FCR Conversion'],
      imageUrl: PRESET_IMAGES[0].url,
      isPopular: false,
      curiosityBadge: 'Premium Stock',
      curiosityHighlight: 'Coastal Tested',
      fullDescription: '',
      handlingAndStorage: 'Store on elevated pallets in a dry, shaded place.',
    });
    setBenefitsInput('High Protein Formulation\nRapid Water Stability\nOptimal FCR Conversion');
    setSpecsList([
      { label: 'Quality Grade', value: 'Commercial Aquaculture Grade' },
      { label: 'Packaging Type', value: 'High Barrier 3-Ply Bag' },
      { label: 'Form', value: 'Extruded Sinking Pellets' },
    ]);
    setCompositionList([
      { component: 'Crude Protein', percentage: 'Min 38.0%' },
      { component: 'Crude Fat', percentage: 'Min 5.5%' },
      { component: 'Moisture', percentage: 'Max 10.5%' },
    ]);
    setDosageList([
      { stage: 'DOC 1 - DOC 30', dose: '1.5 - 2.5 kg / 100k postlarvae', frequency: '3 times daily', notes: 'Broadcast evenly' },
      { stage: 'DOC 31 - Harvest', dose: 'Based on check tray biomass', frequency: '4 times daily', notes: 'Check 2.5h feeding tray' },
    ]);
    setWaterParamsList([
      { param: 'Dissolved Oxygen', target: '> 4.0 ppm', note: 'Essential for feed digestion' },
      { param: 'pH', target: '7.5 – 8.5', note: 'Maintain morning-evening stability' },
    ]);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setModalTab('general');
    setFormData({ ...p });
    setBenefitsInput((p.keyBenefits || []).join('\n'));
    setSpecsList(
      p.specs && p.specs.length > 0
        ? [...p.specs]
        : [
            { label: 'Quality Grade', value: 'Commercial Aquaculture Grade' },
            { label: 'Packaging', value: p.packaging || '25 kg' },
          ]
    );
    setCompositionList(
      p.composition && p.composition.length > 0
        ? [...p.composition]
        : [{ component: 'Active Formulation Blend', percentage: '100%' }]
    );
    setDosageList(
      p.dosageSchedule && p.dosageSchedule.length > 0
        ? [...p.dosageSchedule]
        : [{ stage: 'General Pond Culture', dose: 'As per biomass', frequency: 'Daily', notes: 'Check pond conditions' }]
    );
    setWaterParamsList(
      p.idealWaterParams && p.idealWaterParams.length > 0
        ? [...p.idealWaterParams]
        : [
            { param: 'Dissolved Oxygen', target: '> 4.0 ppm', note: 'Standard pond health' },
            { param: 'pH', target: '7.5 – 8.5', note: 'Optimal brackish culture' },
          ]
    );
    setIsModalOpen(true);
  };

  const handleDuplicateProduct = (sourceProduct: Product) => {
    const duplicated: Product = {
      ...sourceProduct,
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: `${sourceProduct.name} (Copy)`,
      isPopular: false,
    };
    addProduct(duplicated);
    showToast(`Successfully duplicated "${sourceProduct.name}"!`);
  };

  // Helper row handlers
  const addSpecRow = () => setSpecsList([...specsList, { label: '', value: '' }]);
  const updateSpecRow = (idx: number, field: 'label' | 'value', val: string) => {
    const updated = [...specsList];
    updated[idx][field] = val;
    setSpecsList(updated);
  };
  const removeSpecRow = (idx: number) => setSpecsList(specsList.filter((_, i) => i !== idx));

  const addCompRow = () => setCompositionList([...compositionList, { component: '', percentage: '' }]);
  const updateCompRow = (idx: number, field: 'component' | 'percentage', val: string) => {
    const updated = [...compositionList];
    updated[idx][field] = val;
    setCompositionList(updated);
  };
  const removeCompRow = (idx: number) => setCompositionList(compositionList.filter((_, i) => i !== idx));

  const addDosageRow = () => setDosageList([...dosageList, { stage: '', dose: '', frequency: '', notes: '' }]);
  const updateDosageRow = (idx: number, field: 'stage' | 'dose' | 'frequency' | 'notes', val: string) => {
    const updated = [...dosageList];
    updated[idx][field] = val;
    setDosageList(updated);
  };
  const removeDosageRow = (idx: number) => setDosageList(dosageList.filter((_, i) => i !== idx));

  const addWaterParamRow = () => setWaterParamsList([...waterParamsList, { param: '', target: '', note: '' }]);
  const updateWaterParamRow = (idx: number, field: 'param' | 'target' | 'note', val: string) => {
    const updated = [...waterParamsList];
    updated[idx][field] = val;
    setWaterParamsList(updated);
  };
  const removeWaterParamRow = (idx: number) => setWaterParamsList(waterParamsList.filter((_, i) => i !== idx));

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert('Product name is required');
      return;
    }

    const benefits = benefitsInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formData.name.trim(),
      category: (formData.category as ProductCategory) || 'Shrimp & Fish Feed',
      tagline: formData.tagline?.trim() || 'Top quality aquaculture feed and chemicals',
      description: formData.description?.trim() || '',
      packaging: formData.packaging?.trim() || '25 kg Bag',
      keyBenefits: benefits.length > 0 ? benefits : ['Reliable Quality', 'Fast Acting'],
      imageUrl: formData.imageUrl?.trim() || PRESET_IMAGES[0].url,
      isPopular: !!formData.isPopular,
      curiosityBadge: formData.curiosityBadge?.trim() || undefined,
      curiosityHighlight: formData.curiosityHighlight?.trim() || undefined,
      fullDescription: formData.fullDescription?.trim() || formData.description?.trim(),
      handlingAndStorage: formData.handlingAndStorage?.trim(),
      specs: specsList.filter((s) => s.label.trim() || s.value.trim()),
      composition: compositionList.filter((c) => c.component.trim() || c.percentage.trim()),
      dosageSchedule: dosageList.filter((d) => d.stage.trim() || d.dose.trim()),
      idealWaterParams: waterParamsList.filter((w) => w.param.trim() || w.target.trim()),
    };

    if (editingProduct) {
      updateProduct(productPayload);
      showToast(`Updated product "${productPayload.name}" with full specifications`);
    } else {
      addProduct(productPayload);
      showToast(`Added new product "${productPayload.name}" to catalog`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Package className="w-7 h-7 text-emerald-600" />
            <span>Complete Products Catalog Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Create, duplicate, update, or remove products. Edit technical specs, ingredients, dosage charts & water parameters.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (confirm('Restore factory default product catalog? Any custom added products will be replaced.')) {
                resetProducts();
                showToast('Products catalog restored to default.');
              }
            }}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Reset to Factory Products"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by title, tagline, benefits..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <span className="text-xs text-slate-500 self-end sm:self-auto">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of {products.length} products
          </span>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Product Image & Badges */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/85 text-white text-[10px] font-bold backdrop-blur-xs">
                    {product.category}
                  </span>
                  {product.isPopular && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 fill-white" />
                      Featured
                    </span>
                  )}
                </div>
                {product.curiosityBadge && (
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                    {product.curiosityBadge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-extrabold text-base text-slate-900 leading-snug line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                    {product.packaging}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {product.tagline || product.description}
                </p>

                {/* Key Benefits */}
                <div className="pt-1 flex flex-wrap gap-1">
                  {(product.keyBenefits || []).slice(0, 2).map((b, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      ✓ {b}
                    </span>
                  ))}
                  {(product.keyBenefits || []).length > 2 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{product.keyBenefits.length - 2} more
                    </span>
                  )}
                </div>

                {/* Technical badges indicator */}
                <div className="pt-1 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span>{(product.specs || []).length} Specs</span>
                  <span>•</span>
                  <span>{(product.composition || []).length} Ingredients</span>
                  <span>•</span>
                  <span>{(product.dosageSchedule || []).length} Dosages</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  updateProduct({ ...product, isPopular: !product.isPopular });
                  showToast(
                    product.isPopular
                      ? `Removed "${product.name}" from homepage featured.`
                      : `Set "${product.name}" as featured on homepage!`
                  );
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  product.isPopular
                    ? 'text-amber-700 bg-amber-100 hover:bg-amber-200'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
                title="Toggle featured status on homepage"
              >
                <Star className={`w-3.5 h-3.5 ${product.isPopular ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{product.isPopular ? 'Featured' : 'Feature'}</span>
              </button>

              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                <button
                  onClick={() => handleDuplicateProduct(product)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 text-xs font-bold transition-colors cursor-pointer"
                  title={`Duplicate "${product.name}"`}
                >
                  <Copy className="w-3.5 h-3.5 text-sky-600" />
                  <span>Duplicate</span>
                </button>

                <button
                  onClick={() => handleOpenEdit(product)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Edit All</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete product "${product.name}"?`)) {
                      deleteProduct(product.id);
                      showToast(`Product "${product.name}" deleted.`);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete product"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Add / Full Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-4 my-6 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {editingProduct ? `Full Product Editor: ${editingProduct.name}` : 'Create New Aquaculture Product'}
                  </h3>
                  <p className="text-[11px] text-slate-400">Complete access to specs, composition, dosage & water targets</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sub-Tabs */}
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2 overflow-x-auto scrollbar-none flex-shrink-0">
              <button
                type="button"
                onClick={() => setModalTab('general')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'general'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>1. General & Image</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('specs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'specs'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>2. Specs & Narrative</span>
                <span className="text-[10px] opacity-80">({specsList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('composition')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'composition'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3. Ingredients & %</span>
                <span className="text-[10px] opacity-80">({compositionList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('dosage_water')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'dosage_water'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Droplet className="w-3.5 h-3.5" />
                <span>4. Dosage & Water Targets</span>
                <span className="text-[10px] opacity-80">({dosageList.length + waterParamsList.length})</span>
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto pr-1 space-y-4">
              {/* TAB 1: GENERAL */}
              {modalTab === 'general' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Product Name <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Ultra Vannamei Feed 40"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Category <span className="text-emerald-600">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                      >
                        {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Packaging Specification
                      </label>
                      <input
                        type="text"
                        value={formData.packaging || ''}
                        onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                        placeholder="e.g., 25 kg Bag, 10 Litre Can, 5 kg Bucket"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Curiosity / Quality Badge
                      </label>
                      <input
                        type="text"
                        value={formData.curiosityBadge || ''}
                        onChange={(e) => setFormData({ ...formData, curiosityBadge: e.target.value })}
                        placeholder="e.g., 38% Marine Protein or 100% Water Soluble"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Curiosity Highlight (Sub-badge)
                    </label>
                    <input
                      type="text"
                      value={formData.curiosityHighlight || ''}
                      onChange={(e) => setFormData({ ...formData, curiosityHighlight: e.target.value })}
                      placeholder="e.g., Highly bio-available chelated minerals"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tagline (Catchy summary)
                    </label>
                    <input
                      type="text"
                      value={formData.tagline || ''}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="e.g., High-protein, 3-hour water stable pellet for optimal FCR & uniform growth"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Overview Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Scientifically balanced pellet enriched with marine lipids, cholesterol, and essential amino acids..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Key Highlights & Benefits (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={benefitsInput}
                      onChange={(e) => setBenefitsInput(e.target.value)}
                      placeholder="38% Crude Protein & Marine Phospholipids&#10;Low water-dusting, 3+ hour water stability&#10;Proven low FCR (1.1 - 1.2) for shrimp"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
                    />
                  </div>

                  {/* Image Uploader */}
                  <ImageUploader
                    label="Product Display Image"
                    value={formData.imageUrl || ''}
                    onChange={(img) => setFormData({ ...formData, imageUrl: img })}
                    presetImages={PRESET_IMAGES}
                  />

                  {/* Featured Checkbox */}
                  <div className="flex items-center gap-2 pt-1 p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                    <input
                      type="checkbox"
                      id="product-is-popular"
                      checked={!!formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="product-is-popular" className="text-xs font-bold text-slate-800 cursor-pointer">
                      ⭐ Feature this product on the Homepage showcase and highlights carousel
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: SPECS & NARRATIVE */}
              {modalTab === 'specs' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full In-Depth Product Narrative & Chemistry
                    </label>
                    <textarea
                      rows={4}
                      value={formData.fullDescription || ''}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      placeholder="Explain the cellular mechanism, manufacturing standards, marine ingredient sources, and coastal pond benefits..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  {/* Dynamic Specifications Table */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Table className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Technical Specifications Table</span>
                      </label>
                      <button
                        type="button"
                        onClick={addSpecRow}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[11px] font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Row</span>
                      </button>
                    </div>

                    <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      {specsList.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={spec.label}
                            onChange={(e) => updateSpecRow(i, 'label', e.target.value)}
                            placeholder="Spec Parameter (e.g. Moisture)"
                            className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold"
                          />
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => updateSpecRow(i, 'value', e.target.value)}
                            placeholder="Value (e.g. Max 10.0%)"
                            className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
                          />
                          <button
                            type="button"
                            onClick={() => removeSpecRow(i)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {specsList.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-2">No specifications added yet. Click &quot;Add Row&quot; above.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Handling, Storage & Pallet Guidelines
                    </label>
                    <textarea
                      rows={2}
                      value={formData.handlingAndStorage || ''}
                      onChange={(e) => setFormData({ ...formData, handlingAndStorage: e.target.value })}
                      placeholder="e.g. Store on elevated wooden pallets in a cool, ventilated coastal warehouse. Protect from direct rain."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: COMPOSITION */}
              {modalTab === 'composition' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 leading-relaxed">
                    <strong>Active Formula & Guaranteed Bio-Analysis:</strong> Add the exact mineral, protein, or bacterial CFU concentrations that display on the public product profile.
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Active Ingredients & Percentages</span>
                      </label>
                      <button
                        type="button"
                        onClick={addCompRow}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[11px] font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Ingredient Row</span>
                      </button>
                    </div>

                    <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      {compositionList.map((comp, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={comp.component}
                            onChange={(e) => updateCompRow(i, 'component', e.target.value)}
                            placeholder="Component / Compound (e.g. Marine Protein)"
                            className="w-2/3 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold"
                          />
                          <input
                            type="text"
                            value={comp.percentage}
                            onChange={(e) => updateCompRow(i, 'percentage', e.target.value)}
                            placeholder="Percentage / Concentration (e.g. Min 38%)"
                            className="w-1/3 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => removeCompRow(i)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {compositionList.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-2">No ingredients added yet. Click &quot;Add Ingredient Row&quot; above.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DOSAGE & WATER TARGETS */}
              {modalTab === 'dosage_water' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Dosage Schedule */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Droplet className="w-3.5 h-3.5 text-teal-600" />
                        <span>Dosage Schedule by Culture Stage</span>
                      </label>
                      <button
                        type="button"
                        onClick={addDosageRow}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 text-[11px] font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Stage Row</span>
                      </button>
                    </div>

                    <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      {dosageList.map((dos, i) => (
                        <div key={i} className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={dos.stage}
                              onChange={(e) => updateDosageRow(i, 'stage', e.target.value)}
                              placeholder="Stage (e.g. DOC 1-30)"
                              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                            />
                            <input
                              type="text"
                              value={dos.dose}
                              onChange={(e) => updateDosageRow(i, 'dose', e.target.value)}
                              placeholder="Dose (e.g. 2 kg/Acre)"
                              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                            />
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={dos.frequency}
                                onChange={(e) => updateDosageRow(i, 'frequency', e.target.value)}
                                placeholder="Frequency (e.g. Every 5 days)"
                                className="flex-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => removeDosageRow(i)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <input
                            type="text"
                            value={dos.notes}
                            onChange={(e) => updateDosageRow(i, 'notes', e.target.value)}
                            placeholder="Special advice (e.g. Apply with 100L pond water at 9 AM aerators running)"
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600"
                          />
                        </div>
                      ))}
                      {dosageList.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-2">No dosage stages added yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Water Parameters */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                        <span>Recommended Pond Water Parameters</span>
                      </label>
                      <button
                        type="button"
                        onClick={addWaterParamRow}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 text-[11px] font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Parameter Row</span>
                      </button>
                    </div>

                    <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      {waterParamsList.map((wp, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={wp.param}
                            onChange={(e) => updateWaterParamRow(i, 'param', e.target.value)}
                            placeholder="Parameter (e.g. Dissolved Oxygen)"
                            className="w-1/3 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                          />
                          <input
                            type="text"
                            value={wp.target}
                            onChange={(e) => updateWaterParamRow(i, 'target', e.target.value)}
                            placeholder="Target (e.g. > 4.5 ppm)"
                            className="w-1/3 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                          />
                          <input
                            type="text"
                            value={wp.note}
                            onChange={(e) => updateWaterParamRow(i, 'note', e.target.value)}
                            placeholder="Field note (e.g. Keep aerators active)"
                            className="w-1/3 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-600"
                          />
                          <button
                            type="button"
                            onClick={() => removeWaterParamRow(i)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {waterParamsList.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-2">No water parameters specified yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-4 flex items-center justify-between gap-2.5 border-t border-slate-100 flex-wrap">
                {editingProduct ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleDuplicateProduct(editingProduct);
                      setIsModalOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 text-xs font-bold transition-colors cursor-pointer"
                    title="Clone this product as a new entry"
                  >
                    <Copy className="w-3.5 h-3.5 text-sky-600" />
                    <span>Duplicate as New Entry</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    {editingProduct ? 'Save All Specifications' : 'Create Product'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
