import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tile } from './Tile';

interface GameBoardProps {
  board: number[][];
  size: number;
}

export function GameBoard({ board, size }: GameBoardProps) {
  const gap = 10;
  const tileSize = (size - gap * 5) / 4;

  return (
    <View style={[styles.container, { width: size, height: size, gap }]}>
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <View
            key={`${rowIndex}-${colIndex}`}
            style={[
              styles.tileContainer,
              {
                width: tileSize,
                height: tileSize,
                top: gap + rowIndex * (tileSize + gap),
                left: gap + colIndex * (tileSize + gap),
              },
            ]}
          >
            <Tile value={value} size={size} gap={gap} />
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bbada0',
    borderRadius: 6,
    position: 'relative',
  },
  tileContainer: {
    position: 'absolute',
  },
});
