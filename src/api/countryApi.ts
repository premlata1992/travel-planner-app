import { countryApi } from "./axiosInstance";

export const getCountry = async (countryCode: string) => {
  const res = await countryApi.get(`/${countryCode}`);
  return res.data[0];
};