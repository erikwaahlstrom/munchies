import { Badges } from "App/components/Badges";
import { Text } from "App/components/Text";
import { type Restaurant } from "../../../hooks/useRestaurantData";
import Image from "App/components/Image";

export const CTACard = ({
  delivery_time_minutes,
  id,
  name,
  image_url,
}: Restaurant) => {
  return (
    <div key={id} className="p-4 border border-base-gray rounded-lg">
      <Badges />

      <Text as="h3" typography="Bold/16" className="text-base-black mb-2">
        {name}
      </Text>

      <Image
        alt={name}
        height="100%"
        key={id}
        loading="lazy"
        placeholder=""
        src={image_url}
      />

      {typeof delivery_time_minutes === "number" && (
        <Text typography="Regular/14" className="text-base-black-40">
          {delivery_time_minutes} min delivery
        </Text>
      )}
    </div>
  );
};

export default CTACard;
