import React from 'react'
import './App.css'
import StartPage from './pages/StartPage'
import Quiz from './pages/Quiz'
import WaitingTime from './pages/WaitingTime'
const triviaURL = 'https://opentdb.com/api.php?amount=3&difficulty=easy'

function App() {

  let pageLoaded = true

  const [ startGame, setStartGame ] = React.useState(false)
  const [ triviaData, setTriviaData ] = React.useState(null)
  const [ startNewGame, setStartNewGame ] = React.useState(false)
  const [ waitingTime, setWaitingTime ] = React.useState(false)

  function handleStartGame() {
    console.log('Game started')
    setStartGame(prev => !prev)
  }

  function handleStartNewGame() {
    setWaitingTime(true)
    setTimeout(() => {
      setStartNewGame(prev => !prev)
    }, 4000)

    setTimeout(() => {
      handleWaitingTime()
    }, 5100)
  }

  function handleWaitingTime() {
    setWaitingTime(false)
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

    if(pageLoaded) {
      getQuestionsData()
    }

    pageLoaded = false

  }, [startNewGame])


  return (
    <>
      {
          waitingTime ? 
          <WaitingTime/>: 
          startGame ? 
          <Quiz triviaData={triviaData} handleStartNewGame={handleStartNewGame}/> : 
          <StartPage handleStartGame={handleStartGame} />
      }
    </>
  )
}

export default App
