import { Text } from "App/components/Text";

export const Welcome = () => {
  return (
    <div className="min-h-screen w-full p-8">
      {/* Using Text component with Tailwind classes */}
      <Text as="h1" className="text-base-red text-4xl font-bold mb-4">
        Welcome Page
      </Text>

      {/* Background colors */}
      <div className="bg-base-red text-base-white p-6 rounded-lg mb-4">
        <Text>Red background with white text</Text>
      </div>
    </div>
  );
};
