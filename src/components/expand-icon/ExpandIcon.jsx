import React from 'react'
import styles from './ExpandIcon.module.scss'

function ExpandIcon({ isExpanded }) {
  return (
    <span
      className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}
    >
      <svg
        className={`${styles.icon}`}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
      </svg>
    </span>
  )
}

export default ExpandIcon
