export interface Clue {
  type: ClueType;
  value: string;
}

export interface CountryData {
  [key: string]: Country;
}

export interface CharacterData {
  [key: string]: string[];
}

export interface Country {
  name: string;
  region: string[];
  alphabet: string[];
  scenery: string[];
  driving: string[];
  flagColor: string[];
  flagPattern: string[];
  roadLine: string[];
  language: string[];
  coverage: boolean;
}

export enum ClueType {
  Character = "character",
  Region = "region",
  Alphabet = "alphabet",
  Scenery = "scenery",
  Driving = "driving",
  FlagColor = "flagColor",
  FlagPattern = "flagPattern",
  RoadLine = "roadLine",
  Language = "language",
  Coverage = "coverage",
}
