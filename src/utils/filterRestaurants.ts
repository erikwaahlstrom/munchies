import type { Restaurant } from "../hooks/useRestaurantData";
import type { FilterState } from "../hooks/useFilterParams";

export const filterRestaurants = (
  restaurants: Restaurant[],
  filterState: FilterState
): Restaurant[] => {
  const { filterIds, deliveryTimes, priceRangeIds } = filterState;

  if (
    filterIds.size === 0 &&
    deliveryTimes.size === 0 &&
    priceRangeIds.size === 0
  ) {
    return restaurants;
  }

  return restaurants.filter((restaurant) => {
    if (filterIds.size > 0) {
      const ids = restaurant.filter_ids;
      if (!Array.isArray(ids) || !ids.some((id) => filterIds.has(id))) {
        return false;
      }
    }

    if (deliveryTimes.size > 0) {
      const time = restaurant.delivery_time_minutes;
      if (
        typeof time !== "number" ||
        time <= 0 ||
        !deliveryTimes.has(time.toString())
      ) {
        return false;
      }
    }

    if (priceRangeIds.size > 0) {
      const priceId = restaurant.price_range_id;
      if (
        typeof priceId !== "string" ||
        !priceId ||
        !priceRangeIds.has(priceId)
      ) {
        return false;
      }
    }

    return true;
  });
};
