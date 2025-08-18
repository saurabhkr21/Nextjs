"use client";
import { createContext, useState } from "react";
import { Theme } from "@radix-ui/themes";
import { ReactNode } from "react";
type ThemeContextType = {
  isDark: boolean;
  setIsDark: ((x: boolean) => void) | null;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  setIsDark: null,
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Theme appearance={isDark ? "dark" : "light"}>{children}</Theme>
    </ThemeContext.Provider>
  );
}
