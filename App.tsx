import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, PanResponder, Platform, LayoutAnimation, UIManager } from 'react-native';
import { Header } from './src/components/Header';
import { GameBoard } from './src/components/GameBoard';
import { GameOver } from './src/components/GameOver';
import { GameState, Direction } from './src/types/game';
import { initializeGame, move } from './src/utils/gameLogic';

const { width } = Dimensions.get('window');
const BOARD_SIZE = Math.min(width - 40, 400);

export default function App() {
  const [gameState, setGameState] = useState<GameState>(initializeGame);

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const handleNewGame = useCallback(() => {
    setGameState(initializeGame());
  }, []);

  const handleMove = useCallback((direction: Direction) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setGameState(prevState => move(prevState, direction));
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => Math.max(Math.abs(gestureState.dx), Math.abs(gestureState.dy)) > 8,
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
      }),
    [handleMove]
  );

  useEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }

    const keyboardTarget = globalThis as typeof globalThis & {
      addEventListener?: (name: string, handler: (event: any) => void) => void;
      removeEventListener?: (name: string, handler: (event: any) => void) => void;
    };

    if (!keyboardTarget.addEventListener || !keyboardTarget.removeEventListener) {
      return;
    }

    const handleKeyDown = (event: { key: string; preventDefault?: () => void }) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault?.();
          handleMove('up');
          break;
        case 'ArrowDown':
          event.preventDefault?.();
          handleMove('down');
          break;
        case 'ArrowLeft':
          event.preventDefault?.();
          handleMove('left');
          break;
        case 'ArrowRight':
          event.preventDefault?.();
          handleMove('right');
          break;
      }
    };

    keyboardTarget.addEventListener('keydown', handleKeyDown);
    return () => {
      keyboardTarget.removeEventListener?.('keydown', handleKeyDown);
    };
  }, [handleMove]);

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
