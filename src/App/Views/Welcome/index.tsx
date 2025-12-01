import { Link } from "react-router-dom";
import { Text } from "App/components/Text";
import { Logo } from "assets/media/Icons/Logo";

export const Welcome = () => {
  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-left justify-between">
      <Logo />

      <div>
        <Text
          as="h1"
          typography="Regular/48"
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

      <Link
        to="/resturants"
        className="inline-flex items-center justify-center gap-2"
        style={{
          width: "327px",
          height: "56px",
          borderRadius: "8px",
          borderWidth: "1px",
          paddingTop: "20px",
          paddingRight: "24px",
          paddingBottom: "20px",
          paddingLeft: "24px",
          gap: "8px",
        }}
      >
        <Text typography="Bold/14" className="text-base-white">
          Go to Restaurants
        </Text>
      </Link>
    </div>
  );
};
