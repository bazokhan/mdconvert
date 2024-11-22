import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./Button";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="secondary"
      className="p-2"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
