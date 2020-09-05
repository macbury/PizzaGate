import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

export const MainStack = createStackNavigator()
export const HomeStack = createStackNavigator()
export const TopTab = createMaterialTopTabNavigator()
export const BottomTab = createBottomTabNavigator()