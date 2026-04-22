import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedTrips() {
  const [trips, setTrips] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("latest");

  const navigate = useNavigate();

  // Load data
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedTrips") || "[]");
    setTrips(stored);
  }, []);

  // Delete
  const handleDelete = (id: string) => {
    if (!id) return;

    const updated = trips.filter((trip) => trip.id !== id);
    setTrips(updated);
    localStorage.setItem("savedTrips", JSON.stringify(updated));
  };

  // Sorting
  const sortedTrips = [...trips].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime();
    }
    if (sortBy === "city") {
      return (a.city || "").localeCompare(b.city || "");
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
             Saved Trips
          </h1>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Manage your saved travel plans
          </p>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="city">City (A-Z)</option>
        </select>
      </div>

      {/* Empty */}
      {trips.length === 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center text-gray-500">
          <p className="text-gray-500 text-sm dark:text-gray-400">No saved trips yet 🌍</p>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTrips.map((trip, index) => {
          // ✅ SAFE COUNTRY NAME (handles object/string)
          const countryName =
            typeof trip.country?.name === "object"
              ? trip.country?.name?.common
              : trip.country?.name || "N/A";

          return (
            <div
              key={trip.id || index}
              className="bg-white dark:bg-gray-800 
border border-gray-100 dark:border-gray-700 
shadow-md dark:shadow-lg 
hover:shadow-xl dark:hover:shadow-2xl 
rounded-2xl p-5 transition hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  📍 {trip.city || "Unknown"}
                </h2>

                <button
                  onClick={() => handleDelete(trip.id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  ❌
                </button>
              </div>

              {/* Country */}
              <div className="flex items-center gap-2 mt-2">
                {trip.country?.flag && (
                  <img
                    src={trip.country.flag}
                    className="w-6 h-4 rounded"
                  />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {countryName}
                </span>
              </div>

              {/* Weather */}
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                🌦 {trip.weather?.temp ?? "N/A"}°C
                {trip.weather?.condition
                  ? `, ${trip.weather.condition}`
                  : ""}
              </div>

              {/* Attractions */}
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Top Attractions:
                </p>
                <ul className="text-xs text-gray-500 mt-1 space-y-1 dark:text-gray-400">
                  {trip.attractions?.slice(0, 3).map((a: any, i: number) => (
                    <li key={a?.fsq_id || i}>
                      • {a?.name || "Unknown"}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-3">
                Saved on:{" "}
                {trip.savedAt
                  ? new Date(trip.savedAt).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* View Details */}
              <button
                onClick={() => navigate(`/trip/${trip.id}`)}
                className="mt-4 text-blue-600 text-sm hover:underline"
              >
                View Details →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}