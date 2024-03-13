import React from 'react'
import './App.css'
import StartPage from './pages/StartPage'
const questionsURL = 'https://opentdb.com/api.php?amount=3&difficulty=easy'

function App() {

  const [ startGame, setStartGame ] = React.useState(false)
  const [ questionsData, setQuestionsData ] = React.useState(null)

  function handleStartGame() {
    console.log('Game started')
    setStartGame(prev => !prev)
  }

  React.useEffect(() => {
    async function getQuestionsData() {
      const response = await fetch(questionsURL)
      const data = await response.json()
      setQuestionsData(data)
    }
    getQuestionsData()
  }, [])


  return (
    <>
      { startGame ? <h2>Questions showing</h2> : <StartPage handleStartGame={handleStartGame}/>}
    </>
  )
}

export default App
