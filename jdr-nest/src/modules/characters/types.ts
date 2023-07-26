export type Character = {
  firstName: string;
  lastName: string;
  race: string;
  class: string;
  level: number;
  pv: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  story: string;
  inventory: string[];
};

export const CHARACTERISTICS = [
  "firstName",
  "lastName",
  "race",
  "class",
  "level",
  "pv",
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
  "story",
  "inventory"
];
