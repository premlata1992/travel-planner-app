import { useEffect, useState } from "react";
import { getDashboardStats } from "../utils/dashboardStats";
import StatCard from "../components/common/StatCard";

export default function Home() {
  const [stats, setStats] = useState({
    totalTrips: 0,
    uniqueDestinations: 0,
    upcomingTrips: 0,
  });

  useEffect(() => {
    const data = getDashboardStats();
    setStats(data);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Dashboard
        </h1>
        <p className="text-neutral-500 text-sm dark:text-neutral-300">
          Effortlessly plan and explore your next adventure.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Planned"
          value={stats.totalTrips}
          color="text-accent-600"
        />

        <StatCard
          title="Upcoming"
          value={stats.upcomingTrips}
          color="text-secondary-600"
        />

        <StatCard
          title="Saved Destinations"
          value={stats.uniqueDestinations}
          color="text-primary-600"
        />
      </div>

      {/* Empty State */}
      {stats.totalTrips === 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center text-gray-500">
          No trips yet—start planning your next adventure! <br />
          Your adventure begins—search for a destination!
        </div>
      )}
    </div>
  );
}