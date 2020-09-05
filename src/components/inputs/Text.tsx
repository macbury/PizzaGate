import React from 'react'
import styled from 'styled-components/native'

const Text = styled.Text`
  font-family: ${({ theme }) => theme.font.main};
  font-size: ${({ theme }) => theme.fontSize.text};
  color: ${({ theme }) => theme.colors.text};
`

export default Text