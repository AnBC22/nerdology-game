import React from 'react'
import './App.css'
import StartPage from './pages/StartPage'
import Quiz from './pages/Quiz'
const triviaURL = 'https://opentdb.com/api.php?amount=3&difficulty=easy'

function App() {

  const [ startGame, setStartGame ] = React.useState(false)
  const [ triviaData, setTriviaData ] = React.useState(null)

  function handleStartGame() {
    console.log('Game started')
    setStartGame(prev => !prev)
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

    getQuestionsData()
  }, [])


  return (
    <>
      { 
        startGame ? 
        <Quiz triviaData={triviaData} /> : 
        <StartPage handleStartGame={handleStartGame} />
      }
    </>
  )
}

export default App
