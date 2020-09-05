import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import { light } from '../../../config/theme'
import Fab, { IFabProps } from '../Fab'

jest.mock('styled-components/native', () => ({
  useTheme: () => ({
    colors: {
      background: '#fff'
    }
  })
}));
jest.mock('react-native-vector-icons/Entypo', () => null);

it('renders correctly', () => {
  const props : IFabProps = {
    to: '/channels/new',
    icon: 'plus',
    theme: light
  }
  const component = shallow((
    <Fab {...props} />
  ))
  expect(snapshot(component)).toMatchSnapshot()
})