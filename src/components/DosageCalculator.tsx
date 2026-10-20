import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calculator, 
  Droplets, 
  Gauge, 
  Wind, 
  Thermometer, 
  Printer, 
  FileText, 
  Share2, 
  Check, 
  AlertTriangle,
  Sprout
} from 'lucide-react';
import { CROPS, TERRAINS, NOZZLES } from '../data/agriculturalData';
import { CalculationInputs, CalculationResults } from '../types/agriculture';
import { calculateSprayerDosage } from '../utils/calculator';

interface DosageCalculatorProps {
  initialCropId?: string;
  initialHerbicideName?: string;
  onClose?: () => void;
}

export const DosageCalculator: React.FC<DosageCalculatorProps> = ({ 
  initialCropId,
  initialHerbicideName,
  onClose
}) => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    cropId: 'cerezos',
    cropArea: 15,
    terrainId: 'con_camellones',
    equipmentId: 'atv_4x4_frutal',
    tankCapacity: 500,
    boomWidth: 1.5,
    operatingSpeed: 8,
    nozzleSpacing: 0.50,
    targetApplicationVolume: 100,
    herbicideName: 'Glufosinato de Amonio + Indaziflam',
    herbicideDosePerHa: 0.2,
    doseUnit: 'L/ha',
    adjuvantDosePer100L: 0.1,
    windSpeedKmh: 7,
    ambientTempC: 22,
    nozzleId: 'iso_03_azul'
  });

  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  useEffect(() => {
    if (initialCropId) {
      const selectedCrop = CROPS.find(c => c.id === initialCropId);
      if (selectedCrop) {
        const herbicide = initialHerbicideName 
          ? selectedCrop.recommendedHerbicides.find(h => h.name.toLowerCase() === initialHerbicideName.toLowerCase())
          : selectedCrop.recommendedHerbicides[0];

        setInputs(prev => ({
          ...prev,
          cropId: selectedCrop.id,
          targetApplicationVolume: selectedCrop.defaultWaterVolume,
          herbicideName: herbicide ? herbicide.name : selectedCrop.recommendedHerbicides[0].name,
          herbicideDosePerHa: herbicide ? herbicide.standardDose : selectedCrop.recommendedHerbicides[0].standardDose,
          doseUnit: herbicide ? herbicide.unit : 'L/ha'
        }));
      }
    }
  }, [initialCropId, initialHerbicideName]);

  const currentCrop = useMemo(() => CROPS.find(c => c.id === inputs.cropId) || CROPS[0], [inputs.cropId]);
  const currentTerrain = useMemo(() => TERRAINS.find(t => t.id === inputs.terrainId) || TERRAINS[1], [inputs.terrainId]);
  const currentNozzle = useMemo(() => NOZZLES.find(n => n.id === inputs.nozzleId) || NOZZLES[3], [inputs.nozzleId]);

  const handleCropChange = (cropId: string) => {
    const crop = CROPS.find(c => c.id === cropId);
    if (!crop) return;
    const defaultHerb = crop.recommendedHerbicides[0];
    setInputs(prev => ({
      ...prev,
      cropId: crop.id,
      targetApplicationVolume: crop.defaultWaterVolume,
      herbicideName: defaultHerb.name,
      herbicideDosePerHa: defaultHerb.standardDose,
      doseUnit: defaultHerb.unit
    }));
  };

  const results: CalculationResults = useMemo(() => {
    return calculateSprayerDosage(inputs);
  }, [inputs]);

  const handleCopySummary = () => {
    const summary = `*ORDEN DE APLICACIÓN EN HUERTO CON ATV - AGROSERVI 4x4*
Cultivo: ${currentCrop.name} (${inputs.cropArea} ha)
Terreno: ${currentTerrain.name}
Equipo: Cuatrimoto ATV 4x4 (Estanque: ${inputs.tankCapacity} L)
Herbicida: ${inputs.herbicideName}
Dosis por Estanque: ${results.herbicidePerTank} ${inputs.doseUnit === 'kg/ha' ? 'kg' : 'L'}
Hectáreas por Estanque: ${results.hectaresPerTank} ha
Estanques Totales: ${results.tanksNeeded} cargas
Volumen Caldo: ${results.calibratedLitersPerHa} L/ha
Boquilla: ISO ${currentNozzle.isoCode} (${currentNozzle.colorName}) - Caudal: ${results.flowPerNozzleLMin} L/min
Producto Total Lote: ${results.totalHerbicideNeeded} ${inputs.doseUnit}
Agua Total: ${results.totalWaterVolumeLiters.toLocaleString()} Litros
Riesgo de Deriva: ${results.driftRiskScore.level}`;

    navigator.clipboard.writeText(summary);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <section id="calculadora" className="py-12 lg:py-16 bg-white border-b border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Metaltec Configurator Header Format) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-xs" />
              <span className="text-xs font-black text-red-600 uppercase tracking-widest">
                Herramienta de Calibración
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#182635] uppercase tracking-tight">
              Calculadora de dosificación con ATV
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-medium">
              Cálculo milimétrico del gasto en L/ha, caudal por boquilla (L/min) y producto comercial por estanque.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded bg-stone-100 border border-stone-200 text-xs font-bold text-stone-700 uppercase">
              Huertos & Viñas
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded bg-[#182635] text-white hover:bg-stone-800 text-xs font-black uppercase tracking-wider transition-colors"
              >
                Cerrar ✕
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Box 1: Especie Frutal & Superficie */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#f8f9fa] border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs font-black text-[#182635] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#182635] text-white text-[11px] font-black flex items-center justify-center">1</span>
                  Especie Frutal & Lote
                </span>
                <span className="text-xs font-bold text-emerald-800 uppercase">{currentCrop.applicationZone}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                    Seleccione Frutal
                  </label>
                  <select
                    value={inputs.cropId}
                    onChange={(e) => handleCropChange(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:border-red-600 transition-colors uppercase"
                  >
                    {CROPS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase">
                      Superficie del Predio
                    </label>
                    <span className="text-xs font-mono font-black text-red-600">{inputs.cropArea} Hectáreas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={100}
                      step={1}
                      value={inputs.cropArea}
                      onChange={(e) => setInputs({ ...inputs, cropArea: Number(e.target.value) })}
                      className="w-full accent-red-600"
                    />
                    <input
                      type="number"
                      min={0.5}
                      max={500}
                      step={0.5}
                      value={inputs.cropArea}
                      onChange={(e) => setInputs({ ...inputs, cropArea: Math.max(0.5, Number(e.target.value)) })}
                      className="w-20 bg-white border border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-900 font-mono text-center font-bold focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>
              </div>

              {/* Herbicida & Dosis */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                    Herbicida Comercial
                  </label>
                  <select
                    value={inputs.herbicideName}
                    onChange={(e) => {
                      const herb = currentCrop.recommendedHerbicides.find(h => h.name === e.target.value);
                      setInputs({
                        ...inputs,
                        herbicideName: e.target.value,
                        herbicideDosePerHa: herb ? herb.standardDose : inputs.herbicideDosePerHa,
                        doseUnit: herb ? herb.unit : inputs.doseUnit
                      });
                    }}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:border-red-600 transition-colors"
                  >
                    {currentCrop.recommendedHerbicides.map((h, i) => (
                      <option key={i} value={h.name}>
                        {h.name} ({h.type})
                      </option>
                    ))}
                    <option value="Personalizado">Otro Herbicida</option>
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                    Dosis Recomendada
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step={0.05}
                      min={0.01}
                      value={inputs.herbicideDosePerHa}
                      onChange={(e) => setInputs({ ...inputs, herbicideDosePerHa: Number(e.target.value) })}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 font-mono font-bold focus:outline-none focus:border-red-600"
                    />
                    <select
                      value={inputs.doseUnit}
                      onChange={(e) => setInputs({ ...inputs, doseUnit: e.target.value as 'L/ha' | 'kg/ha' })}
                      className="bg-stone-200 border border-stone-300 rounded-lg px-2 py-2 text-xs text-stone-800 font-mono font-bold"
                    >
                      <option value="L/ha">L/ha</option>
                      <option value="kg/ha">kg/ha</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Factores de Terreno (Suelo Plano vs Con Camellones) */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#f8f9fa] border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs font-black text-[#182635] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#182635] text-white text-[11px] font-black flex items-center justify-center">2</span>
                  Conformación del Terreno
                </span>
                <span className="text-xs font-bold text-stone-500 uppercase">Topografía Huerto</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-2">
                  Seleccione si el huerto es plano o tiene camellones:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, terrainId: 'suelo_plano', operatingSpeed: 10 })}
                    className={`p-3.5 rounded-lg border text-left transition-all ${
                      inputs.terrainId === 'suelo_plano'
                        ? 'border-red-600 bg-red-50/60 shadow-xs ring-1 ring-red-600'
                        : 'border-stone-300 bg-white hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className={`text-xs uppercase font-black ${inputs.terrainId === 'suelo_plano' ? 'text-red-700' : 'text-stone-800'}`}>
                        Suelo Plano
                      </strong>
                      {inputs.terrainId === 'suelo_plano' && (
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug font-medium">
                      Huerto nivelado sin caballones. Velocidad regular constante (8 a 12 km/h) con barra a altura uniforme.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, terrainId: 'con_camellones', operatingSpeed: 7 })}
                    className={`p-3.5 rounded-lg border text-left transition-all ${
                      inputs.terrainId === 'con_camellones'
                        ? 'border-red-600 bg-red-50/60 shadow-xs ring-1 ring-red-600'
                        : 'border-stone-300 bg-white hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className={`text-xs uppercase font-black ${inputs.terrainId === 'con_camellones' ? 'text-red-700' : 'text-stone-800'}`}>
                        Con Camellones
                      </strong>
                      {inputs.terrainId === 'con_camellones' && (
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug font-medium">
                      Lomos elevados de drenaje. Requiere velocidad moderada (6 a 8 km/h) y barra adaptada para proteger goteros.
                    </p>
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-white border border-stone-200 mt-3 text-xs text-stone-600 flex items-start gap-2">
                  <span className="font-bold text-[#182635] uppercase text-[10px] shrink-0">Calibración:</span>
                  <span className="font-medium text-[11px]">{currentTerrain.boomHeightAdvice}</span>
                </div>
              </div>
            </div>

            {/* Box 3: Calibración Cuatrimoto ATV */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#f8f9fa] border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs font-black text-[#182635] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#182635] text-white text-[11px] font-black flex items-center justify-center">3</span>
                  Calibración de la Cuatrimoto ATV
                </span>
                <span className="text-xs font-bold text-stone-500 uppercase">Equipo 4x4</span>
              </div>

              {/* Sliders: Estanque, Ancho de Franja, Velocidad */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white border border-stone-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-bold text-stone-600 uppercase">Estanque</span>
                    <span className="text-xs font-mono font-black text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">{inputs.tankCapacity} L</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={1000}
                    step={50}
                    value={inputs.tankCapacity}
                    onChange={(e) => setInputs({ ...inputs, tankCapacity: Number(e.target.value) })}
                    className="w-full accent-red-600"
                  />
                  <div className="flex items-center justify-between mt-1 text-[10px] text-stone-400 font-mono">
                    <span>100 L</span>
                    <button
                      type="button"
                      onClick={() => setInputs({ ...inputs, tankCapacity: 500 })}
                      className="text-red-700 font-bold hover:underline"
                    >
                      500 Lts (Estándar)
                    </button>
                    <span>1000 L</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border border-stone-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-bold text-stone-600 uppercase">Franja Hilera</span>
                    <span className="text-xs font-mono font-black text-stone-900">{inputs.boomWidth} m</span>
                  </div>
                  <input
                    type="range"
                    min={1.0}
                    max={3.0}
                    step={0.1}
                    value={inputs.boomWidth}
                    onChange={(e) => setInputs({ ...inputs, boomWidth: Number(e.target.value) })}
                    className="w-full accent-red-600"
                  />
                  <span className="text-[9px] text-stone-400 block text-right">Ancho bajo hilera</span>
                </div>

                <div className="p-3 rounded-lg bg-white border border-stone-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-bold text-stone-600 uppercase">Velocidad</span>
                    <span className="text-xs font-mono font-black text-stone-900">{inputs.operatingSpeed} km/h</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={15}
                    step={0.5}
                    value={inputs.operatingSpeed}
                    onChange={(e) => setInputs({ ...inputs, operatingSpeed: Number(e.target.value) })}
                    className="w-full accent-red-600"
                  />
                </div>
              </div>

              {/* Caldo L/ha & Boquilla */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase">
                      Volumen de Caldo (L/ha)
                    </label>
                    <span className="text-xs font-mono font-black text-red-600">{inputs.targetApplicationVolume} L/ha</span>
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={200}
                    step={5}
                    value={inputs.targetApplicationVolume}
                    onChange={(e) => setInputs({ ...inputs, targetApplicationVolume: Number(e.target.value) })}
                    className="w-full accent-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                    Boquilla de Aspersión (ISO)
                  </label>
                  <select
                    value={inputs.nozzleId}
                    onChange={(e) => setInputs({ ...inputs, nozzleId: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:border-red-600 transition-colors uppercase"
                  >
                    {NOZZLES.map((n) => (
                      <option key={n.id} value={n.id}>
                        ISO {n.isoCode} - {n.colorName} ({n.dropletSpectrum})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Box 4: Viento y Temperatura */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#f8f9fa] border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs font-black text-[#182635] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#182635] text-white text-[11px] font-black flex items-center justify-center">4</span>
                  Condiciones Ambientales en Predio
                </span>
                <span className="text-xs font-bold text-stone-500 uppercase">Deriva</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-stone-700 font-bold uppercase flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-stone-500" />
                      Velocidad Viento
                    </span>
                    <span className="text-xs font-mono font-black text-stone-900">{inputs.windSpeedKmh} km/h</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    step={1}
                    value={inputs.windSpeedKmh}
                    onChange={(e) => setInputs({ ...inputs, windSpeedKmh: Number(e.target.value) })}
                    className="w-full accent-red-600"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                    <span>0 km/h</span>
                    <span>8 km/h Óptimo</span>
                    <span>18+ km/h Crítico</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-stone-700 font-bold uppercase flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-stone-500" />
                      Temperatura
                    </span>
                    <span className="text-xs font-mono font-black text-stone-900">{inputs.ambientTempC} °C</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={38}
                    step={1}
                    value={inputs.ambientTempC}
                    onChange={(e) => setInputs({ ...inputs, ambientTempC: Number(e.target.value) })}
                    className="w-full accent-red-600"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                    <span>15°C Fresco</span>
                    <span>22°C Ideal</span>
                    <span>30°C+ Evaporación</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Results Panel Column (5 Cols) (Metaltec Spec Box) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="rounded-xl bg-white border-2 border-stone-200 p-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xs font-black text-red-600 uppercase tracking-widest block">
                    Ficha de Dosificación
                  </span>
                  <h3 className="text-base font-black text-[#182635] uppercase">
                    {inputs.herbicideName}
                  </h3>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#182635] text-white text-xs font-mono font-black">
                  {inputs.cropArea} ha
                </div>
              </div>

              {/* 2 Primary Metric Cards */}
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="p-4 rounded-lg bg-red-50/70 border border-red-200">
                  <span className="text-[10px] font-black text-red-900 uppercase block mb-0.5">
                    Por Estanque ({inputs.tankCapacity} L)
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-red-700 font-mono">
                    {results.herbicidePerTank}
                  </div>
                  <span className="text-[11px] text-red-800 font-bold uppercase">
                    {inputs.doseUnit === 'kg/ha' ? 'kg' : 'Litros'} producto
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-[10px] font-black text-stone-600 uppercase block mb-0.5">
                    Cobertura por Carga
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#182635] font-mono">
                    {results.hectaresPerTank}
                  </div>
                  <span className="text-[11px] text-stone-600 font-bold uppercase">
                    Ha / estanque
                  </span>
                </div>
              </div>

              {/* Details table (Metaltec Technical Sheet Style) */}
              <div className="space-y-2 text-xs border-t border-stone-100 pt-3 font-medium">
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Cargas totales de estanque:</span>
                  <span className="font-mono font-black text-[#182635]">
                    {results.tanksNeeded} estanques
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Total producto químico lote:</span>
                  <span className="font-mono font-black text-red-600">
                    {results.totalHerbicideNeeded} {inputs.doseUnit}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Volumen total de agua:</span>
                  <span className="font-mono font-bold text-stone-900">
                    {results.totalWaterVolumeLiters.toLocaleString()} Litros
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Caudal por boquilla (L/min):</span>
                  <span className="font-mono font-black text-emerald-800">
                    {results.flowPerNozzleLMin} L/min
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Terreno configurado:</span>
                  <span className="font-bold text-[#182635] uppercase text-[11px]">
                    {currentTerrain.name}
                  </span>
                </div>

                <div className="flex justify-between py-1.5">
                  <span className="text-stone-500">Rendimiento estimado de labor:</span>
                  <span className="font-mono font-bold text-stone-900">
                    {results.operatingCapacityHaPerHour} ha/h (~{results.estimatedTotalHours} hrs)
                  </span>
                </div>
              </div>

              {/* Drift Risk Gauge */}
              <div className="mt-4 p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#182635] uppercase flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-stone-500" />
                    Semáforo de Deriva
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded font-mono uppercase"
                    style={{ backgroundColor: `${results.driftRiskScore.color}20`, color: results.driftRiskScore.color }}
                  >
                    {results.driftRiskScore.level}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 leading-snug font-medium">
                  {results.driftRiskScore.reason}
                </p>
              </div>

              {/* Warnings if any */}
              {results.warnings.length > 0 && (
                <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                  {results.warnings.map((w, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span className="font-medium">{w}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => setShowPrintModal(true)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Imprimir Ficha</span>
                </button>

                <button
                  onClick={handleCopySummary}
                  className="py-2.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-stone-300"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Compartir</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Modal: Printable Application Sheet */}
        {showPrintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white border border-stone-200 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-800 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xl font-black text-[#182635] uppercase">
                    AGROSERVI <span className="text-red-600">4x4</span>
                  </span>
                  <span className="text-xs text-stone-500 font-bold uppercase block">Ficha Técnica de Pulverización en Huerto con ATV</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded bg-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Imprimir
                  </button>
                  <button
                    onClick={() => setShowPrintModal(false)}
                    className="px-2.5 py-1.5 rounded bg-stone-100 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-xs font-medium">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                  <div>
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">Cultivo:</span>
                    <strong className="text-stone-900 text-sm">{currentCrop.name}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">Superficie:</span>
                    <strong className="font-mono text-red-600 text-sm">{inputs.cropArea} Ha</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">Terreno:</span>
                    <strong className="text-stone-800">{currentTerrain.name}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">Zona:</span>
                    <strong className="text-emerald-800">{currentCrop.applicationZone}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-red-50/70 border border-red-200 space-y-2">
                  <h4 className="font-black text-red-900 text-xs uppercase">Receta de Mezcla por Carga de Cuatrimoto</h4>
                  <p className="text-stone-700">
                    Estanque: <strong className="text-stone-900 font-mono">{inputs.tankCapacity} Litros</strong> cubren <strong className="text-red-700 font-mono">{results.hectaresPerTank} Hectáreas</strong>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 bg-white rounded border border-red-100">
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Herbicida comercial:</span>
                      <strong className="text-red-700 font-mono text-base">
                        {results.herbicidePerTank} {inputs.doseUnit === 'kg/ha' ? 'kg' : 'L'}
                      </strong>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-red-100">
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Estanques Totales:</span>
                      <strong className="text-stone-900 font-mono text-base">
                        {results.tanksNeeded} cargas
                      </strong>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-red-100">
                      <span className="text-stone-400 block text-[10px] font-bold uppercase">Producto Total:</span>
                      <strong className="text-stone-900 font-mono text-base">
                        {results.totalHerbicideNeeded} {inputs.doseUnit}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="font-black text-[#182635] text-xs uppercase">Calibración de Barra ATV</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                    <div>
                      <span className="text-stone-400 text-[10px] block">Velocidad ATV:</span>
                      <strong className="text-stone-900">{inputs.operatingSpeed} km/h</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] block">Caldo:</span>
                      <strong className="text-red-600">{results.calibratedLitersPerHa} L/ha</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] block">Boquilla:</span>
                      <strong className="text-stone-900">ISO {currentNozzle.isoCode}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] block">Caudal por pico:</span>
                      <strong className="text-emerald-800">{results.flowPerNozzleLMin} L/min</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 text-[10px] font-bold uppercase block mb-1">Firma de conformidad del predio / operador ATV:</span>
                  <div className="pt-8 border-b border-stone-300 w-64" />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
