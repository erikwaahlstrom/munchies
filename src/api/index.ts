const API_BASE_URL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api";

// Helper function to handle fetch response and errors
const handleFetchResponse = async (response: Response) => {
  if (!response.ok) {
    // Attempt to read error message from body if available
    let errorDetail = `HTTP error! Status: ${response.status}`;
    try {
      const errorBody = await response.json();
      errorDetail = errorBody.message || errorDetail;
    } catch {
      // Ignore if body is not JSON
    }
    throw new Error(errorDetail);
  }
  return response.json();
};

// GET all restaurants
export const getAllRestaurants = async () => {
  const url = `${API_BASE_URL}/restaurants`;
  const response = await fetch(url);
  return handleFetchResponse(response);
};

// GET a restaurant by id
export const getRestaurantById = async (id: string) => {
  const url = `${API_BASE_URL}/restaurants/${id}`;
  const response = await fetch(url);
  return handleFetchResponse(response);
};

// GET all filters
export const getAllFilters = async () => {
  const url = `${API_BASE_URL}/filter`;
  const response = await fetch(url);
  return handleFetchResponse(response);
};

// GET the open status of a restaurant
export const getRestaurantOpenStatus = async (id: string) => {
  const url = `${API_BASE_URL}/open/${id}`;
  const response = await fetch(url);
  return handleFetchResponse(response);
};

// GET the price range of a restaurant
export const getPriceRangeById = async (id: string) => {
  const url = `${API_BASE_URL}/price-range/${id}`;
  const response = await fetch(url);
  return handleFetchResponse(response);
};
