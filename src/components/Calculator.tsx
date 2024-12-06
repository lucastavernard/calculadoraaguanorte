import React, { useState } from 'react';

interface CalculatorProps {
  type: 'bucket' | 'hydrometer';
}

export function Calculator({ type }: CalculatorProps) {
  const [volume, setVolume] = useState(1);
  const [scale, setScale] = useState<'0.1' | '0.01' | '0.001'>('0.01');
  const [time1, setTime1] = useState(1);
  const [time2, setTime2] = useState(1);
  const [time3, setTime3] = useState(1);

  const calculateFlowRates = () => {
    // Calcula a média dos tempos
    const averageTime = (time1 + time2 + time3) / 3;

    let flowRateLS = 0;
    if (type === 'bucket') {
      flowRateLS = volume / averageTime;
    } else {
      const multiplier = scale === '0.1' ? 10 : scale === '0.01' ? 100 : 1000;
      flowRateLS = multiplier / averageTime;
    }

    const flowRateLH = flowRateLS * 3600;
    const flowRateMH = flowRateLH / 1000;

    return { flowRateLS, flowRateLH, flowRateMH };
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
      <div className="space-y-6">
        {type === 'bucket' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Volume do Balde (L)</label>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              step="0.01"
              min="0"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Escala</label>
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value as '0.1' | '0.01' | '0.001')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="0.1">x0.1</option>
              <option value="0.01">x0.01</option>
              <option value="0.001">x0.001</option>
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[ 
            { label: 'Tempo 1 (s)', value: time1, setter: setTime1 },
            { label: 'Tempo 2 (s)', value: time2, setter: setTime2 },
            { label: 'Tempo 3 (s)', value: time3, setter: setTime3 },
          ].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
              <input
                type="number"
                value={field.value}
                onChange={(e) => field.setter(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                step="0.01"
                min="0"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {Object.entries(calculateFlowRates()).map(([key, value], index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {key === 'flowRateLS' ? 'Vazão (L/s)' : 
                 key === 'flowRateLH' ? 'Vazão (L/h)' : 
                 'Vazão (m³/h)'}
              </label>
              <p className="text-2xl font-bold text-blue-900">{value.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
