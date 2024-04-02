import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { nanoid } from 'nanoid'

import StartPage from './pages/StartPage'
import Quiz from './pages/Quiz'
import WaitingTime from './pages/WaitingTime'

const triviaURL = 'https://opentdb.com/api.php?amount=3&difficulty=easy'

let pageLoaded = true

function App() {

  const [ triviaData, setTriviaData ] = React.useState(null)
  const [ newRequest, setNewRequest ] = React.useState(false)

  function handleNewDataRequest() {
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
        const arrayOfQuestions = data.results

        console.log(arrayOfQuestions)

        /**
         * It seems that a better approach is to modify everything that I need about the fetched questionsdata
         * here and then pass it to the quiz, exactly as I want it to be (with the complete array of questions already shuffled)
         * So, I'll have something like this before passing it to quiz: 
         * 
         * answers: [{correct_answer: '', id}, {incorrect_answer: '', id}, {}, {}]
         * 
         * 
         * 
         */

        setTriviaData(
          arrayOfQuestions.map(questionObj => {
            return {
              ...questionObj,
              correct_answer: {correctAnswer: questionObj.correct_answer, id: nanoid()},
              incorrect_answers: questionObj.incorrect_answers.map((incorrectAnswer) => {
                return {
                  incorrectAnswer: incorrectAnswer,
                  id: nanoid()
                }
              })
            }
          })
        ) 
      }

      catch(error) {
        console.error('Error fetching trivia data:', error.message)
        alert("There was an error fetching data for the quiz")
      }

    }
      if(pageLoaded && !newRequest) {
        getQuestionsData()
      } 
      else if(newRequest) {
        const myInterval = setTimeout(() => {
          getQuestionsData()
          setNewRequest(false)
        }, 4000)

        return () => {
          clearTimeout(myInterval)
        }
      }

      pageLoaded = false

  }, [triviaData, newRequest])

  return (
    <BrowserRouter>
      <header>
        <h3>Some links and additional info go here</h3>
      </header>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<Quiz triviaData={triviaData} handleNewDataRequest={handleNewDataRequest} />} />
        <Route path="waitingtime" element={<WaitingTime/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
