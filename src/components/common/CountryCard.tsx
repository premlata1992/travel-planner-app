export default function CountryCard({ country }: any) {
  if (!country) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <p className="text-gray-400">Loading country...</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-primary-100 dark:border-neutral-700">
      <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">🌍 Country Info</h2>

      <div className="flex items-center gap-3 mb-3">
        <img
          src={country.flags.png}
          className="w-10 h-6 rounded shadow"
        />
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          {country.name.common}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600 dark:text-neutral-300">
        <p>🏛 Capital: {country.capital?.[0]}</p>
        <p>🌐 Region: {country.region}</p>

        <p>
          💰 Currency:{" "}
          {country.currencies
            ? Object.values(country.currencies)
                .map((c: any) => `${c.name} (${c.symbol})`)
                .join(", ")
            : "N/A"}
        </p>

        <p>
          🗣 Languages:{" "}
          {country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A"}
        </p>

        <p className="col-span-2">
          👥 Population: {country.population.toLocaleString()}
        </p>
      </div>
    </div>
  );
}