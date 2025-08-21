import { create } from "zustand";
import { ProductRecommendation } from "../types";

interface SearchState {
  query: string;
  isLoading: boolean;
  recommendations: ProductRecommendation[];
  error: string | null;
  searchHistory: string[];
}

interface UserPreferences {
  budgetRange?: [number, number];
  preferredCategories: string[];
}

interface AppState {
  // Search state
  searchState: SearchState;

  // User preferences
  userPreferences: UserPreferences;

  // Actions
  setQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setRecommendations: (recommendations: ProductRecommendation[]) => void;
  setError: (error: string | null) => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  resetSearch: () => void;
}

const initialSearchState: SearchState = {
  query: "",
  isLoading: false,
  recommendations: [],
  error: null,
  searchHistory: [],
};

const initialUserPreferences: UserPreferences = {
  budgetRange: undefined,
  preferredCategories: [],
};

export const useAppStore = create<AppState>((set, get) => ({
  searchState: initialSearchState,
  userPreferences: initialUserPreferences,

  setQuery: (query: string) =>
    set((state) => ({
      searchState: { ...state.searchState, query },
    })),

  setLoading: (isLoading: boolean) =>
    set((state) => ({
      searchState: { ...state.searchState, isLoading },
    })),

  setRecommendations: (recommendations: ProductRecommendation[]) =>
    set((state) => ({
      searchState: { ...state.searchState, recommendations, error: null },
    })),

  setError: (error: string | null) =>
    set((state) => ({
      searchState: { ...state.searchState, error, isLoading: false },
    })),

  addToSearchHistory: (query: string) =>
    set((state) => {
      const currentHistory = state.searchState.searchHistory;
      const filteredHistory = currentHistory.filter((item) => item !== query);
      const newHistory = [query, ...filteredHistory].slice(0, 10); // Keep only last 10 searches

      return {
        searchState: { ...state.searchState, searchHistory: newHistory },
      };
    }),

  clearSearchHistory: () =>
    set((state) => ({
      searchState: { ...state.searchState, searchHistory: [] },
    })),

  updateUserPreferences: (preferences: Partial<UserPreferences>) =>
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences },
    })),

  resetSearch: () =>
    set((state) => ({
      searchState: {
        ...initialSearchState,
        searchHistory: state.searchState.searchHistory,
      },
    })),
}));
