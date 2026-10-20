import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, Droplets, Gauge, ShieldAlert, Sparkles, Tractor } from 'lucide-react';
import { IMAGES } from '../data/agriculturalData';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-neutral-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lime-500/10 blur-[140px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Column 1: Copy and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-lime-400">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span className="font-semibold tracking-wide uppercase">Ingeniería & Dosificación Agrícola de Precisión</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Pulverización y control de malezas con <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">tecnología 4x4</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Calcula la dosificación exacta de herbicida, volumen de caldo y calibración de boquillas según la textura del suelo, topografía del terreno y estado del cultivo. Máxima eficacia biológica sin compactar el suelo ni atascar maquinaria pesada.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-neutral-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span>Calibración milimétrica por L/ha y L/min</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span>Acceso a pendientes y suelos anegados</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span>Cero compactación de raíces (baja presión)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span>Semáforo de riesgo de deriva por viento</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => scrollTo('calculadora')}
                className="px-6 py-3.5 rounded-xl font-bold text-neutral-950 bg-lime-400 hover:bg-lime-300 transition-all shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 text-sm tracking-wide"
              >
                <Calculator className="w-4 h-4" />
                <span>Abrir Calculadora Interactiva</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('quienes-somos')}
                className="px-6 py-3.5 rounded-xl font-medium text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Conocer AgroServi 4x4
              </button>
            </div>
          </div>

          {/* Column 2: Visual Card Hero Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
              {/* Main Image */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-neutral-950">
                <img
                  src={IMAGES.quadField}
                  alt="Equipo AgroServi 4x4 pulverizando en campo de cultivo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
                
                {/* Floating telemetry tag */}
                <div className="absolute top-4 right-4 bg-neutral-950/80 backdrop-blur-md border border-neutral-700 px-3 py-1.5 rounded-lg text-xs font-mono text-lime-400 flex items-center gap-2">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>10.0 km/h · 2.5 bar</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs text-lime-400 font-semibold mb-1">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>Unidad AgroServi ATV-01 en operación</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold leading-snug">
                    Pulverización en entresurco con barra de 6 metros
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                    Distribución homogénea con boquillas antideriva ISO 025 y bomba de presión constante.
                  </p>
                </div>
              </div>

              {/* Quick Spec Ribbon */}
              <div className="grid grid-cols-3 divide-x divide-neutral-800 border-t border-neutral-800 bg-neutral-900/90 text-center py-3">
                <div>
                  <div className="text-xs text-neutral-400">Presión Suelo</div>
                  <div className="text-sm font-bold text-white font-mono">5.2 PSI</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Capacidad</div>
                  <div className="text-sm font-bold text-lime-400 font-mono">150 Litros</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Rendimiento</div>
                  <div className="text-sm font-bold text-white font-mono">35 Ha/día</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI strip below hero split */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-mono">0%</div>
            <div className="text-sm font-semibold text-white">Compactación Severa</div>
            <p className="text-xs text-neutral-400">
              Llantas de flotación de baja presión no destruyen la estructura del suelo ni el sistema radicular.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-mono">30% - 40%</div>
            <div className="text-sm font-semibold text-white">Ahorro de Químico</div>
            <p className="text-xs text-neutral-400">
              Dosificación calibrada al mililitro sin sobredosificación tóxica ni subdosificación ineficaz.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-mono">35°</div>
            <div className="text-sm font-semibold text-white">Laderas y Pendientes</div>
            <p className="text-xs text-neutral-400">
              Tracción 4x4 integral y centro de gravedad bajo para potreros quebrados donde el tractor no sube.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-mono">45 Ha</div>
            <div className="text-sm font-semibold text-white">Capacidad Diaria</div>
            <p className="text-xs text-neutral-400">
              Velocidad constante y agilidad de giro para cubrir lotes extensos en la ventana climática ideal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
