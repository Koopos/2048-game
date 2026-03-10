import { Direction, GameState, Position } from '../types/game';

const BOARD_SIZE = 4;

export function createEmptyBoard(): number[][] {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
}

export function getEmptyPositions(board: number[][]): Position[] {
  const positions: Position[] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 0) {
        positions.push({ row, col });
      }
    }
  }
  return positions;
}

export function addRandomTile(board: number[][]): number[][] {
  const emptyPositions = getEmptyPositions(board);
  if (emptyPositions.length === 0) return board;

  const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const newBoard = board.map(row => [...row]);
  newBoard[randomPosition.row][randomPosition.col] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
}

export function initializeGame(): GameState {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);

  return {
    board,
    score: 0,
    gameOver: false,
    gameWon: false,
  };
}

function slideRow(row: number[]): { newRow: number[]; score: number } {
  // Remove zeros
  let filtered = row.filter(val => val !== 0);
  let score = 0;

  // Merge tiles
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      score += filtered[i];
      filtered.splice(i + 1, 1);
    }
  }

  // Pad with zeros
  while (filtered.length < BOARD_SIZE) {
    filtered.push(0);
  }

  return { newRow: filtered, score };
}

function rotateBoard(board: number[][], times: number): number[][] {
  let result = board.map(row => [...row]);

  for (let t = 0; t < times; t++) {
    const newBoard: number[][] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      const newRow: number[] = [];
      for (let row = BOARD_SIZE - 1; row >= 0; row--) {
        newRow.push(result[row][col]);
      }
      newBoard.push(newRow);
    }
    result = newBoard;
  }

  return result;
}

function moveBoard(board: number[][], direction: Direction): { board: number[][]; score: number } {
  let rotations = 0;

  switch (direction) {
    case 'left':
      rotations = 0;
      break;
    case 'up':
      rotations = 3;
      break;
    case 'right':
      rotations = 2;
      break;
    case 'down':
      rotations = 1;
      break;
  }

  let rotatedBoard = rotateBoard(board, rotations);
  let score = 0;

  // Slide each row to the left
  rotatedBoard = rotatedBoard.map(row => {
    const result = slideRow(row);
    score += result.score;
    return result.newRow;
  });

  // Rotate back
  const finalBoard = rotateBoard(rotatedBoard, (4 - rotations) % 4);

  return { board: finalBoard, score };
}

export function move(state: GameState, direction: Direction): GameState {
  if (state.gameOver) return state;

  const { board: newBoard, score: moveScore } = moveBoard(state.board, direction);

  // Check if board changed
  const boardChanged = !boardsEqual(state.board, newBoard);

  if (!boardChanged) return state;

  // Add random tile
  const boardWithNewTile = addRandomTile(newBoard);

  const newScore = state.score + moveScore;
  const gameOver = isGameOver(boardWithNewTile);
  const gameWon = hasWon(boardWithNewTile);

  return {
    board: boardWithNewTile,
    score: newScore,
    gameOver,
    gameWon: gameWon || state.gameWon,
  };
}

function boardsEqual(board1: number[][], board2: number[][]): boolean {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board1[row][col] !== board2[row][col]) {
        return false;
      }
    }
  }
  return true;
}

export function isGameOver(board: number[][]): boolean {
  // Check for empty cells
  if (getEmptyPositions(board).length > 0) return false;

  // Check for possible merges
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const current = board[row][col];

      // Check right neighbor
      if (col < BOARD_SIZE - 1 && board[row][col + 1] === current) {
        return false;
      }

      // Check bottom neighbor
      if (row < BOARD_SIZE - 1 && board[row + 1][col] === current) {
        return false;
      }
    }
  }

  return true;
}

function hasWon(board: number[][]): boolean {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 2048) {
        return true;
      }
    }
  }
  return false;
}

export function getTileColor(value: number): string {
  const colors: Record<number, string> = {
    0: '#cdc1b4',
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
  };
  return colors[value] || '#3c3a32';
}

export function getTileTextColor(value: number): string {
  return value <= 4 ? '#776e65' : '#f9f6f2';
}
