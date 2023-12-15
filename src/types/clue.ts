export interface ClueData {
  [key: string]: CountryClues;
}

export interface CountryClues {
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

export interface SelectedClue {
  type: ClueType;
  value: string;
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

interface ClueNameMapping {
  [key: string]: string;
}

export interface Clue {
  displayName: string;
  clueName: string;
  values?: ClueNameMapping;
}
