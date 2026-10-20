import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainTitleSection } from './components/MainTitleSection';
import { DosageCalculator } from './components/DosageCalculator';
import { GallerySection } from './components/GallerySection';
import { CropsSection } from './components/CropsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Calculator, Images, Sprout, X, ShieldCheck } from 'lucide-react';

export default function App() {
  const [selectedCropId, setSelectedCropId] = useState<string>('cerezos');
  const [selectedHerbicideName, setSelectedHerbicideName] = useState<string | undefined>(undefined);
  
  // Modals deployable on demand from upper right / nav buttons
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [isCropsOpen, setIsCropsOpen] = useState<boolean>(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  const handleSelectCropForCalculator = (cropId: string, herbicideName?: string) => {
    setSelectedCropId(cropId);
    setSelectedHerbicideName(herbicideName);
    setIsCropsOpen(false);
    setIsCalculatorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-stone-900 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* 1. Header con botones en la derecha superior para desplegar Quiénes Somos, Galería, Calculadora y Cotizar */}
      <Header 
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenGallery={() => setIsGalleryOpen(true)}
        onOpenCrops={() => setIsCropsOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      <main className="flex-grow">
        {/* Título Principal + Zona El Tiempo & Calendario (Izquierda) + Galería de Fotos (Derecha) */}
        <MainTitleSection 
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenGallery={() => setIsGalleryOpen(true)}
          onOpenQuote={() => setIsQuoteOpen(true)}
        />
      </main>

      {/* Footer con los datos de contacto de Ñuble, Chillán */}
      <Footer 
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenGallery={() => setIsGalleryOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenCrops={() => setIsCropsOpen(true)}
      />

      <FloatingWhatsApp />

      {/* Modal Desplegable de Solicitud de Cotización (Desplegable a petición del usuario) */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200">
            <ContactSection onClose={() => setIsQuoteOpen(false)} />
          </div>
        </div>
      )}

      {/* Modal Desplegable de la Calculadora de Dosificación */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200">
            <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#182635] text-white border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-black uppercase tracking-wider">
                  Calculadora de Dosificación Frutal con ATV
                </span>
                <span className="hidden sm:inline text-xs text-stone-400">· AgroServi 4x4 SpA</span>
              </div>
              <button
                onClick={() => setIsCalculatorOpen(false)}
                className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 transition-colors text-xs font-bold flex items-center gap-1"
                aria-label="Cerrar Calculadora"
              >
                <span>Cerrar</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 sm:p-4">
              <DosageCalculator
                initialCropId={selectedCropId}
                initialHerbicideName={selectedHerbicideName}
                onClose={() => setIsCalculatorOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal Desplegable de la Galería de Fotos */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200">
            <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#182635] text-white border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <Images className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-black uppercase tracking-wider">
                  Galería de Trabajos & Catálogo de Labores
                </span>
                <span className="hidden sm:inline text-xs text-stone-400">· AgroServi 4x4 SpA</span>
              </div>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 transition-colors text-xs font-bold flex items-center gap-1"
                aria-label="Cerrar Galería"
              >
                <span>Cerrar</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 sm:p-4">
              <GallerySection onClose={() => setIsGalleryOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Modal Desplegable de Frutales & Viña */}
      {isCropsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200">
            <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#182635] text-white border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-black uppercase tracking-wider">
                  Líneas Especializadas · Frutales & Viñedos
                </span>
                <span className="hidden sm:inline text-xs text-stone-400">· AgroServi 4x4 SpA</span>
              </div>
              <button
                onClick={() => setIsCropsOpen(false)}
                className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 transition-colors text-xs font-bold flex items-center gap-1"
                aria-label="Cerrar Frutales"
              >
                <span>Cerrar</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 sm:p-4">
              <CropsSection 
                onSelectCropForCalculator={handleSelectCropForCalculator}
                onClose={() => setIsCropsOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal Desplegable de Quiénes Somos */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200">
            <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#182635] text-white border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-black uppercase tracking-wider">
                  ¿Quiénes Somos? · AgroServi 4x4 SpA
                </span>
              </div>
              <button
                onClick={() => setIsAboutOpen(false)}
                className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                aria-label="Cerrar Quiénes Somos"
              >
                <span>Cerrar</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">
                  Trayectoria & Especialidad Fitosanitaria
                </span>
                <h3 className="text-2xl font-black text-[#182635] uppercase tracking-tight">
                  Mecanización Ligera de Precisión con ATV 4x4
                </h3>
                <span className="text-xs text-stone-500 font-bold">
                  Ñuble, Chillán · Tel: +56 9 5470 1013 · agroservi4x4spa@gmail.com
                </span>
              </div>

              <div className="space-y-3.5 text-sm text-stone-700 leading-relaxed font-medium">
                <p>
                  En <strong className="text-stone-900 font-black">AgroServi 4x4 SpA</strong> brindamos servicios mecanizados de pulverización y aplicación técnica de herbicidas desde Ñuble, Chillán para productores frutícolas.
                </p>
                <p>
                  Nuestro enfoque reemplaza el paso destructivo de tractores pesados de 4 toneladas en huertos tecnificados, sustituyéndolos por cuatrimotos 4x4 ligeras con barras flotantes de bajo perfil y estanque de 500 litros.
                </p>
                <p>
                  Atendemos huertos de alta densidad, plantaciones sobre camellones pronunciados y viñedos en espaldera donde se exige tolerancia cero al daño de goteros, ramas bajas o compactación radicular.
                </p>
              </div>

              {/* 3 Pilares Técnicos */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="text-xs font-black text-[#182635] uppercase mb-1">
                    • Presión 4.5 PSI (Cero Compactación)
                  </h4>
                  <p className="text-xs text-stone-600 font-medium">
                    Llantas agrícolas de flotación que no compactan el camellón ni dañan raíces superficiales en nogales, cerezos, ciruelos y avellanos.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="text-xs font-black text-[#182635] uppercase mb-1">
                    • Protección 100% de Mangueras de Riego
                  </h4>
                  <p className="text-xs text-stone-600 font-medium">
                    Trocha angosta de 1.15 m que no pisa ni engancha líneas de goteo ni estacas de soporte.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="text-xs font-black text-[#182635] uppercase mb-1">
                    • Oportunidad Climática
                  </h4>
                  <p className="text-xs text-stone-600 font-medium">
                    Entrada inmediata al huerto tras riego o lluvia sin esperar días a que el suelo seque para que soporte un tractor pesado.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-bold pt-1">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
                  4.5 PSI Flotación
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
                  0 Daño a Goteros
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
                  Estanque 500 L
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setIsAboutOpen(false);
                    setIsQuoteOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                >
                  Cotizar Servicio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
