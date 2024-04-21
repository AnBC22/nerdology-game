import React from 'react'
import './AnswerButton.css'

export default function AnswerButton({ clicked, children, on, buttonState }) {
    const styles = {
        backgroundColor: on ? '#1E88E5' : ''
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
