import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { translations } from '../../data/translations';

const CustomTooltip = ({ active, payload, language = 'en' }) => {
  const t = translations[language];
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-lg">
        <p className="text-cyan-400 font-semibold">{payload[0].payload.year}</p>
        <p className="text-emerald-400 text-sm">{t.education.certifications}: {payload[0].value}</p>
        <p className="text-slate-300 text-xs">{payload[0].payload.name}</p>
      </div>
    );
  }
  return null;
};

const CertificationProgress = ({ data, language = 'en' }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
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
        />
        <Tooltip content={(props) => <CustomTooltip {...props} language={language} />} />
        <Line 
          type="monotone" 
          dataKey="count" 
          stroke="#10b981" 
          strokeWidth={3}
          dot={{ fill: '#10b981', r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CertificationProgress;
