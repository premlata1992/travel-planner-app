import { fsqApi } from "./axiosInstance";

export const getAttractions = async (lat: number, lon: number) => {
  const res = await fsqApi.get("/places/search",
    {
      params: {
        ll: `${lat},${lon}`,
        limit: 10,
      },
    }
  );

  return res.data.results;
};