import React from 'react'
import Button from '../components/Button'
import GameOver from './GameOver'

// import './App.css'

export default function Quiz({ triviaData, handleStartNewGame }) {

    const [ checkAnswers, setCheckAnswers ] = React.useState(false)

    function insertRandom(array, newElement) {
        const randomIndex = Math.floor(Math.random() * array.length)
        const randomIndexRef = React.useRef(randomIndex)
        const newArray = array.toSpliced(randomIndexRef, 0, newElement)
        return newArray
    }

    function handleShowAnswers() {
        console.log("Show answers")
        setCheckAnswers(true)
    }

    const triviaDataHtml = triviaData.results.map((questionObj, index) => {

        const incorrectAnswers = questionObj.incorrect_answers
        
        const allAnswers = insertRandom(incorrectAnswers, questionObj.correct_answer)

        const allAnswersHtml = allAnswers.map(answer => {
            return (
                <p>{answer}</p>
            )
        })

        return ( //End of triviaDataHtml
            <div key={index}>
                <h2>
                    {questionObj.question}
                </h2>
                {allAnswersHtml}
            </div>
        )
    })

    return ( //End of Quiz function
        <>
            <h2>This is the Quiz</h2>
            {triviaDataHtml}
            {
                checkAnswers ? 
                <Button 
                    buttonAction={handleStartNewGame} 
                    buttonText={'Play again'}
                    buttonSize={'small'}
                >
                    Play again
                </Button> :

                <Button 
                    buttonAction={handleShowAnswers} 
                    buttonText={'Check Answers'}
                    buttonSize={'small'}
                >
                    Check answers
                </Button>
            }
        </>
    )
}