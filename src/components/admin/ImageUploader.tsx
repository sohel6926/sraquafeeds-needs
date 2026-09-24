import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, Link, Check, RefreshCw } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (dataUrl: string) => void;
  label?: string;
  presetImages?: { label: string; url: string }[];
}

// Client-side image resizing and optimization to prevent exceeding browser localStorage limits
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

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Product Image',
  presetImages = [],
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUrlOption, setShowUrlOption] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    try {
      setIsProcessing(true);
      const compressedDataUrl = await compressImage(file);
      onChange(compressedDataUrl);
    } catch (e) {
      console.error('Failed to process image', e);
      alert('Error processing image. Please try another image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    // reset input so same file can be selected again if needed
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
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setShowUrlOption(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800">
          {label} <span className="text-emerald-600">*</span>
        </label>
        <button
          type="button"
          onClick={() => setShowUrlOption(!showUrlOption)}
          className="text-[11px] text-slate-500 hover:text-emerald-700 font-medium underline flex items-center gap-1 cursor-pointer"
        >
          <Link className="w-3 h-3" />
          <span>{showUrlOption ? 'Hide URL input' : 'Or paste web link'}</span>
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Upload Box */}
      {value ? (
        <div className="relative rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/20 p-3 sm:p-4 flex items-center gap-4 transition-all">
          {/* Thumbnail preview */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm flex-shrink-0">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>

          {/* Info & action buttons */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Image Selected & Ready</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              This photo will be displayed in the product catalog and detail page.
            </p>

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                <span>Change Image</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01]'
              : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50/70 bg-slate-50/40'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shadow-xs">
            {isProcessing ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>

          <div>
            <span className="text-xs font-extrabold text-slate-800 block">
              Click to upload image from your computer / phone
            </span>
            <span className="text-[11px] text-slate-500">
              or drag & drop your photo here (JPG, PNG, WEBP)
            </span>
          </div>

          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
            Auto-optimized for instant website loading
          </span>
        </div>
      )}

      {/* Secondary URL & Preset Drawer if toggled */}
      {showUrlOption && (
        <div className="p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 space-y-2.5 animate-in fade-in duration-150">
          <div className="text-[11px] font-bold text-slate-700">Paste Image Web Link (URL):</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/product-photo.jpg"
              className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer"
            >
              Apply
            </button>
          </div>

          {presetImages.length > 0 && (
            <div className="pt-1">
              <span className="text-[10px] font-semibold text-slate-500 block mb-1">
                Or select from sample presets:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1 scrollbar-none">
                {presetImages.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChange(preset.url);
                      setShowUrlOption(false);
                    }}
                    className="px-2 py-0.5 rounded bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 whitespace-nowrap text-[11px] cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
