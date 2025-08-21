import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../stores/useAppStore";
import { useProductSearch } from "../hooks/useProductSearch";
import { LoadingDots } from "./LoadingDots";

const { width } = Dimensions.get("window");

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Describe what you're looking for...",
}) => {
  const [localQuery, setLocalQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { setQuery, addToSearchHistory, searchState } = useAppStore();
  const { searchProducts, isLoading } = useProductSearch();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = async () => {
    if (!localQuery.trim()) return;

    setQuery(localQuery);
    addToSearchHistory(localQuery);
    await searchProducts(localQuery);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          isFocused && styles.searchContainerFocused,
        ]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color="rgba(255, 255, 255, 0.7)"
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={localQuery}
          onChangeText={setLocalQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSearch}
          multiline
          textAlignVertical="top"
          returnKeyType="search"
        />

        <TouchableOpacity
          style={[
            styles.searchButton,
            { opacity: localQuery.trim() ? 1 : 0.5 },
          ]}
          onPress={handleSearch}
          disabled={!localQuery.trim() || isLoading}
        >
          {isLoading ? (
            <LoadingDots />
          ) : (
            <Ionicons name="arrow-forward" size={20} color="#9333EA" />
          )}
        </TouchableOpacity>
      </View>

      {searchState.searchHistory.length > 0 && isFocused && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent searches:</Text>
          {searchState.searchHistory.slice(0, 3).map((query, index) => (
            <TouchableOpacity
              key={index}
              style={styles.historyItem}
              onPress={() => {
                setLocalQuery(query);
                setQuery(query);
              }}
            >
              <Ionicons
                name="time-outline"
                size={16}
                color="rgba(255, 255, 255, 0.6)"
              />
              <Text style={styles.historyText}>{query}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    minHeight: 60,
  },
  searchContainerFocused: {
    borderColor: "#FCD34D",
  },
  searchIcon: {
    marginTop: 7,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    maxHeight: 100,
  },
  searchButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 8,
    marginLeft: 8,
    marginTop: 8,
  },
  historyContainer: {
    marginTop: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
  },
  historyTitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  historyText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
});
