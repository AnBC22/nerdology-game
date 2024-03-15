import React from 'react'
// import './App.css'

export default function Quiz({triviaData}) {
    function insertRandom(array, newElement) {
        const randomIndex = Math.floor(Math.random() * array.length)
        const newArray = array.toSpliced(randomIndex, 0, newElement)
        return newArray
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
        </>
    )
}