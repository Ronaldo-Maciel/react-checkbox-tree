import React from 'react'
import { render, screen } from '@testing-library/react'
import Checkbox from './Checkbox'
import userEvent from '@testing-library/user-event'

describe('Checkbox', () => {
  it('should contain a text inside label', () => {
    render(<Checkbox textLabel="foo bar" id="foo" />)

    expect(screen.getByLabelText(/foo bar/i)).toBeInTheDocument()
  })

  it('should render checkbox with value checked', () => {
    render(<Checkbox id="foo" checked onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('should render checkbox without value checked', () => {
    render(<Checkbox id="foo" onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('should render checkbox with value indeterminate', () => {
    const { container } = render(<Checkbox indeterminate onChange={() => {}} />)

    // getByRole doesn't work with indeterminate property
    expect(
      container.querySelector('[type="checkbox"]').indeterminate
    ).toBeTruthy()
  })

  it('should change state checked when user click', () => {
    render(<Checkbox id="foo" />)
    userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).toBeChecked()

    userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
})
