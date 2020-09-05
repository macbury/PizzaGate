import React, { useMemo } from 'react'

import { RootStore, StoreProvider } from './stores'
import Router from './Router'
import Translations from './components/Translations'
import ErrorBoundary from './components/ErrorBoundary'
import BootApp from './components/BootApp'
import Notifications from './components/Notifications'
import AppThemeProvider from './config/theme'

export default function App() {
  const store = useMemo(() => (new RootStore()), [])

  return (
    <StoreProvider store={store}>
      <Translations>
        <AppThemeProvider>
          <ErrorBoundary>
            <BootApp>
              <Router />
              <Notifications />
            </BootApp>
          </ErrorBoundary>
        </AppThemeProvider>
      </Translations>
    </StoreProvider>
  )
}
