import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  ReferenceLine 
} from 'recharts';

export const ShapBarPlot = ({ shapData }) => {
  if (!shapData || shapData.length === 0) return null;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isPositive = data.value >= 0;
      return (
        <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs">
          <div className="font-bold text-white mb-1">{data.feature}</div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">SHAP Value:</span>
            <span className={`font-mono font-bold ${isPositive ? 'text-red-400' : 'text-emerald-400'}`}>
              {isPositive ? `+${data.value}` : data.value}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Impact: <span className="text-slate-200">{data.importance}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 bg-slate-950/60 rounded-xl border border-slate-800 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-300">
          SHAP Shapley Values (Feature Attributions)
        </span>
        <span className="text-[10px] font-mono text-slate-400">
          +Red: Drives Damaged | -Green: Drives Intact
        </span>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={shapData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <XAxis 
            type="number" 
            domain={[-0.6, 0.6]} 
            stroke="#64748b" 
            fontSize={10} 
            tickFormatter={(v) => `${v > 0 ? '+' : ''}${v}`}
          />
          <YAxis 
            type="category" 
            dataKey="feature" 
            stroke="#94a3b8" 
            fontSize={11} 
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={0} stroke="#475569" strokeWidth={1.5} />
          <Bar dataKey="value" radius={[4, 4, 4, 4]}>
            {shapData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.value >= 0 ? '#ef4444' : '#10b981'} 
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
