import React from 'react'
import styles from './TreeItem.module.scss'
import ExpandIcon from '../expand-icon/ExpandIcon'

function TreeItem({
  children,
  label,
  onExpand = () => {},
  expanded = false,
  itemId,
}) {
  const hasChildren = Array.isArray(children)
    ? children.length > 0
    : Boolean(children)

  const ref = React.createRef()

  const handleExpand = () => {
    onExpand({ id: itemId, expanded: !expanded })
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <li role="treeitem" className={styles.item} ref={ref}>
      <div className={styles['label-component']}>
        {hasChildren && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-labelledby="expand-label"
            className={styles['expand-button']}
            onClick={handleExpand}
          >
            <ExpandIcon isExpanded={expanded} />
            <span id="expand-label" hidden>
              Mais opções
            </span>
          </button>
        )}
        {label}
      </div>
      {expanded && (
        <ul role="group" className={styles.group}>
          {children}
        </ul>
      )}
    </li>
  )
}

export default TreeItem
