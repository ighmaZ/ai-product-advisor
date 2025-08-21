import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ViewToken,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { ProductRecommendation } from "../types";
import { RecommendationCard } from "./RecommendationCard";

interface RecommendationCarouselProps {
  recommendations: ProductRecommendation[];
  onRecommendationPress: (recommendation: ProductRecommendation) => void;
}

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth * 0.85;
const CARD_SPACING = 15;

export const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({
  recommendations,
  onRecommendationPress,
}) => {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductRecommendation;
    index: number;
  }) => {
    return (
      <AnimatedCarouselItem
        recommendation={item}
        index={index}
        scrollX={scrollX}
        onPress={() => onRecommendationPress(item)}
      />
    );
  };

  const renderDotIndicator = () => {
    return (
      <View style={styles.dotsContainer}>
        {recommendations.map((_, index) => {
          const dotAnimatedStyle = useAnimatedStyle(() => {
            const inputRange = [
              (index - 1) * CARD_WIDTH,
              index * CARD_WIDTH,
              (index + 1) * CARD_WIDTH,
            ];

            const opacity = interpolate(
              scrollX.value,
              inputRange,
              [0.3, 1, 0.3],
              Extrapolate.CLAMP
            );

            const scale = interpolate(
              scrollX.value,
              inputRange,
              [0.8, 1.2, 0.8],
              Extrapolate.CLAMP
            );

            return {
              opacity: withSpring(opacity, { damping: 15 }),
              transform: [{ scale: withSpring(scale, { damping: 15 }) }],
            };
          });

          return (
            <Animated.View key={index} style={[styles.dot, dotAnimatedStyle]} />
          );
        })}
      </View>
    );
  };

  if (recommendations.length === 0) return null;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={recommendations}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          `${item.product.brand}-${item.product.product_name}-${index}`
        }
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        scrollEventThrottle={16}
      />
      {recommendations.length > 1 && renderDotIndicator()}
    </View>
  );
};

interface AnimatedCarouselItemProps {
  recommendation: ProductRecommendation;
  index: number;
  scrollX: Animated.SharedValue<number>;
  onPress: () => void;
}

const AnimatedCarouselItem: React.FC<AnimatedCarouselItemProps> = ({
  recommendation,
  index,
  scrollX,
  onPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.85, 1, 0.85],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [50, 0, 50],
      Extrapolate.CLAMP
    );

    const rotateY = interpolate(
      scrollX.value,
      inputRange,
      [25, 0, -25],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { scale: withSpring(scale, { damping: 15, stiffness: 100 }) },
        { translateY: withSpring(translateY, { damping: 15, stiffness: 100 }) },
        { perspective: 1000 },
        {
          rotateY: `${withSpring(rotateY, { damping: 15, stiffness: 100 })}deg`,
        },
      ],
      opacity: withSpring(opacity, { damping: 15, stiffness: 100 }),
    };
  });

  return (
    <Animated.View style={[styles.carouselItem, animatedStyle]}>
      <RecommendationCard
        recommendation={recommendation}
        index={index}
        onPress={onPress}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  flatListContent: {
    paddingHorizontal: (screenWidth - CARD_WIDTH) / 2,
  },
  carouselItem: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_SPACING / 2,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginHorizontal: 4,
  },
});
