export interface Clue {
  type: ClueType;
  value: string;
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
