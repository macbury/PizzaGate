import React, { useState, useEffect, useCallback } from 'react'
import { useStoreData } from '../stores'

function useBootStore() {
  return useStoreData(({ refresh, setup }) => ({
    refresh,
    setup
  }))
}

/**
 * Show logo ui while awaiting all stores to refresh
 */
export default function BootApp({ children }) {
  const [isReady, setReady] = useState(false)
  const { refresh, setup } = useBootStore()

  const boot = useCallback(async () => {
    if (await setup()) {
      setReady(true)
      console.log('hide splash screen')
    }

    await refresh()
    console.log('hide splash screen')
    setReady(true)
  }, [refresh, setup, setReady])

  useEffect(() => void boot(), [boot])

  if (!isReady) {
    return null
  }

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}