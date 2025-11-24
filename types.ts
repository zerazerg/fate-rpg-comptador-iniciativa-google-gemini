export interface SkillLevel {
  value: number;
  quality: string;
  quantity: string;
}

export enum SituationType {
  UNEXPECTED = 'UNEXPECTED',
  PHYSICAL = 'PHYSICAL',
  SOCIAL_ANTICIPATE = 'SOCIAL_ANTICIPATE',
  SOCIAL_IMPOSE = 'SOCIAL_IMPOSE',
}

export interface SituationDef {
  id: SituationType;
  label: string;
  skillName: string;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  skills: Record<string, number>;
  boost: number; // Temporary modifier
  isNPC: boolean;
}
