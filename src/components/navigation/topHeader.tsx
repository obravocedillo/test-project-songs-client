import { NavLink } from "react-router";

const navLinks = [
  { label: "Songs", to: "/songs" },
  { label: "Artists", to: "/artists" },
  { label: "Genres", to: "/genres" },
];

export const TopHeader = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 h-16 items-center">
          {/* Logo - left */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-gray-900 text-lg">SongApp</span>
          </div>

          {/* Nav - center */}
          <nav className="flex items-center justify-center gap-8">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-semibold text-indigo-600 border-b-2 border-indigo-600 pb-0.5"
                    : "text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right placeholder to keep nav truly centered */}
          <div />
        </div>
      </div>
    </header>
  );
};
