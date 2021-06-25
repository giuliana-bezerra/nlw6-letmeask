import { shade } from 'polished';
import Switch from 'react-switch';
import { useTheme } from '../hooks/useTheme';
import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

export function ThemeSwitcher() {
  const { toggleTheme } = useTheme();
  const { colors, title } = useContext(ThemeContext);

  return (
    <Switch
      onChange={toggleTheme}
      checked={title === 'dark'}
      checkedIcon={false}
      uncheckedIcon={false}
      height={10}
      width={40}
      handleDiameter={20}
      offColor={shade(0.15, colors.primary)}
      onColor={colors.secondary}
    />
  );
}
