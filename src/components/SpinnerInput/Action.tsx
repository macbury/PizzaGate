import React from 'react'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import EntypoIcon from 'react-native-vector-icons/Entypo'

export interface ICollapseProps {
  theme?: DefaultTheme
  collapse: boolean
}

export interface IActionProps {
  icon: string
  collapse?: boolean
  onPress()
}

const InputAction = styled.TouchableHighlight`
  justify-content: center;
  align-content: center;
  align-items: center;
  flex: ${({ collapse } : ICollapseProps) => collapse ? '1' : '0.2'};
  min-width: ${({ theme }) => theme.device === 'desktop' ? '97px' : '64px'};
  min-height: 64px;
`

export default function Action({ onPress, collapse, icon } : IActionProps) {
  const theme = useTheme()
  const size = theme.device === 'desktop' ? 48 : 32

  return (
    <InputAction onPress={onPress} underlayColor={theme.colors.inputBackground} activeOpacity={0.4} collapse={collapse}>
      <EntypoIcon name={icon} color={theme.colors.primary} size={size} />
    </InputAction>
  )
}