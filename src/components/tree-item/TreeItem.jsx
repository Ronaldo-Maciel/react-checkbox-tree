import React from 'react'
import styles from './TreeItem.module.scss'
import ExpandIcon from '../expand-icon/ExpandIcon'
import { useState } from 'react'

function TreeItem({ labelComponent, children, parentId }) {
  const [expand, setExpand] = useState(false)
  const onExpand = () => setExpand(!expand)
  const hasChildren = Array.isArray(children)
    ? children.length > 0
    : Boolean(children)

  return (
    <li role="treeitem" className={styles.item}>
      <div className={styles['label-component']}>
        {hasChildren && (
          <button
            type="button"
            aria-expanded={expand}
            aria-labelledby="expand-label"
            className={styles['expand-button']}
            onClick={onExpand}
          >
            <ExpandIcon isExpanded={expand} />
            <span id="expand-label" hidden>
              Mais opções
            </span>
          </button>
        )}
        {labelComponent}
      </div>
      {hasChildren && expand && (
        <ul role="group" className={styles.group} id={parentId}>
          {children}
        </ul>
      )}
    </li>
  )
}

export default TreeItem
