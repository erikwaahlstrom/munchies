import { CTAButton } from "App/components/CTAButton";
import { Text } from "App/components/Text";

export const CTAFooter = ({ name }: { name: string }) => {
  return (
    <div className="flex gap-2 justify-between">
      <Text as="h3" typography="Bold/16" className="text-base-black mb-2">
        {name}
      </Text>

      <CTAButton theme="primary" />
    </div>
  );
};
