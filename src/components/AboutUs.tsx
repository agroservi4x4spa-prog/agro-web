import React from 'react';
import { ShieldCheck, Mountain, Compass, Users, Check, X, Sparkles, Sprout, Tractor, Zap } from 'lucide-react';
import { IMAGES } from '../data/agriculturalData';

export const AboutUs: React.FC = () => {
  return (
    <section id="quienes-somos" className="py-16 lg:py-24 bg-neutral-900/50 border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold text-lime-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>01</span>
            <span aria-hidden="true">·</span>
            <span>Quiénes Somos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Revolucionando la aplicación fitosanitaria con agilidad 4x4
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            En <strong className="text-white">AgroServi 4x4</strong> nacimos para resolver el dilema del productor: la ineficiencia y fatiga de las mochilas de espalda frente al riesgo de compactación, empantanamiento y vuelco de los tractores pesados en terrenos difíciles.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                Somos un equipo de agrónomos, operadores técnicos y especialistas en maquinaria agrícola liviana. Nos dedicamos a la aplicación precisa de herbicidas (pre y post-emergentes), desecantes, fertilizantes foliares y correctores en cultivos de granos, pasturas ganaderas, caña y frutales.
              </p>
              <p>
                Nuestra flota de cuatrimotos y vehículos utilitarios 4x4 está equipada con barras de pulverización de geometría variable, filtros de línea de 80 mallas, manómetros patrón de glicerina y boquillas antideriva certificadas según normas ISO.
              </p>
            </div>

            {/* Core Values 3-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 flex items-center justify-center mb-3">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Oportunidad</h4>
                <p className="text-xs text-neutral-400">
                  Aplicamos en el momento biológico exacto, incluso después de llover sin esperar días a que el suelo seque.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 flex items-center justify-center mb-3">
                  <Mountain className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Terreno Difícil</h4>
                <p className="text-xs text-neutral-400">
                  Potreros con piedras, zanjas, laderas de alta pendiente y entresurcos estrechos son nuestro hábitat natural.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Cero Residuos</h4>
                <p className="text-xs text-neutral-400">
                  Calibración exacta de caudal para no desperdiciar producto activo ni contaminar fuentes de agua vecinas.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Showcase with Logo & Field Equipment */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 p-6 space-y-6">
              
              <div className="flex items-center gap-4 pb-4 border-b border-neutral-800">
                <div className="w-16 h-16 rounded-xl bg-neutral-950 p-2 border border-neutral-700/60 shrink-0">
                  <img
                    src={IMAGES.logo}
                    alt="AgroServi 4x4 Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Misión AgroServi 4x4</h3>
                  <p className="text-xs text-neutral-400">
                    Garantizar la protección de su inversión agrícola con aplicaciones uniformes, rápidas y económicamente rentables.
                  </p>
                </div>
              </div>

              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                <img
                  src={IMAGES.fleet}
                  alt="Flota AgroServi 4x4 en Finca"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-neutral-950/80 backdrop-blur-sm p-2 rounded-lg border border-neutral-800">
                  <span className="font-semibold text-lime-400">Flota Móvil Completa:</span> Equipos 4x4, cisterna nodriza de agua y medidor de calidad con agitadores continuos.
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Technical Comparison Table */}
        <div className="mt-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-white">
              ¿Por qué elegir tecnología 4x4 frente a métodos tradicionales?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Comparativa técnica basada en ensayos de campo y rendimiento por jornada de 8 horas.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950">
            <table className="w-full text-left text-sm text-neutral-300">
              <thead className="bg-neutral-900/90 text-xs text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th scope="col" className="px-6 py-4">Criterio Operativo</th>
                  <th scope="col" className="px-6 py-4">Mochila Manual</th>
                  <th scope="col" className="px-6 py-4">Tractor Pesado (4 - 8 ton)</th>
                  <th scope="col" className="px-6 py-4 bg-lime-950/40 text-lime-400 font-bold border-x border-lime-800/50">
                    AgroServi 4x4 (ATV / UTV)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-xs sm:text-sm">
                <tr>
                  <td className="px-6 py-4 font-semibold text-white">Rendimiento diario</td>
                  <td className="px-6 py-4 text-neutral-400">1.0 a 2.5 hectáreas</td>
                  <td className="px-6 py-4 text-neutral-400">30 a 50 ha (solo plano)</td>
                  <td className="px-6 py-4 bg-lime-950/20 text-lime-300 font-bold border-x border-lime-800/40">
                    35 a 45 ha (en cualquier terreno)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-white">Compactación del suelo</td>
                  <td className="px-6 py-4 text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Nula
                  </td>
                  <td className="px-6 py-4 text-red-400">
                    <span className="flex items-center gap-1.5"><X className="w-4 h-4" /> Crítica (25-35 psi, rompe raíces)</span>
                  </td>
                  <td className="px-6 py-4 bg-lime-950/20 text-lime-300 font-bold border-x border-lime-800/40">
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-lime-400" /> Mínima (4-6 psi, llanta de flotación)</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-white">Acceso post-lluvia / barro</td>
                  <td className="px-6 py-4 text-neutral-400">Posible pero extenuante</td>
                  <td className="px-6 py-4 text-red-400">Imposible (se entierra y hunde)</td>
                  <td className="px-6 py-4 bg-lime-950/20 text-lime-300 font-bold border-x border-lime-800/40">
                    Inmediato (tracción 4x4 ligera)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-white">Laderas y pendientes</td>
                  <td className="px-6 py-4 text-neutral-400">Lento y riesgoso para el operario</td>
                  <td className="px-6 py-4 text-red-400">Peligro alto de vuelco lateral</td>
                  <td className="px-6 py-4 bg-lime-950/20 text-lime-300 font-bold border-x border-lime-800/40">
                    Excelente estabilidad (hasta 35°)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-white">Uniformidad de dosis</td>
                  <td className="px-6 py-4 text-red-400">Muy variable (paso humano irregular)</td>
                  <td className="px-6 py-4 text-emerald-400">Buena con computadora</td>
                  <td className="px-6 py-4 bg-lime-950/20 text-lime-300 font-bold border-x border-lime-800/40">
                    Precisa (velocímetro digital + manómetro)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
