import { Text } from "App/components/Text";
import { type Restaurant } from "../../../hooks/useRestaurantData";
import { CTACard } from "App/components/CTACard";

export const ResturantsListing = ({
  filteredRestaurants,
}: {
  filteredRestaurants: Restaurant[];
}) => (
  <div className="w-full min-w-0">
    <Text typography="Regular/40" className="text-base-black mb-8">
      Restaurants ({filteredRestaurants.length})
    </Text>
    {filteredRestaurants.length === 0 ? (
      <Text typography="Regular/14" className="text-base-black-40">
        No restaurants match your filters.
      </Text>
    ) : (
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(280px,330px))] w-full min-w-0">
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
            <div key={`${id}-${i}`} className="min-w-0">
              <CTACard
                delivery_time_minutes={delivery_time_minutes}
                filter_ids={filter_ids}
                id={id}
                image_url={image_url}
                name={name}
                price_range_id={price_range_id}
                rating={rating}
              />
            </div>
          )
        )}
      </div>
    )}
  </div>
);
