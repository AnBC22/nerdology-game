import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import StartPage from './pages/StartPage'
import Quiz from './pages/Quiz'
import WaitingTime from './pages/WaitingTime'

const triviaURL = 'https://opentdb.com/api.php?amount=3&difficulty=easy'

let pageLoaded = true

function App() {

  const [ triviaData, setTriviaData ] = React.useState(null)
  const [ newRequest, setNewRequest ] = React.useState(false)


  function handleNewRequest() {
    setNewRequest(true)
  }

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

      console.log(`newRequest is: ${newRequest}`)


      if(pageLoaded && !newRequest) {
        getQuestionsData()
      } 
      else if(newRequest) {
        const myInterval = setTimeout(() => {
          getQuestionsData()
          setNewRequest(false)
        }, 5050)

        return () => {
          clearTimeout(myInterval)
        }
      }

      pageLoaded = false

  }, [triviaData, newRequest])


  return (
    <BrowserRouter>
      <header>
        <h3>Some links and info that persists across all pages</h3>
      </header>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<Quiz triviaData={triviaData} handleNewRequest={handleNewRequest}/>} />
        <Route path="waitingtime" element={<WaitingTime/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
