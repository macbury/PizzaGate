import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import { light } from '../../../config/theme'
import TextField, { ITextFieldProps } from '../TextField'

it('renders correctly', () => {
  const props : ITextFieldProps = {
    value: 'test',
    onChangeText: jest.fn(),
    theme: light
  }
  const component = shallow((
    <TextField {...props} />
  ))
  expect(snapshot(component)).toMatchSnapshot()
})