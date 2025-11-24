import { SkillLevel, SituationDef, SituationType, Character } from './types';

export const SKILL_LADDER: SkillLevel[] = [
  { value: -4, quality: 'Catastròfic/a', quantity: 'Ínfim/a' },
  { value: -3, quality: 'Nefast', quantity: 'Escàs/sa' },
  { value: -2, quality: 'Pèssim/a', quantity: 'Reduït/da' },
  { value: -1, quality: 'Dolent/a', quantity: 'Limitat/da' },
  { value: 0, quality: 'Adequat/da', quantity: 'Adequat/da' },
  { value: 1, quality: 'Decent', quantity: 'Decent' },
  { value: 2, quality: 'Bo/na', quantity: 'Bo/na' },
  { value: 3, quality: 'Gran', quantity: 'Gran' },
  { value: 4, quality: 'Enorme', quantity: 'Enorme' },
  { value: 5, quality: 'Excel·lent', quantity: 'Descomunal' },
  { value: 6, quality: 'Fantàstic/a', quantity: 'Desorbitat' },
  { value: 7, quality: 'Èpic/a', quantity: 'Incalculable' },
  { value: 8, quality: 'Llegendari/ària', quantity: 'Incommensurable' },
];

export const SITUATIONS: SituationDef[] = [
  {
    id: SituationType.UNEXPECTED,
    label: 'Situació no esperada',
    skillName: 'Percepció',
    description: 'El més atent va primer.',
  },
  {
    id: SituationType.PHYSICAL,
    label: 'Conflicte físic',
    skillName: 'Reflexos',
    description: 'El més àgil va primer.',
  },
  {
    id: SituationType.SOCIAL_ANTICIPATE,
    label: 'Conflicte social (Anticipar)',
    skillName: 'Empatia',
    description: 'El més empàtic va primer.',
  },
  {
    id: SituationType.SOCIAL_IMPOSE,
    label: 'Conflicte social (Imposar-se)',
    skillName: 'Persuasió / Provocació',
    description: 'El més espavilat va primer (el millor de els dos).',
  },
];

export const RELEVANT_SKILLS = [
  'Percepció',
  'Reflexos',
  'Empatia',
  'Persuasió',
  'Provocació'
];

export const DEFAULT_SKILLS: Record<string, number> = {
  'Percepció': 0,
  'Reflexos': 0,
  'Empatia': 0,
  'Persuasió': 0,
  'Provocació': 0,
};

export const INITIAL_CHARACTERS: Character[] = [
  { 
    id: '1', 
    name: 'Jugador 1', 
    skills: { ...DEFAULT_SKILLS, 'Reflexos': 2, 'Percepció': 1 }, 
    boost: 0, 
    isNPC: false 
  },
  { 
    id: '2', 
    name: 'Enemic A', 
    skills: { ...DEFAULT_SKILLS, 'Reflexos': 1, 'Provocació': 3, 'Percepció': 2 }, 
    boost: 0, 
    isNPC: true 
  },
];
