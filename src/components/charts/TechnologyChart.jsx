import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { translations } from '../../data/translations';

const CustomTooltip = ({ active, payload, language = 'en' }) => {
  const t = translations[language];
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-lg">
        <p className="text-cyan-400 font-semibold">{payload[0].payload.technology}</p>
        <p className="text-emerald-400 text-sm">{t.charts.years}: {payload[0].value}</p>
        <p className="text-purple-400 text-sm">{t.analytics.projects}: {payload[1]?.value || payload[0].payload.projects}</p>
      </div>
    );
  }
  return null;
};

const TechnologyChart = ({ data, language = 'en' }) => {
  const t = translations[language];
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis 
          dataKey="technology" 
          stroke="#94a3b8"
          angle={-45}
          textAnchor="end"
          height={80}
          style={{ fontSize: '11px' }}
        />
        <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
        <Tooltip content={(props) => <CustomTooltip {...props} language={language} />} />
        <Legend 
          wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }}
          iconType="square"
        />
        <Bar dataKey="years" fill="#06b6d4" name={t.analytics.yearsOfExperience} radius={[4, 4, 0, 0]} />
        <Bar dataKey="projects" fill="#8b5cf6" name={t.analytics.projects} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TechnologyChart;
