import { useTheme } from "../contexts/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md p-2 text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5" strokeWidth={1.5} />
      ) : (
        <MoonIcon className="h-5 w-5" strokeWidth={1.5} />
      )}
    </button>
  );
}
