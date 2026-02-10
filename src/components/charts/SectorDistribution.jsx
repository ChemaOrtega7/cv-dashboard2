import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { translations } from '../../data/translations';
import { getText } from '../../utils/languageHelpers';

const CustomTooltip = ({ active, payload, language = 'en' }) => {
  const t = translations[language];
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-lg">
        <p className="text-cyan-400 font-semibold">{payload[0].payload.displayName}</p>
        <p className="text-slate-300 text-sm">{payload[0].value} {t.charts.years}</p>
        <p className="text-slate-400 text-xs">{((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

const SectorDistribution = ({ data, language = 'en' }) => {
  const total = data.reduce((sum, item) => sum + item.years, 0);
  const dataWithTotal = data.map(item => ({ 
    ...item, 
    total,
    displayName: getText(item.sector, language)
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={dataWithTotal}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="years"
          label={({ displayName, percent }) => `${displayName} ${(percent * 100).toFixed(0)}%`}
        >
          {dataWithTotal.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={(props) => <CustomTooltip {...props} language={language} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SectorDistribution;
