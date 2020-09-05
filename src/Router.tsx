import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { NavigationContainer, LinkingOptions, Link } from '@react-navigation/native'
import styled, { useTheme } from 'styled-components/native'
import Text from './components/inputs/Text'

import TabIndicator, { CONTENT_WIDTH } from './components/TabIndicator'
import CalculatorScreen from './screens/home/CalculatorScreen'
import ShowRecipeScreen from './screens/home/ShowRecipeScreen'
import { MainStack, TopTab } from './screens'

const HeaderImageUri = require('./assets/header.png')

const HeaderImage = styled.Image`
  margin-top: 10px;
  width: 107px;
  height: 24px;
`

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details</Text>
      <Link to="/Details">Details</Link>
      <Link to="https://duckduckgo.com">Duck duck go</Link>
    </View>
  );
}

function PopupScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Popup</Text>
    </View>
  );
}

function HomeScreen() {
  const theme = useTheme()
  const { t } = useTranslation()

  const renderIndicator = theme.device === 'desktop' ? TabIndicator : undefined
  const contentContainerStyle = theme.device === 'desktop' ? { width: '100%', maxWidth: `${CONTENT_WIDTH}px`, marginLeft: 'auto', marginRight: 'auto' } : {}
  const iconSize = 22

  return (
    <TopTab.Navigator
      backBehavior="history"
      tabBarPosition="top"
      tabBarOptions={{
        labelStyle: { fontFamily: theme.font.main },
        activeTintColor: theme.colors.tabActive,
        tabStyle: {
          flexDirection: 'row'
        },
        showLabel: true,
        showIcon: true,
        indicatorStyle: {
          backgroundColor: theme.colors.tabActive,
        },
        contentContainerStyle,
        renderIndicator
      }}>
      <TopTab.Screen
        name="Calculator"
        options={{
          title: t('screens.calculator.title'),
          tabBarIcon: ({ focused, ...props }) => (<Icon {...props} size={iconSize} name={focused ? "calculator" : "calculator-outline"} />)
        }}
        component={CalculatorScreen} />
      <TopTab.Screen
        name="Recipes"
        options={{
          tabBarIcon: ({ focused, ...props }) => (<Icon {...props} size={iconSize} name={focused ? "pizza" : "pizza-outline"} />)
        }}
        component={DetailsScreen}/>
    </TopTab.Navigator>
  )
}

const linking : LinkingOptions = {
  prefixes: ['/'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: {
        path: '/',
        screens: {
          Calculator: '/design',
          Recipes: '/recipes',
          Settings: '/settings'
        }
      },
      ShowRecipe: '/recipes/:id'
    },
  }
}

export default function Router() {
  const { t } = useTranslation()
  const theme = useTheme()

  const headerTitleStyle = { fontFamily: theme.font.main }

  const documentTitle = {
    formatter: (options, route) => `${options?.title ?? route?.name} - PizzaGate`,
  }

  return (
    <NavigationContainer
      linking={linking}
      theme={theme}
      documentTitle={documentTitle}>
      <MainStack.Navigator
        mode="modal"
        screenOptions={{
          headerTitleStyle,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: {
            borderWidth: 0
          }
        }}>
        <MainStack.Screen
          name="Home"
          options={{
            headerTitle: () => <HeaderImage source={HeaderImageUri} />,
            headerStyle: {
              elevation: 0,
              borderWidth: 0
            }
          }}
          component={HomeScreen} />
        <MainStack.Screen
          options={{
            title: t('screens.showRecipe.title')
          }}
          name="ShowRecipe"
          component={ShowRecipeScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}