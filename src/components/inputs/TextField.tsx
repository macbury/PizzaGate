import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

interface ITextInputContainerProps {
  focused: boolean
  editable?: boolean
  hasError?: boolean
  theme?: any
}

function getLabelColor({ focused, hasError, theme } : ITextInputContainerProps) {
  if (hasError) {
    return theme.colors.error
  } else if (focused) {
    return theme.colors.primary
  } else {
    return theme.colors.label
  }
}

function getBorderColor({ focused, hasError, theme } : ITextInputContainerProps) {
  if (hasError) {
    return theme.colors.error
  } else if (focused) {
    return theme.colors.primary
  } else {
    return theme.colors.inputBorder
  }
}

const TextInput = styled.TextInput`
  color: ${({ theme }) => theme.colors.inputText};
  padding-top: 2px;
  padding-left: 20px;
  padding-bottom: 8px;
  background: rgba(0,0,0,0);
  font-size: ${({ theme }) => theme.fontSize.inputText};
  font-family: ${({ theme }) => theme.font.main};
`

const Label = styled.Text`
  padding-top: 8px;
  font-family: ${({ theme }) => theme.font.main};
  color: ${getLabelColor};
  padding-left: 20px;
  padding-right: 20px;
  font-size: ${({ theme }) => theme.fontSize.label};
`

const ErrorMessage = styled.Text`
  padding-top: 5px;
  font-family: ${({ theme }) => theme.font.main};
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.label};
  padding-left: 20px;
  padding-right: 20px;
`

const TextInputContainer = styled.View`
  opacity: ${({ editable }) => editable ? '1.0' : '0.6'};
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border-color: ${getBorderColor};
  border-radius: 5px;
  border-bottom-width: 2px;
`

const Wrapper = styled.View`
  margin-bottom: 15px;
`

export interface ITextFieldProps extends TextInputProps {
  label?: string
  editable?: boolean
  error?: string
  className?: string
  placeholder?: string
  value: string
  hidden?: boolean
  secureTextEntry?: boolean
  theme?: any
  onChangeText(input : string)
}

export default function TextField(props : ITextFieldProps) {
  const { t } = useTranslation()
  const [isFocused, setFocused] = useState(false)

  const {
    label,
    value,
    editable,
    placeholder,
    secureTextEntry,
    onChangeText,
    hidden,
    error,
    className,
    ...rest
  } = props

  if (hidden) {
    return null
  }

  return (
    <Wrapper {...{ className }}>
      <TextInputContainer hasError={!!error} editable={editable} focused={isFocused}>
        <Label hasError={!!error} focused={isFocused}>{t(label)}</Label>
        <TextInput
          {...rest}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={editable}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText} />
      </TextInputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Wrapper>
  )
}