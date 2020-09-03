import React from 'react'
import { render, screen } from '@testing-library/react'
import Checkbox from './Checkbox'
import userEvent from '@testing-library/user-event'

it('should contain a text', () => {
  render(<Checkbox textLabel="foo bar" id="foo" />)

  expect(screen.getByLabelText(/foo bar/i)).toBeInTheDocument()
})

it('should render checkbox with intial value checked', () => {
  render(<Checkbox id="foo" checked handleChange={() => {}} />)
  expect(screen.getByRole('checkbox')).toBeChecked()
})

it('should change state checked when on click', () => {
  render(<Checkbox id="foo" />)
  userEvent.click(screen.getByRole('checkbox'))
  expect(screen.getByRole('checkbox')).toBeChecked()

  userEvent.click(screen.getByRole('checkbox'))
  expect(screen.getByRole('checkbox')).not.toBeChecked()
})
