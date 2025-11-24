import React, { useRef } from 'react';

interface SidebarActionsProps {
  onAddCharacter: (isNPC: boolean) => void;
  onImportFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
}

export const SidebarActions: React.FC<SidebarActionsProps> = ({ onAddCharacter, onImportFile, onExport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 border-t border-slate-800 bg-slate-900 space-y-3">
        {/* Import/Export Actions */}
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onImportFile} 
            accept=".json"
            className="hidden"
        />
        <div className="grid grid-cols-2 gap-2">
            <button
                onClick={handleImportClick}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded font-medium text-sm transition-colors flex items-center justify-center gap-2"
                title="Importar JSON"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                Importar
            </button>
            <button
                onClick={onExport}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded font-medium text-sm transition-colors flex items-center justify-center gap-2"
                title="Exportar llista actual a JSON"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8v8m-4-4l4 4 4-4"></path></svg>
                Exportar
            </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <button
            onClick={() => onAddCharacter(false)}
            className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium transition-colors flex items-center justify-center gap-2 text-sm"
            >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Aliat
            </button>
            <button
            onClick={() => onAddCharacter(true)}
            className="w-full py-2 px-3 bg-rose-700 hover:bg-rose-600 text-white rounded font-medium transition-colors flex items-center justify-center gap-2 text-sm"
            >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Enemic
            </button>
        </div>
    </div>
  );
};