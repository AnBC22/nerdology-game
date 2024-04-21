import React from 'react'
import { Link } from "react-router-dom"
import Button from '../../components/Button/Button'
import './StartPage.css'

export default function StartPage({handleStartGame}) {

  return (
    <>
      <h1 className='title'>Nerdology</h1>
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
