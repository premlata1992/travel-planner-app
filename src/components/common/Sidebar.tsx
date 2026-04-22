import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, collapsed, setCollapsed }: any) {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Search", path: "/search", icon: "🔍" },
    { name: "Saved Trips", path: "/saved-trips", icon: "💾" },
  ];

  return (
    <aside
      className={`fixed md:relative z-50 h-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-r border-primary-200 dark:border-neutral-700 transition-all duration-300 ease-in-out
      ${collapsed ? "w-20" : "w-64"}
      ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Logo Area */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-primary-200 dark:border-neutral-700">
        {!collapsed && (
          <span className="font-bold text-xl bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
            Travel Planner Application
          </span>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-primary-100 dark:bg-neutral-800 hover:bg-primary-200 dark:hover:bg-neutral-700 transition"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
              ${isActive 
                ? "bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 shadow-sm" 
                : "text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-neutral-800 hover:text-neutral-900"
              }`
            }
          >
            <span className={`text-lg transition-transform group-hover:scale-110`}>
              {item.icon}
            </span>
            {!collapsed && <span className="truncate">{item.name}</span>}
            
            {/* Tooltip for collapsed mode would go here */}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}