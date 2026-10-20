import React from 'react';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { IMAGES } from '../data/agriculturalData';

interface FooterProps {
  onOpenQuote?: () => void;
  onOpenGallery?: () => void;
  onOpenCalculator?: () => void;
  onOpenCrops?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenQuote, 
  onOpenGallery, 
  onOpenCalculator,
  onOpenCrops 
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#182635] text-stone-300 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center">
                <img
                  src={IMAGES.logo}
                  alt="AgroServi 4x4 SpA"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-lg font-black text-white uppercase tracking-tight">
                  AGROSERVI <span className="text-emerald-400">4x4</span> SpA
                </span>
                <span className="text-[10px] block font-bold text-stone-400 uppercase tracking-wider">
                  Servicio de Aplicación de Herbicidas con ATV
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed font-medium">
              Control de malezas en la sobre hilera y entre hilera y en avellano europeo, cerezos, nogales, ciruelos, manzanos, arándanos y viña.
            </p>

            {/* Datos de Contacto Actualizados: Ñuble, Chillán, +56 9 5470 1013, agroservi4x4spa@gmail.com, @agroservi4x4 */}
            <div className="space-y-1.5 pt-1 text-[11px] text-stone-300 font-semibold">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Ñuble, Chillán, Chile</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+56954701013" className="hover:text-white transition-colors">
                  +56 9 5470 1013
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:agroservi4x4spa@gmail.com" className="hover:text-white transition-colors">
                  agroservi4x4spa@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <a href="https://www.instagram.com/agroservi4x4" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @agroservi4x4
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-stone-700 pb-1.5">
              Navegación
            </h4>
            <ul className="space-y-2 text-stone-300 font-medium">
              <li>
                <button
                  onClick={() => scrollTo('inicio')}
                  className="hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGallery}
                  className="hover:text-white transition-colors"
                >
                  Galería de Labores
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCrops}
                  className="hover:text-white transition-colors"
                >
                  Frutales & Viña
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="hover:text-emerald-400 transition-colors text-emerald-400 font-bold"
                >
                  Calculadora ATV
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuote}
                  className="hover:text-red-400 transition-colors text-red-400 font-bold"
                >
                  Solicitud de Cotización
                </button>
              </li>
            </ul>
          </div>

          {/* Lines of Service */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-stone-700 pb-1.5">
              Especies en Cobertura
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-stone-400 font-medium">
              <span>· Avellano Europeo</span>
              <span>· Cerezos</span>
              <span>· Nogales</span>
              <span>· Ciruelos</span>
              <span>· Manzanos</span>
              <span>· Arándanos</span>
              <span>· Viña & Vides</span>
              <span>· Camellones</span>
            </div>

            <div className="pt-2 text-[10px] text-stone-500 leading-normal">
              Cumplimiento con normativas de Buenas Prácticas Agrícolas (BPA) y registro oficial de productos fitosanitarios SAG.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
          <div>
            © {new Date().getFullYear()} AgroServi 4x4 SpA. Chillán, Región de Ñuble, Chile.
          </div>
          <div className="flex items-center gap-3">
            <span>Servicio con ATV</span>
            <span aria-hidden="true">·</span>
            <span>Ñuble</span>
            <span aria-hidden="true">·</span>
            <span>Chillán</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
