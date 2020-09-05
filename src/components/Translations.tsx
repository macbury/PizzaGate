import React, { useEffect } from 'react'
import { useStoreData } from '../stores'
import i18n from '../config/i18n'

/**
 * Set i18next locale to match one from SettingsStore
 */
export default function Translations({ children }) {
  const { locale, timezoneName } = useStoreData(() => ({
    locale: 'en',
    timezoneName: 'Warsaw',
  }))

  const translationKey = [locale, timezoneName].join('-')

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale, timezoneName])

  return (
    <React.Fragment key={translationKey}>
      {children}
    </React.Fragment>
  )
}