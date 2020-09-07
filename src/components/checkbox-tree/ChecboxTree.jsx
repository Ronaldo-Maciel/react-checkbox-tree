import React, { useState } from 'react'
import TreeList from '../tree-list/TreeList'
import TreeItem from '../tree-item/TreeItem'
import Checkbox from '../checkbox/Checkbox'
import {
  flattenObj,
  flattenWithNewProps,
  persistData,
  nodeStateSerialized,
} from '../../helpers/helpers'
import { states } from '../../constants/constants'

function CheckboxList({
  data,
  checked,
  expanded,
  onCheck = () => {},
  onExpand = () => {},
}) {
  // Armazenando um flat objeto para não causar mudanças
  // custosas de recursividade no estado do React
  const flatten = flattenObj(data)
  const newFlatten = flattenWithNewProps(flatten)

  const [nodeState, setNodeState] = useState(newFlatten || {})

  persistData(nodeState, { checked, expanded })

  const isAllChildChecked = (node) => {
    return Object.values(node.children).every((children) => {
      return nodeState[children.id].checkState === states.checked
    })
  }

  const isSomeChildChecked = (node) => {
    return Object.values(node.children).some(
      (children) => nodeState[children.id].checkState > 0
    )
  }

  const getStatusChecked = (node) => {
    const nodeRef = nodeState[node.id]
    if (!nodeRef.isParent) {
      const status = nodeRef.checked ? states.checked : 0
      return status
    }

    if (isAllChildChecked(node)) {
      return states.checked
    }

    if (isSomeChildChecked(node)) {
      return states.indeterminate
    }
  }

  const handleCheck = ({ target }) => {
    const nodeReference = { id: target.id, checked: target.checked }
    const node = nodeState[nodeReference.id]

    toggleAllCheckboxes(node, nodeReference.checked)
    onCheck(nodeStateSerialized(nodeState, 'checked'))
  }

  const handleExpand = (nodeReference) => {
    toggleNode(nodeReference, 'expanded', nodeReference.expanded)
    onExpand(nodeStateSerialized(nodeState, 'expanded'))
  }

  const toggleAllCheckboxes = (node, isChecked) => {
    const nodeRef = nodeState[node.id]

    if (nodeRef.isLastChildren) {
      toggleNode(node, 'checked', isChecked)
    } else {
      for (const ref in nodeRef.children) {
        toggleAllCheckboxes(nodeRef.children[ref], isChecked)
      }
    }
  }

  const toggleNode = (node, key, toggleState) => {
    const statusCopy = Object.assign({}, nodeState)
    statusCopy[node.id][key] = toggleState
    setNodeState(statusCopy)
  }

  const renderTreeItem = (nodes) => {
    return Object.values(nodes).map((node) => {
      const { name, id } = node
      const nodeStateRef = nodeState[node.id]
      const nodeChildren = nodeStateRef.isParent
        ? renderTreeItem(node.children)
        : null
      nodeStateRef.checkState = getStatusChecked(node)

      return (
        <TreeItem
          key={id}
          onExpand={handleExpand}
          itemId={id}
          label={
            <Checkbox
              id={id}
              textLabel={name}
              checked={nodeStateRef.checkState === states.checked}
              indeterminate={nodeStateRef.checkState === states.indeterminate}
              onChange={handleCheck}
            />
          }
          expanded={nodeStateRef.expanded}
        >
          {nodeChildren}
        </TreeItem>
      )
    })
  }

  return <TreeList titleId="title-names">{renderTreeItem(data)}</TreeList>
}

export default CheckboxList
