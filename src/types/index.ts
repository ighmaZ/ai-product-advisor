export interface Product {
  brand: string;
  product_name: string;
  price: number;
  category: string;
  description: string;
}

export interface ProductRecommendation {
  product: Product;
  reasoning: string;
  matchScore: number;
  pros: string[];
  cons: string[];
}

export interface AIRecommendationResponse {
  recommendations: ProductRecommendation[];
  userQuery: string;
  summary: string;
  totalMatches: number;
}

export interface SearchState {
  query: string;
  isLoading: boolean;
  recommendations: ProductRecommendation[];
  error: string | null;
  searchHistory: string[];
}

export interface AppState {
  searchState: SearchState;
  userPreferences: {
    budgetRange?: [number, number];
    preferredCategories: string[];
  };
}
