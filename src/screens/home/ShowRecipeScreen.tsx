import React, { useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { useStoreData } from '../../stores'

import Fab from '../../components/inputs/Fab'
import CenteredScrollView from '../../components/CenteredScrollView'
import Text from '../../components/inputs/Text'

const Card = styled.View`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 15px;
  padding: 15px 25px;
  margin: 10px 25px;
`

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`

const Value = styled(Text)`
  font-size: 16px;
  margin-bottom: 10px;
`

function useShowRecipe() {
  return useStoreData(({ screens: { showRecipe } }) => ({
    recipe: showRecipe.recipe,

    load: showRecipe.load,
    clear: showRecipe.clear
  }))
}

export default function ShowRecipeScreen({ navigation, route } : StackScreenProps<any, any>) {
  const { t } = useTranslation()
  const { params: { id } } = route
  const {
    recipe,

    load,
    clear
  } = useShowRecipe()

  useEffect(() => {
    if (id) {
      load(id)
    } else {
      clear()
    }
  }, [id, load, clear])

  if (!recipe) {
    return null
  }

  return (
    <React.Fragment>
      <CenteredScrollView>
        <Card>
          <Title>{t('screens.showRecipe.flour')}</Title>
          <Value>{recipe.flour} g</Value>
          <Title>{t('screens.showRecipe.water')}</Title>
          <Value>{recipe.water} ml</Value>
          <Title>{t('screens.showRecipe.salt')}</Title>
          <Value>{recipe.salt} g</Value>
          <Title>{t('screens.showRecipe.oil')}</Title>
          <Value>{recipe.fats} g</Value>
          <Title>{t('screens.showRecipe.yeast.title')}</Title>
          <Value>{recipe.yeast} {t('screens.showRecipe.yeast.fresh')} / {recipe.dryYeast} {t('screens.showRecipe.yeast.dry')}</Value>
          <Title>{t('screens.showRecipe.risingTime.title')}</Title>
          <Value>{recipe.risingTime} {t('screens.showRecipe.risingTime.unit')}</Value>
          <Title>{t('screens.showRecipe.temperature')}</Title>
          <Value>{recipe.temperature} °C</Value>
          <Title>{t('screens.showRecipe.fridgeRisingTime.title')}</Title>
          <Value>{recipe.fridgeRisingTime} {t('screens.showRecipe.fridgeRisingTime.unit')}</Value>
        </Card>
      </CenteredScrollView>
      <Fab
        onPress={() => null}
        icon="save" />
    </React.Fragment>
  )
}