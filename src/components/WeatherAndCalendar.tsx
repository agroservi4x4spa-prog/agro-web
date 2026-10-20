import React, { useState } from 'react';
import { CloudSun, Calendar, Sparkles } from 'lucide-react';
import { WeatherWidget } from './WeatherWidget';
import { AgriCalendar } from './AgriCalendar';

export const WeatherAndCalendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weather' | 'calendar'>('weather');

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden flex flex-col">
      {/* Top Segmented Navigation Tabs */}
      <div className="bg-stone-50 p-2 border-b border-stone-200 flex items-center justify-between gap-2">
        <div className="grid grid-cols-2 gap-1.5 w-full">
          <button
            type="button"
            onClick={() => setActiveTab('weather')}
            className={`py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'weather'
                ? 'bg-white text-[#182635] shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <CloudSun className={`w-4 h-4 ${activeTab === 'weather' ? 'text-amber-500' : 'text-stone-400'}`} />
            <span>El Tiempo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-white text-[#182635] shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Calendar className={`w-4 h-4 ${activeTab === 'calendar' ? 'text-emerald-700' : 'text-stone-400'}`} />
            <span>Calendario</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5 sm:p-6 flex-grow">
        {activeTab === 'weather' ? (
          <WeatherWidget />
        ) : (
          <AgriCalendar />
        )}
      </div>

      {/* Bottom Sub-bar */}
      <div className="px-5 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-stone-700">Ñuble · Chillán</span>
        </span>
        <button
          onClick={() => setActiveTab(prev => prev === 'weather' ? 'calendar' : 'weather')}
          className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline cursor-pointer"
        >
          {activeTab === 'weather' ? 'Ver Calendario de Labores →' : 'Ver Clima en Ñuble →'}
        </button>
      </div>
    </div>
  );
};
