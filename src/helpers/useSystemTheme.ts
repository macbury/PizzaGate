import { useEffect, useState } from 'react'
import { Appearance, ColorSchemeName } from 'react-native'

export default function useSystemTheme() : ColorSchemeName {
  const [theme, setTheme] = useState<ColorSchemeName>(Appearance.getColorScheme())

  useEffect(() => {
    const onThemeChange = ({ colorScheme }) => {
      setTheme(colorScheme)
    }

    Appearance.addChangeListener(onThemeChange)

    return () => Appearance.removeChangeListener(onThemeChange)
  }, [setTheme])

  return theme
}