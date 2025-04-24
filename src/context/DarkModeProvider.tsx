"use client";
import { useEffect, useState, createContext } from "react";
import { DarkModeContextType, DarkModeProviderProps, ThemeType } from "../types";

const DarkModeContext = createContext<DarkModeContextType>(null!);

const DarkProvider = ({ children }: DarkModeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const colorTheme = theme === "dark" ? "light" : "dark";
  const [darkSide, setDarkSide] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme as ThemeType);
    setDarkSide(savedTheme === "dark");
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [colorTheme, theme]);

  const toggleDarkMode = (checked: boolean): void => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setDarkSide(checked);
  };

  return (
    <DarkModeContext.Provider
      value={{
        theme,
        setTheme,
        colorTheme,
        darkSide,
        setDarkSide,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkProvider };
export default DarkModeContext;
