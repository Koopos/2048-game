import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { getTileColor, getTileTextColor } from '../utils/gameLogic';

interface TileProps {
  value: number;
  size: number;
  gap: number;
  isNew?: boolean;
}

export function Tile({ value, size, gap, isNew = false }: TileProps) {
  const tileSize = (size - gap * 5) / 4;
  const scaleAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;

  useEffect(() => {
    if (isNew) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }
  }, [isNew, scaleAnim]);

  const getScale = () => {
    if (value === 0) return 1;
    if (value >= 2048) return 1.1;
    return 1;
  };

  return (
    <Animated.View
      style={[
        styles.tile,
        {
          width: tileSize,
          height: tileSize,
          backgroundColor: getTileColor(value),
          transform: [
            {
              scale: scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, getScale()],
              }),
            },
          ],
        },
      ]}
    >
      {value !== 0 && (
        <Text
          style={[
            styles.tileText,
            {
              color: getTileTextColor(value),
              fontSize: value > 512 ? tileSize * 0.35 : tileSize * 0.45,
            },
          ]}
        >
          {value}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    fontWeight: 'bold',
  },
});
