import React from 'react';
import { SKILL_LADDER } from '../constants';

interface SkillLadderProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const SkillLadder: React.FC<SkillLadderProps> = ({ isVisible, onToggle }) => {
  return (
    <>
      <button 
         onClick={onToggle}
         className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 rounded text-sm text-slate-300 border border-slate-700 mb-4"
      >
        {isVisible ? 'Amagar Escala' : 'Veure Escala de Valors'}
      </button>

      {isVisible && (
         <div className="border border-slate-700 rounded overflow-hidden text-xs">
            <table className="w-full text-left bg-slate-900">
                <thead className="bg-slate-800 text-slate-400">
                    <tr>
                        <th className="p-2">Val</th>
                        <th className="p-2">Qualitat</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {[...SKILL_LADDER].reverse().map(l => (
                        <tr key={l.value}>
                            <td className="p-1 px-2 font-mono text-slate-500">{l.value > 0 ? `+${l.value}` : l.value}</td>
                            <td className="p-1 px-2 text-slate-300">{l.quality}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      )}
    </>
  );
};