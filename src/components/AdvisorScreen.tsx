import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SearchInput } from "./SearchInput";
import { RecommendationCarousel } from "./RecommendationCarousel";
import { LoadingState } from "./LoadingState";
import { useAppStore } from "../stores/useAppStore";
import { useProductSearch } from "../hooks/useProductSearch";

interface AdvisorScreenProps {}

const AdvisorScreen: React.FC<AdvisorScreenProps> = () => {
  const { searchState } = useAppStore();
  const { isLoading, error, recommendations } = useProductSearch();

  const handleRecommendationPress = (recommendation: any) => {
    Alert.alert(
      recommendation.product.product_name,
      `Brand: ${
        recommendation.product.brand
      }\nPrice: ₹${recommendation.product.price.toLocaleString("en-IN")}\n\n${
        recommendation.product.description
      }`,
      [{ text: "OK", style: "default" }]
    );
  };

  return (
    <LinearGradient
      colors={["#C4B5FD", "#A78BFA", "#9333EA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="sparkles" size={32} color="#FCD34D" />
            <Text style={styles.title}>AI Product Advisor</Text>
            <Text style={styles.subtitle}>
              Describe what you need in natural language and get personalized
              recommendations
            </Text>
          </View>
        </View>

        <SearchInput placeholder="e.g., I need a lightweight laptop for travel with long battery life..." />

        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {isLoading && <LoadingState />}

        {recommendations.length > 0 && !isLoading && (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              <Text style={styles.resultsTitle}>
                Found {recommendations.length} great matches for you!
              </Text>
            </View>

            <RecommendationCarousel
              recommendations={recommendations}
              onRecommendationPress={handleRecommendationPress}
            />
          </View>
        )}

        {searchState.query &&
          !isLoading &&
          recommendations.length === 0 &&
          !error && (
            <View style={styles.noResultsContainer}>
              <Ionicons
                name="search"
                size={48}
                color="rgba(255, 255, 255, 0.5)"
              />
              <Text style={styles.noResultsText}>
                No products found for your search. Try describing your needs
                differently.
              </Text>
            </View>
          )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 30,
  },
  scrollView: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  scrollContent: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#E5E7EB",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    fontWeight: "500",
  },
  resultsContainer: {
    marginTop: 20,
    flex: 1,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
    flex: 1,
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
});

export default AdvisorScreen;
