import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import { getUser, logout } from "../../utils/auth";

export default function Header({ toggleSidebar, showUserGreeting = true }: any) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const user = getUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 flex items-center justify-between px-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-b border-primary-200 dark:border-neutral-700 transition-colors duration-300">
      
      {/* Left: Branding/Context */}
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition" 
          onClick={toggleSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        
        <div className="hidden md:block">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 tracking-tight">
            Travel Planner Application
          </h2>
          {showUserGreeting && user && (
            <p className="text-xs font-medium text-accent-600 dark:text-accent-400">
              Welcome, {user?.name.split(' ')[0]}!
            </p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        
        {/* Modern Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-100 dark:border-gray-700 transition-all shadow-sm"
        >
          {theme === "dark" ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
          )}
        </button>

        {/* User Profile */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 pl-1 pr-4 py-1 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              <div className="relative">
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
              </div>
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{user.name}</span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tighter">Premium User</span>
              </div>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Premium Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-primary-200 dark:border-neutral-700 overflow-hidden ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in duration-200 z-50">
                <div className="px-5 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-semibold text-gray-400 uppercase">Account</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{user.email}</p>
                </div>
                
                <div className="p-2">
                  <button
                    onClick={() => { navigate("/saved-trips"); setOpen(false); }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition"
                  >
                    <span>💾</span> Saved Trips
                  </button>
                  <button
                    onClick={() => { logout(); navigate("/login"); }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                  >
                    <span>🚪</span> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}