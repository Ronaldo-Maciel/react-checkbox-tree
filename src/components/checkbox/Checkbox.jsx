import React from 'react'
import styles from './Checkbox.module.scss'
import { useRef, useEffect } from 'react'

function Checkbox({ id, textLabel, indeterminate = false, ...rest }) {
  const inputref = useRef(null)

  useEffect(() => {
    setIndeterminateProps()
  })

  const setIndeterminateProps = () => {
    inputref.current.indeterminate = indeterminate
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.checkbox}`}>
        <input
          ref={inputref}
          type="checkbox"
          className={styles['native-checkbox']}
          id={id}
          {...rest}
        />
        <div className={styles.box}>
          <svg className={styles.checkmark} viewBox="0 0 24 24">
            <path
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
              className={styles['checkmark__path']}
            ></path>
          </svg>
          <span className={styles['checkmark-indeterminate']}></span>
        </div>
      </div>
      <label className={styles.label} htmlFor={id}>
        {textLabel}
      </label>
    </div>
  )
}

export default Checkbox
