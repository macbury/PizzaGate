import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity`
  min-height: 49px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 9999px;
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.font.main};
  color: ${({ theme }) => theme.colors.buttonTextColor};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.buttonText};
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-direction: row;
  text-align: center;
  display: flex;
`

export interface IButtonProps {
  title: string
  disabled?: boolean
  theme?: any
  onPress?()
}

export default function Button(props : IButtonProps) {
  const { t } = useTranslation()

  const {
    title,
    disabled,
    onPress,
    ...rest
  } = props

  return (
    <ButtonContainer onPress={onPress} disabled={disabled} {...rest}>
      <ButtonText>{t(title)}</ButtonText>
    </ButtonContainer>
  )
}