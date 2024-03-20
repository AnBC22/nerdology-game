import React from 'react'
import './Button.css'

export default function Button({children, buttonAction, buttonSize}) {

  return (
    <>
        <button className={`action-button button-${buttonSize}`} onClick={buttonAction}>
            {children}
        </button>
    </>
  )
}
