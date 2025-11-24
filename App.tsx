import React, { useState, useEffect } from 'react';
import { SITUATIONS, INITIAL_CHARACTERS, DEFAULT_SKILLS } from './constants';
import { Character, SituationType, SituationDef } from './types';
import { InitiativeCard } from './components/InitiativeCard';
import { HelpModal } from './components/HelpModal';
import { SituationSelector } from './components/SituationSelector';
import { SkillLadder } from './components/SkillLadder';
import { SidebarActions } from './components/SidebarActions';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const App: React.FC = () => {
  // State
  const [characters, setCharacters] = useState<Character[]>(INITIAL_CHARACTERS);
  const [activeSituationId, setActiveSituationId] = useState<SituationType>(SituationType.PHYSICAL);
  
  // Track active turn by Character ID, not index, so it persists through reorders
  const [activeCharId, setActiveCharId] = useState<string | null>(null);

  const [showLadder, setShowLadder] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const activeSituation = SITUATIONS.find((s) => s.id === activeSituationId) || SITUATIONS[0];

  // Helper to get base value for current situation
  const getBaseValue = (char: Character, situation: SituationDef): number => {
    if (situation.id === SituationType.SOCIAL_IMPOSE) {
      // Special case: pick max
      return Math.max(char.skills['Persuasió'] || 0, char.skills['Provocació'] || 0);
    }
    return char.skills[situation.skillName] || 0;
  };

  // --- LOGIC FOR GROUPS & TURNS ---

  // 1. Calculate Total for everyone
  const charsWithTotals = characters.map(c => ({
      ...c,
      total: getBaseValue(c, activeSituation) + c.boost
  }));

  // 2. Identify the active total value
  const activeChar = charsWithTotals.find(c => c.id === activeCharId);
  const currentTurnTotal = activeChar ? activeChar.total : null;

  // 3. Get unique totals sorted descending (The "Steps" of initiative)
  const uniqueTotals = Array.from(new Set(charsWithTotals.map(c => c.total)))
      .sort((a: number, b: number) => b - a);
  
  // 4. Determine current step index (1-based)
  const currentStep = currentTurnTotal !== null ? uniqueTotals.indexOf(currentTurnTotal) + 1 : 0;
  const totalSteps = uniqueTotals.length;

  // Initialize turn if nobody is active but characters exist
  useEffect(() => {
    if (activeCharId === null && characters.length > 0) {
        setActiveCharId(characters[0].id);
    }
  }, []); 

  // Sorting Logic Function (Isolated for reuse)
  const sortCharactersLogic = (list: Character[]) => {
    return [...list].sort((a, b) => {
        const baseA = getBaseValue(a, activeSituation);
        const baseB = getBaseValue(b, activeSituation);
        const totalA = baseA + a.boost;
        const totalB = baseB + b.boost;

        if (totalA === totalB) {
          // Tie breaker logic: Base value first, then Name
          if (baseA !== baseB) return baseB - baseA;
          return a.name.localeCompare(b.name);
        }
        return totalB - totalA;
    });
  };

  // Check if current list is visually "out of sync" with ideal sort order
  const isOutOfOrder = (() => {
      if (characters.length < 2) return false;
      const idealSort = sortCharactersLogic(characters);
      // If any ID is in a different position, it's out of order
      return characters.some((char, index) => char.id !== idealSort[index].id);
  })();

  const handleSortInitiative = () => {
    setCharacters((prev) => sortCharactersLogic(prev));
  };

  // Handlers
  const handleUpdateCharacter = (id: string, updates: Partial<Character>) => {
    setCharacters((prev) =>
      prev.map((char) => (char.id === id ? { ...char, ...updates } : char))
    );
  };

  const handleAddCharacter = (isNPC: boolean) => {
    const newChar: Character = {
      id: generateId(),
      name: isNPC ? 'Nou Enemic' : 'Nou Personatge',
      skills: { ...DEFAULT_SKILLS },
      boost: 0,
      isNPC,
    };
    setCharacters((prev) => [...prev, newChar]);
    // If it's the first character, set it as active
    if (characters.length === 0) {
        setActiveCharId(newChar.id);
    }
  };

  const handleRemoveCharacter = (id: string) => {
    // If we are removing the active character, try to move to the next one
    if (id === activeCharId) {
        const idx = characters.findIndex(c => c.id === id);
        const nextIdx = (idx + 1) % characters.length;
        
        if (characters.length === 1) {
            setActiveCharId(null);
        } else {
            const nextChar = characters[nextIdx === idx ? 0 : nextIdx]; // Fallback
            if (nextChar && nextChar.id !== id) setActiveCharId(nextChar.id);
            else setActiveCharId(null);
        }
    }
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  };

  // Turn Navigation (Jumps by Group/Total Value)
  const handleNextTurn = () => {
    if (uniqueTotals.length === 0) return;
    
    // Find current index in the unique totals list
    const currentTotalIdx = currentTurnTotal !== null ? uniqueTotals.indexOf(currentTurnTotal) : -1;
    
    // Calculate next index (looping)
    const nextTotalIdx = (currentTotalIdx + 1) % uniqueTotals.length;
    const nextTotalValue = uniqueTotals[nextTotalIdx];

    // Find the first character that matches this new total
    const nextChar = charsWithTotals.find(c => c.total === nextTotalValue);
    if (nextChar) setActiveCharId(nextChar.id);
  };
  
  const handlePrevTurn = () => {
    if (uniqueTotals.length === 0) return;

    const currentTotalIdx = currentTurnTotal !== null ? uniqueTotals.indexOf(currentTurnTotal) : -1;
    
    // Calculate prev index (looping backwards)
    const prevTotalIdx = (currentTotalIdx - 1 + uniqueTotals.length) % uniqueTotals.length;
    const prevTotalValue = uniqueTotals[prevTotalIdx];

    const prevChar = charsWithTotals.find(c => c.total === prevTotalValue);
    if (prevChar) setActiveCharId(prevChar.id);
  };

  const handleExportClick = () => {
    const exportData = characters.map(c => ({
        name: c.name,
        isNPC: c.isNPC,
        skills: c.skills
    }));

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fate_conflict_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result !== 'string') return;
        
        const rawData = JSON.parse(result);
        const items = Array.isArray(rawData) ? rawData : [rawData];
        
        const importedChars: Character[] = [];
        const errors: string[] = [];

        items.forEach((item: any, idx: number) => {
            // Validation
            let name = item.name;
            if (typeof name !== 'string' || !name.trim()) {
                name = `Importat #${idx + 1}`;
                errors.push(`Personatge #${idx+1}: Nom invàlid.`);
            }

            let isNPC = item.isNPC;
            if (typeof isNPC !== 'boolean') isNPC = false;

            let skills = item.skills;
            const safeSkills = { ...DEFAULT_SKILLS };
            
            if (skills && typeof skills === 'object') {
                Object.keys(skills).forEach(key => {
                    const val = Number(skills[key]);
                    if (!isNaN(val)) safeSkills[key] = val;
                });
            }

            importedChars.push({
                id: generateId() + idx,
                name,
                skills: safeSkills,
                boost: 0,
                isNPC
            });
        });

        if (importedChars.length > 0) {
            setCharacters(prev => [...prev, ...importedChars]);
            if (errors.length > 0) alert(`Errors: ${errors.join('\n')}`);
            // If empty list previously, activate first new char
            if (characters.length === 0) setActiveCharId(importedChars[0].id);
        }

      } catch (err) {
        console.error(err);
        alert("Error: El fitxer no és un JSON vàlid.");
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-slate-950 text-slate-200 font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-80 flex-shrink-0 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-700 flex flex-col z-10">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span className="text-emerald-500">❖</span> FateRPG
            </h1>
            <p className="text-sm text-slate-500">Gestor de Conflictes</p>
          </div>
          <button 
            onClick={() => setShowHelp(true)}
            className="w-8 h-8 rounded-full border border-slate-600 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors font-bold"
            title="Ajuda"
          >
            ?
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <SituationSelector 
            activeSituationId={activeSituationId} 
            onSelect={setActiveSituationId} 
          />
          
          <SkillLadder 
            isVisible={showLadder} 
            onToggle={() => setShowLadder(!showLadder)} 
          />
        </div>

        <SidebarActions 
            onAddCharacter={handleAddCharacter}
            onImportFile={handleFileChange}
            onExport={handleExportClick}
        />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        <Header 
            activeSituation={activeSituation}
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNextTurn}
            onPrev={handlePrevTurn}
            onSort={handleSortInitiative}
            isOutOfOrder={isOutOfOrder}
        />

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 scroll-smooth">
          {characters.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="max-w-3xl mx-auto space-y-2">
              {characters.map((char) => {
                const baseVal = getBaseValue(char, activeSituation);
                const totalVal = baseVal + char.boost;
                // Active if total equals the current turn's total (handling ties)
                // Note: currentTurnTotal is based on the selected 'activeCharId'
                const isActive = currentTurnTotal !== null && totalVal === currentTurnTotal;

                return (
                    <InitiativeCard
                    key={char.id}
                    character={char}
                    isActive={isActive}
                    onUpdate={handleUpdateCharacter}
                    onRemove={handleRemoveCharacter}
                    activeBaseValue={baseVal}
                    activeSkillName={activeSituation.skillName}
                    />
                );
              })}
            </div>
          )}
        </div>
        
      </main>

      {/* Help Modal */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default App;