import React from 'react'
// import './App.css'

export default function StartPage({handleStartGame}) {

  return (
    <>
      <h1>Nerdology</h1>
      <p>Test if you're a knowledge bot!</p>
      <button onClick={handleStartGame}>Start game</button>
    </>
  )
}
