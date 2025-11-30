import { Text } from "App/components/Text";
import { Logo } from "assets/Media/Icons/Logo";

export const Welcome = () => {
  return (
    <div className="min-h-screen w-full p-6">
      <Logo />
      {/* Using Text component with Tailwind classes */}
      <Text as="h1" className="text-base-red text-4xl font-bold mb-4">
        Welcome Page
      </Text>

      {/* Background colors */}
      <div className="bg-base-red text-base-white p-4 rounded-lg mb-4">
        <Text>Red background with white text</Text>
      </div>
    </div>
  );
};
