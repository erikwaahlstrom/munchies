import { Text } from "App/components/Text";
import { type Restaurant } from "../../../hooks/useRestaurantData";

export const ResturantsListing = ({
  filteredRestaurants,
}: {
  filteredRestaurants: Restaurant[];
}) => (
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
            <Text as="h3" typography="Bold/16" className="text-base-black mb-2">
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
);
