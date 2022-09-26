import { useEffect, useState } from "react";

export default function useDarkMode() {
  const defaultTheme = "light";

  const [theme, setTheme] = useState(
    typeof window !== "undefined" &&
      (localStorage.getItem("theme") || defaultTheme)
  );

  const toggledTheme = theme === "dark" ? "light" : "dark";
  const toggleTheme = () => setTheme(toggledTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(toggledTheme);
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
}
