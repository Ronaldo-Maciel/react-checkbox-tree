import React from 'react'
import { render, screen } from '@testing-library/react'
import Loading from './loading'

describe('Loading', () => {
  it('should contain a svg loading', () => {
    render(<Loading />)

    expect(screen.getByTitle(/Carregando.../i)).toBeInTheDocument()
  })
})
