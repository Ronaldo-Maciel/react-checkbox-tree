import React from 'react'
import styles from './TreeList.module.scss'

function TreeList({ children, titleId }) {
  return (
    <ul className={styles.list} role="tree" aria-labelledby={titleId}>
      {children}
    </ul>
  )
}

export default TreeList
