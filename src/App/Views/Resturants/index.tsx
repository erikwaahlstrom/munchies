import { useMemo } from "react";
import { Logo } from "../../../assets/media/icons/Logo";
import {
  useAllFilters,
  useAllRestaurants,
} from "../../../hooks/useRestaurantData";
import { useFilterParams } from "../../../hooks/useFilterParams";
import { filterRestaurants } from "../../../utils/filterRestaurants";
import Filters from "App/components/Filter/Filters";
import { ResturantsListing } from "App/components/ResturantsListing";
import { FilterCheckboxAlt } from "App/components/Filter/FilterCheckboxAlt";

export const Resturants = () => {
  const { restaurants, isLoading, error } = useAllRestaurants();
  const { filterState, updateFilters, isFilterActive } = useFilterParams();
  const { filters } = useAllFilters();

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
    <div className="min-h-screen w-full p-5 lg:p-10 overflow-x-hidden">
      <Logo className="text-base-black mb-6 lg:mb-12 lg:w-[270px] lg:h-[40px]" />

      <div className="flex flex-col lg:grid lg:gap-5 lg:grid-cols-[250px_1fr] lg:[grid-template-areas:'filters_restaurants'] gap-5">
        <div className="lg:[grid-area:filters]">
          <Filters
            isFilterActive={isFilterActive}
            handleFilterChange={handleFilterChange}
          />
        </div>

        <div className="lg:[grid-area:restaurants] min-w-0">
          <div className="flex gap-3 items-start overflow-x-auto overflow-y-hidden min-w-0 -mr-10 pr-10 mb-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((filter) => (
              <FilterCheckboxAlt
                key={filter.id}
                name={filter.id}
                label={filter.name}
                filterOptionDisabled={false}
                fieldName="filter"
                op="eq"
                value={filter.id}
                isApplied={isFilterActive("filter", filter.id)}
                handleFilterChange={handleFilterChange}
                imageUrl={filter.image_url}
                theme="secondary"
              />
            ))}
          </div>
          <div className="w-full min-w-0 overflow-hidden">
            <ResturantsListing filteredRestaurants={filteredRestaurants} />
          </div>
        </div>
      </div>
    </div>
  );
};
