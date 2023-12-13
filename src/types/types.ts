export interface SelectedClue {
  type: ClueType;
  value: string;
}

export interface CountryData {
  [key: string]: Country;
}

export interface CharacterData {
  [key: string]: string[];
}

interface ClueNameMapping {
  [key: string]: string;
}

export interface Clue {
  displayName: string;
  clueName: string;
  values?: ClueNameMapping;
}

export interface ClueData {
  [key: string]: Clue;
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
  cameraGen: string[];
}

export enum ClueType {
  Character = 'character',
  Region = 'region',
  Alphabet = 'alphabet',
  Scenery = 'scenery',
  Driving = 'driving',
  FlagColor = 'flagColor',
  FlagPattern = 'flagPattern',
  RoadLine = 'roadLine',
  CameraGen = 'cameraGen',
}
