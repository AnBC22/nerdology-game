import React from 'react'
/* React router */
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
/* ------------- */
import './App.css'
import StartPage from './pages/StartPage'
import Quiz from './pages/Quiz'
import WaitingTime from './pages/WaitingTime'

function App() {

  return (
    <>

    <BrowserRouter>
      <header>
        <h3>Some information that will be available to all pages (like links)</h3>
      </header>
      <Routes>
        <Route path="/" element={<StartPage />}/>
        <Route path="/quiz" element={<Quiz />}/>
        <Route path="/waitingTime" element={<WaitingTime/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

/*


{
    waitingTime ? 
    <WaitingTime/>: 
    startGame ? 
     : 
}

*/