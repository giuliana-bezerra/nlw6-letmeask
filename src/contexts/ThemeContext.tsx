import { createContext, ReactNode } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import usePersistedState from '../hooks/usePersistedState';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

type ThemeContextProps = {
  theme: DefaultTheme;
  toggleTheme: () => void;
};

type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {props.children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
