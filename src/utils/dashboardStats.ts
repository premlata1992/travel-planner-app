export function getDashboardStats() {
  const trips = JSON.parse(localStorage.getItem("savedTrips") || "[]");

  if (!Array.isArray(trips) || trips.length === 0) {
    return {
      totalTrips: 0,
      uniqueDestinations: 0,
      upcomingTrips: 0,
    };
  }

  const today = new Date();

  const totalTrips = trips.length;

  const uniqueDestinations = new Set(
    trips.map((t: any) => t.city)
  ).size;

  const upcomingTrips = trips.filter((t: any) => {
    if (!t.startDate) return false;
    return new Date(t.startDate) >= today;
  }).length;

  return {
    totalTrips,
    uniqueDestinations,
    upcomingTrips,
  };
}