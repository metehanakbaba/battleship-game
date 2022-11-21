import { useEffect, useState } from 'react';

interface IUseDarkMode {
  theme: string;
  themeToggle: () => void;
  mountedComponent: boolean;
}

export const useDarkMode = (): IUseDarkMode => {
  const [theme, setTheme] = useState('light');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggle = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme ? setTheme(localTheme) : setMode('light');
    setMountedComponent(true);
  }, []);

  return { theme, themeToggle, mountedComponent };
};
