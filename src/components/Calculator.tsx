import React, { useState } from 'react';

interface CalculatorProps {
  type: 'bucket' | 'hydrometer';
}

export function Calculator({ type }: CalculatorProps) {
  const [volume, setVolume] = useState<string>('0'); // Começa com '0' para remover depois
  const [scale, setScale] = useState<number>(0.01); 
  const [time1, setTime1] = useState<string>('0'); // Começa com '0' para remover depois
  const [time2, setTime2] = useState<string>('0'); // Começa com '0' para remover depois
  const [time3, setTime3] = useState<string>('0'); // Começa com '0' para remover depois

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove o 0 inicial se o campo não for vazio
    if (value === '0') {
      setter('');
    } else {
      setter(value);
    }
  };

  const calculateFlowRates = () => {
    // Verifica se os campos estão vazios antes de calcular
    const time1Value = time1 ? Number(time1) : 0;
    const time2Value = time2 ? Number(time2) : 0;
    const time3Value = time3 ? Number(time3) : 0;
    const averageTime = (time1Value + time2Value + time3Value) / 3;

    let flowRateLS = 0;
    if (type === 'bucket') {
      const volumeValue = volume ? Number(volume) : 1; // Garante que o volume seja 1 se estiver vazio
      flowRateLS = volumeValue / averageTime;
    } else {
      const multiplier = scale === 0.1 ? 1000 :
                        scale === 0.01 ? 100 :
                        scale === 0.001 ? 10 :
                        scale === 0.0001 ? 1 : 1;
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
              onChange={handleInputChange(setVolume)}
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
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value={0.1}>x0.1</option>
              <option value={0.01}>x0.01</option>
              <option value={0.001}>x0.001</option>
              <option value={0.0001}>x0.0001</option>
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
                onChange={handleInputChange(field.setter)}
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
