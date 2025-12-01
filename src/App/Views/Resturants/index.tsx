import { useMemo } from "react";
import { Text } from "App/components/Text";
import { Logo } from "assets/media/Icons/Logo";
import { useAllRestaurants } from "../../../hooks/useRestaurantData";
import { useFilterParams } from "../../../hooks/useFilterParams";
import { filterRestaurants } from "../../../utils/filterRestaurants";
import Filters from "App/components/Filter/Filters";

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

      <div className="flex flex-col gap-3 mt-6">
        <Filters
          isFilterActive={isFilterActive}
          handleFilterChange={handleFilterChange}
        />
      </div>

      <div className="mt-6">
        <Text
          as="h2"
          typography="Caps-Regular/12"
          className="text-base-black-40 mb-4"
        >
          RESTAURANTS ({filteredRestaurants.length})
        </Text>

        {filteredRestaurants.length === 0 ? (
          <Text typography="Regular/14" className="text-base-black-40">
            No restaurants match your filters.
          </Text>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="p-4 border border-base-gray rounded-lg"
              >
                <Text
                  as="h3"
                  typography="Bold/16"
                  className="text-base-black mb-2"
                >
                  {restaurant.name}
                </Text>
                {typeof restaurant.delivery_time_minutes === "number" && (
                  <Text typography="Regular/14" className="text-base-black-40">
                    {restaurant.delivery_time_minutes} min delivery
                  </Text>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
