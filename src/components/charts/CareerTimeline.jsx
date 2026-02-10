import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { translations } from '../../data/translations';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-lg">
        <p className="text-cyan-400 font-semibold">{payload[0].payload.year}</p>
        <p className="text-slate-300 text-sm">{payload[0].payload.role}</p>
        <p className="text-slate-400 text-xs">{payload[0].payload.company}</p>
      </div>
    );
  }
  return null;
};

const CareerTimeline = ({ data, language = 'en' }) => {
  const t = translations[language];
  const levels = ['', t.charts.levels.entry, t.charts.levels.mid, t.charts.levels.senior, t.charts.levels.lead, t.charts.levels.expert];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis 
          dataKey="year" 
          stroke="#94a3b8"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#94a3b8"
          style={{ fontSize: '12px' }}
          domain={[0, 6]}
          ticks={[1, 2, 3, 4, 5]}
          tickFormatter={(value) => levels[value] || ''}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="level" 
          stroke="#06b6d4" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#colorLevel)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CareerTimeline;
