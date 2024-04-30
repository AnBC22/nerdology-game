import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities'
import StartPage from './pages/StartPage/StartPage'
import Quiz from './pages/Quiz/Quiz'
import WaitingTime from './pages/WaitingTime/WaitingTime'
import './App.css'

const triviaURL = 'https://opentdb.com/api.php?amount=5&difficulty=easy'

let pageLoaded = true

function App() {
  const [ newRequest, setNewRequest ] = React.useState(false)
  const [ shuffledAnswers, setShuffledAnswers ] = React.useState([])

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

        const dataWithIDs = data.results.map(questionObj => {
          const incorrectAnswersArray = questionObj.incorrect_answers.map((inc_answ) => (
            {
              answer: decode(inc_answ),
              isCorrect: false,
              on: false,
              id: nanoid()
            }
          ))

          return (
            {
              question: decode(questionObj.question),
              answers: [
                ...incorrectAnswersArray,
                {
                  answer: decode(questionObj.correct_answer),
                  isCorrect: true,
                  on: false,
                  id: nanoid()
                }
              ]
            }
          )
        })

        setShuffledAnswers(
          dataWithIDs.map(questionObj => (
            {
              ...questionObj,
              answers: getShuffledArray(questionObj.answers)
            }
          ))
        )
      
        function getShuffledArray(array) {
          for(let i = array.length - 1; i > 0; i--) {
  
              const randomIndex = Math.floor(Math.random() * (i + 1));
              [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
          }
          return array
        }

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

  }, [shuffledAnswers, newRequest])

  return (
    <BrowserRouter>
      <header>
        {/* If necessary, I can add elements here that would show across all pages */}
      </header>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<Quiz shuffledAnswers={shuffledAnswers} handleNewDataRequest={handleNewDataRequest} />} />
        <Route path="waitingtime" element={<WaitingTime/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
