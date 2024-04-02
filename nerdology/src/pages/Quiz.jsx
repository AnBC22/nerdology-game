import React from 'react'
import Button from '../components/Button/Button'
import { Link } from "react-router-dom"
import AnswerButton from '../components/AnswerButton/AnswerButton'

export default function Quiz({ triviaData, handleNewDataRequest }) {

    const [ checkAnswers, setCheckAnswers ] = React.useState(false)
    const [ shuffledAnswers, setShuffledAnswers ] = React.useState([])
    const [ updatedTriviaData, setUpdatedTriviaData ] = React.useState(null)

    // console.log(triviaData)

    React.useEffect(() => {
        if(!triviaData) return;

        // console.log("This is triviaData:")
        // console.log(triviaData)

        //Shuffle answers only when triviaData changes
        const newShuffledAnswers = triviaData.map(questionObj => getShuffledArray(questionObj.answers))
    
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

    function getTriviaDataHtml() {

        const mapArr = updatedTriviaData ? updatedTriviaData : triviaData

        const triviaDataHtml = mapArr.map((questionObj, questionIndex) => {
            const answerButtonComponents = shuffledAnswers[questionIndex]?.map((answerObj, index) => {
    
                const isCorrect = answerObj.isCorrect
                const id = answerObj.id
    
                return (
                    <AnswerButton
                        key={index}
                        clicked={() => handleClickedAnswer(isCorrect, id)}
                    >
                        {answerObj.answer}
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

        return triviaDataHtml

    }

  
    function handleClickedAnswer(isCorrect, id) {

        setUpdatedTriviaData(prevData => {
            if(updatedTriviaData) {
                return (
                    prevData.map(questionObj => (
                        {
                            ...questionObj,
                            answers: questionObj.answers.map(answer => {
                                if(answer.id === id) {
                                    //THE CURRENT ISSUE IS HERE, WHY AM I NOT ABLE TO HAVE TURNED ON ONLY ONE ANSWER?
                                    console.log(answer.on)
                                    return (
                                        {
                                            ...answer,
                                            on: !answer.on
                                        }
                                    )
                                } 
                                else {
                                    return answer
                                }
                            })
                        }
                    ))
                )
            }
            else {
                return triviaData
            }
        
        })

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


    console.log(`UPDATE TRIVIDA DATA IS: `)
    console.log(updatedTriviaData)

    return ( //End of Quiz function
        <>
            <h2>This is the Quiz</h2>
            <h1>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h1>
            {getTriviaDataHtml()}
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