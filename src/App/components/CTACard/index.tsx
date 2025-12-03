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
    <div
      key={id}
      className={`bg-base-white p-4 border border-base-black-10 rounded-lg relative overflow-hidden min-h-52 flex flex-col justify-between ${
        !isOpen
          ? "after:content-[''] after:absolute after:inset-0 after:bg-base-white-80"
          : null
      }`}
    >
      <div>
        <div className="flex flex-row gap-2">
          <Badge status={isOpen} />
          <Badge label={deliveryTimeLabel} />
        </div>

        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Badge
              label="Opens tomorrow at 12pm"
              className="bg-ui-background-primary rounded-[4px]"
            />
          </div>
        )}

        <div className="absolute -top-6 -right-4">
          <Image
            src={image_url}
            key={id}
            loading="lazy"
            alt={name}
            className="object-cover w-35 h-35"
          />
        </div>
      </div>

      <div>
        {typeof delivery_time_minutes === "number" && (
          <Text typography="Regular/14" className="text-base-black-40">
            {delivery_time_minutes} min delivery
          </Text>
        )}

        <CTAFooter name={name} />
      </div>
    </div>
  );
};

export default CTACard;
