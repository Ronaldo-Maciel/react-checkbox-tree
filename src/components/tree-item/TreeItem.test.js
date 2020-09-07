import React from 'react'
import { render, screen } from '@testing-library/react'
import TreeItem from './TreeItem'

describe('TreeITem', () => {
  it('should contain component with a role treeitem attribute in the document', () => {
    render(
      <TreeItem>
        <a href="#foo"> foo bar </a>
      </TreeItem>
    )

    expect(screen.getByRole('treeitem')).toBeInTheDocument()
  })

  it('should contain a role group element in the document when expanded', () => {
    render(
      <TreeItem expanded>
        <p>Foo Bar</p>
      </TreeItem>
    )

    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('should contain a node children when expanded', () => {
    render(
      <TreeItem expanded>
        <a href="#foo"> foo bar </a>
      </TreeItem>
    )

    expect(screen.getByText(/foo bar/i)).toBeInTheDocument()
  })

  it('should contain a label', () => {
    render(<TreeItem label={<p>description item</p>} />)

    expect(screen.getByText(/description item/i)).toBeInTheDocument()
  })

  it('should contain an aria-expanded attribute in according expanded prop', () => {
    const { rerender } = render(
      <TreeItem>
        <a href="#foo"> foo bar </a>
      </TreeItem>
    )

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')

    rerender(
      <TreeItem expanded>
        <a href="#foo"> foo bar </a>
      </TreeItem>
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })
})
