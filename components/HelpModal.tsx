import React from 'react';

interface HelpModalProps {
  onClose: () => void;
}

const EXAMPLE_JSON = [
    {
        "name": "Guerrer Èlfic",
        "isNPC": false,
        "skills": {
            "Reflexos": 4,
            "Percepció": 2,
            "Empatia": 1,
            "Persuasió": 0,
            "Provocació": 0
        }
    },
    {
        "name": "Goblin Furtiu",
        "isNPC": true,
        "skills": {
            "Reflexos": 2,
            "Percepció": 3,
            "Empatia": -1,
            "Persuasió": -2,
            "Provocació": 1
        }
    }
];

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-slate-800">
                <h3 className="text-xl font-bold text-white">Ajuda & Instruccions</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div className="p-6 space-y-6 text-slate-300">
                <section>
                    <h4 className="text-emerald-400 font-bold mb-2">Funcionament Bàsic</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>Tipus de Conflicte:</strong> Selecciona a l'esquerra el tipus de situació (Físic, Social, etc.). Això canvia automàticament quina habilitat es fa servir per calcular el valor base.</li>
                        <li><strong>Personatges:</strong> Afegeix Aliats o Enemics. Pots editar el seu nom fent clic a sobre.</li>
                        <li><strong>Habilitats:</strong> Fes clic a "Editar Fitxa" a cada targeta per definir els valors base de Reflexos, Percepció, etc.</li>
                        <li><strong>Boost:</strong> Utilitza els botons +/- per donar modificadors temporals (aspectes invocats, avantatges) que se sumen al valor base.</li>
                        <li><strong>Ordre Manual:</strong> Per comoditat a l'hora d'editar, la llista <strong>NO s'ordena sola</strong>. Si modifiques valors i l'ordre queda obsolet, el botó "REORDENAR" (a dalt) es posarà de color taronja. Prem-lo per actualitzar les posicions.</li>
                        <li><strong>Empats:</strong> Si hi ha un empat en el valor total, tots els personatges empatats s'activen simultàniament quan és el seu torn.</li>
                        <li><strong>Importar/Exportar:</strong> Pots descarregar la llista actual (Exportar) en un fitxer JSON i carregar-la més tard (Importar).</li>
                    </ul>
                </section>

                <section>
                    <h4 className="text-emerald-400 font-bold mb-2">Format d'Importació JSON</h4>
                    <p className="text-sm mb-3">Pots carregar una llista de personatges amb un fitxer <code>.json</code> amb el següent format (array d'objectes):</p>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 overflow-x-auto relative group">
                        <pre className="text-xs font-mono text-emerald-300">
{JSON.stringify(EXAMPLE_JSON, null, 2)}
                        </pre>
                        <button 
                            onClick={() => navigator.clipboard.writeText(JSON.stringify(EXAMPLE_JSON, null, 2))}
                            className="absolute top-2 right-2 p-1 bg-slate-800 text-slate-400 rounded hover:text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        >
                            Copiar
                        </button>
                    </div>
                </section>
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
                <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-sm transition-colors"
                >
                    Tancar
                </button>
            </div>
        </div>
    </div>
  );
};