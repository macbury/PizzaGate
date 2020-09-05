import React, { useCallback } from 'react'
import { Vibration } from 'react-native'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import Text from '../inputs/Text'
import Action from './Action'

const InputWrapper = styled.View`
  flex-direction: column;
  margin: 25px 10px 15px 10px;
  flex-grow: 1;
`

export interface ICollapseProps {
  theme?: DefaultTheme
  collapse: boolean
}

const InputInner = styled.View`
  flex-direction: ${({ collapse } : ICollapseProps) => collapse ? 'column' : 'row'};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.cardBackground};
  overflow: hidden;
`

const InputLabel = styled(Text)`
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 10px;
`

const InputValue = styled(Text)`
  font-size: ${({ theme }) => theme.device === 'desktop' ? '48px' : '38px'};
`

const InputUnit = styled(Text)`
  font-size: ${({ theme }) => theme.device === 'desktop' ? '20px' : '16px'};
  margin-left: 10px;
  margin-bottom: 6px;
  opacity: 0.4;
`

const InputValueContainer = styled.View`
  align-items: flex-end;
  flex-direction: row;
  justify-content: center;
  padding: ${({ theme }) => theme.device === 'desktop' ? '20px' : '10px'};
  min-width: 138px;

  border-left-width: ${({ collapse } : ICollapseProps) => collapse ? '0px' : '1px'};
  border-left-color: ${({ theme }) => theme.colors.inputBorder};
  border-right-width: ${({ collapse } : ICollapseProps) => collapse ? '0px' : '1px'};
  border-right-color: ${({ theme }) => theme.colors.inputBorder};
`

const ActionsContainer = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.inputBorder};
`

export interface ISpinnerInputProps {
  collapse?: boolean
  label: string
  value: number
  unit: string
  step: number

  setValue(newValue : number | string)
}

export default function SpinnerInput(props : ISpinnerInputProps) {
  const { collapse, label, value, unit, step, setValue } = props

  const onPlusTouch = useCallback(() => {
    setValue(value + step)
    Vibration.vibrate([100])
  }, [step, value, setValue])

  const onMinusTouch = useCallback(() => {
    setValue(value - step)
    Vibration.vibrate([100])
  }, [step, value, setValue])

  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>

      <InputInner collapse={collapse}>
        {!collapse && <Action
          icon="plus"
          onPress={onPlusTouch} />}
        <InputValueContainer style={{ flex: 1 }} collapse={collapse}>
          <InputValue>{value}</InputValue>
          <InputUnit>{unit}</InputUnit>
        </InputValueContainer>
        {!collapse && <Action
          icon="minus"
          onPress={onMinusTouch} />}

        {collapse && <ActionsContainer>
          <Action
            icon="plus"
            onPress={onPlusTouch}
            collapse={true} />
          <Action
            icon="minus"
            onPress={onMinusTouch}
            collapse={true} />
        </ActionsContainer>}
      </InputInner>
    </InputWrapper>
  )
}