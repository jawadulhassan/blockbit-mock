import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

// import { backgroundColor, textColor } from './theme';

const ThemeToggleContext = React.createContext();

export const useTheme = () => React.useContext(ThemeToggleContext);

export const MyThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = React.useState({
    mode: 'light',
  });

  const Wrapper = styled.div`
    background-color: #fff;
    width: 100%;
    height: 100vh;
  `;

  const toggle = () => {
    const mode = themeState.mode === 'light' ? `dark` : `light`;
    setThemeState({ mode: mode });
  };

  return (
    <ThemeToggleContext.Provider value={{ toggle: toggle }}>
      <ThemeProvider
        theme={{
          mode: themeState.mode,
        }}
      >
        <Wrapper>{children}</Wrapper>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;
