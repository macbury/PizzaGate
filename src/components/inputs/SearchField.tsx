import React, { useState, useMemo } from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export interface ISearchFieldProps {
  className?: any
  style?: any
  loading?: boolean
  value?: string
  placeholder?: string,
  onChangeText(newValue: string)
}

export interface IStyleProps {
  focused?: boolean;
  theme?: DefaultTheme
}

const Icon = styled(MaterialIcon)`
  margin-left: 15px;
  margin-right: 15px;
`

const SearchFieldContainer = styled.View`
  background: ${({ theme }) => theme.colors.inputBackground};
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme, focused } : IStyleProps) => focused ? theme.colors.primary : theme.colors.border};
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 40px;
`

const TextInput = styled.TextInput`
  padding: 10px 20px 10px 0px;
  color: ${({ theme }) => theme.colors.inputText};
  font-size: ${({ theme }) => theme.fontSize.searchInput};
  font-family: ${({ theme }) => theme.font.main};
  flex: 1;
`

export default function SearchField(props : ISearchFieldProps) {
  const theme = useTheme()
  const [isFocused, setFocused] = useState(false)

  const {
    loading,
    placeholder,
    value,
    onChangeText,
    ...inputProps
  } = props

  const activeColor = useMemo(() => (isFocused ? theme.colors.primary : theme.colors.label), [isFocused])

  return (
    <SearchFieldContainer {...inputProps} focused={isFocused}>
      <Icon name="search" color={activeColor} size={24} />
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.placeholder}
        placeholder={placeholder} />
      {loading && <ActivityIndicator size={24} color={activeColor} />}
      {
        value?.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Icon name="close" color={activeColor} size={24} />
        </TouchableOpacity>)
      }
    </SearchFieldContainer>
  )
}