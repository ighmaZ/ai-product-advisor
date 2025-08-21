import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps {
  onGetStarted: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onGetStarted }) => {
  const suggestions = [
    "I need a laptop for work and travel",
    "Looking for smart home security devices",
    "Want a fitness tracker under ₹10,000",
    "Need kitchen appliances for cooking",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="search" size={64} color="rgba(255, 255, 255, 0.6)" />
      </View>

      <Text style={styles.title}>Ready to find your perfect product?</Text>
      <Text style={styles.subtitle}>
        Just describe what you're looking for in natural language, and our AI
        will find the best matches from our catalog.
      </Text>

      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Try these examples:</Text>
        {suggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionItem}
            onPress={() => onGetStarted()}
          >
            <Ionicons name="bulb-outline" size={16} color="#FCD34D" />
            <Text style={styles.suggestionText}>"{suggestion}"</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  suggestionsContainer: {
    width: "100%",
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  suggestionText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginLeft: 12,
    flex: 1,
    fontStyle: "italic",
  },
});
