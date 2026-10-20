export interface Crop {
  id: string;
  name: string;
  scientificName?: string;
  category: 'frutales_mayores' | 'frutales_menores' | 'vides';
  description: string;
  defaultWaterVolume: number; // L/ha
  applicationZone: 'Sobre hilera / Camellón' | 'Callejón' | 'Banda bajo copa';
  soilSensitivity: string;
  commonWeeds: string[];
  recommendedHerbicides: {
    name: string;
    activeIngredient: string;
    type: 'Contacto' | 'Sistémico' | 'Residual / Pre-emergente';
    standardDose: number; // L/ha o kg/ha
    unit: 'L/ha' | 'kg/ha';
    targetWeeds: string;
    stage: string;
    notes: string;
  }[];
}

export interface TerrainTopography {
  id: 'suelo_plano' | 'con_camellones';
  name: string;
  description: string;
  speedAdjustmentFactor: number;
  boomHeightAdvice: string;
}

export interface ApplicationEquipment {
  id: string;
  name: string;
  defaultTankVolume: number; // Litros
  defaultBoomWidth: number; // Metros
  defaultSpeed: number; // km/h
  speedRange: { min: number; max: number };
  tankOptions: number[];
  advantages: string[];
}

export interface SprayNozzle {
  id: string;
  isoCode: string;
  colorName: string;
  colorHex: string;
  nominalFlowAt3Bar: number; // L/min a 3.0 bar
  dropletSpectrum: 'Muy Fina' | 'Fina' | 'Media' | 'Media a Gruesa' | 'Gruesa' | 'Muy Gruesa' | 'Ultra Gruesa';
  driftRisk: 'Muy Alto' | 'Alto' | 'Moderado' | 'Bajo' | 'Muy Bajo';
  suitableForHerbicides: string;
}

export interface CalculationInputs {
  cropId: string;
  cropArea: number; // Hectáreas totales
  terrainId: 'suelo_plano' | 'con_camellones';
  equipmentId: string;
  tankCapacity: number; // Litros
  boomWidth: number; // Metros de franja tratada
  operatingSpeed: number; // km/h
  nozzleSpacing: number; // Distancia entre picos (m)
  targetApplicationVolume: number; // L/ha de caldo
  herbicideName: string;
  herbicideDosePerHa: number; // L/ha o kg/ha
  doseUnit: 'L/ha' | 'kg/ha';
  adjuvantDosePer100L: number; // L o ml por cada 100L
  windSpeedKmh: number; // km/h
  ambientTempC: number; // °C
  nozzleId: string;
}

export interface CalculationResults {
  calibratedLitersPerHa: number; // L/ha
  flowPerNozzleLMin: number; // L/min por boquilla
  totalNozzles: number;
  totalSprayBoomFlowLMin: number; // L/min totales
  hectaresPerTank: number; // ha por tanque
  tanksNeeded: number; // Cantidad de tanques
  totalWaterVolumeLiters: number; // Litros totales de agua
  herbicidePerTank: number; // Litros o kg de producto por tanque
  adjuvantPerTank: number; // Litros de coadyuvante por tanque
  totalHerbicideNeeded: number; // Litros o kg totales para todo el huerto
  totalAdjuvantNeeded: number; // Litros totales de coadyuvante
  operatingCapacityHaPerHour: number; // Hectáreas por hora de trabajo neto
  estimatedTotalHours: number; // Horas estimadas
  driftRiskScore: {
    level: 'Óptimo' | 'Precaución' | 'Riesgo Alto' | 'No Aplicar';
    color: string;
    reason: string;
  };
  warnings: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  description: string;
  specs: {
    cultivo?: string;
    terreno?: string;
    equipo?: string;
  };
}
