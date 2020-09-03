import React from 'react'
import { render } from '@testing-library/react'
import ExpandIcon from './ExpandIcon'
import styles from './ExpandIcon.module.scss'

it('should not has class expanded', () => {
  const { container } = render(<ExpandIcon />)

  expect(container.querySelector(`.${styles.container}`)).not.toHaveClass(
    `${styles.expanded}`
  )
})

it('should has class expanded', () => {
  const { container } = render(<ExpandIcon isExpanded />)

  expect(container.querySelector(`.${styles.container}`)).toHaveClass(
    `${styles.expanded}`
  )
})

it('should has class expanded', () => {
  const { container } = render(<ExpandIcon />)

  expect(container.querySelector(`.${styles.icon}`)).toHaveAttribute(
    'focusable',
    'false'
  )
  expect(container.querySelector(`.${styles.icon}`)).toHaveAttribute(
    'aria-hidden',
    'true'
  )
})
