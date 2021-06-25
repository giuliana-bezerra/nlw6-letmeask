import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
