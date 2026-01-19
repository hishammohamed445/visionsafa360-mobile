import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { ImageState } from '../types';

interface ImageUploaderProps {
  imageState: ImageState;
  onImageChange: (newState: ImageState) => void;
  onClear: () => void;
  disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageState, onImageChange, onClear, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange({
        file,
        previewUrl: result,
        base64: result,
        mimeType: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  if (imageState.previewUrl) {
    return (
      <div className="relative group w-full h-full min-h-[300px] bg-vs-gray rounded-xl overflow-hidden border border-gray-800">
         <img 
            src={imageState.previewUrl} 
            alt="Source" 
            className="w-full h-full object-contain bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"
          />
          {!disabled && (
            <button 
              onClick={onClear}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/60 text-white hover:bg-red-500/80 transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
             <p className="text-xs text-gray-300 truncate px-2">{imageState.file?.name}</p>
          </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && fileInputRef.current?.click()}
      className={`
        relative w-full min-h-[300px] h-full flex flex-col items-center justify-center 
        rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer
        ${isDragging 
          ? 'border-vs-orange bg-vs-orange/10 scale-[1.02]' 
          : 'border-gray-700 hover:border-vs-orange/50 hover:bg-vs-gray'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept="image/png, image/jpeg, image/webp" 
        className="hidden"
        disabled={disabled}
      />
      
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <div className={`p-4 rounded-full ${isDragging ? 'bg-vs-orange/20' : 'bg-vs-gray'}`}>
          <Upload className={`w-8 h-8 ${isDragging ? 'text-vs-orange' : 'text-gray-400'}`} />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-white">
            <span className="text-vs-orange">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            SVG, PNG, JPG or WEBP (MAX. 5MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;