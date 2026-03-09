import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface GameOverProps {
  visible: boolean;
  won: boolean;
  score: number;
  onRestart: () => void;
}

export function GameOver({ visible, won, score, onRestart }: GameOverProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={[styles.message, won ? styles.win : styles.lose]}>
            {won ? 'You Win!' : 'Game Over!'}
          </Text>

          <Text style={styles.scoreText}>Score: {score}</Text>

          <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
            <Text style={styles.restartButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#faf8ef',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    minWidth: 280,
  },
  message: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  win: {
    color: '#edc22e',
  },
  lose: {
    color: '#776e65',
  },
  scoreText: {
    fontSize: 24,
    color: '#776e65',
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#8f7a66',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  restartButtonText: {
    color: '#f9f6f2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
