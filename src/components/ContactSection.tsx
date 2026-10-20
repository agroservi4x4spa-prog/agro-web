import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, X } from 'lucide-react';
import { CROPS } from '../data/agriculturalData';

interface ContactSectionProps {
  onClose?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ubicacion: 'Ñuble, Chillán',
    cultivo: 'cerezos',
    hectareas: '15',
    mensaje: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.telefono) return;
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const selectedCropName = CROPS.find(c => c.id === formData.cultivo)?.name || formData.cultivo;
    const text = encodeURIComponent(
      `Hola AgroServi 4x4 SpA, solicito cotización para servicio con ATV en ${selectedCropName}, aproximadamente ${formData.hectareas} hectáreas en ${formData.ubicacion || 'Ñuble'}. Mi nombre es ${formData.nombre || 'Productor'}.`
    );
    window.open(`https://wa.me/56954701013?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-xs" />
            <span className="text-xs font-black text-red-600 uppercase tracking-widest">
              Cotización & Atención Comercial
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#182635] uppercase tracking-tight">
            Solicitud de cotización con ATV
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 font-semibold mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>Ñuble, Chillán</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>+56 9 5470 1013</span>
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-emerald-700" />
              <span>agroservi4x4spa@gmail.com</span>
            </span>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors shrink-0"
            aria-label="Cerrar Cotización"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {submitted ? (
        <div className="py-10 text-center space-y-4 animate-in fade-in max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-[#182635] uppercase">¡Solicitud Enviada con Éxito!</h3>
          <p className="text-xs text-stone-600 font-medium">
            Estimado(a) <strong className="text-stone-900">{formData.nombre}</strong>, nos pondremos en contacto al <strong className="text-red-600">{formData.telefono}</strong> o al correo <strong className="text-stone-900">agroservi4x4spa@gmail.com</strong> para coordinar la visita técnica a su predio en <strong className="text-stone-900">{formData.ubicacion}</strong>.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={handleWhatsAppDirect}
              className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              Escribir por WhatsApp al +56 9 5470 1013
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider border border-stone-200"
              >
                Cerrar Ventana
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Nombre / Productor o Finca *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Agrícola Chillán SpA"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full bg-[#f8f9fa] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Teléfono de Contacto *
              </label>
              <input
                type="tel"
                required
                placeholder="Ej: +56 9 5470 1013"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full bg-[#f8f9fa] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Comuna / Ubicación
              </label>
              <input
                type="text"
                placeholder="Ej: Chillán, San Carlos, Bulnes..."
                value={formData.ubicacion}
                onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                className="w-full bg-[#f8f9fa] border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Cultivo Frutal
              </label>
              <select
                value={formData.cultivo}
                onChange={(e) => setFormData({ ...formData, cultivo: e.target.value })}
                className="w-full bg-[#f8f9fa] border border-stone-300 rounded-lg px-2.5 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:border-red-600 focus:bg-white uppercase"
              >
                {CROPS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Hectáreas
              </label>
              <input
                type="number"
                min={1}
                max={1000}
                value={formData.hectareas}
                onChange={(e) => setFormData({ ...formData, hectareas: e.target.value })}
                className="w-full bg-[#f8f9fa] border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 font-mono font-bold focus:outline-none focus:border-red-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
              Requerimiento de la Labor (Camellón, sobrehilera, mangueras de goteo, chupones)
            </label>
            <textarea
              rows={3}
              placeholder="Describa el estado del predio, presencia de camellones o fecha requerida para la aplicación..."
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              className="w-full bg-[#f8f9fa] border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-red-600 focus:bg-white font-medium"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="submit"
              className="py-3 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Cotización</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppDirect}
              className="py-3 px-5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <span>WhatsApp Directo (+56 9 5470 1013)</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
