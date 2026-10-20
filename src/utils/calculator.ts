import { CalculationInputs, CalculationResults } from '../types/agriculture';
import { CROPS, TERRAINS, NOZZLES } from '../data/agriculturalData';

export function calculateSprayerDosage(inputs: CalculationInputs): CalculationResults {
  const {
    cropId,
    cropArea,
    terrainId,
    tankCapacity,
    boomWidth,
    operatingSpeed,
    nozzleSpacing,
    targetApplicationVolume,
    herbicideDosePerHa,
    adjuvantDosePer100L,
    windSpeedKmh,
    ambientTempC,
    nozzleId
  } = inputs;

  const terrain = TERRAINS.find(t => t.id === terrainId) || TERRAINS[0];
  const selectedCrop = CROPS.find(c => c.id === cropId);
  const selectedNozzle = NOZZLES.find(n => n.id === nozzleId) || NOZZLES[3];

  // 1. Spacing and nozzle count on orchard boom / lateral bar
  const effectiveSpacing = nozzleSpacing > 0 ? nozzleSpacing : 0.50;
  const totalNozzles = Math.max(1, Math.round(boomWidth / effectiveSpacing));

  // 2. Terrain adjusted operating speed (camellones require smoother speed)
  const adjustedSpeed = Math.max(2, Number((operatingSpeed * terrain.speedAdjustmentFactor).toFixed(1)));

  // 3. Flow per nozzle required (L/min)
  // q (L/min) = (Q_ha * V * d) / 600
  const flowPerNozzleLMin = Number(((targetApplicationVolume * adjustedSpeed * effectiveSpacing) / 600).toFixed(2));
  const totalSprayBoomFlowLMin = Number((flowPerNozzleLMin * totalNozzles).toFixed(2));

  // 4. Herbicide dose
  const adjustedHerbicideDose = Number(herbicideDosePerHa.toFixed(3));

  // 5. Coverage per tank
  // haPerTank = tankCapacity / targetApplicationVolume
  const hectaresPerTank = Number((tankCapacity / targetApplicationVolume).toFixed(2));

  // 6. Tanks needed
  const tanksNeeded = Number((cropArea / (hectaresPerTank || 1)).toFixed(2));

  // 7. Total water
  const totalWaterVolumeLiters = Math.round(cropArea * targetApplicationVolume);

  // 8. Herbicide & adjuvant per tank
  const herbicidePerTank = Number((adjustedHerbicideDose * hectaresPerTank).toFixed(2));
  const adjuvantPerTank = Number(((tankCapacity / 100) * adjuvantDosePer100L).toFixed(3));

  // 9. Total products for the entire orchard
  const totalHerbicideNeeded = Number((adjustedHerbicideDose * cropArea).toFixed(2));
  const totalAdjuvantNeeded = Number(((totalWaterVolumeLiters / 100) * adjuvantDosePer100L).toFixed(2));

  // 10. Operational capacity (ha/hour)
  // Capacity (ha/h) = (boomWidth * speed * 0.70) / 10
  const operatingCapacityHaPerHour = Number(((boomWidth * adjustedSpeed * 0.70) / 10).toFixed(2));
  const estimatedTotalHours = Number((cropArea / (operatingCapacityHaPerHour || 1)).toFixed(1));

  // 11. Drift Risk Assessment (Crucial for fruit trees and vines to prevent drift to green foliage)
  let driftLevel: 'Óptimo' | 'Precaución' | 'Riesgo Alto' | 'No Aplicar' = 'Óptimo';
  let driftColor = '#16a34a'; // emerald green
  let driftReason = 'Condiciones meteorológicas y de boquilla adecuadas para aplicación en huerto sin riesgo de deriva.';

  if (windSpeedKmh > 18 || ambientTempC > 30) {
    driftLevel = 'No Aplicar';
    driftColor = '#dc2626'; // red
    driftReason = `Viento elevado (${windSpeedKmh} km/h) o calor (${ambientTempC}°C). Peligro de deriva hacia brotes tiernos o frutos del huerto. Suspenda la labor.`;
  } else if (windSpeedKmh < 2) {
    driftLevel = 'Riesgo Alto';
    driftColor = '#ea580c'; // orange
    driftReason = 'Viento calmo menor a 2 km/h con riesgo de inversión térmica. Las gotas pueden flotar en el estrato bajo del huerto.';
  } else if (windSpeedKmh > 12 || ambientTempC > 26) {
    driftLevel = 'Precaución';
    driftColor = '#ca8a04'; // amber
    driftReason = `Viento moderado (${windSpeedKmh} km/h) o temperatura cálida (${ambientTempC}°C). Use boquillas antideriva de inducción de aire y campana protectora.`;
  } else if (selectedNozzle.dropletSpectrum === 'Fina' || selectedNozzle.dropletSpectrum === 'Muy Fina') {
    driftLevel = 'Precaución';
    driftColor = '#ca8a04';
    driftReason = 'La boquilla seleccionada genera gotas finas. En huertos frutales se recomienda gota media a gruesa para evitar daño foliar accidental.';
  }

  // 12. Warnings & alerts
  const warnings: string[] = [];
  if (terrainId === 'con_camellones') {
    warnings.push('Terreno con Camellones: Se ajustó la velocidad de avance para proteger las líneas de goteo y evitar oscilación de la barra sobre el lomo del camellón.');
  }
  if (flowPerNozzleLMin > 2.2) {
    warnings.push(`Caudal requerido (${flowPerNozzleLMin} L/min) es elevado para boquilla estándar en franja frutal. Se aconseja reducir la velocidad de la cuatrimoto o aumentar calibre.`);
  }

  return {
    calibratedLitersPerHa: targetApplicationVolume,
    flowPerNozzleLMin,
    totalNozzles,
    totalSprayBoomFlowLMin,
    hectaresPerTank,
    tanksNeeded,
    totalWaterVolumeLiters,
    herbicidePerTank,
    adjuvantPerTank,
    totalHerbicideNeeded,
    totalAdjuvantNeeded,
    operatingCapacityHaPerHour,
    estimatedTotalHours,
    driftRiskScore: {
      level: driftLevel,
      color: driftColor,
      reason: driftReason
    },
    warnings
  };
}
