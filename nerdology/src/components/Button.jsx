import React from 'react'
// import './App.css'

export default function Button({children, buttonAction, buttonSize}) {

  return (
    <>
        <button className={`button-${buttonSize}`} onClick={buttonAction}>
            {children}
        </button>
    </>
  )
}
