import { Text } from "App/components/Text";
import { type Restaurant } from "../../../hooks/useRestaurantData";
import { CTACard } from "App/components/CTACard";

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
        {filteredRestaurants.map(
          (
            {
              delivery_time_minutes,
              filter_ids,
              id,
              image_url,
              name,
              price_range_id,
              rating,
            },
            i
          ) => (
            <CTACard
              key={`${id}-${i}`}
              delivery_time_minutes={delivery_time_minutes}
              filter_ids={filter_ids}
              id={id}
              image_url={image_url}
              name={name}
              price_range_id={price_range_id}
              rating={rating}
            />
          )
        )}
      </div>
    )}
  </div>
);
