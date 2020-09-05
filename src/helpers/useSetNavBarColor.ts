import { useEffect } from 'react'
import NavigationBar from 'react-native-navbar-color'

export default function useSetNavBarColor(color : string) {
  useEffect(() => {
    NavigationBar.setColor(color)
  }, [color])
}