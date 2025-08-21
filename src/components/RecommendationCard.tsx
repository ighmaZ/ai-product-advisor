import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProductRecommendation } from "../types";
import { LinearGradient } from "expo-linear-gradient";

interface RecommendationCardProps {
  recommendation: ProductRecommendation;
  index: number;
  onPress?: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  index,
  onPress,
}) => {
  const { product, reasoning, matchScore, pros, cons } = recommendation;

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 8) return "#10B981"; // Green
    if (score >= 6) return "#F59E0B"; // Yellow
    return "#EF4444"; // Red
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      Entertainment: "game-controller",
      "Kitchen Appliances": "restaurant",
      "Home Improvement": "home",
      "Travel & Lifestyle": "airplane",
      "Smart Mobility": "car",
      "Security & Surveillance": "shield-checkmark",
      "Healthtech and Wellness": "fitness",
      "Personal Care": "person",
    };
    return iconMap[category] || "cube";
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.85)"]}
          style={styles.card}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons
                name={getCategoryIcon(product.category) as any}
                size={24}
                color="#9333EA"
              />
              <View style={styles.titleContainer}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.product_name}
                </Text>
                <Text style={styles.brand}>{product.brand}</Text>
              </View>
            </View>

            <View style={styles.scoreContainer}>
              <View
                style={[
                  styles.scoreBadge,
                  { backgroundColor: getMatchScoreColor(matchScore) },
                ]}
              >
                <Text style={styles.scoreText}>{matchScore}/10</Text>
              </View>
            </View>
          </View>

          {/* Price and Category */}
          <View style={styles.metaInfo}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <Text style={styles.category}>{product.category}</Text>
          </View>

          {/* Reasoning */}
          <View style={styles.reasoningContainer}>
            <Text style={styles.reasoningTitle}>Why this matches:</Text>
            <Text style={styles.reasoning}>{reasoning}</Text>
          </View>

          {/* Pros and Cons */}
          <View style={styles.prosConsContainer}>
            {pros.length > 0 && (
              <View style={styles.prosContainer}>
                <View style={styles.prosHeader}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.prosTitle}>Pros</Text>
                </View>
                {pros.map((pro, index) => (
                  <Text key={index} style={styles.proText}>
                    • {pro}
                  </Text>
                ))}
              </View>
            )}

            {cons.length > 0 && (
              <View style={styles.consContainer}>
                <View style={styles.consHeader}>
                  <Ionicons name="alert-circle" size={16} color="#F59E0B" />
                  <Text style={styles.consTitle}>Consider</Text>
                </View>
                {cons.map((con, index) => (
                  <Text key={index} style={styles.conText}>
                    • {con}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: 24,
  },
  brand: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginTop: 2,
  },
  scoreContainer: {
    marginLeft: 12,
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(147, 51, 234, 0.05)",
    borderRadius: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#9333EA",
  },
  category: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  reasoningContainer: {
    marginBottom: 16,
  },
  reasoningTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  reasoning: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  prosConsContainer: {
    marginBottom: 16,
  },
  prosContainer: {
    marginBottom: 12,
  },
  prosHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  prosTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10B981",
    marginLeft: 6,
  },
  proText: {
    fontSize: 13,
    color: "#047857",
    marginLeft: 20,
    marginBottom: 2,
  },
  consContainer: {
    marginBottom: 8,
  },
  consHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  consTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F59E0B",
    marginLeft: 6,
  },
  conText: {
    fontSize: 13,
    color: "#D97706",
    marginLeft: 20,
    marginBottom: 2,
  },
  descriptionContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(107, 114, 128, 0.2)",
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    fontStyle: "italic",
  },
});
