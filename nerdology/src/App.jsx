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

        //IT WOULD BE BETTER TO SHUFFLE ALL THE ANSWERS HERE?
        //AND THEN PASS ALL THE DATA WITH THE IDS AND THE SHUFFLED ANSWERS TO THE QUIZ?
        //SO THAT I DON'T SHUFFLE ALL THE ANSWERS AGAIN ON THE QUIZ COMPONENT!!!
      
        setTriviaData(data.results.map(questionObj => {
          const incorrectAnswersArray = questionObj.incorrect_answers.map((inc_answ, index) => (
            {
              answer: inc_answ,
              isCorrect: false,
              on: false,
              id: nanoid()
            }
          ))

          return (
            {
              question: questionObj.question,
              answers: [
                ...incorrectAnswersArray,
                {
                  answer: questionObj.correct_answer,
                  isCorrect: true,
                  on: false,
                  id: nanoid()
                }
              ]
            }
          )
          
        })) 
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
