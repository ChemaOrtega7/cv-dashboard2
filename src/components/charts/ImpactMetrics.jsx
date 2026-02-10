import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { translations } from '../../data/translations';

const CustomTooltip = ({ active, payload, language = 'en' }) => {
  const t = translations[language];
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-lg">
        <p className="text-cyan-400 font-semibold mb-2">{payload[0].payload.metric}</p>
        <p className="text-emerald-400 text-sm">{t.analytics.achieved}: {payload[0].value}%</p>
        <p className="text-slate-400 text-sm">{t.analytics.target}: {payload[1]?.value || payload[0].payload.target}%</p>
      </div>
    );
  }
  return null;
};

const ImpactMetrics = ({ data, language = 'en' }) => {
  const t = translations[language];
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis type="number" stroke="#94a3b8" style={{ fontSize: '12px' }} />
        <YAxis 
          type="category" 
          dataKey="metric" 
          stroke="#94a3b8" 
          width={180}
          style={{ fontSize: '11px' }}
        />
        <Tooltip content={(props) => <CustomTooltip {...props} language={language} />} />
        <Legend 
          wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }}
          iconType="square"
        />
        <Bar dataKey="value" fill="#10b981" name={`${t.analytics.achieved} (%)`} radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.value >= entry.target ? "#10b981" : "#06b6d4"} />
          ))}
        </Bar>
        <Bar dataKey="target" fill="#475569" name={`${t.analytics.target} (%)`} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ImpactMetrics;
