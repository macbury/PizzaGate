import React, { useMemo } from 'react'
import { StatusBar } from 'react-native'
import { useMediaQuery } from 'react-responsive'
import { ThemeProvider } from 'styled-components/native'
import useSetNavBarColor from '../helpers/useSetNavBarColor'
import GlobalStyles from '../components/GlobalStyles'
import useSystemTheme from '../helpers/useSystemTheme'
type Device = 'desktop' | 'mobile'

export type Theme = {
  device: Device;
  dark: boolean;
  font: {
    main: string,
  },
  fontSize: {
    searchInput: string;
    text: string;
    label: string;
    inputText: string;
    buttonText: string;
  },
  opacity: {
    buttonClick: number;
  },
  colors: {
    cardBackground: string,
    tabActive: string,
    placeholder: string;
    navigationBar: string;
    statusBar: string;
    notificationTextColor: string;
    error: string;
    label: string;
    buttonTextColor: string;
    inputText: string;
    inputBackground: string;
    inputBorder: string;
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

export const light : Theme = {
  device: 'desktop',
  dark: false,
  font: {
    main: 'Roboto-Regular'
  },
  fontSize: {
    text: '16px',
    label: '15px',
    searchInput: '16px',
    inputText: '19px',
    buttonText: '15px'
  },
  opacity: {
    buttonClick: 0.6
  },
  colors: {
    tabActive: '#fff',
    placeholder: 'rgba(0, 0, 0, 0.3)',
    statusBar: '#b44756',
    navigationBar: '#000000',
    notificationTextColor: '#fff',
    error: 'rgb(224, 36, 94)',
    buttonTextColor: '#fff',
    inputText: '#333',
    inputBackground: 'rgba(0, 0, 0, 0.05)',
    inputBorder: 'rgba(0, 0, 0, 0.08)',
    label: 'rgba(0, 0, 0, 0.5)',
    primary: '#b44756',
    background: 'rgb(242, 242, 242)',
    cardBackground: 'rgb(255, 255, 255)',
    card: '#b44756',
    text: '#555',
    border: '#b44756',
    notification: 'rgb(255, 59, 48)',
  }
}

export const dark : Theme = {
  device: 'desktop',
  dark: true,
  font: {
    main: 'Roboto-Regular'
  },
  fontSize: {
    searchInput: '16px',
    text: '14px',
    label: '15px',
    inputText: '19px',
    buttonText: '15px'
  },
  opacity: {
    buttonClick: 0.6
  },
  colors: {
    tabActive: '#fff',
    placeholder: 'rgba(255, 255, 255, 0.5)',
    statusBar: '#b44756',
    navigationBar: '#161616',
    notificationTextColor: '#fff',
    error: 'rgb(224, 36, 94)',
    buttonTextColor: '#fff',
    inputText: '#fff',
    inputBackground: 'rgba(255, 255, 255, 0.05)',
    inputBorder: 'rgba(255, 255, 255, 0.08)',
    label: 'rgba(255, 255, 255, 0.5)',
    primary: '#b44756',
    background: '#1c1c1c',
    cardBackground: '#161616',
    card: '#b44756',
    text: '#cccccc',
    border: '#b44756',
    notification: 'rgb(255, 69, 58)',
  }
}

export default function AppThemeProvider({ children }) {
  const isDesktop = useMediaQuery({ minWidth: 920 })
  const themeName = useSystemTheme()

  const theme : any = useMemo(() => {
    return {
      ...(themeName === 'dark' ? dark : light),
      device: isDesktop ? 'desktop' : 'mobile'
    }
  }, [themeName, isDesktop])

  useSetNavBarColor(theme.colors.navigationBar)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <StatusBar
        barStyle='light-content'
        backgroundColor={theme.colors.statusBar} />
      {children}
    </ThemeProvider>
  )
}