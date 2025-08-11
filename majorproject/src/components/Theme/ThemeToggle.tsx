'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@radix-ui/themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="soft"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
      {/* {theme === 'light' ? 'Dark Mode' : 'Light Mode'} */}
    </Button>
  );
}
