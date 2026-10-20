import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Plus, 
  CheckCircle, 
  Sprout, 
  Send, 
  X,
  CalendarCheck
} from 'lucide-react';

interface SprayTask {
  id: string;
  dateStr: string; // YYYY-MM-DD
  crop: string;
  labor: string;
  productType: string;
  status: 'programada' | 'completada' | 'en_curso';
  notes?: string;
}

const DEFAULT_TASKS: SprayTask[] = [
  {
    id: 't1',
    dateStr: '2026-10-15',
    crop: 'Nogales',
    labor: 'Control de malezas en sobre hilera',
    productType: 'Herbicida Residual + Sistémico',
    status: 'completada',
    notes: 'Aplicado con barra lateral cuatrimoto 4x4. Estanque 500 L.'
  },
  {
    id: 't2',
    dateStr: '2026-10-21',
    crop: 'Cerezos',
    labor: 'Pulverización bajo línea de goteo en camellón',
    productType: 'Contacto (Glufosinato de amonio)',
    status: 'en_curso',
    notes: 'Preservación estricta de mangueras de riego. Cero compactación.'
  },
  {
    id: 't3',
    dateStr: '2026-10-24',
    crop: 'Ciruelos',
    labor: 'Limpieza de franja y control de malezas perennes',
    productType: 'Pre-emergente + Glifosato',
    status: 'programada',
    notes: 'Turno matinal con viento calmo < 8 km/h.'
  },
  {
    id: 't4',
    dateStr: '2026-10-28',
    crop: 'Avellano Europeo',
    labor: 'Control químico de retoños y malezas en callejón',
    productType: 'Herbicida selectivo frutal',
    status: 'programada',
    notes: 'Preparación de suelo previa a cosecha mecánica.'
  },
  {
    id: 't5',
    dateStr: '2026-11-04',
    crop: 'Viña / Viñedo',
    labor: 'Aplicación dirigida bajo espaldera',
    productType: 'Residual suelo húmedo',
    status: 'programada',
    notes: 'Trocha angosta de 1.15 m para transitar sin rozar sarmientos.'
  }
];

export const AgriCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 9, 21)); // October 2026 default
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-10-21');
  const [tasks, setTasks] = useState<SprayTask[]>(DEFAULT_TASKS);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);

  // New task form state
  const [formCrop, setFormCrop] = useState<string>('Nogales');
  const [formLabor, setFormLabor] = useState<string>('Control sobre hilera con cuatrimoto ATV');
  const [formArea, setFormArea] = useState<string>('15');
  const [formFarmer, setFormFarmer] = useState<string>('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Calculate calendar grid days
  const firstDayOfMonth = new Date(year, month, 1);
  // getDay: 0 is Sun, 1 is Mon... convert to Monday-first (0 is Mon, 6 is Sun)
  const startingDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  // Empty slots for previous month
  for (let i = 0; i < startingDayIndex; i++) {
    calendarDays.push(null);
  }
  // Days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    calendarDays.push({
      dayNumber: day,
      dateStr: dStr,
      tasks: tasks.filter(t => t.dateStr === dStr)
    });
  }

  const selectedDayTasks = tasks.filter(t => t.dateStr === selectedDateStr);

  const handleDayClick = (dStr: string) => {
    setSelectedDateStr(dStr);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: SprayTask = {
      id: 'task_' + Date.now(),
      dateStr: selectedDateStr,
      crop: formCrop,
      labor: formLabor,
      productType: `Área: ${formArea} ha · Productor: ${formFarmer || 'Particular'}`,
      status: 'programada',
      notes: 'Solicitud agendada con AgroServi 4x4 SpA'
    };

    setTasks(prev => [...prev, newTask]);
    setIsScheduleModalOpen(false);

    // Generate WhatsApp reservation text
    const textMsg = `Hola AgroServi 4x4 SpA, deseo agendar servicio de pulverización con ATV para el día ${selectedDateStr}. Cultivo: ${formCrop}. Labor: ${formLabor}. Superficie aproximada: ${formArea} ha. Contacto: ${formFarmer || 'Productor'}.`;
    const whatsappUrl = `https://wa.me/56954701013?text=${encodeURIComponent(textMsg)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Format date readable
  const formatReadableDate = (dStr: string) => {
    const parts = dStr.split('-');
    if (parts.length !== 3) return dStr;
    const y = parseInt(parts[0]);
    const m = parseInt(parts[1]) - 1;
    const d = parseInt(parts[2]);
    const dateObj = new Date(y, m, d);
    const dayNamesFull = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return `${dayNamesFull[dateObj.getDay()]}, ${d} de ${monthNames[m]} ${y}`;
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold">
            <CalendarCheck className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs font-black text-[#182635] uppercase tracking-wider block">
              Calendario de Labores
            </span>
            <span className="text-[10px] text-stone-500 font-semibold block">
              Programación de Aplicaciones con ATV en Ñuble
            </span>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-0.5 border border-stone-200">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded hover:bg-white text-stone-700 transition-colors cursor-pointer"
            title="Mes anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-bold text-stone-800 px-2 min-w-[95px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded hover:bg-white text-stone-700 transition-colors cursor-pointer"
            title="Mes siguiente"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-stone-50/90 rounded-xl p-3 border border-stone-200">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {daysOfWeek.map((d, idx) => (
            <span key={idx} className="text-[10px] font-black text-stone-400 uppercase py-0.5">
              {d}
            </span>
          ))}
        </div>

        {/* Days numbers */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarDays.map((cell, idx) => {
            if (!cell) {
              return <div key={`empty_${idx}`} className="h-8" />;
            }

            const isSelected = cell.dateStr === selectedDateStr;
            const hasTask = cell.tasks.length > 0;

            return (
              <button
                key={cell.dateStr}
                onClick={() => handleDayClick(cell.dateStr)}
                className={`relative h-8 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#182635] text-white shadow-xs font-black ring-2 ring-emerald-500/50'
                    : hasTask
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
                    : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                <span>{cell.dayNumber}</span>
                {hasTask && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                    isSelected ? 'bg-emerald-400' : 'bg-emerald-600'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details Card */}
      <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#182635]">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-700" />
            <span>{formatReadableDate(selectedDateStr)}</span>
          </div>

          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Agendar</span>
          </button>
        </div>

        {/* Tasks list for selected day */}
        {selectedDayTasks.length > 0 ? (
          <div className="space-y-2">
            {selectedDayTasks.map(t => (
              <div 
                key={t.id}
                className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-stone-900 flex items-center gap-1.5">
                    <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.crop}</span>
                  </span>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    t.status === 'completada' 
                      ? 'bg-stone-200 text-stone-700' 
                      : t.status === 'en_curso'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {t.status === 'completada' ? 'Completada' : t.status === 'en_curso' ? 'En Curso' : 'Programada'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-700 font-medium">
                  {t.labor}
                </p>
                <p className="text-[10px] text-stone-500 font-semibold">
                  {t.productType}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-3 px-3 rounded-lg bg-stone-50 border border-dashed border-stone-200 text-center">
            <span className="text-[11px] text-stone-500 block font-medium">
              No hay labores registradas para este día.
            </span>
            <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
              Disponible para coordinar aplicación con cuatrimoto ATV.
            </span>
          </div>
        )}
      </div>

      {/* Modal para Agendar Aplicación */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#182635] uppercase">
                    Agendar Aplicación de Herbicida
                  </h3>
                  <span className="text-[11px] text-stone-500 font-medium block">
                    Fecha: {formatReadableDate(selectedDateStr)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Cultivo / Huerto
                </label>
                <select
                  value={formCrop}
                  onChange={(e) => setFormCrop(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Nogales">Nogales</option>
                  <option value="Cerezos">Cerezos</option>
                  <option value="Ciruelos">Ciruelos</option>
                  <option value="Avellano Europeo">Avellano Europeo</option>
                  <option value="Viña / Viñedo">Viña / Viñedo</option>
                  <option value="Arándanos">Arándanos</option>
                  <option value="Manzanos">Manzanos</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Labor Requerida
                </label>
                <input
                  type="text"
                  value={formLabor}
                  onChange={(e) => setFormLabor(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 font-medium focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ej: Control de malezas sobre hilera con cuatrimoto"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                    Superficie (ha)
                  </label>
                  <input
                    type="number"
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-medium focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                    Nombre o Predio
                  </label>
                  <input
                    type="text"
                    value={formFarmer}
                    onChange={(e) => setFormFarmer(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-medium focus:ring-2 focus:ring-emerald-500"
                    placeholder="Ej: Fundo Los Cerezos"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 leading-snug">
                <strong>Servicio AgroServi 4x4 SpA:</strong> Cuatrimoto de 4.5 PSI, estanque de 500 L y calibración certificada. Se enviará la solicitud por WhatsApp (+56 9 5470 1013) para confirmación inmediata.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirmar & Enviar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
