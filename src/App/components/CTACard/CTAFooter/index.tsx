import { CTAButton } from "App/components/CTAButton";
import { Text } from "App/components/Text";

export const CTAFooter = ({ name }: { name: string }) => {
  return (
    <div className="flex gap-2 justify-between items-end">
      <Text as="h3" typography="Regular/24" className="text-base-black">
        {name}
      </Text>

      <CTAButton theme="primary" />
    </div>
  );
};
