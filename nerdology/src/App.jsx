import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import StartPage from './pages/StartPage'
import Quiz from './pages/Quiz'
import WaitingTime from './pages/WaitingTime'

const triviaURL = 'https://opentdb.com/api.php?amount=3&difficulty=easy'

function App() {

  const [ triviaData, setTriviaData ] = React.useState(null)

  React.useEffect(() => {
    async function getQuestionsData() {

      try {
        const response = await fetch(triviaURL)
        if(!response.ok) {
          throw new Error('Network response failed')
        }
        const data = await response.json()
        setTriviaData(data)
      }

      catch(error) {
        console.error('Error fetching trivia data:', error.message)
        alert("There was an error fetching data for the quiz")
      }

    }

      getQuestionsData()

  }, [triviaData])


  return (
    <BrowserRouter>
      <header>
        <h3>Some links and info that persists across all pages</h3>
      </header>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<Quiz triviaData={triviaData} />} />
        <Route path="waitingtime" element={<WaitingTime/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
