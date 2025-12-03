import { Text } from "App/components/Text";
import { Logo } from "../../../assets/media/icons/Logo.tsx";
import { LinkButton } from "App/components/LinkButton";

export const Welcome = () => {
  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-left justify-between bg-ui-background-secondary">
      <Logo />

      <div>
        <Text
          as="h1"
          typography="Bold/48"
          className="text-base-white mb-[16px]"
        >
          Treat
          <br /> yourself.
        </Text>
        <Text typography="Regular/14" className="text-base-white">
          Find the best restaurants in your city and get it delivered to your
          place!
        </Text>
      </div>

      <LinkButton to="/resturants" typography="Bold/16">
        Continue
      </LinkButton>
    </div>
  );
};
