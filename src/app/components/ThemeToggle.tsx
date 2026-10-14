import { useTheme } from "../contexts/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-md text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
      aria-label="Toggle theme"
    >
      <SunIcon
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
        strokeWidth={1.5}
      />
      <MoonIcon
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          theme === "dark"
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
        strokeWidth={1.5}
      />
    </button>
  );
}
