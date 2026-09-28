import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Link as LinkIcon,
  Check,
  RefreshCw,
  Cloud,
  Star,
  Plus,
  ArrowLeft,
  ArrowRight,
  Eye,
  AlertCircle
} from 'lucide-react';
import { uploadImageToCloudinary } from '../../lib/cloudinary.ts';

interface MultiImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  primaryImage?: string;
  onPrimaryChange?: (primaryUrl: string) => void;
  label?: string;
  maxImages?: number;
  presetImages?: { label: string; url: string }[];
}

// Client-side image resizing and optimization fallback
const compressImage = (file: File, maxWidth = 1200, maxHeight = 900, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  images = [],
  onChange,
  primaryImage,
  onPrimaryChange,
  label = 'Product Images & Gallery',
  maxImages = 10,
  presetImages = [],
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [showUrlOption, setShowUrlOption] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Normalize image list (filter empty strings)
  const currentImages = (images || []).filter((img) => Boolean(img && img.trim()));
  const currentPrimary = primaryImage || currentImages[0] || '';

  const processFileList = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));

    if (validFiles.length === 0) {
      alert('Please select valid image files (PNG, JPG, JPEG, WEBP).');
      return;
    }

    if (currentImages.length + validFiles.length > maxImages) {
      alert(`You can upload a maximum of ${maxImages} images per product.`);
    }

    const filesToUpload = validFiles.slice(0, Math.max(0, maxImages - currentImages.length));
    if (filesToUpload.length === 0) return;

    setIsProcessing(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      setUploadStatus(`Uploading image ${i + 1} of ${filesToUpload.length}...`);

      try {
        const cloudUrl = await uploadImageToCloudinary(file);
        uploadedUrls.push(cloudUrl);
      } catch (cloudErr) {
        console.warn('Cloudinary upload fallback to local compressed image:', cloudErr);
        setUploadStatus(`Optimizing image ${i + 1} locally...`);
        try {
          const localUrl = await compressImage(file);
          uploadedUrls.push(localUrl);
        } catch (localErr) {
          console.error('Failed to compress image:', localErr);
        }
      }
    }

    setIsProcessing(false);
    setUploadStatus(uploadedUrls.length > 0 ? `Uploaded ${uploadedUrls.length} image(s) successfully!` : '');
    setTimeout(() => setUploadStatus(''), 3000);

    if (uploadedUrls.length > 0) {
      const combined = [...currentImages, ...uploadedUrls];
      onChange(combined);
      if (!currentPrimary && onPrimaryChange) {
        onPrimaryChange(combined[0]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFileList(e.target.files);
    }
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFileList(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const removedUrl = currentImages[indexToRemove];
    const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);

    if (removedUrl === currentPrimary && onPrimaryChange) {
      onPrimaryChange(updated[0] || '');
    }
  };

  const handleSetPrimary = (url: string) => {
    if (onPrimaryChange) {
      onPrimaryChange(url);
    } else {
      // Re-order so primary is first
      const rest = currentImages.filter((u) => u !== url);
      onChange([url, ...rest]);
    }
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentImages.length) return;

    const copy = [...currentImages];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (trimmed) {
      if (!currentImages.includes(trimmed)) {
        const combined = [...currentImages, trimmed];
        onChange(combined);
        if (!currentPrimary && onPrimaryChange) {
          onPrimaryChange(trimmed);
        }
      }
      setUrlInput('');
      setShowUrlOption(false);
    }
  };

  const handleAddPreset = (url: string) => {
    if (!currentImages.includes(url)) {
      const combined = [...currentImages, url];
      onChange(combined);
      if (!currentPrimary && onPrimaryChange) {
        onPrimaryChange(url);
      }
    }
  };

  return (
    <div className="space-y-3">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <label className="block text-xs font-bold text-slate-800">
            {label} <span className="text-emerald-600">*</span>
          </label>
          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            {currentImages.length} / {maxImages} images
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowUrlOption(!showUrlOption)}
            className="text-[11px] text-slate-600 hover:text-emerald-700 font-medium underline flex items-center gap-1 cursor-pointer"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlOption ? 'Hide Link Input' : '+ Add via Image Link'}</span>
          </button>
        </div>
      </div>

      {/* Hidden File Input with multiple attribute */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Status Banner */}
      {uploadStatus && (
        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
          {isProcessing ? (
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
          ) : (
            <Check className="w-4 h-4 text-emerald-600" />
          )}
          <span>{uploadStatus}</span>
        </div>
      )}

      {/* Images Grid or Empty Dropzone */}
      {currentImages.length > 0 ? (
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {currentImages.map((imgUrl, index) => {
              const isPrimary = imgUrl === currentPrimary || (index === 0 && !currentPrimary);

              return (
                <div
                  key={`${imgUrl}-${index}`}
                  className={`group relative rounded-xl overflow-hidden border-2 bg-slate-100 aspect-square flex flex-col justify-between shadow-xs transition-all ${
                    isPrimary
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Image */}
                  <img
                    src={imgUrl}
                    alt={`Product photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-1.5 inset-x-1.5 flex items-center justify-between z-10 pointer-events-none">
                    {isPrimary ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-current text-amber-300" />
                        <span>Cover</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-700 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-xs">
                        #{index + 1}
                      </span>
                    )}

                    <div className="pointer-events-auto flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setPreviewModalUrl(imgUrl)}
                        title="Enlarge preview"
                        className="p-1 rounded-md bg-black/60 hover:bg-black text-white text-[10px] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        title="Delete this image"
                        className="p-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-[10px] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Action Overlay on Hover/Focus */}
                  <div className="absolute bottom-0 inset-x-0 p-1.5 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent flex items-center justify-between gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    {!isPrimary ? (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(imgUrl)}
                        className="flex-1 py-1 px-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>Make Cover</span>
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-300 px-1 py-0.5">
                        Main Display
                      </span>
                    )}

                    {/* Move controls */}
                    <div className="flex items-center gap-0.5">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleMove(index, 'left')}
                          title="Move earlier"
                          className="p-1 rounded bg-white/20 hover:bg-white/40 text-white text-[10px] cursor-pointer"
                        >
                          <ArrowLeft className="w-2.5 h-2.5" />
                        </button>
                      )}
                      {index < currentImages.length - 1 && (
                        <button
                          type="button"
                          onClick={() => handleMove(index, 'right')}
                          title="Move later"
                          className="p-1 rounded bg-white/20 hover:bg-white/40 text-white text-[10px] cursor-pointer"
                        >
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* "Add More" Upload Card if limit not reached */}
            {currentImages.length < maxImages && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 rounded-xl aspect-square flex flex-col items-center justify-center p-3 text-center transition-all cursor-pointer group disabled:opacity-50"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white flex items-center justify-center transition-colors mb-1.5 shadow-2xs">
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
                <span className="text-[11px] font-bold text-slate-700 group-hover:text-emerald-900 block leading-tight">
                  Add Images
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  Select 1 or more photos
                </span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>
              The <strong>Cover Image</strong> is shown on product cards and primary catalog views. Farmers can view all other images in the interactive gallery on the detail page.
            </span>
          </p>
        </div>
      ) : (
        /* Empty State Dropzone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01]'
              : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50/70 bg-slate-50/40'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center shadow-xs">
            {isProcessing ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>

          <div>
            <span className="text-xs font-black text-slate-800 block">
              Click to select multiple photos from your device
            </span>
            <span className="text-[11px] text-slate-500">
              or drag & drop images here (Select multiple PNG, JPG, WEBP)
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1 flex-wrap justify-center">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              ✨ Multiple File Upload Enabled
            </span>
            <span className="text-[10px] font-semibold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-full">
              Max {maxImages} images
            </span>
          </div>
        </div>
      )}

      {/* Paste URL Drawer */}
      {showUrlOption && (
        <div className="p-3 rounded-xl bg-slate-100/90 border border-slate-200 space-y-2 animate-in fade-in duration-150">
          <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
            <LinkIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Paste Web Image Link:</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/product-image.jpg"
              className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Add Link
            </button>
          </div>

          {presetImages.length > 0 && (
            <div className="pt-1 border-t border-slate-200/80">
              <span className="text-[10px] font-semibold text-slate-500 block mb-1">
                Or pick from sample presets:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1 scrollbar-none">
                {presetImages.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddPreset(preset.url)}
                    className="px-2 py-0.5 rounded bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 whitespace-nowrap text-[11px] font-medium cursor-pointer transition-colors"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Full Size Modal */}
      {previewModalUrl && (
        <div
          onClick={() => setPreviewModalUrl(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2"
          >
            <img
              src={previewModalUrl}
              alt="Enlarged preview"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="p-3 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-mono truncate max-w-sm">
                {previewModalUrl}
              </span>
              <button
                type="button"
                onClick={() => setPreviewModalUrl(null)}
                className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
