import { useMutation } from "@tanstack/react-query";
import { aiService } from "../services/aiService";
import { useAppStore } from "../stores/useAppStore";

export const useProductSearch = () => {
  const {
    searchState,
    setLoading,
    setRecommendations,
    setError,
    addToSearchHistory,
  } = useAppStore();

  const mutation = useMutation({
    mutationFn: (query: string) => aiService.getProductRecommendations(query),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setRecommendations(data.recommendations);
      setLoading(false);
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  const searchProducts = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    addToSearchHistory(searchQuery);
    mutation.mutate(searchQuery);
  };

  return {
    searchProducts,
    isLoading: mutation.isPending || searchState.isLoading,
    error: mutation.error?.message || searchState.error,
    recommendations: searchState.recommendations,
    isError: mutation.isError,
  };
};
