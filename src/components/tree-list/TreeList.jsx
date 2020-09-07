import React from 'react'
import styles from './TreeList.module.scss'

function TreeList({ children, titleId }) {
  return (
    <ol className={styles.list} role="tree" aria-labelledby={titleId}>
      {children}
    </ol>
  )
}

export default TreeList
