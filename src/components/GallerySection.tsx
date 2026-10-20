import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/agriculturalData';
import { GalleryItem } from '../types/agriculture';

interface GallerySectionProps {
  onClose?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onClose }) => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(i => i.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setActiveItem(GALLERY_ITEMS[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(i => i.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setActiveItem(GALLERY_ITEMS[prevIndex]);
  };

  return (
    <section id="galeria" className="py-8 sm:py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-xs" />
              <span className="text-xs font-black text-red-600 uppercase tracking-widest">
                Labores en Terreno
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#182635] uppercase tracking-tight">
              Galería de Fotos
            </h2>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-[#182635] text-white hover:bg-stone-800 text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>Cerrar</span>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Gallery Grid: 1. Nogales, 2. Cerezos, 3. Ciruelas - Solo Títulos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-red-600 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[3/4] bg-stone-900 overflow-hidden">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual expand icon on hover */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 bg-white/90 backdrop-blur-xs p-3 rounded-full text-stone-900 shadow-lg">
                    <Maximize2 className="w-5 h-5 text-red-600" />
                  </div>
                </div>

                {/* Index tag */}
                <div className="absolute top-3 left-3 bg-[#182635]/85 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                  0{idx + 1}
                </div>
              </div>

              {/* Title Only */}
              <div className="p-5 text-center bg-stone-50 border-t border-stone-200">
                <h3 className="text-lg sm:text-xl font-black text-[#182635] uppercase tracking-wide group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal: Solo Título e Imagen */}
        {activeItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveItem(null)}
          >
            <div 
              className="relative max-w-4xl w-full max-h-[92vh] bg-[#182635] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-stone-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with Title Only and Close */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#182635] text-white border-b border-stone-800">
                <h4 className="text-base sm:text-lg font-black uppercase tracking-wider text-emerald-400">
                  {activeItem.title}
                </h4>
                
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors text-xs flex items-center gap-1 font-bold"
                  aria-label="Cerrar imagen"
                >
                  <span>Cerrar</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Full Photo Frame */}
              <div className="relative flex-grow flex items-center justify-center bg-black/40 overflow-hidden p-2 sm:p-4 min-h-[50vh] max-h-[78vh]">
                <img
                  src={activeItem.imageSrc}
                  alt={activeItem.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                  referrerPolicy="no-referrer"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white shadow-xl border border-white/20 transition-all hover:scale-105"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white shadow-xl border border-white/20 transition-all hover:scale-105"
                  aria-label="Siguiente foto"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Minimal Bottom Bar with Title indicator */}
              <div className="px-6 py-3 bg-[#131e2b] text-center border-t border-stone-800">
                <span className="text-xs font-black tracking-widest uppercase text-stone-300">
                  {activeItem.title} · AgroServi 4x4
                </span>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
