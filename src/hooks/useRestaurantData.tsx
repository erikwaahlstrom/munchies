import { useState, useEffect } from "react";
import * as api from "../api";

export interface Restaurant {
  id: string;
  name: string;
  [key: string]: unknown; // Allow other properties
}

export interface Filter {
  id: string;
  name: string;
  image_url: string;
  [key: string]: unknown; // Allow other properties
}

const useFetchDataById = <T,>(
  id: string | null,
  fetchFunction: (id: string) => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only run if an ID is provided
    if (!id) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchFunction(id);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, fetchFunction]); // Re-run whenever the ID changes

  return { data, isLoading, error };
};

// --- Specific Hooks for each ID-dependent endpoint ---

// Hook for: GET /restaurants/{id}
export const useRestaurant = (id: string | null) => {
  // We pass the specific service function as an argument
  return useFetchDataById<Restaurant>(id, api.getRestaurantById);
};

// Hook for: GET /open/{id}
export const useRestaurantOpenStatus = (id: string | null) => {
  return useFetchDataById<{ open: boolean }>(id, api.getRestaurantOpenStatus);
};

// Hook for: GET /price-range/{id}
export const usePriceRange = (id: string | null) => {
  return useFetchDataById<{ priceRange: string }>(id, api.getPriceRangeById);
};

// Hook for: GET /filters
export const useAllFilters = () => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFilters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await api.getAllFilters();
        // API returns { filters: [...] }, so extract the filters array
        const filtersData = (result as { filters: Filter[] }).filters || result;
        setFilters(Array.isArray(filtersData) ? filtersData : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    loadFilters();
  }, []); // Empty dependency array: runs only once when the component mounts

  return { filters, isLoading, error };
};

// --- Hook for GET /restaurants (Get All) ---
export const useAllRestaurants = () => {
  // This hook is simpler as it has no dependencies
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await api.getAllRestaurants();
        const restaurantsData =
          (result as { restaurants: Restaurant[] }).restaurants || result;
        setRestaurants(Array.isArray(restaurantsData) ? restaurantsData : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    loadRestaurants();
  }, []); // Empty dependency array: runs only once when the component mounts

  return { restaurants, isLoading, error };
};
