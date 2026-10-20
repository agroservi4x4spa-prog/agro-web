import React, { useState } from 'react';
import { Sprout, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { CROPS } from '../data/agriculturalData';
import { Crop } from '../types/agriculture';

interface CropsSectionProps {
  onSelectCropForCalculator: (cropId: string, herbicideName?: string) => void;
  onClose?: () => void;
}

export const CropsSection: React.FC<CropsSectionProps> = ({ onSelectCropForCalculator, onClose }) => {
  const [selectedCropModal, setSelectedCropModal] = useState<Crop | null>(null);

  return (
    <section id="cultivos" className="py-12 lg:py-16 bg-[#f5f6f8] border-b border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Metaltec Catalog Category Format) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-xs" />
              <span className="text-xs font-black text-red-600 uppercase tracking-widest">
                Líneas Especializadas
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#182635] uppercase tracking-tight">
              Especies frutales & viñedos
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-medium">
              Control fitosanitario de malezas en sobrehilera y camellones adaptado a las 7 especies clave.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded bg-white border border-stone-200 text-xs font-black text-[#182635] uppercase tracking-wider shrink-0 shadow-2xs">
              7 Cultivos Soportados
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded bg-[#182635] text-white hover:bg-stone-800 text-xs font-black uppercase tracking-wider transition-colors shrink-0"
              >
                Cerrar ✕
              </button>
            )}
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CROPS.map((crop) => (
            <div
              key={crop.id}
              className="rounded-xl bg-white border border-stone-200 hover:border-emerald-600 hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
                      {crop.applicationZone}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#182635] uppercase group-hover:text-emerald-700 transition-colors">
                      {crop.name}
                    </h3>
                    {crop.scientificName && (
                      <span className="text-xs italic text-stone-400">
                        {crop.scientificName}
                      </span>
                    )}
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                    <Sprout className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-stone-600 mb-4 line-clamp-3 leading-relaxed font-medium">
                  {crop.description}
                </p>

                {/* Common Weeds */}
                <div className="mb-4 pt-3 border-t border-stone-100">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider block mb-1">
                    Malezas Clave:
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-stone-700 font-medium">
                    {crop.commonWeeds.map((weed, idx) => (
                      <span key={idx} className="flex items-center gap-1 text-[11px]">
                        <span className="text-emerald-600 font-bold">·</span>
                        <span>{weed}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Herbicides list preview */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider block">
                    Tratamientos Habituales:
                  </span>
                  {crop.recommendedHerbicides.slice(0, 2).map((herb, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-stone-50 border border-stone-200 text-xs flex items-center justify-between gap-2"
                    >
                      <div className="truncate">
                        <span className="font-bold text-[#182635] block truncate text-xs">{herb.name}</span>
                        <span className="text-stone-500 text-[10px]">{herb.type} · {herb.standardDose} {herb.unit}</span>
                      </div>
                      <button
                        onClick={() => onSelectCropForCalculator(crop.id, herb.name)}
                        title="Calcular dosis"
                        className="px-2 py-1 rounded bg-white hover:bg-emerald-700 hover:text-white text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-stone-200 transition-colors shrink-0 shadow-2xs"
                      >
                        Calcular
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCropModal(crop)}
                  className="text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Ficha Técnica</span>
                </button>

                <button
                  onClick={() => onSelectCropForCalculator(crop.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 shadow-2xs"
                >
                  <span>Cargar en Calculadora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for detailed technical crop sheet */}
        {selectedCropModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white border border-stone-200 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-800 shadow-2xl">
              
              <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">{selectedCropModal.applicationZone}</span>
                  <h3 className="text-2xl font-black text-[#182635] uppercase">{selectedCropModal.name}</h3>
                  <p className="text-xs italic text-stone-500">{selectedCropModal.scientificName}</p>
                </div>
                <button
                  onClick={() => setSelectedCropModal(null)}
                  className="p-1.5 rounded bg-stone-100 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                >
                  Cerrar ✕
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <p className="font-medium leading-relaxed">{selectedCropModal.description}</p>
                
                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
                  <div className="text-xs font-black text-emerald-900 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Manejo de Camellón & Raíces</span>
                  </div>
                  <p className="text-xs text-stone-600 font-medium">{selectedCropModal.soilSensitivity}</p>
                  <p className="text-xs text-stone-600 pt-1">
                    Volumen de caldo de referencia: <strong className="text-emerald-900 font-mono">{selectedCropModal.defaultWaterVolume} L/ha</strong>
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black text-[#182635] uppercase tracking-wider">
                    Planes de Aplicación Recomendados:
                  </h4>
                  {selectedCropModal.recommendedHerbicides.map((herb, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-bold text-red-600 uppercase">{herb.type}</span>
                          <h5 className="text-sm font-black text-[#182635] uppercase">{herb.name}</h5>
                          <span className="text-xs text-stone-500">I.A.: {herb.activeIngredient}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-800 bg-white border border-stone-200 px-2.5 py-0.5 rounded shadow-2xs">
                          {herb.standardDose} {herb.unit}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600"><strong>Momento:</strong> {herb.stage}</p>
                      <p className="text-xs text-stone-500 italic"><strong>Nota:</strong> {herb.notes}</p>
                      
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            const c = selectedCropModal;
                            setSelectedCropModal(null);
                            onSelectCropForCalculator(c.id, herb.name);
                          }}
                          className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                        >
                          Cargar a la calculadora
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
