import React, { useState } from 'react';
import { 
  Tractor, 
  Settings, 
  Droplet, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Gauge, 
  Sliders, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { NOZZLES, IMAGES } from '../data/agriculturalData';

export const EquipmentSection: React.FC = () => {
  const [activeNozzle, setActiveNozzle] = useState<string>('iso_03_azul');

  const selectedNozzle = NOZZLES.find(n => n.id === activeNozzle) || NOZZLES[4];

  return (
    <section id="equipos" className="py-16 lg:py-24 bg-neutral-950 border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-lime-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>04</span>
            <span aria-hidden="true">·</span>
            <span>Uso de Equipos de Aplicación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tecnología de aspersión 4x4 y calibración de boquillas
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300">
            El éxito de un herbicida depende un 30% del principio activo y un 70% de la calidad de aplicación: tamaño de gota, presión, velocidad y homogeneidad de barra.
          </p>
        </div>

        {/* 2-Column Feature: ATV 4x4 Specs vs Calibration Test Bench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
              <span className="text-xs font-mono text-lime-400 uppercase tracking-wider block">
                Maquinaria Insignia AgroServi 4x4
              </span>
              <h3 className="text-2xl font-bold text-white">
                Cuatrimoto ATV Pulverizadora de Alta Flotación
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Diseñada específicamente para ingresar a potreros con barro, zanjas, laderas de difícil acceso y entresurcos donde un tractor pesado de 5 toneladas dañaría el cultivo o se enterraría hasta los ejes.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400 block mb-0.5">Bomba Fitosanitaria:</span>
                  <strong className="text-white">Diafragma 12V 19 L/min a 4.5 bar</strong>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400 block mb-0.5">Barra Plegable:</span>
                  <strong className="text-white">5.0 a 6.0 m con resortes antichoque</strong>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400 block mb-0.5">Portaboquillas:</span>
                  <strong className="text-white">Tri-jet antigoteo con válvula check</strong>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400 block mb-0.5">Agitación en Tanque:</span>
                  <strong className="text-white">Retorno hidráulico venturi continuo</strong>
                </div>
              </div>
            </div>

            {/* 4 Steps to field calibration */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Settings className="w-4 h-4 text-lime-400" />
                Protocolo de Calibración en 4 Pasos
              </h4>
              
              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-lime-400 text-neutral-950 font-bold font-mono flex items-center justify-center shrink-0">1</span>
                  <p><strong className="text-white">Medición de Velocidad Real:</strong> Demarcar 50 metros en el terreno a pulverizar. Recorrer con el tanque a media carga y acelerador de trabajo. Velocidad (km/h) = 180 / tiempo (segundos).</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-lime-400 text-neutral-950 font-bold font-mono flex items-center justify-center shrink-0">2</span>
                  <p><strong className="text-white">Verificación de Caudal Individual:</strong> Recolectar en probeta graduada el agua de cada boquilla durante 60 segundos a presión regulada. Descartar boquillas con más de ±5% de desvío.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-lime-400 text-neutral-950 font-bold font-mono flex items-center justify-center shrink-0">3</span>
                  <p><strong className="text-white">Ajuste de Altura de Barra:</strong> Mantener la barra a 50 cm por encima de la maleza para lograr 100% de solapamiento en abanicos de 110° sin zonas ciegas.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-lime-400 text-neutral-950 font-bold font-mono flex items-center justify-center shrink-0">4</span>
                  <p><strong className="text-white">Cálculo de Caldo:</strong> Aplicar $Q = (600 \times q) / (d \times V)$ para confirmar el volumen final de caldo en litros por hectárea.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image of Nozzle calibration bench */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl">
              <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
                <img
                  src={IMAGES.nozzlesCalibration}
                  alt="Banco de ensayo y calibración de boquillas de pulverización"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-mono text-lime-400 font-semibold block mb-1">
                    Control de Calidad AgroServi
                  </span>
                  <h4 className="text-base sm:text-lg font-bold">
                    Banco de Calibración & Espectrometría de Gotas
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1">
                    Medición previa a cada salida de campo para asegurar que el tamaño de gota no se evapore con el calor ni derive con la brisa.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Nozzles Selector & Droplet Spectrum Guide */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
            <div>
              <span className="text-xs font-bold text-lime-400 uppercase tracking-wider block">
                Guía Técnica de Boquillas ISO 10625
              </span>
              <h3 className="text-xl font-bold text-white">
                Código de Colores, Caudales Nominales y Gotas
              </h3>
            </div>
            <span className="text-xs text-neutral-400">
              Haga clic en un color para inspeccionar características:
            </span>
          </div>

          {/* Color buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 my-6">
            {NOZZLES.map((n) => {
              const isSelected = activeNozzle === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveNozzle(n.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-white bg-neutral-800 shadow-md ring-2 ring-lime-400/50'
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-4 h-4 rounded-full shrink-0 border border-white/20"
                      style={{ backgroundColor: n.colorHex }}
                    />
                    <span className="text-xs font-mono font-bold text-white">
                      ISO {n.isoCode}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-300 font-medium block truncate">
                    {n.colorName}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                    {n.nominalFlowAt3Bar} L/min
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Nozzle Detail Box */}
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-neutral-400 block mb-1">Espectro de Gotas:</span>
              <span className="text-sm font-bold text-white font-mono">{selectedNozzle.dropletSpectrum}</span>
              <span className="text-[11px] text-neutral-400 block mt-0.5">
                {selectedNozzle.dropletSpectrum.includes('Gruesa') 
                  ? 'Burbujas con aire (anti-deriva)' 
                  : 'Alta cobertura foliar por cm²'}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-1">Caudal a 3.0 bar (Nominal):</span>
              <span className="text-sm font-bold text-lime-400 font-mono">{selectedNozzle.nominalFlowAt3Bar} L/min</span>
              <span className="text-[11px] text-neutral-400 block mt-0.5">
                A 2.0 bar: {(selectedNozzle.nominalFlowAt3Bar * 0.82).toFixed(2)} L/min
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-1">Sensibilidad a la Deriva:</span>
              <span className={`text-sm font-bold font-mono ${
                selectedNozzle.driftRisk === 'Muy Bajo' || selectedNozzle.driftRisk === 'Bajo'
                  ? 'text-emerald-400'
                  : selectedNozzle.driftRisk === 'Moderado'
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}>
                {selectedNozzle.driftRisk}
              </span>
              <span className="text-[11px] text-neutral-400 block mt-0.5">
                Ideal con vientos de hasta 15 km/h
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-1">Uso Agronómico Óptimo:</span>
              <span className="text-sm font-bold text-white">{selectedNozzle.suitableForHerbicides}</span>
              <span className="text-[11px] text-neutral-400 block mt-0.5">
                {selectedNozzle.isoCode === '03' || selectedNozzle.isoCode === '025'
                  ? 'Estándar recomendado para unidades 4x4'
                  : 'Uso especializado'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
