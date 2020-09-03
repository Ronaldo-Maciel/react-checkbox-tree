import React from 'react'
import { render, screen } from '@testing-library/react'
import TreeItem from './TreeItem'
import userEvent from '@testing-library/user-event'

it('should contain component with a role treeitem attribute in the document', () => {
  render(
    <TreeItem>
      <a href="#foo"> foo bar </a>
    </TreeItem>
  )

  expect(screen.getByRole('treeitem')).toBeInTheDocument()
})

it('should contain a labelComponent in the document', () => {
  render(
    <TreeItem
      labelComponent={
        <>
          <label htmlFor="bar">foo</label>
          <input type="text" id="bar" />
        </>
      }
    />
  )

  expect(screen.getByLabelText('foo')).toBeInTheDocument()
})

it('should contain a role group in the document', () => {
  render(
    <TreeItem
      labelComponent={
        <>
          <label htmlFor="bar">foo</label>
          <input type="text" id="bar" />
        </>
      }
    >
      <p>Foo Bar</p>
    </TreeItem>
  )

  userEvent.click(screen.getByRole('button'))

  expect(screen.getByRole('group')).toBeInTheDocument()
})

it('should contain a node children', () => {
  render(
    <TreeItem>
      <a href="#foo"> foo bar </a>
    </TreeItem>
  )

  userEvent.click(screen.getByRole('button'))

  expect(screen.getByText(/foo bar/i)).toBeInTheDocument()
})

it('should contain a aria-expanded when has children', () => {
  render(
    <TreeItem>
      <a href="#foo"> foo bar </a>
    </TreeItem>
  )

  userEvent.click(screen.getByRole('button'))
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')

  userEvent.click(screen.getByRole('button'))
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
})
