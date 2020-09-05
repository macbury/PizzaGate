import React, { useCallback } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import CenteredScrollView from '../../components/CenteredScrollView'
import SpinnerInput from '../../components/SpinnerInput'
import Fab from '../../components/inputs/Fab'
import { useStoreData } from '../../stores'

const Row = styled.View`
  flex-direction: row;
`

const Container = styled.View`
  padding: 0px 10px;
`

function useCalculator() {
  return useStoreData(({ screens: { calculator } }) => ({
    numberOfBalls: calculator.numberOfBalls,
    doughWeight: calculator.doughWeight,
    wantedHydration: calculator.wantedHydration,
    wantedFats: calculator.wantedFats,
    wantedSalt: calculator.wantedSalt,
    temperature: calculator.temperature,
    risingTime: calculator.risingTime,
    fridgeRisingTime: calculator.fridgeRisingTime,
    serializedRecipe: calculator.serializedRecipe,

    setDoughWeight: calculator.setDoughWeight,
    setNumberOfBalls: calculator.setNumberOfBalls,
    setWantedHydration: calculator.setWantedHydration,
    setWantedFats: calculator.setWantedFats,
    setWantedSalt: calculator.setWantedSalt,
    setTemperature: calculator.setTemperature,
    setRisingTime: calculator.setRisingTime,
    setFridgeRisingTime: calculator.setFridgeRisingTime,
    clear: calculator.clear
  }))
}

/**
 * On this screen user can design his pizza
 */
export default function CalculatorScreen({ navigation } : StackScreenProps<any, any>) {
  const {
    numberOfBalls,
    doughWeight,
    wantedHydration,
    wantedFats,
    wantedSalt,
    temperature,
    risingTime,
    fridgeRisingTime,
    serializedRecipe,

    setDoughWeight,
    setNumberOfBalls,
    setWantedHydration,
    setWantedFats,
    setWantedSalt,
    setTemperature,
    setRisingTime,
    setFridgeRisingTime,
    clear
  } = useCalculator()

  const { t } = useTranslation()

  const showRecipe = useCallback(() => {
    navigation.navigate('ShowRecipe', { id: encodeURI(serializedRecipe) })
    clear()
  }, [navigation, clear, serializedRecipe])

  return (
    <React.Fragment>
      <CenteredScrollView>
        <Container>
          <SpinnerInput
            step={1}
            setValue={setNumberOfBalls}
            label={t('screens.calculator.numberOfBalls')}
            value={numberOfBalls}
            unit={t('screens.calculator.piece')} />

          <SpinnerInput
            step={10}
            setValue={setDoughWeight}
            label={t('screens.calculator.doughWeight')}
            value={doughWeight}
            unit="g" />

          <SpinnerInput
            step={5}
            setValue={setWantedHydration}
            label={t('screens.calculator.wantedHydration')}
            value={wantedHydration}
            unit="%" />

          <Row>
            <SpinnerInput
              collapse={true}
              step={1}
              setValue={setWantedSalt}
              label={t('screens.calculator.wantedSalt')}
              value={wantedSalt}
              unit="g/L" />

            <SpinnerInput
              collapse={true}
              step={1}
              setValue={setWantedFats}
              label={t('screens.calculator.wantedFats')}
              value={wantedFats}
              unit="g/L" />
          </Row>

          <SpinnerInput
            step={1}
            setValue={setTemperature}
            label={t('screens.calculator.temperature')}
            value={temperature}
            unit="°C" />

          <Row>
            <SpinnerInput
              collapse={true}
              step={2}
              setValue={setRisingTime}
              label={t('screens.calculator.risingTime')}
              value={risingTime}
              unit="h" />
            <SpinnerInput
              collapse={true}
              step={4}
              setValue={setFridgeRisingTime}
              label={t('screens.calculator.fridgeRisingTime')}
              value={fridgeRisingTime}
              unit="h" />
          </Row>
        </Container>
      </CenteredScrollView>
      <Fab
        onPress={showRecipe}
        icon="calculator" />
    </React.Fragment>
  )
}