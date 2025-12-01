import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export interface FilterState {
  filterIds: Set<string>;
  deliveryTimes: Set<string>;
  priceRangeIds: Set<string>;
}

const parseParam = (param: string | null): Set<string> => {
  const set = new Set<string>();
  if (param) {
    param.split(",").forEach((v) => {
      const trimmed = v.trim();
      if (trimmed) set.add(trimmed);
    });
  }
  return set;
};

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterState = useMemo<FilterState>(
    () => ({
      filterIds: parseParam(searchParams.get("filters")),
      deliveryTimes: parseParam(searchParams.get("delivery")),
      priceRangeIds: parseParam(searchParams.get("price")),
    }),
    [searchParams]
  );

  const updateFilters = (
    fieldName: "filter" | "delivery_time" | "price_range",
    value: string,
    isActive: boolean
  ) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const key =
        fieldName === "filter"
          ? "filters"
          : fieldName === "delivery_time"
          ? "delivery"
          : "price";

      const values = new Set(params.get(key)?.split(",").filter(Boolean) || []);

      if (isActive) {
        values.add(value);
      } else {
        values.delete(value);
      }

      if (values.size > 0) {
        params.set(key, Array.from(values).join(","));
      } else {
        params.delete(key);
      }

      return params;
    });
  };

  const isFilterActive = (
    fieldName: "filter" | "delivery_time" | "price_range",
    value: string
  ): boolean => {
    if (fieldName === "filter") return filterState.filterIds.has(value);
    if (fieldName === "delivery_time")
      return filterState.deliveryTimes.has(value);
    return filterState.priceRangeIds.has(value);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  return {
    filterState,
    updateFilters,
    isFilterActive,
    clearAllFilters,
  };
};
