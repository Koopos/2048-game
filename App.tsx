import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, PanResponder } from 'react-native';
import { Header } from './src/components/Header';
import { GameBoard } from './src/components/GameBoard';
import { GameOver } from './src/components/GameOver';
import { GameState, Direction } from './src/types/game';
import { initializeGame, move } from './src/utils/gameLogic';

const { width } = Dimensions.get('window');
const BOARD_SIZE = Math.min(width - 40, 400);

export default function App() {
  const [gameState, setGameState] = useState<GameState>(initializeGame);

  const handleNewGame = () => {
    setGameState(initializeGame());
  };

  const handleMove = (direction: Direction) => {
    setGameState(prevState => move(prevState, direction));
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, gestureState) => {
      const { dx, dy } = gestureState;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < 20) {
        return;
      }

      if (absDx > absDy) {
        handleMove(dx > 0 ? 'right' : 'left');
      } else {
        handleMove(dy > 0 ? 'down' : 'up');
      }
    },
  });

  // // Keyboard support for web
  // useEffect(() => {
  //   if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
  //     return;
  //   }

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     switch (event.key) {
  //       case 'ArrowUp':
  //         event.preventDefault();
  //         handleMove('up');
  //         break;
  //       case 'ArrowDown':
  //         event.preventDefault();
  //         handleMove('down');
  //         break;
  //       case 'ArrowLeft':
  //         event.preventDefault();
  //         handleMove('left');
  //         break;
  //       case 'ArrowRight':
  //         event.preventDefault();
  //         handleMove('right');
  //         break;
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
  //       window.removeEventListener('keydown', handleKeyDown);
  //     }
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.gameContainer}>
        <Header score={gameState.score} onNewGame={handleNewGame} />

        <View {...panResponder.panHandlers}>
          <GameBoard board={gameState.board} size={BOARD_SIZE} />
        </View>
      </View>

      <GameOver
        visible={gameState.gameOver || gameState.gameWon}
        won={gameState.gameWon}
        score={gameState.score}
        onRestart={handleNewGame}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ef',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  gameContainer: {
    alignItems: 'center',
  },
});
