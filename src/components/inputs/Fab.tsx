import React from 'react'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import shadow from '../../helpers/shadow'

const FabContainer = styled.View`
  position: absolute;

  bottom: ${({ theme }) => theme.device === 'desktop' ? '35px' : '25px'};
  right: ${({ theme }) => theme.device === 'desktop' ? '35px' : '25px'};
`

const ActivityIndicator = styled.ActivityIndicator`
  position: absolute;
  top: 0px;
  left: 0px;
`

interface IFabInnerProps {
  disabled: boolean
  theme: DefaultTheme
}

const FabInner = styled.TouchableOpacity`
  border-radius: 50px;
  width: ${({ theme }) => theme.device === 'desktop' ? '80px' : '60px'};
  height: ${({ theme }) => theme.device === 'desktop' ? '80px' : '60px'};
  opacity: ${(props : IFabInnerProps) => props.disabled ? 0.4 : 1.0};
  background-color: ${({ theme, disabled } : IFabInnerProps) => disabled ? theme.colors.background : theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
`

const ButtonContainer = styled.View`
  display: flex;
  align-self: center;
`

export interface IFabProps {
  icon: string;
  theme?: DefaultTheme;
  loading?: boolean;

  onPress?();
}

export default function Fab({ icon, onPress, loading } : IFabProps) {
  const theme = useTheme()
  const size = theme.device === 'desktop' ? 42 : 24

  return (
    <FabContainer>
      <FabInner onPress={onPress} disabled={loading} style={shadow(8)}>
        <ButtonContainer>
          <EntypoIcon name={icon} color={loading ? theme.colors.primary : theme.colors.background} size={size} />
        </ButtonContainer>
      </FabInner>
      {loading && <ActivityIndicator size={60} color={theme.colors.primary} />}
    </FabContainer>
  )
}