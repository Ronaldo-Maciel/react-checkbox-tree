function nodeHasChildren(node) {
  return Object.entries(node.children).length > 0
}

function flattenObj(nodes, parent = {}) {
  if (Object.entries(nodes).length === 0) {
    return
  }

  const flat = Object.values(nodes).reduce((acc, node) => {
    if (nodeHasChildren(node)) {
      const children = flattenObj(node.children, node)
      acc = { ...acc, ...children }
    }
    // prettier-ignore
    return ((acc[node.id] = node), acc)
  }, {})
  return flat
}

function flattenWithNewProps(flatten) {
  let list = []

  Object.values(flatten).forEach((node) => {
    const isParent = nodeHasChildren(node)
    const newValues = {
      isParent,
      isLastChildren: !isParent,
    }

    const update = Object.assign(node, newValues)
    list.push(update)
  })

  return flattenObj(list)
}

const persistData = (nodeState, { ...props }) => {
  Object.keys(props).forEach((prop) => {
    props[prop].forEach((id) => {
      if (Boolean(nodeState[id][prop])) {
        return
      }
      nodeState[id][prop] = true
    })
  })
}

const nodeStateSerialized = (nodeState, key) => {
  const list = []
  Object.keys(nodeState).forEach((value) => {
    if (nodeState[value][key]) {
      list.push(value)
    }
  })

  return list
}

export {
  nodeHasChildren,
  flattenWithNewProps,
  flattenObj,
  persistData,
  nodeStateSerialized,
}
