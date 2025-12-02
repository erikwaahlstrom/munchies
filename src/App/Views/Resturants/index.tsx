import { useMemo } from "react";
import { Logo } from "assets/media/Icons/Logo";
import { useAllRestaurants } from "../../../hooks/useRestaurantData";
import { useFilterParams } from "../../../hooks/useFilterParams";
import { filterRestaurants } from "../../../utils/filterRestaurants";
import Filters from "App/components/Filter/Filters";
import { ResturantsListing } from "App/components/ResturantsListing";

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
    <div className="min-h-screen w-full p-10">
      <Logo className="text-base-black mb-12" />

      <div className="flex flex-col lg:grid lg:gap-5 lg:grid-cols-[250px_1fr] lg:[grid-template-areas:'filters_restaurants'] gap-5">
        <div className="lg:[grid-area:filters]">
          <Filters
            isFilterActive={isFilterActive}
            handleFilterChange={handleFilterChange}
          />
        </div>

        <div className="lg:[grid-area:restaurants]">
          <ResturantsListing filteredRestaurants={filteredRestaurants} />
        </div>
      </div>
    </div>
  );
};
