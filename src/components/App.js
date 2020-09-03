import React from 'react'
import Checkbox from './checkbox/Checkbox'
import TreeList from './tree-list/TreeList'
import TreeItem from './tree-item/TreeItem'
import styles from './App.module.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import getfromApi from '../services/services'

function App() {
  const [data, setData] = useState({})
  const [selectedvalues, setSelectedValues] = useState([])

  useEffect(() => {
    const handleResponseData = async () => {
      const response = await getfromApi()
      setData(response)
    }
    handleResponseData()
  }, [])

  function searchTree(obj, matchingId) {
    obj.children = Object.values(obj.children)
    if (obj.id === matchingId) {
      return obj
    } else if (obj.children != null) {
      let i
      let result = null
      for (i = 0; result === null && i < obj.children.length; i++) {
        result = searchTree(obj.children[i], matchingId)
      }
      return result
    }
    return null
  }

  function selectAllNodes(obj, stateChecked) {
    obj.children = Object.values(obj.children)
    if (!obj.children) {
      return
    }

    if (obj.children.some((c) => c.children)) {
      obj.children = obj.children.map((child) => {
        return selectAllNodes(child, stateChecked)
      })
    }
    obj.checked = !stateChecked
    return obj
  }

  const handleCheck = (treeData) => (e) => {
    console.log(treeData)
    let newData = JSON.parse(JSON.stringify(data))

    for (let i in newData) {
      let filtered = searchTree(newData[i], treeData.id)
      if (filtered !== null) {
        filtered.checked = !treeData.checked
        selectAllNodes(filtered, treeData.checked)
      }
    }

    setData(newData)
  }

  function nodeHasChildren(data) {
    return Array.isArray(Object.values(data.children))
  }

  const renderTreeItem = (treeData) => {
    return (
      <TreeItem
        key={treeData.id}
        parentId={treeData.id}
        labelComponent={
          <Checkbox
            id={treeData.id}
            textLabel={treeData.name}
            checked={Boolean(treeData.checked)}
            onChange={handleCheck(treeData)}
          />
        }
      >
        {treeData.children !== undefined && nodeHasChildren(treeData)
          ? Object.values(treeData.children).map((childItem) =>
              renderTreeItem(childItem)
            )
          : null}
      </TreeItem>
    )
  }

  return (
    <div className={styles.app}>
      <h1 id="title-names">Selecionar nomes:</h1>
      <TreeList titleId="title-names">
        {Object.values(data).map((treeData) => renderTreeItem(treeData))}
      </TreeList>
    </div>
  )
}

export default App
