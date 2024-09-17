// src/hooks/useTheme.js
import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("darkmode") === "true" ? "dark" : "light"
  );

  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme =
        localStorage.getItem("darkmode") === "true" ? "dark" : "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  return [theme, setTheme];
};
