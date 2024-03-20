import React from 'react'
import { Link } from "react-router-dom"
import Button from '../components/Button/Button'

export default function StartPage({handleStartGame}) {

  return (
    <>
      <h1>Nerdology</h1>
      <p>Test if you're a knowledge bot!</p>
      <Link to='/quiz'>
        <Button 
          buttonAction={handleStartGame} 
          buttonSize={'small'}
        >
          Start game
        </Button> 
      </Link>
    </>
  )
}
