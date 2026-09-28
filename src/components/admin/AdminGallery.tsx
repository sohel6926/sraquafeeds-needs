import React, { useState } from 'react';
import { useData } from '../../context/DataContext.tsx';
import { GalleryItem } from '../../types.ts';
import { ImageUploader } from './ImageUploader.tsx';
import { MultiImageUploader } from './MultiImageUploader.tsx';
import { AutoResizeTextarea } from './AutoResizeTextarea.tsx';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  RotateCcw,
  Copy,
  Upload,
  Layers
} from 'lucide-react';

const GALLERY_CATEGORIES: GalleryItem['category'][] = [
  'Shop Interior',
  'Stock & Warehouse',
  'Products Display',
  'Farmer Support',
  'Prawn & Crop Vitality',
  'Pond & Farm Scenery',
];

const PRESET_GALLERY_IMAGES = [
  { label: 'Modern Shop Interior', url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Feed Warehouse Pallets', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Mineral Sacks Storage', url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Biotech & Probiotics Rack', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Farmer Advisory Counter', url: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Brackish Water Pond', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80' },
];

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, resetGallery } = useData();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Shop Interior');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Batch Multi-Upload State
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchCategory, setBatchCategory] = useState<GalleryItem['category']>('Shop Interior');
  const [batchTitlePrefix, setBatchTitlePrefix] = useState('');
  const [batchDescription, setBatchDescription] = useState('');
  const [batchImages, setBatchImages] = useState<string[]>([]);

  const handleOpenBatch = () => {
    setBatchCategory('Shop Interior');
    setBatchTitlePrefix('');
    setBatchDescription('');
    setBatchImages([]);
    setIsBatchModalOpen(true);
  };

  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchImages.length === 0) {
      alert('Please upload or select at least one photo.');
      return;
    }

    const baseTime = Date.now();
    batchImages.forEach((img, idx) => {
      const itemTitle = batchTitlePrefix.trim()
        ? `${batchTitlePrefix.trim()} (${idx + 1})`
        : `${batchCategory} ${gallery.length + idx + 1}`;

      addGalleryItem({
        id: `gal-${baseTime}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        title: itemTitle,
        category: batchCategory,
        description: batchDescription.trim() || `SR Aqua Feeds showroom and pond facility - ${batchCategory}.`,
        imageUrl: img,
      });
    });

    showToast(`Successfully added ${batchImages.length} photos to the gallery!`);
    setIsBatchModalOpen(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Shop Interior');
    setDescription('');
    setImageUrl(PRESET_GALLERY_IMAGES[0].url);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    setIsModalOpen(true);
  };

  const handleDuplicateGalleryItem = (source: GalleryItem) => {
    const duplicated: GalleryItem = {
      ...source,
      id: `gal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: `${source.title} (Copy)`,
    };
    addGalleryItem(duplicated);
    showToast(`Duplicated "${source.title}"!`);
  };

  const handleSave = (e: React.FormEvent) => {

    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      alert('Title and Image URL are required.');
      return;
    }

    const payload: GalleryItem = {
      id: editingItem ? editingItem.id : `gal-${Date.now()}`,
      title: title.trim(),
      category,
      description: description.trim() || 'SR Aqua Feeds & Needs Showroom and Aquaculture Gallery photo.',
      imageUrl: imageUrl.trim(),
    };

    if (editingItem) {
      updateGalleryItem(payload);
      showToast(`Updated gallery photo "${payload.title}"`);
    } else {
      addGalleryItem(payload);
      showToast(`Added gallery photo "${payload.title}"`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-lg bg-slate-900 text-white shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <ImageIcon className="w-7 h-7 text-emerald-600" />
            <span>Showroom & Farm Gallery Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage pictures of the shop front, warehouse inventory, chemical racks, farmer visits, and pond scenery.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (confirm('Restore factory default gallery photos?')) {
                resetGallery();
                showToast('Gallery restored to defaults.');
              }
            }}
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Reset Gallery to Factory Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenBatch}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-emerald-600" />
            <span>Upload Multiple Photos</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Single Photo</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[11px] font-bold backdrop-blur-xs">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2 flex-wrap">
              <button
                onClick={() => handleDuplicateGalleryItem(item)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 text-xs font-bold transition-colors cursor-pointer"
                title={`Duplicate "${item.title}"`}
              >
                <Copy className="w-3.5 h-3.5 text-sky-600" />
                <span>Duplicate</span>
              </button>

              <button
                onClick={() => handleOpenEdit(item)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Edit</span>
              </button>


              <button
                onClick={() => {
                  if (confirm(`Delete gallery image "${item.title}"?`)) {
                    deleteGalleryItem(item.id);
                    showToast('Gallery image removed.');
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Delete image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto w-full max-w-full">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto min-w-0">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  {editingItem ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Photo Title <span className="text-emerald-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Ulavapadu Store Front and Customer Counter"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category <span className="text-emerald-600">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gallery Image Uploader */}
              <ImageUploader
                label="Showroom / Farm Photo"
                value={imageUrl}
                onChange={(img) => setImageUrl(img)}
                presetImages={PRESET_GALLERY_IMAGES}
              />


              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Caption
                </label>
                <AutoResizeTextarea
                  minRows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what is shown in this photo (e.g., location, products, farmer support activities)..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  {editingItem ? 'Save Photo' : 'Add Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Batch Upload Multiple Photos Modal */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto w-full max-w-full">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Upload Multiple Photos to Gallery
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Select multiple pictures from your phone or PC to add to the gallery at once.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBatchModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBatch} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Gallery Category <span className="text-emerald-600">*</span>
                  </label>
                  <select
                    value={batchCategory}
                    onChange={(e) => setBatchCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  >
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Photo Title Prefix <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={batchTitlePrefix}
                    onChange={(e) => setBatchTitlePrefix(e.target.value)}
                    placeholder="e.g. Warehouse Rack or Pond Dispatch"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Common Description / Caption <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={batchDescription}
                  onChange={(e) => setBatchDescription(e.target.value)}
                  placeholder="e.g. Fresh batch arriving at SR Aqua Feeds & Needs Ulavapadu showroom"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Multi-Image Uploader Component */}
              <div className="pt-1">
                <MultiImageUploader
                  label="Select Multiple Photos (Drop or Pick Files)"
                  images={batchImages}
                  maxImages={20}
                  onChange={(newImgs) => setBatchImages(newImgs)}
                  presetImages={PRESET_GALLERY_IMAGES}
                />
              </div>

              <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-200 flex-wrap">
                <span className="text-xs font-semibold text-slate-600">
                  {batchImages.length} photo(s) selected
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBatchModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={batchImages.length === 0}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload & Add {batchImages.length > 0 ? `(${batchImages.length})` : ''} to Gallery</span>
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
