import { useMemo } from "react";
import { FilterCheckbox } from "App/components/Filter/FilterCheckbox";
import {
  useAllFilters,
  useAllRestaurants,
  type Restaurant,
} from "../../../hooks/useRestaurantData";

const Filters = ({
  appliedFilters,
  handleFilterChange,
}: {
  appliedFilters: Set<string>;
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
    <>
      {/* Food type filters */}
      {filters.map((filter) => (
        <FilterCheckbox
          key={filter.id}
          name={filter.id}
          label={filter.name}
          filterOptionDisabled={false}
          fieldName="filter"
          op="eq"
          value={filter.id}
          isApplied={appliedFilters.has(filter.id)}
          handleFilterChange={handleFilterChange}
        />
      ))}

      {/* Delivery time filters */}
      {deliveryTimeFilters.map((time) => (
        <FilterCheckbox
          key={`delivery-${time}`}
          name={`delivery-${time}`}
          label={`${time} min`}
          filterOptionDisabled={false}
          fieldName="delivery_time"
          op="eq"
          value={time.toString()}
          isApplied={appliedFilters.has(time.toString())}
          handleFilterChange={handleFilterChange}
        />
      ))}
    </>
  );
};

export default Filters;
