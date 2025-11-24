import React, { useState } from 'react';
import { Character, SkillLevel } from '../types';
import { SKILL_LADDER, RELEVANT_SKILLS } from '../constants';

interface InitiativeCardProps {
  character: Character;
  isActive: boolean;
  onUpdate: (id: string, updates: Partial<Character>) => void;
  onRemove: (id: string) => void;
  activeBaseValue: number;
  activeSkillName: string;
}

const getAdjective = (val: number): string => {
  const found = SKILL_LADDER.find((s) => s.value === val);
  if (found) return `${found.quality} (${val > 0 ? '+' : ''}${val})`;
  if (val > 8) return `Més enllà de Llegendari (${val})`;
  if (val < -4) return `Horrorós (${val})`;
  return `${val}`;
};

export const InitiativeCard: React.FC<InitiativeCardProps> = ({
  character,
  isActive,
  onUpdate,
  onRemove,
  activeBaseValue,
  activeSkillName
}) => {
  const total = activeBaseValue + character.boost;
  const { isNPC } = character;
  const [isEditingSkills, setIsEditingSkills] = useState(false);

  const handleSkillChange = (skill: string, valueStr: string) => {
    const val = parseInt(valueStr) || 0;
    onUpdate(character.id, {
        skills: {
            ...character.skills,
            [skill]: val
        }
    });
  };

  return (
    <div
      className={`
        relative flex flex-col p-4 mb-3 rounded-lg border-l-4 shadow-md transition-all duration-300
        ${
          isActive
            ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500/30 z-10 scale-[1.02]'
            : `bg-slate-800/40 hover:bg-slate-800/80 ${isNPC ? 'border-rose-600/60 bg-rose-900/5' : 'border-sky-600/60 bg-sky-900/5'}`
        }
      `}
    >
      {/* Active Indicator Label */}
      {isActive && (
        <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm shadow-black/50 uppercase tracking-wider z-20">
          Torn Actiu
        </div>
      )}

      {/* Main Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          
        {/* Name and Basic Info */}
        <div className="flex-1 min-w-0 mr-4 w-full md:w-auto mb-3 md:mb-0">
            <div className="flex items-center gap-3">
            {/* Icon based on Type */}
            <div className={`
                flex items-center justify-center w-8 h-8 rounded-full shrink-0 border
                ${isNPC ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-sky-500/10 border-sky-500/20 text-sky-400'}
            `}>
                {isNPC ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                )}
            </div>

            <input
                type="text"
                value={character.name}
                onChange={(e) => onUpdate(character.id, { name: e.target.value })}
                className={`
                bg-transparent border-b border-transparent hover:border-slate-500 focus:border-emerald-500 
                focus:outline-none text-lg font-bold truncate w-full transition-colors
                ${isNPC ? 'text-rose-200' : 'text-sky-100'}
                `}
            />
            </div>
            <div className="text-sm text-slate-400 mt-1 ml-11 flex items-center flex-wrap gap-2">
            <span className={`
                px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
                ${isNPC 
                    ? 'bg-rose-950/30 text-rose-400 border-rose-900/30' 
                    : 'bg-sky-950/30 text-sky-400 border-sky-900/30'}
            `}>
                {isNPC ? 'Enemic' : 'Aliat'}
            </span>
            <span className={`font-medium ${isNPC ? 'text-rose-400/70' : 'text-sky-400/70'}`}>
                {getAdjective(total)}
            </span>
            <span className="text-slate-600 text-xs">|</span>
            <button 
                onClick={() => setIsEditingSkills(!isEditingSkills)}
                className="text-xs text-slate-500 hover:text-white underline decoration-slate-600 underline-offset-2 flex items-center gap-1"
            >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                {isEditingSkills ? 'Tancar Fitxa' : 'Editar Fitxa'}
            </button>
            </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            
            {/* Derived Base Value Display */}
            <div className="flex flex-col items-center">
                <label className="text-[10px] uppercase text-slate-500 font-bold mb-1" title={activeSkillName}>
                    {activeSkillName.split('/')[0].slice(0,4)}..
                </label>
                <div 
                    className="w-14 bg-slate-900/50 border border-slate-700/50 rounded px-2 py-1 text-center text-slate-400 select-none cursor-help"
                    title={`Valor base de ${activeSkillName}`}
                >
                    {activeBaseValue}
                </div>
            </div>

            {/* Boost Controls */}
            <div className="flex flex-col items-center">
            <label className="text-[10px] uppercase text-amber-500 font-bold mb-1">Boost</label>
            <div className="flex items-center gap-1">
                <button
                onClick={() => onUpdate(character.id, { boost: character.boost - 1 })}
                className="w-8 h-8 flex items-center justify-center bg-slate-900 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors border border-slate-700"
                >
                -
                </button>
                <div className={`
                w-8 text-center font-bold text-lg
                ${character.boost > 0 ? 'text-amber-400' : ''}
                ${character.boost < 0 ? 'text-red-400' : ''}
                ${character.boost === 0 ? 'text-slate-500' : ''}
                `}>
                {character.boost > 0 ? '+' : ''}{character.boost}
                </div>
                <button
                onClick={() => onUpdate(character.id, { boost: character.boost + 1 })}
                className="w-8 h-8 flex items-center justify-center bg-slate-900 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors border border-slate-700"
                >
                +
                </button>
            </div>
            </div>

            {/* Total Display (Big Number) */}
            <div className="flex flex-col items-center ml-2 min-w-[3rem]">
            <label className="text-[10px] uppercase text-slate-500 font-bold mb-1">Total</label>
            <span className={`text-3xl font-black ${isNPC ? 'text-rose-100' : 'text-sky-100'}`}>{total}</span>
            </div>

            {/* Delete Button */}
            <button
            onClick={() => onRemove(character.id)}
            className="ml-2 p-2 text-slate-600 hover:text-rose-500 transition-colors rounded hover:bg-slate-800"
            title="Eliminar personatge"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            </button>
        </div>
      </div>

      {/* Skills Editor Drawer */}
      {isEditingSkills && (
          <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
             {RELEVANT_SKILLS.map(skill => (
                 <div key={skill} className="flex flex-col">
                     <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 truncate" title={skill}>{skill}</label>
                     <input 
                        type="number"
                        value={character.skills[skill] || 0}
                        onChange={(e) => handleSkillChange(skill, e.target.value)}
                        className={`
                            bg-slate-900/50 border rounded px-2 py-1 text-sm text-center
                            focus:outline-none focus:border-indigo-500
                            ${activeSkillName.includes(skill) 
                                ? 'border-emerald-500/50 text-emerald-100 bg-emerald-900/10' 
                                : 'border-slate-700 text-slate-300'}
                        `}
                     />
                 </div>
             ))}
          </div>
      )}
    </div>
  );
};