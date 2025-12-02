import { useMemo } from "react";
import { Logo } from "assets/media/Icons/Logo";
import { useAllRestaurants } from "../../../hooks/useRestaurantData";
import { useFilterParams } from "../../../hooks/useFilterParams";
import { filterRestaurants } from "../../../utils/filterRestaurants";
import Filters from "App/components/Filter/Filters";
import { ResturantsListing } from "App/components/ResturantsListing";
import { CTAButton } from "App/components/CTAButton";

export const Resturants = () => {
  const { restaurants, isLoading, error } = useAllRestaurants();
  const { filterState, updateFilters, isFilterActive } = useFilterParams();

  // Filter restaurants based on active filters
  const filteredRestaurants = useMemo(() => {
    if (!Array.isArray(restaurants)) return [];
    return filterRestaurants(restaurants, filterState);
  }, [restaurants, filterState]);

  const handleFilterChange = ({
    fieldName,
    selectedValue,
  }: {
    fieldName: string;
    op: string;
    selectedValue: string;
  }) => {
    const isCurrentlyActive = isFilterActive(
      fieldName as "filter" | "delivery_time" | "price_range",
      selectedValue
    );
    updateFilters(
      fieldName as "filter" | "delivery_time" | "price_range",
      selectedValue,
      !isCurrentlyActive
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-left">
      <Logo className="text-base-black" />

      <CTAButton />

      <div className="flex flex-col gap-3 mt-6">
        <Filters
          isFilterActive={isFilterActive}
          handleFilterChange={handleFilterChange}
        />
      </div>

      <ResturantsListing filteredRestaurants={filteredRestaurants} />
    </div>
  );
};
