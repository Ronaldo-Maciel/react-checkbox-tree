import React from 'react'
import { render, screen } from '@testing-library/react'
import TreeList from './TreeList'

it('should contain component with a role tree attribute in the document', () => {
  render(
    <TreeList>
      <li role="treeitem">Node children</li>
    </TreeList>
  )

  expect(screen.getByRole('tree')).toBeInTheDocument()
})

it('should contain a node children', () => {
  render(
    <TreeList>
      <li role="treeitem">Node children</li>
    </TreeList>
  )

  expect(screen.getByText(/Node children/i)).toBeInTheDocument()
})

it('should contain a aria-labelledby attribute', () => {
  render(
    <TreeList titleId="foo">
      <li role="treeitem">Node children</li>
    </TreeList>
  )

  expect(screen.getByRole('tree')).toHaveAttribute('aria-labelledby', 'foo')
})
