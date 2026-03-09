# 2048 Game - Expo

A classic 2048 puzzle game built with Expo and React Native!

## Features

- Classic 2048 gameplay
- Smooth swipe gestures (mobile) and keyboard controls (web)
- Score tracking
- New Game button
- Game Over / Win detection
- Beautiful animations
- Responsive design

## How to Play

1. Swipe or use arrow keys to move all tiles in one direction
2. When two tiles with the same number touch, they merge into one!
3. Create a tile with the number 2048 to win!
4. Game ends when no more moves are possible

## Controls

- **Mobile**: Swipe in any direction (up, down, left, right)
- **Web**: Use arrow keys (↑, ↓, ←, →)
- **New Game**: Click the "New Game" button

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI

### Installation

```bash
cd 2048-game
npm install
```

### Running the App

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Web:**
```bash
npm run web
```

**Expo Go (Physical Device):**
```bash
npm start
```
Then scan the QR code with the Expo Go app on your phone.

## Project Structure

```
2048-game/
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── GameBoard.tsx
│   │   ├── Tile.tsx
│   │   └── GameOver.tsx
│   ├── types/           # TypeScript type definitions
│   │   └── game.ts
│   └── utils/           # Game logic
│       └── gameLogic.ts
├── App.tsx              # Main app component
└── package.json
```

## Game Mechanics

- **4x4 grid** with numbered tiles
- Tiles spawn as **2** (90% chance) or **4** (10% chance)
- Tiles merge when pushed together
- Score increases by the value of merged tiles
- Win condition: Create a **2048** tile
- Lose condition: No empty cells and no possible merges

## License

MIT
