import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Game from './Game';
import { GlobalStyles } from './assets/GlobalStyle';
import { lightTheme, darkTheme } from './assets/Theme';
import Toggle from './components/Toggle';
import Logo from './assets/images/Logo';
import { GlobalFonts } from './assets/GlobalFonts';
import { useDarkMode } from './hooks/useDarkMode';

const App: React.FunctionComponent<any> = () => {
  const { theme, themeToggle } = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalFonts />
      <GlobalStyles />
      <Header>
        <Logo />
        <Toggle theme={theme} toggleTheme={themeToggle} />
      </Header>
      <MainWrapper>
        <Game />
      </MainWrapper>
    </ThemeProvider>
  );
};

const MainWrapper = styled.main`
  margin-top: 3rem;
`;

const Header = styled.main`
  display: flex;
  height: 48px;
  background: ${({ theme }) => theme.header};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 6px;
`;

export default App;
