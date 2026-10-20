import { Crop, TerrainTopography, ApplicationEquipment, SprayNozzle, GalleryItem } from '../types/agriculture';

export const IMAGES = {
  logo: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_5.11.13_PM_d60d1013.jpeg',
  nogales: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_6.16.52_PM_b344a967.jpeg',
  cerezos: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_6.17.03_PM_bce2648b.jpeg',
  ciruelas: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_6.17.44_PM_8fb13fe2.jpeg',
  atv500: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_8.08.15_PM_2ca9944c.jpeg',
  viento: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_8.08.38_PM_2e4b4ec9.jpeg',
  ph: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_8.06.35_PM_ab065043.jpeg',
  orchardCamellones: '/src/assets/images/avellano_cerezos_orchard_1792528291960.jpg',
  vineyardSpray: '/src/assets/images/vineyard_atv_spray_1792528292276.jpg',
  quadField: '/src/assets/images/quad_herbicide_field_1792527325262.jpg',
  nozzlesCalibration: '/src/assets/images/spray_nozzles_calibration_1792527324701.jpg',
  cropInspection: '/src/assets/images/crop_health_inspection_1792527325975.jpg',
  fleet: '/src/assets/images/drone_quad_fleet_1792527325516.jpg',
};

export const CROPS: Crop[] = [
  {
    id: 'avellano_europeo',
    name: 'Avellano Europeo',
    scientificName: 'Corylus avellana',
    category: 'frutales_mayores',
    description: 'Frutal de nuez con alta exigencia de suelo limpio en la sobrehilera y camellón. Crucial para la preparación previa a la cosecha mecanizada por barrido y para el control químico de sierpes o chupones basales.',
    defaultWaterVolume: 120,
    applicationZone: 'Sobre hilera / Camellón',
    soilSensitivity: 'Sensible al anegamiento. Comúnmente establecido sobre camellones elevados con riego por goteo.',
    commonWeeds: ['Chupones basales / Sierpes', 'Pasto bermuda (Cynodon dactylon)', 'Conyza (Rama negra)', 'Malva'],
    recommendedHerbicides: [
      {
        name: 'Glufosinato de Amonio 20% SL',
        activeIngredient: 'Glufosinato de Amonio',
        type: 'Contacto',
        standardDose: 2.5,
        unit: 'L/ha',
        targetWeeds: 'Control de malezas anuales y desecación de sierpes basales tiernas',
        stage: 'Primavera y verano, sierpes con menos de 15 cm de largo',
        notes: 'Excelente seguridad en troncos lignificados de más de 3 años. No transloca a la raíz.'
      },
      {
        name: 'Flumioxazin 51% WDG (Pledge / Sumisoya)',
        activeIngredient: 'Flumioxazin',
        type: 'Residual / Pre-emergente',
        standardDose: 0.15,
        unit: 'kg/ha',
        targetWeeds: 'Banco de semillas de malezas de hoja ancha y gramíneas',
        stage: 'Otoño - Invierno sobre suelo limpio y húmedo',
        notes: 'Crea una barrera química residual en el camellón que dura hasta 120 días.'
      },
      {
        name: 'Carfentrazone-etil 40% EC',
        activeIngredient: 'Carfentrazone-etil',
        type: 'Contacto',
        standardDose: 0.15,
        unit: 'L/ha',
        targetWeeds: 'Desecación rápida de chupones y malezas de hoja ancha difíciles',
        stage: 'Brote activo de chupones basales',
        notes: 'Mezclar con aceite mineral o vegetal metilado al 0.5%.'
      }
    ]
  },
  {
    id: 'cerezos',
    name: 'Cerezos',
    scientificName: 'Prunus avium',
    category: 'frutales_mayores',
    description: 'Cultivo de alto valor comercial. Se establece predominantemente sobre camellones para asegurar drenaje radicular. La cuatrimoto ATV 4x4 evita dañar las mangueras de goteo y no compacta el bulbo de raíces.',
    defaultWaterVolume: 100,
    applicationZone: 'Sobre hilera / Camellón',
    soilSensitivity: 'Extremadamente sensible a asfixia radicular en suelos pesados. Requiere camellón estructurado.',
    commonWeeds: ['Chépica / Gramilla', 'Diente de león', 'Verónica', 'Ballica anual resistente'],
    recommendedHerbicides: [
      {
        name: 'Glufosinato de Amonio + Indaziflam',
        activeIngredient: 'Glufosinato + Indaziflam (Alion)',
        type: 'Residual / Pre-emergente',
        standardDose: 0.2,
        unit: 'L/ha',
        targetWeeds: 'Gramíneas anuales y hojas anchas de primavera-verano',
        stage: 'Receso invernal o post-cosecha en huertos mayores a 3 años',
        notes: 'Eficacia residual prolongada. Aplicar con boquillas antideriva dirigidas al suelo del camellón.'
      },
      {
        name: 'Glifosato 48% SL (Dirigido con campana)',
        activeIngredient: 'Glifosato sal IPA',
        type: 'Sistémico',
        standardDose: 2.0,
        unit: 'L/ha',
        targetWeeds: 'Malezas perennes establecidas en el callejón o borde de camellón',
        stage: 'Malezas en activo crecimiento antes de floración del cerezo',
        notes: 'Imprescindible campana protectora en la barra del ATV para evitar contacto con hojas bajas o chupones verdes.'
      }
    ]
  },
  {
    id: 'nogales',
    name: 'Nogales',
    scientificName: 'Juglans regia',
    category: 'frutales_mayores',
    description: 'Huertos de gran marco de plantación donde la aplicación en la franja de riego previene la competencia por nitrógeno y agua. Requiere suelo nivelado y limpio para cosecha mecánica.',
    defaultWaterVolume: 130,
    applicationZone: 'Banda bajo copa',
    soilSensitivity: 'Tolera diversos suelos pero responde a camellones amplios en suelos arcillosos.',
    commonWeeds: ['Correhuela (Convolvulus arvensis)', 'Chamico (Datura)', 'Zacate bermuda', 'Bledo'],
    recommendedHerbicides: [
      {
        name: 'Oxifluorfen 24% EC',
        activeIngredient: 'Oxifluorfen',
        type: 'Residual / Pre-emergente',
        standardDose: 2.0,
        unit: 'L/ha',
        targetWeeds: 'Control pre-emergente de hojas anchas y gramíneas tempranas',
        stage: 'Invierno antes de brotación de yemas',
        notes: 'Actúa por contacto y película en el suelo sin penetrar raíces profundas.'
      },
      {
        name: 'Saflufenacil 70% WG (Heat)',
        activeIngredient: 'Saflufenacil',
        type: 'Contacto',
        standardDose: 0.05,
        unit: 'kg/ha',
        targetWeeds: 'Conyza y malezas de hoja ancha difíciles o tolerantes a glifosato',
        stage: 'Post-emergencia con malezas de hasta 10 cm',
        notes: 'Excelente sinergia con glifosato o glufosinato en franja limpia.'
      }
    ]
  },
  {
    id: 'ciruelos',
    name: 'Ciruelos (Frescos & D’Agen)',
    scientificName: 'Prunus domestica',
    category: 'frutales_mayores',
    description: 'Frutales de carozo conducidos en eje o vaso. La franja libre de malezas bajo la línea de goteros maximiza el calibre y azúcares de la fruta.',
    defaultWaterVolume: 110,
    applicationZone: 'Sobre hilera / Camellón',
    soilSensitivity: 'Suelos francos a arcillosos con camellón medio.',
    commonWeeds: ['Pata de perdiz', 'Sombra de noche (Solanum)', 'Cardo mariano', 'Pasto miel'],
    recommendedHerbicides: [
      {
        name: 'Glufosinato 20% SL',
        activeIngredient: 'Glufosinato de Amonio',
        type: 'Contacto',
        standardDose: 2.2,
        unit: 'L/ha',
        targetWeeds: 'Quemado parejo de malezas anuales y gramíneas tiernas',
        stage: 'Malezas de 10 a 15 cm en primavera',
        notes: 'No afecta el tronco leñoso adulto ni deja residuos en la fruta.'
      },
      {
        name: 'Pendimetalina 40% SC',
        activeIngredient: 'Pendimetalina',
        type: 'Residual / Pre-emergente',
        standardDose: 3.0,
        unit: 'L/ha',
        targetWeeds: 'Gramíneas anuales desde semilla y malezas de verano',
        stage: 'Fin de invierno sobre camellón limpio',
        notes: 'Requiere lluvia o riego para incorporación superficial en los primeros 5 cm.'
      }
    ]
  },
  {
    id: 'manzanos',
    name: 'Manzanos',
    scientificName: 'Malus domestica',
    category: 'frutales_mayores',
    description: 'Plantaciones de alta densidad en espaldera sobre portainjertos enanizantes (M9). El sistema radicular es superficial, por lo que el paso liviano de la cuatrimoto ATV previene la compactación del suelo.',
    defaultWaterVolume: 120,
    applicationZone: 'Banda bajo copa',
    soilSensitivity: 'Sensibilidad a compactación que limita el desarrollo de raíces absorbentes.',
    commonWeeds: ['Chépica', 'Correhuela', 'Senecio', 'Ortiga', 'Pasto colchón'],
    recommendedHerbicides: [
      {
        name: 'Indaziflam 50% SC (Alion)',
        activeIngredient: 'Indaziflam',
        type: 'Residual / Pre-emergente',
        standardDose: 0.15,
        unit: 'L/ha',
        targetWeeds: 'Control residual ultra-extendido de gramíneas y hojas anchas',
        stage: 'Huertos establecidos de más de 3 años, en receso o post-cosecha',
        notes: 'Baja solubilidad que garantiza que el herbicida no lixivie hacia la zona radicular activa.'
      },
      {
        name: 'Glufosinato + MCPA Sal',
        activeIngredient: 'Glufosinato 15% + MCPA 10%',
        type: 'Contacto',
        standardDose: 2.5,
        unit: 'L/ha',
        targetWeeds: 'Malezas complejas de hoja ancha (Correhuela, Diente de león)',
        stage: 'Primavera temprana dirigida estrictamente al suelo',
        notes: 'Usar boquilla antideriva con presión baja de 1.8 a 2.2 bar.'
      }
    ]
  },
  {
    id: 'arandanos',
    name: 'Arándanos',
    scientificName: 'Vaccinium corymbosum',
    category: 'frutales_menores',
    description: 'Arbusto de raíz pilosa muy superficial y sin pelos radicales, cultivado casi exclusivamente sobre camellones altos con mulch de corteza o pino. El ATV 4x4 es el único equipo terrestre que no desmorona el camellón.',
    defaultWaterVolume: 100,
    applicationZone: 'Sobre hilera / Camellón',
    soilSensitivity: 'Suelos ácidos (pH 4.5 - 5.5). Prohibido el paso de tractores pesados cerca del camellón.',
    commonWeeds: ['Pasto pinito (Equisetum)', 'Trébol blanco', 'Ciperáceas', 'Gramíneas en el talud del camellón'],
    recommendedHerbicides: [
      {
        name: 'Flumioxazin 51% WDG',
        activeIngredient: 'Flumioxazin',
        type: 'Residual / Pre-emergente',
        standardDose: 0.12,
        unit: 'kg/ha',
        targetWeeds: 'Pre-emergencia en dormancia invernal',
        stage: 'Arándanos en receso invernal estricto antes de hinchazón de yemas',
        notes: 'Aplicar a ambos lados del camellón con barra adaptada de ATV.'
      },
      {
        name: 'Cletodim 24% EC',
        activeIngredient: 'Cletodim',
        type: 'Sistémico',
        standardDose: 0.8,
        unit: 'L/ha',
        targetWeeds: 'Gramíneas anuales y perennes en post-emergencia',
        stage: 'Gramíneas con 2 a 4 hojas',
        notes: 'Totalmente selectivo para arándanos. No daña el follaje ni la fruta.'
      }
    ]
  },
  {
    id: 'vina',
    name: 'Viña (Vides & Parrones)',
    scientificName: 'Vitis vinifera',
    category: 'vides',
    description: 'Viñedos de vinificación y uva de mesa en espalderas de marco estrecho (1.8 a 2.5 m). El ancho compacto del ATV 4x4 permite circular con agilidad sin rozar los sarmientos ni voltear postes esquineros.',
    defaultWaterVolume: 110,
    applicationZone: 'Sobre hilera / Camellón',
    soilSensitivity: 'Suelos pedregosos o francos en laderas de secano o riego tecnificado.',
    commonWeeds: ['Chépica', 'Correhuela', 'Malva común', 'Cicutilla', 'Pasto Bermuda'],
    recommendedHerbicides: [
      {
        name: 'Glufosinato de Amonio 20% SL',
        activeIngredient: 'Glufosinato de Amonio',
        type: 'Contacto',
        standardDose: 2.0,
        unit: 'L/ha',
        targetWeeds: 'Desyerbe de bajo hilera y deschuponado químico de la base del tronco',
        stage: 'Brotación temprana hasta envero',
        notes: 'Herbicida de elección en viticultura de precisión.'
      },
      {
        name: 'Oxifluorfen + Glifosato (Dirigido)',
        activeIngredient: 'Oxifluorfen 24% + Glifosato 48%',
        type: 'Residual / Pre-emergente',
        standardDose: 1.8,
        unit: 'L/ha',
        targetWeeds: 'Control combinado residual y de malezas emergidas',
        stage: 'Post-poda en invierno con sarmientos lignificados',
        notes: 'Creación de banda limpia de 80 cm bajo los alambres de la espaldera.'
      }
    ]
  }
];

export const TERRAINS: TerrainTopography[] = [
  {
    id: 'suelo_plano',
    name: 'Suelo Plano',
    description: 'Huerto frutal sin caballones, terreno nivelado. Permite tránsito regular del ATV a velocidad constante de 8 a 12 km/h con barra a altura uniforme.',
    speedAdjustmentFactor: 1.0,
    boomHeightAdvice: 'Altura de barra recomendada: 45 a 50 cm sobre el suelo o maleza objetivo.'
  },
  {
    id: 'con_camellones',
    name: 'Con Camellones',
    description: 'Plantación sobre camellones elevados de drenaje (20 a 50 cm de altura). El ATV transita en el callejón mientras la barra pulveriza el lomo y taludes del camellón.',
    speedAdjustmentFactor: 0.8,
    boomHeightAdvice: 'Ajustar la barra a 40-45 cm por encima del lomo del camellón. Velocidad de 6 a 8 km/h para evitar balanceo y proteger mangueras de goteo.'
  }
];

export const EQUIPMENTS: ApplicationEquipment[] = [
  {
    id: 'atv_4x4_frutal',
    name: 'Cuatrimoto / ATV 4x4 Frutícola AgroServi',
    defaultTankVolume: 500,
    defaultBoomWidth: 1.5, // Franja tratada bajo hilera / camellón
    defaultSpeed: 8,
    speedRange: { min: 5, max: 12 },
    tankOptions: [300, 400, 500, 600],
    advantages: [
      'Ancho angosto (1.15 m) que circula sin tocar sarmientos ni ramas bajas',
      'Presión sobre suelo de solo 4.5 PSI (cero compactación del camellón)',
      'Barra telescópica regulable con campana protectora antideriva',
      'Bomba y manómetro patrón con estanque de 500 Litros'
    ]
  }
];

export const NOZZLES: SprayNozzle[] = [
  {
    id: 'iso_015_verde',
    isoCode: '015',
    colorName: 'Verde',
    colorHex: '#16a34a',
    nominalFlowAt3Bar: 0.60,
    dropletSpectrum: 'Fina',
    driftRisk: 'Alto',
    suitableForHerbicides: 'Herbicidas de contacto estricto (caldo abundante)'
  },
  {
    id: 'iso_02_amarillo',
    isoCode: '02',
    colorName: 'Amarillo',
    colorHex: '#ca8a04',
    nominalFlowAt3Bar: 0.80,
    dropletSpectrum: 'Media',
    driftRisk: 'Moderado',
    suitableForHerbicides: 'Contacto y sistémicos con buena cobertura'
  },
  {
    id: 'iso_025_lila',
    isoCode: '025',
    colorName: 'Lila / Púrpura',
    colorHex: '#9333ea',
    nominalFlowAt3Bar: 1.00,
    dropletSpectrum: 'Media a Gruesa',
    driftRisk: 'Bajo',
    suitableForHerbicides: 'Inducción de aire antideriva para huertos'
  },
  {
    id: 'iso_03_azul',
    isoCode: '03',
    colorName: 'Azul (Recomendada Frutales)',
    colorHex: '#2563eb',
    nominalFlowAt3Bar: 1.20,
    dropletSpectrum: 'Gruesa',
    driftRisk: 'Bajo',
    suitableForHerbicides: 'Herbicidas sistémicos y residuales bajo hilera'
  },
  {
    id: 'iso_04_rojo',
    isoCode: '04',
    colorName: 'Rojo (Antideriva Alta)',
    colorHex: '#dc2626',
    nominalFlowAt3Bar: 1.60,
    dropletSpectrum: 'Muy Gruesa',
    driftRisk: 'Muy Bajo',
    suitableForHerbicides: 'Gotas con aire para evitar deriva hacia brotes tiernos'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1_nogales',
    title: 'Nogales',
    category: 'Nogales',
    imageSrc: IMAGES.nogales,
    description: '',
    specs: {}
  },
  {
    id: 'g2_cerezos',
    title: 'Cerezos',
    category: 'Cerezos',
    imageSrc: IMAGES.cerezos,
    description: '',
    specs: {}
  },
  {
    id: 'g3_ciruelas',
    title: 'Ciruelas',
    category: 'Ciruelas',
    imageSrc: IMAGES.ciruelas,
    description: '',
    specs: {}
  },
  {
    id: 'g4_atv500',
    title: 'ATV con Estanque de 500 L',
    category: 'Equipamiento',
    imageSrc: IMAGES.atv500,
    description: '',
    specs: {}
  },
  {
    id: 'g5_viento',
    title: 'Medición de Viento',
    category: 'Calibración',
    imageSrc: IMAGES.viento,
    description: '',
    specs: {}
  },
  {
    id: 'g6_ph',
    title: 'Medición de pH',
    category: 'Calibración',
    imageSrc: IMAGES.ph,
    description: '',
    specs: {}
  }
];
