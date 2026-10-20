import React from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hola AgroServi 4x4 SpA, me comunico desde la web para cotizar prestaciones de servicio con ATV en mi huerto frutal / viñedo.'
    );
    window.open(`https://wa.me/56954701013?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <div className="hidden md:flex items-center bg-white px-3.5 py-1.5 rounded-full shadow-lg border border-stone-200 text-xs font-semibold text-stone-700 animate-in fade-in slide-in-from-right-3">
        <span>¿Cotizaciones con ATV? <strong className="text-emerald-700">+56 9 5470 1013</strong></span>
      </div>
      <button
        onClick={handleWhatsApp}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Contactar por WhatsApp al +56 9 5470 1013"
      >
        <MessageSquare className="w-7 h-7 fill-white text-white" />
      </button>
    </div>
  );
};
