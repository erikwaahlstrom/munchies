import { Text } from "App/components/Text";
import { Logo } from "assets/media/Icons/Logo";

export const Resturants = () => {
  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-left justify-between">
      <Logo className="text-base-black" />

      <div>
        <Text
          as="h2"
          typography="Caps-Regular/12"
          className="text-base-black-40"
        >
          Trea
        </Text>
      </div>
    </div>
  );
};
