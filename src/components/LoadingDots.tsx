import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";

interface LoadingDotsProps {
  color?: string;
  size?: number;
  spacing?: number;
}

export function LoadingDots({
  color = "#9333EA",
  size = 6,
  spacing = 3,
}: LoadingDotsProps) {
  const dot1 = useSharedValue(0.3);
  const dot2 = useSharedValue(0.3);
  const dot3 = useSharedValue(0.3);

  useEffect(() => {
    const animateDot = (
      dotValue: Animated.SharedValue<number>,
      delay: number
    ) => {
      dotValue.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, {
              duration: 400,
              easing: Easing.out(Easing.cubic),
            }),
            withTiming(0.3, {
              duration: 400,
              easing: Easing.in(Easing.cubic),
            })
          ),
          -1,
          false
        )
      );
    };

    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);
  }, []);

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dot1.value,
    transform: [
      {
        scale: 0.7 + dot1.value * 0.5, // Scale from 0.7 to 1.2
      },
      {
        translateY: (1 - dot1.value) * -2, // Subtle bounce effect
      },
    ],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dot2.value,
    transform: [
      {
        scale: 0.7 + dot2.value * 0.5,
      },
      {
        translateY: (1 - dot2.value) * -2,
      },
    ],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dot3.value,
    transform: [
      {
        scale: 0.7 + dot3.value * 0.5,
      },
      {
        translateY: (1 - dot3.value) * -2,
      },
    ],
  }));

  const dotStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    marginHorizontal: spacing,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[dotStyle, dot1Style]} />
      <Animated.View style={[dotStyle, dot2Style]} />
      <Animated.View style={[dotStyle, dot3Style]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
