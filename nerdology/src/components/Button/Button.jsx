import React from 'react'
import './Button.css'

export default function Button({children, buttonAction, buttonSize, buttonState}) {

  return (
    <>
        <button 
          className={`action-button button-${buttonSize}`} 
          onClick={buttonAction} 
          disabled={buttonState}
        >
          {children}
        </button>
    </>
  )
}
