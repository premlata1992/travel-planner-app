import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWeather } from "../api/weatherApi";
import { getCountry } from "../api/countryApi";
import { getAttractions } from "../api/foursquareApi";
import SearchInput from "../components/search/SearchInput";
import WeatherCard from "../components/common/WeatherCard";
import CountryCard from "../components/common/CountryCard";
import Modal from "../components/common/Modal";


export default function SearchResults() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const city = params.get("city");
  const lat = Number(params.get("lat"));
  const lon = Number(params.get("lon"));
  const countryCode = params.get("country");

  const [weather, setWeather] = useState<any>(null);
  const [country, setCountry] = useState<any>(null);
  const [attractions, setAttractions] = useState<any[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // RESET
  useEffect(() => {
    if (!city) {
      setWeather(null);
      setCountry(null);
      setAttractions([]);
    }
  }, [city]);

  // WEATHER
  useEffect(() => {
    if (!lat || !lon) return;
    getWeather(lat, lon).then(setWeather);
  }, [lat, lon]);

  // COUNTRY
  useEffect(() => {
    if (!countryCode) return;
    getCountry(countryCode).then(setCountry);
  }, [countryCode]);

  // ATTRACTIONS
  useEffect(() => {
    if (!lat || !lon) return;
    getAttractions(lat, lon).then(setAttractions);
  }, [lat, lon]);

  const handleScheduleTrip = () => {
    if (!startDate || !endDate) {
      showToast("Please select dates");
      return;
    }

    const trip = {
      id: Date.now().toString(),
      city,
      lat,
      lon,
      weather: {
        temp: weather?.main?.temp,
        condition: weather?.weather?.[0]?.main,
        description: weather?.weather?.[0]?.description,
        feels_like: weather?.main?.feels_like,
        humidity: weather?.main?.humidity,
        wind: weather?.wind?.speed,
        clouds: weather?.clouds?.all,
      },
      country: {
        name: country?.name?.common,
        flag: country?.flags?.png,
        capital: country?.capital?.[0],
        region: country?.region,
        population: country?.population,
        currency: (Object.values(country?.currencies || {})?.[0] as any)?.name,
        languages: Object.values(country?.languages || {})?.join(", "),
      },
      attractions: attractions.slice(0, 8),
      startDate,
      endDate,
      savedAt: new Date().toISOString(),
    };

    const stored =
      JSON.parse(localStorage.getItem("savedTrips") || "[]");

    const index = stored.findIndex(
      (t: any) => t.lat === lat && t.lon === lon
    );

    if (index !== -1) {
      stored[index] = { ...stored[index], ...trip };
      showToast("Trip updated ✨");
    } else {
      stored.unshift(trip);
      showToast("Trip scheduled 🎉");
    }

    localStorage.setItem("savedTrips", JSON.stringify(stored));

    setOpenModal(false);
    setStartDate("");
    setEndDate("");
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="space-y-8 px-2 sm:px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
             Search Trips
          </h1>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Search and explore travel destinations
          </p>
        </div>
        </div>
      
      {/* Search */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 
dark:bg-none dark:bg-gray-800 
p-4 rounded-2xl">
        <SearchInput />
      </div>

      {/* ✅ FIXED CONDITION */}
      {city ? (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {city}
              </h1>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                Check the weather and explore attractions
              </p>
            </div>

            {weather && country && attractions.length > 0 && (
              <button
                onClick={() => setOpenModal(true)}
                className="bg-purple-600 text-white px-5 py-2 rounded-xl"
              >
                📅 Schedule Trip
              </button>
            )}
          </div>

          {/* Weather */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <CountryCard country={country} />
  <WeatherCard weather={weather} />
</div>

        </>
      ) : (
        <div className="text-center text-gray-400">
          Search for a destination
        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Schedule Trip"
      >
        <div >
            <p className="text-gray-500 text-sm mb-4 dark:text-gray-400">
              {city}
            </p>

            <input
              type="date"
              className="w-full border p-2 mb-3 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <input
              type="date"
              className="w-full border p-2 mb-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                Maybe Later
              </button>

              <button
                onClick={handleScheduleTrip}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                Confirm Trip
              </button>
            </div>
          </div>
      
      </Modal>

     

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded">
          {toast}
        </div>
      )}
    </div>
  );
}