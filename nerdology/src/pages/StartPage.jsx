import React from 'react'
import { Link } from "react-router-dom"

export default function StartPage({handleStartGame}) {

  return (
    <>
      <h1>Nerdology</h1>
      <p>Test if you're a knowledge bot!</p>
      <Link to='/quiz'>
        <button onClick={handleStartGame}>Start game</button>
      </Link>
    </>
  )
}
