import { useMemo } from "react";
import { FilterCheckbox } from "App/components/Filter/FilterCheckbox";
import { Text } from "App/components/Text";
import {
  useAllFilters,
  useAllRestaurants,
  useAllPriceRanges,
  type Restaurant,
} from "../../../hooks/useRestaurantData";

const Filters = ({
  isFilterActive,
  handleFilterChange,
}: {
  isFilterActive: (
    fieldName: "filter" | "delivery_time" | "price_range",
    value: string
  ) => boolean;
  handleFilterChange: (arg: {
    fieldName: string;
    op: string;
    selectedValue: string;
  }) => void;
}) => {
  const {
    filters,
    // isLoading: filtersLoading,
    // error: filtersError,
  } = useAllFilters();

  const { restaurants } = useAllRestaurants();
  const { priceRanges } = useAllPriceRanges(restaurants);

  // Extract unique delivery times from restaurants
  const deliveryTimeFilters = useMemo(() => {
    const uniqueTimes = new Set<number>();
    if (Array.isArray(restaurants)) {
      restaurants.forEach((restaurant: Restaurant) => {
        const deliveryTime = restaurant.delivery_time_minutes;
        if (typeof deliveryTime === "number" && deliveryTime > 0) {
          uniqueTimes.add(deliveryTime);
        }
      });
    }
    return Array.from(uniqueTimes).sort((a, b) => a - b);
  }, [restaurants]);


  return (
    <div className="flex flex-col gap-6">
      {/* Food type filters */}
      {filters.length > 0 && (
        <div className="flex flex-col gap-3">
          <Text
            as="h3"
            typography="Caps-Regular/12"
            className="text-base-black-40"
          >
            FOOD TYPE
          </Text>
          <div className="flex flex-col gap-3 items-start">
            {filters.map((filter) => (
              <FilterCheckbox
                key={filter.id}
                name={filter.id}
                label={filter.name}
                filterOptionDisabled={false}
                fieldName="filter"
                op="eq"
                value={filter.id}
                isApplied={isFilterActive("filter", filter.id)}
                handleFilterChange={handleFilterChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Delivery time filters */}
      {deliveryTimeFilters.length > 0 && (
        <div className="flex flex-col gap-3">
          <Text
            as="h3"
            typography="Caps-Regular/12"
            className="text-base-black-40"
          >
            DELIVERY TIME
          </Text>
          <div className="flex flex-col gap-3">
            {deliveryTimeFilters.map((time) => (
              <FilterCheckbox
                key={`delivery-${time}`}
                name={`delivery-${time}`}
                label={`${time} min`}
                filterOptionDisabled={false}
                fieldName="delivery_time"
                op="eq"
                value={time.toString()}
                isApplied={isFilterActive("delivery_time", time.toString())}
                handleFilterChange={handleFilterChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Price range filters */}
      {priceRanges.length > 0 && (
        <div className="flex flex-col gap-3">
          <Text
            as="h3"
            typography="Caps-Regular/12"
            className="text-base-black-40"
          >
            PRICE RANGE
          </Text>
          <div className="flex flex-row gap-3">
            {priceRanges.map((priceRange) => (
              <FilterCheckbox
                key={`price-${priceRange.id}`}
                name={`price-${priceRange.id}`}
                label={priceRange.data.range}
                filterOptionDisabled={false}
                fieldName="price_range"
                op="eq"
                value={priceRange.id}
                isApplied={isFilterActive("price_range", priceRange.id)}
                handleFilterChange={handleFilterChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
