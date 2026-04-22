export default function StatCard({
  title,
  value,
  color,
}: any) {
  return (
    <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-primary-100 dark:border-neutral-700">
      <p className="text-sm text-neutral-500 dark:text-neutral-300">{title}</p>

      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  );
}