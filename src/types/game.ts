export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameState {
  board: number[][];
  score: number;
  gameOver: boolean;
  gameWon: boolean;
}

export type Position = { row: number; col: number };
