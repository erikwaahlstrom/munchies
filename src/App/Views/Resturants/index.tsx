import { useState } from "react";
import { Text } from "App/components/Text";
import { Logo } from "assets/media/Icons/Logo";
import { useAllRestaurants } from "../../../hooks/useRestaurantData";
import Filters from "App/components/Filter/Filters";

export const Resturants = () => {
  const { isLoading, error } = useAllRestaurants();

  const [appliedFilters, setAppliedFilters] = useState<Set<string>>(new Set());

  const handleFilterChange = ({
    selectedValue,
  }: {
    fieldName: string;
    op: string;
    selectedValue: string;
  }) => {
    setAppliedFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(selectedValue)) {
        newSet.delete(selectedValue);
      } else {
        newSet.add(selectedValue);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-left">
      <Logo className="text-base-black" />

      <div className="flex flex-col gap-3 mt-6">
        <Filters
          appliedFilters={appliedFilters}
          handleFilterChange={handleFilterChange}
        />
      </div>

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
