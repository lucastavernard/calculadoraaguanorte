import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
import logoAguaNorte from './logo_agua_norte-removebg-preview.png';

function App() {
  const [activeTab, setActiveTab] = useState<'bucket' | 'hydrometer'>('bucket');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          {/* Logo da aplicação */}
          <div className="flex justify-center mb-4">
            <img src={logoAguaNorte} alt="Logo Água Norte" className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Calculadora de Vazão</h1>
          <p className="text-lg text-gray-600">Calcule a vazão de água com precisão</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-1 mb-8">
            <nav className="grid grid-cols-2 gap-2" aria-label="Tabs">
              {[
                { id: 'bucket', name: 'Balde ou Barril' },
                { id: 'hydrometer', name: 'Hidrômetro' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'bucket' | 'hydrometer')}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  } rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <Calculator type={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default App;
