import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Tractor, 
  Sprout, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { IMAGES, GALLERY_ITEMS } from '../data/agriculturalData';
import { GalleryItem } from '../types/agriculture';
import { WeatherAndCalendar } from './WeatherAndCalendar';

interface MainTitleSectionProps {
  isAboutExpanded?: boolean;
  onToggleAbout?: () => void;
  onOpenCalculator?: () => void;
  onOpenGallery?: () => void;
  onOpenQuote?: () => void;
}

export const MainTitleSection: React.FC<MainTitleSectionProps> = ({
  isAboutExpanded: controlledAboutExpanded,
  onToggleAbout
}) => {
  const [internalAboutExpanded, setInternalAboutExpanded] = useState<boolean>(false);
  const isAboutExpanded = controlledAboutExpanded !== undefined ? controlledAboutExpanded : internalAboutExpanded;

  const toggleAbout = () => {
    if (onToggleAbout) {
      onToggleAbout();
    } else {
      setInternalAboutExpanded(!internalAboutExpanded);
    }
  };

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
    <section id="inicio" className="bg-[#f5f6f8] border-b border-stone-200 py-8 lg:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Header Banner: Título Principal + Logo Empresa */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Título y texto oficial */}
            <div className="text-center lg:text-left space-y-3 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#182635] uppercase leading-tight">
                Servicio de Aplicación de Herbicidas con ATV
              </h1>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                Control de malezas en la sobre hilera y entre hilera y en avellano europeo, cerezos, nogales, ciruelos, manzanos, arándanos y viña
              </p>
            </div>

            {/* Right: Logo Oficial */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-white p-2.5 shadow-xs border-2 border-stone-200 flex items-center justify-center">
                <img
                  src={IMAGES.logo}
                  alt="AgroServi 4x4 Logo Oficial"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-black text-[#182635] uppercase tracking-wider block">
                  AgroServi 4x4 SpA
                </span>
                <span className="text-[11px] text-stone-500 font-semibold">
                  Ñuble, Chillán · +56 9 5470 1013
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Sección Principal: Quiénes Somos (Botón Desplegable al lado izquierdo) y Galería que está arriba (lado derecho) */}
        <div id="quienes-somos" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LADO IZQUIERDO: Estación Agroclimática del Tiempo & Calendario de Labores */}
          <div className="lg:col-span-5">
            <WeatherAndCalendar />
          </div>

          {/* LADO DERECHO: Galería de Fotos que está arriba (con Nogales, Cerezos, Ciruelas) */}
          <div id="galeria" className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs" />
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                    Galería de Fotos
                  </span>
                </div>
                <span className="text-[11px] font-bold text-stone-400 uppercase">
                  Labores en Terreno
                </span>
              </div>

              {/* Grid de Fotos: Nogales, Cerezos, Ciruelas, ATV 500L, Viento, pH */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {GALLERY_ITEMS.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className="group cursor-pointer rounded-xl overflow-hidden bg-white border border-stone-200 hover:border-red-600 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    {/* Frame de la Foto */}
                    <div className="relative aspect-[3/4] bg-stone-900 overflow-hidden">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 bg-white/95 p-2 rounded-full text-red-600 shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Tag numerado */}
                      <div className="absolute top-2 left-2 bg-[#182635]/85 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                        0{idx + 1}
                      </div>
                    </div>

                    {/* Solo Título */}
                    <div className="p-3 text-center bg-stone-50 border-t border-stone-200">
                      <h3 className="text-sm font-black text-[#182635] uppercase tracking-wide group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pie de Galería Informativo */}
            <div className="mt-5 pt-3 border-t border-stone-100 text-center">
              <span className="text-[11px] text-stone-500 font-medium">
                Haga clic en cualquiera de las imágenes para ampliar la labor en terreno
              </span>
            </div>
          </div>

        </div>

        {/* 3. Barra de Confianza / Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-stone-900 uppercase block">7 Frutales & Viña</span>
              <span className="text-[11px] text-stone-500 font-medium">Sobrehilera y entrehilera</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
              <Tractor className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-stone-900 uppercase block">Flota ATV 4x4</span>
              <span className="text-[11px] text-stone-500 font-medium">Tracción total ligera</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-stone-900 uppercase block">Cero Compactación</span>
              <span className="text-[11px] text-stone-500 font-medium">Protección del camellón</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-stone-900 uppercase block">Estanque 500 L</span>
              <span className="text-[11px] text-stone-500 font-medium">Calibración certificada L/ha</span>
            </div>
          </div>
        </div>

        {/* Modal Lightbox de Pantalla Completa: Solo Título e Imagen */}
        {activeItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveItem(null)}
          >
            <div 
              className="relative max-w-4xl w-full max-h-[92vh] bg-[#182635] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-stone-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barra superior con Solo Título y Cerrar */}
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

              {/* Imagen en tamaño completo */}
              <div className="relative flex-grow flex items-center justify-center bg-black/40 overflow-hidden p-2 sm:p-4 min-h-[50vh] max-h-[78vh]">
                <img
                  src={activeItem.imageSrc}
                  alt={activeItem.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                  referrerPolicy="no-referrer"
                />

                {/* Flechas de Navegación */}
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

              {/* Barra inferior minimalista */}
              <div className="px-6 py-3 bg-[#131e2b] text-center border-t border-stone-800">
                <span className="text-xs font-black tracking-widest uppercase text-stone-300">
                  {activeItem.title} · AgroServi 4x4 SpA
                </span>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
