import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
  score: number;
  onNewGame: () => void;
}

export function Header({ score, onNewGame }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>2048</Text>
      </View>

      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        <TouchableOpacity style={styles.newGameButton} onPress={onNewGame}>
          <Text style={styles.newGameButtonText}>New Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#776e65',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  scoreBox: {
    backgroundColor: '#bbada0',
    borderRadius: 6,
    padding: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#eee4da',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  newGameButton: {
    backgroundColor: '#8f7a66',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  newGameButtonText: {
    color: '#f9f6f2',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
