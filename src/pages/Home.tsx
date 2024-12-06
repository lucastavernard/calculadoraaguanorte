import React, { useState } from 'react';
import { Calculator } from '../components/Calculator';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function Home() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'bucket' | 'hydrometer'>('bucket');

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSave = async (calculation: any) => {
    // Here you would implement the save logic with your backend
    console.log('Saving calculation:', calculation);
  };

  return (
    <div className="space-y-8">
      <div className="sm:hidden">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as 'bucket' | 'hydrometer')}
          className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="bucket">Utilizando um Balde ou Barril</option>
          <option value="hydrometer">Utilizando um Hidrômetro</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {[
            { id: 'bucket', name: 'Utilizando um Balde ou Barril' },
            { id: 'hydrometer', name: 'Utilizando um Hidrômetro' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'bucket' | 'hydrometer')}
              className={`${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              } rounded-md px-3 py-2 text-sm font-medium`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <Calculator type={activeTab} onSave={handleSave} />
    </div>
  );
}