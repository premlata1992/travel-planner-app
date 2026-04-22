import axios from "axios";

const createApiClient = (baseURL: string, options = {}) => {
  return axios.create({
    baseURL,
    ...options,
  });
};

export const cityApi = createApiClient(import.meta.env.VITE_RAPIDAPI_BASE_URL, {
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
  },
}
);

export const weatherApi = createApiClient(import.meta.env.VITE_WEATHER_API_URL);

export const countryApi = createApiClient(import.meta.env.VITE_COUNTRY_API_URL);

export const fsqApi = createApiClient("/api/fsq", {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_FOURSQUARE_KEY}`,
    Accept: "application/json",
    "X-Places-Api-Version": "2025-06-17",
  },
});
