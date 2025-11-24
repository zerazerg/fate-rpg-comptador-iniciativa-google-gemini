import React from 'react';
import { SituationDef, SituationType } from '../types';
import { SITUATIONS } from '../constants';

interface SituationSelectorProps {
  activeSituationId: SituationType;
  onSelect: (id: SituationType) => void;
}

export const SituationSelector: React.FC<SituationSelectorProps> = ({ activeSituationId, onSelect }) => {
  const activeSituationDescription = SITUATIONS.find(s => s.id === activeSituationId)?.description;

  return (
    <div className="mb-8">
      <label className="block text-xs uppercase font-bold text-slate-400 mb-2">
        Tipus de Conflicte
      </label>
      <div className="space-y-2">
        {SITUATIONS.map((sit) => (
          <button
            key={sit.id}
            onClick={() => onSelect(sit.id)}
            className={`
              w-full text-left p-3 rounded-lg text-sm border transition-all
              ${
                activeSituationId === sit.id
                  ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-100'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
              }
            `}
          >
            <div className="font-bold">{sit.label}</div>
            <div className="text-xs opacity-70 mt-1">
              Habilitat: <span className="font-semibold text-emerald-400">{sit.skillName}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 p-3 bg-slate-800/50 rounded text-xs text-slate-400 italic border border-slate-800">
         <span className="font-bold not-italic text-slate-300">Regla:</span> {activeSituationDescription}
      </div>
    </div>
  );
};