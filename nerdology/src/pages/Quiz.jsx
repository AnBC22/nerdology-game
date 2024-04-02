import React from 'react'
import Button from '../components/Button/Button'
import { Link } from "react-router-dom"
import AnswerButton from '../components/AnswerButton/AnswerButton'

export default function Quiz({ triviaData, handleNewDataRequest }) {

    const [ checkAnswers, setCheckAnswers ] = React.useState(false)
    const [ shuffledAnswers, setShuffledAnswers ] = React.useState([])


    React.useEffect(() => {
        if(!triviaData) return;
    
        //Shuffle answers only when triviaData changes
        const newShuffledAnswers = triviaData.map(questionObj => {
            const incorrectAnswers = questionObj.incorrect_answers.map(inc_answ => inc_answ.incorrectAnswer)
            const correctAnswer = questionObj.correct_answer.correctAnswer
            const completeArray = [...incorrectAnswers, correctAnswer]



            const incorrectAnswers2 = questionObj.incorrect_answers
            const correctAnswer2 = questionObj.correct_answer
            const completeArray2 = [...incorrectAnswers2, correctAnswer2]

            return getShuffledArray(completeArray2)
        })

        setShuffledAnswers(newShuffledAnswers)

    }, [triviaData])


    function getShuffledArray(arr) {

        const array = [...arr]

        for(let i = array.length - 1; i > 0; i--) {

            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
        }
        return array
    }



    const triviaDataHtml = triviaData.map((questionObj, questionIndex) => {
        const answerButtonComponents = shuffledAnswers[questionIndex]?.map((answerObj, index) => {
            return (
                <AnswerButton
                    key={index}
                    clicked={() => handleClickedAnswer(answerObj.correctAnswer === questionObj.correct_answer.correctAnswer, answerObj.id)}
                    id={answerObj.id}
                >
                    {answerObj.incorrectAnswer ? answerObj.incorrectAnswer : answerObj.correctAnswer}
                </AnswerButton>
            )
        })

        return (
            <div key={questionIndex}>
                <h2>
                    {questionObj.question}
                </h2>
                <div className="answer-buttons-container">
                    {answerButtonComponents}
                </div>
            </div>
        )
    })

    
    function handleClickedAnswer(isCorrect, id) {

        



        console.log(id)

        if(isCorrect) {
            console.log('Congratulations')
        } else {
            console.log('Wrong answer')
        }
    }


    function handleShowAnswers() {
        console.log("Show answers")
        setCheckAnswers(true)
    }

    
    const [minutes, setMinutes] = React.useState(1);
    const [seconds, setSeconds] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
        setSeconds(prevSeconds => {
            if (prevSeconds === 0) {
            // If seconds reach 0, decrease minutes and reset seconds
            if (minutes === 0) {
                clearInterval(timer); // Stop the timer when it reaches 0:00
                return 0;
            }
            setMinutes(prevMinutes => prevMinutes - 1);
            return 59;
            }
            return prevSeconds - 1;
        });
        }, 50);
        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(timer);
    }, [minutes]); // Re-run effect only when minutes change


    return ( //End of Quiz function
        <>
            <h2>This is the Quiz</h2>
            <h1>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h1>
            {triviaDataHtml}
            {
                checkAnswers ?
                <Link to='/waitingtime'>
                    <Button 
                        buttonAction={handleNewDataRequest} 
                        buttonSize={'small'}
                    >
                        Play again
                    </Button> 
                </Link> 
                :

                <Button 
                    buttonAction={handleShowAnswers} 
                    buttonSize={'small'}
                >
                    Check answers
                </Button>
            }
        </>
    )
}