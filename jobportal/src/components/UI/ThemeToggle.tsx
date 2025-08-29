"use client";

import * as Switch from "@radix-ui/react-switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-3">
      <Switch.Root
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="w-10 h-10 shadow-md rounded-full relative"
      >
        {
          theme === "dark" ? "🌙" : "🔆"
        }
      </Switch.Root>
    </div>
  );
}
