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

  // Custom label inside pie slices
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, displayName }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        style={{ fontSize: '10px', fontWeight: 'bold' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dataWithTotal}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          innerRadius={0}
          fill="#8884d8"
          dataKey="years"
          label={renderLabel}
        >
          {dataWithTotal.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={(props) => <CustomTooltip {...props} language={language} />} />
        <Legend 
          wrapperStyle={{ fontSize: '10px' }}
          formatter={(value, entry) => entry.payload.displayName}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SectorDistribution;
