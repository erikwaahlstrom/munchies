import { useState, useEffect } from "react";
import * as api from "../api";

export interface Restaurant {
  id: string;
  name: string;
  filter_ids?: string[];
  delivery_time_minutes?: number;
  price_range_id?: string;
  [key: string]: unknown;
}

export interface Filter {
  id: string;
  name: string;
  image_url: string;
  [key: string]: unknown;
}

const useFetchDataById = <T,>(
  id: string | null,
  fetchFunction: (id: string) => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        setData(await fetchFunction(id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id, fetchFunction]);

  return { data, isLoading, error };
};

export const useRestaurant = (id: string | null) => {
  return useFetchDataById<Restaurant>(id, api.getRestaurantById);
};

export const useRestaurantOpenStatus = (id: string | null) => {
  return useFetchDataById<{ open: boolean }>(id, api.getRestaurantOpenStatus);
};

export const usePriceRange = (id: string | null) => {
  return useFetchDataById<{ priceRange: string }>(id, api.getPriceRangeById);
};

export const useAllPriceRanges = (restaurants: Restaurant[]) => {
  const [priceRanges, setPriceRanges] = useState<
    Array<{ id: string; data: { range: string } }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!Array.isArray(restaurants) || restaurants.length === 0) {
        setPriceRanges([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const ids = new Set<string>();
        restaurants.forEach((r) => {
          const id = r.price_range_id;
          if (typeof id === "string" && id) ids.add(id);
        });

        const uniqueIds = Array.from(ids);
        if (uniqueIds.length === 0) {
          setPriceRanges([]);
          setIsLoading(false);
          return;
        }

        const results = await Promise.all(
          uniqueIds.map(async (id) => {
            try {
              const data = await api.getPriceRangeById(id);
              return { id, data: data as { range: string } };
            } catch (err) {
              console.error(`Error fetching price range ${id}:`, err);
              return null;
            }
          })
        );

        setPriceRanges(
          results.filter(
            (item): item is { id: string; data: { range: string } } =>
              item !== null
          )
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [restaurants]);

  return { priceRanges, isLoading, error };
};

export const useAllFilters = () => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await api.getAllFilters();
        const data = (result as { filters: Filter[] }).filters || result;
        setFilters(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { filters, isLoading, error };
};

export const useAllRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await api.getAllRestaurants();
        const data =
          (result as { restaurants: Restaurant[] }).restaurants || result;
        setRestaurants(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { restaurants, isLoading, error };
};
