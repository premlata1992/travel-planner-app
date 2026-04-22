import { weatherApi } from './axiosInstance';

export const getWeather = async (lat: number, lon: number) => {
  const res = await weatherApi.get(
    "/weather",
    {
      params: {
        lat,
        lon,
        appid: import.meta.env.VITE_WEATHER_KEY,
        units: "metric",
      },
    })
    return res.data;
};