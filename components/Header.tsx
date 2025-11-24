import React from 'react';
import { SituationDef } from '../types';

interface HeaderProps {
  activeSituation: SituationDef;
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onSort: () => void;
  isOutOfOrder?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
    activeSituation, 
    currentStep, 
    totalSteps, 
    onPrev, 
    onNext, 
    onSort,
    isOutOfOrder
}) => {
  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between px-6 z-20 shrink-0">
      <div className="flex items-center gap-4">
        <div>
            <h2 className="text-lg font-bold text-white hidden sm:block">Ordre d'Iniciativa</h2>
            <div className="text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold">{activeSituation.skillName}</span>
            </div>
        </div>
        
        <button
            onClick={onSort}
            className={`
                flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all border
                ${isOutOfOrder 
                    ? 'bg-amber-600 hover:bg-amber-500 border-amber-400 text-white animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                    : 'bg-sky-900/40 hover:bg-sky-800 border-sky-700/50 hover:border-sky-500 text-sky-200'
                }
            `}
            title="Reordenar la llista segons valors actuals"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
            Reordenar
            {isOutOfOrder && (
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
            )}
        </button>
      </div>

      <div className="flex items-center gap-2">
         <button
            onClick={onPrev}
            className="p-2 rounded hover:bg-slate-700 text-slate-400 transition-colors"
            title="Torn Anterior"
         >
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
         </button>
         
         <div className="bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700 text-sm font-mono text-emerald-400 whitespace-nowrap">
            TORN {totalSteps > 0 ? currentStep : 0} / {totalSteps}
         </div>

         <button
            onClick={onNext}
            className="p-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 transition-all transform active:scale-95"
            title="Següent Torn"
         >
            <span className="flex items-center gap-2">
               <span className="hidden sm:inline text-sm font-bold px-1">Següent</span>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
         </button>
      </div>
    </header>
  );
};