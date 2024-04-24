import React from 'react'
import './AnswerButton.css'

export default function AnswerButton({ 
    clicked, 
    children, 
    on, 
    buttonState, 
    checkAnswers, 
    isCorrect }){
        

    const styles = {
        backgroundColor: ''
    }

    if(checkAnswers) {
        if(isCorrect) {
            styles.backgroundColor = '#1E88E5'
        } else if(on) {
            styles.backgroundColor = '#FF4081'
        } else {
            styles.backgroundColor = ''
        }
    } else if(on) {
        // styles.backgroundColor = '#555555'
        styles.backgroundColor = '#64B5F6'
        styles.color= '#333333'
    } else {
        styles.backgroundColor = ''
    }
   
    return (
        <button 
            onClick={clicked} 
            className="answer-button"
            style={styles}
            disabled={buttonState}
        >
            {children}
        </button>
    )
}
