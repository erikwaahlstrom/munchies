import { Badge } from "App/components/Badge";
import { Text } from "App/components/Text";
import { type Restaurant } from "../../../hooks/useRestaurantData";
import Image from "App/components/Image";
import { useRestaurantOpenStatus } from "../../../hooks/useRestaurantData";

export const CTACard = ({
  delivery_time_minutes,
  id,
  name,
  image_url,
}: Restaurant) => {
  const { data: openStatus } = useRestaurantOpenStatus(id);
  const isOpen = openStatus?.is_open;
  const deliveryTimeLabel = `${delivery_time_minutes} min`;

  return (
    <div key={id} className="p-4 border border-base-gray rounded-lg">
      <Badge status={isOpen} />
      <Badge label={deliveryTimeLabel} />

      <Text as="h3" typography="Bold/16" className="text-base-black mb-2">
        {name}
      </Text>

      <Image
        src={image_url}
        key={id}
        loading="lazy"
        alt={name}
        placeholder=""
        height="100%"
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
