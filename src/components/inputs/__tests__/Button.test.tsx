import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import { light } from '../../../config/theme'
import Button, { IButtonProps } from '../Button'

it('renders correctly', () => {
  const props : IButtonProps = {
    title: 'test.key',
    onPress: jest.fn(),
    theme: light
  }
  const component = shallow((
    <Button {...props} />
  ))
  expect(snapshot(component)).toMatchSnapshot()
})