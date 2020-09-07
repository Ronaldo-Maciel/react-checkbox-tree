import React from 'react'
import styles from './App.module.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import getfromApi from '../services/services'
import CheckboxList from './checkbox-tree/ChecboxTree'
import { persistData } from '../constants/constants'
import Loading from './loading/loading'

function App() {
  const [data, setData] = useState({})
  const [state, setState] = useState(
    () =>
      JSON.parse(localStorage.getItem(persistData)) || {
        checked: [],
        expanded: [],
      }
  )

  useEffect(() => {
    const handleResponseData = async () => {
      const response = await getfromApi()
      setData(response)
    }
    handleResponseData()
  }, [])

  useEffect(() => {
    localStorage.setItem(persistData, JSON.stringify(state))
  }, [state])

  const onCheck = (checked) => {
    setState({ ...state, checked })
  }

  const onExpand = (expanded) => {
    setState({ ...state, expanded })
  }

  return (
    <div className={styles.app}>
      <h1 id="title-names">Nomes preferidos:</h1>
      {Object.values(data).length > 0 ? (
        <CheckboxList
          data={data}
          expanded={state.expanded}
          checked={state.checked}
          onCheck={onCheck}
          onExpand={onExpand}
        />
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default App
