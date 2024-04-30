import React from 'react'
import { Link } from "react-router-dom"
import Button from '../../components/Button/Button'
import './StartPage.css'
import botImg from '../../assets/bot-2.png'

export default function StartPage({handleStartGame}) {

  return (
    <div className="container">
      <div className="container-inner">
        <img className="bot-img" src={botImg} />
        <div className="container-inner-text">
          <h1 className='title'><span className="big-letter">N</span>erdology</h1>
          <p>Test if you're a knowledge bot!</p>
        </div>
        <Link to='/quiz'>
          <Button 
            buttonAction={handleStartGame} 
            buttonSize={'big'}
          >
            Start test
          </Button> 
        </Link>
      </div>
    </div>
  )
}
