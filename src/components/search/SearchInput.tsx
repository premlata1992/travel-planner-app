import { useState, useEffect, useRef } from "react";
import { searchCities } from "../../api/cityApi";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

type City = {
  id: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(query, 500);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 🔥 THIS IS THE FIX
  const skipNextFetch = useRef(false);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ API call
  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }

    if (debounced.trim().length > 1) {
      setLoading(true);

      searchCities(debounced)
        .then((data) => {
          setCities(data || []);
          setShowSuggestions(true);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setCities([]);
      setShowSuggestions(false);
    }
  }, [debounced]);

  // ✅ Select city
  const handleSelect = (city: City) => {
    skipNextFetch.current = true; // 🔥 prevent re-open

    setShowSuggestions(false);
    setCities([]);
    setQuery(city.city);

    navigate(
      `/search?city=${city.city}&lat=${city.latitude}&lon=${city.longitude}&country=${city.countryCode}`
    );
  };

  // ✅ Clear input
  const handleClear = () => {
    setQuery("");
    setCities([]);
    setShowSuggestions(false);
    navigate("/search");
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      
      {/* Input */}
      <div className="flex items-center w-full rounded-full px-4 py-3
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition">

        <span className="text-gray-400 mr-3">🔍</span>

        <input
          type="text"
          placeholder="Search city, country, or destination..."
          className="flex-1 bg-transparent outline-none
            text-gray-700 dark:text-gray-200
            placeholder-gray-400 dark:placeholder-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (cities.length > 0) setShowSuggestions(true);
          }}
        />

        {query && (
          <button
            onClick={handleClear}
            className="ml-2 text-gray-400 hover:text-red-500 transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <ul className="absolute z-50 w-full mt-3 rounded-xl overflow-hidden max-h-60 overflow-y-auto
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          shadow-xl">

          {loading && (
            <li className="px-4 py-3 text-gray-500 text-sm">
              Searching...
            </li>
          )}

          {!loading && cities.length === 0 && (
            <li className="px-4 py-3 text-gray-500 text-sm">
              No results found
            </li>
          )}

          {cities.map((city) => (
            <li
              key={city.id}
              onMouseDown={() => handleSelect(city)}
              className="px-4 py-3 flex justify-between items-center cursor-pointer
                hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  {city.city}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {city.country}
                </p>
              </div>

              <span className="text-xs text-gray-400">→</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}