export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t text-center py-3 text-sm text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} Travel Planner Application • All rights reserved
    </footer>
  );
}