import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Clock, Calculator, Images, ShieldCheck, Instagram } from 'lucide-react';
import { IMAGES } from '../data/agriculturalData';

interface HeaderProps {
  onOpenCalculator: () => void;
  onOpenGallery: () => void;
  onOpenCrops?: () => void;
  onOpenQuote: () => void;
  onOpenAbout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenCalculator, 
  onOpenGallery, 
  onOpenCrops,
  onOpenQuote,
  onOpenAbout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs border-b border-stone-200">
      {/* Top Utility Bar con datos actualizados: Ñuble, Chillán / +56 9 5470 1013 / agroservi4x4spa@gmail.com / Instagram */}
      <div className="bg-[#182635] text-stone-200 text-xs py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a 
              href="tel:+56954701013"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+56 9 5470 1013</span>
            </a>
            <a 
              href="mailto:agroservi4x4spa@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>agroservi4x4spa@gmail.com</span>
            </a>
            <a 
              href="https://www.instagram.com/agroservi4x4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-pink-300 text-stone-200 transition-colors"
              title="Síguenos en Instagram @agroservi4x4"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span className="font-semibold">agroservi4x4</span>
            </a>
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Ñuble, Chillán, Chile</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-300 font-medium">
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>Atención a Predios y Huertos</span>
            </span>
            <span className="text-stone-600">|</span>
            <button
              onClick={onOpenQuote}
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors text-[11px] uppercase tracking-wider"
            >
              Solicitar Cotización
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Lockup */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('inicio');
            }}
            className="flex items-center gap-3 group focus:outline-none shrink-0"
          >
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-stone-200 p-1 flex items-center justify-center shadow-2xs">
              <img
                src={IMAGES.logo}
                alt="AgroServi 4x4"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#182635] leading-none">
                AGROSERVI <span className="text-emerald-700">4x4</span>
              </span>
              <span className="text-[10px] font-extrabold text-stone-500 tracking-wider uppercase mt-1">
                Servicios Agrícolas con Cuatrimoto
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-bold tracking-wider text-[#182635] uppercase">
            <button
              onClick={() => scrollTo('inicio')}
              className="hover:text-red-600 transition-colors py-2"
            >
              Inicio
            </button>
            <button
              onClick={() => {
                if (onOpenCrops) onOpenCrops();
              }}
              className="hover:text-red-600 transition-colors py-2 flex items-center gap-1"
            >
              <span>Frutales & Viña</span>
            </button>
            <button
              onClick={onOpenQuote}
              className="hover:text-red-600 transition-colors py-2"
            >
              Contacto
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Botón Quiénes Somos al lado de Galería */}
            <button
              onClick={() => {
                if (onOpenAbout) {
                  onOpenAbout();
                } else {
                  scrollTo('quienes-somos');
                }
              }}
              className="px-3.5 py-2.5 text-xs font-black uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
              title="¿Quiénes Somos?"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Quiénes Somos</span>
            </button>

            {/* Botón Desplegable Galería */}
            <button
              onClick={onOpenGallery}
              className="px-3.5 py-2.5 text-xs font-black uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
              title="Desplegar Galería de Fotos"
            >
              <Images className="w-3.5 h-3.5 text-stone-600" />
              <span>Galería</span>
            </button>

            {/* Botón Desplegable Calculadora */}
            <button
              onClick={onOpenCalculator}
              className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              title="Desplegar Calculadora de Dosificación"
            >
              <Calculator className="w-3.5 h-3.5 text-white" />
              <span>Calculadora ATV</span>
            </button>

            {/* Botón Cotizar que despliega modal */}
            <button
              onClick={onOpenQuote}
              className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-xs"
            >
              <span>Cotizar</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-2.5">
          <button
            onClick={() => scrollTo('inicio')}
            className="block w-full text-left py-2 px-3 text-xs font-bold uppercase text-stone-800 hover:text-red-600 hover:bg-stone-50 rounded-lg"
          >
            Inicio
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenAbout) {
                onOpenAbout();
              } else {
                scrollTo('quienes-somos');
              }
            }}
            className="block w-full text-left py-2 px-3 text-xs font-bold uppercase text-stone-800 hover:text-red-600 hover:bg-stone-50 rounded-lg flex items-center justify-between"
          >
            <span>Quiénes Somos</span>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono font-bold">Desplegar</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGallery();
            }}
            className="block w-full text-left py-2 px-3 text-xs font-bold uppercase text-stone-800 hover:text-red-600 hover:bg-stone-50 rounded-lg flex items-center justify-between"
          >
            <span>Galería de Fotos</span>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono font-bold">Desplegar</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCalculator();
            }}
            className="block w-full text-left py-2 px-3 text-xs font-bold uppercase text-emerald-800 hover:bg-emerald-50 rounded-lg flex items-center justify-between"
          >
            <span>Calculadora de Dosificación</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">Desplegar</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenCrops) onOpenCrops();
            }}
            className="block w-full text-left py-2 px-3 text-xs font-bold uppercase text-stone-800 hover:text-red-600 hover:bg-stone-50 rounded-lg flex items-center justify-between"
          >
            <span>Cultivos Frutales & Viña</span>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono font-bold">Desplegar</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="block w-full text-left py-2 px-3 text-xs font-bold uppercase text-stone-800 hover:text-red-600 hover:bg-stone-50 rounded-lg flex items-center justify-between"
          >
            <span>Solicitud de Cotización</span>
            <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-mono font-bold">Desplegar</span>
          </button>
          <a
            href="https://www.instagram.com/agroservi4x4"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left py-2 px-3 text-xs font-bold uppercase text-pink-600 hover:bg-pink-50 rounded-lg flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Instagram @agroservi4x4</span>
            </span>
            <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded font-bold">Seguir</span>
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 text-center text-xs font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
            >
              Cotizar Servicio
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
