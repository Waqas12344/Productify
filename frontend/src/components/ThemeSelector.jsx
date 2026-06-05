import { useEffect, useState } from "react";
import { PaletteIcon, CheckIcon, SearchIcon, ChevronDownIcon } from "lucide-react";

const THEMES = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset",
];

function ThemeSelector() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "forest";
    }
    return "forest";
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filtered = THEMES.filter((t) =>
    t.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1.5">
        <PaletteIcon className="size-4" />
        <span className="hidden sm:inline capitalize">{theme}</span>
        <ChevronDownIcon className="size-3 opacity-50" />
      </div>

      <div className="dropdown-content bg-base-100 rounded-2xl z-50 w-72 shadow-2xl border border-base-300 mt-2 overflow-hidden">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-base-200">
          <SearchIcon className="size-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search themes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder:text-base-content/30"
          />
        </div>

        {/* Grid */}
        <ul className="p-2 max-h-80 overflow-y-auto grid grid-cols-2 gap-1">
          {filtered.length === 0 && (
            <li className="col-span-2 py-6 text-center text-sm text-base-content/40">
              No themes found
            </li>
          )}
          {filtered.map((t) => (
            <li key={t}>
              <button
                onClick={() => setTheme(t)}
                className={`w-full flex flex-col gap-1.5 p-2.5 rounded-xl text-left transition-all border ${
                  theme === t
                    ? "border-base-content/20 bg-base-200"
                    : "border-transparent hover:bg-base-200 hover:border-base-content/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium capitalize">{t}</span>
                  {theme === t && <CheckIcon className="size-3 text-success" />}
                </div>
                {/* Color swatches rendered under that theme's data-theme */}
                <div className="flex gap-0.5" data-theme={t}>
                  <span className="h-5 flex-1 rounded bg-primary" />
                  <span className="h-5 flex-1 rounded bg-secondary" />
                  <span className="h-5 flex-1 rounded bg-accent" />
                  <span className="h-5 flex-1 rounded bg-neutral" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ThemeSelector;