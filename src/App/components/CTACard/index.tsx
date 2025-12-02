import { Badge } from "App/components/Badge";
import { Text } from "App/components/Text";
import { type Restaurant } from "../../../hooks/useRestaurantData";
import Image from "App/components/Image";
import { useRestaurantOpenStatus } from "../../../hooks/useRestaurantData";
import { CTAFooter } from "App/components/CTACard/CTAFooter";

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

      <CTAFooter name={name} />
    </div>
  );
};

export default CTACard;
