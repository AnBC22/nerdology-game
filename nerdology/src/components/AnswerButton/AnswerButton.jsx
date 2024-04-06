import React from 'react'

export default function AnswerButton({ clicked, children, on }) {
    const styles = {
        backgroundColor: on ? '#009900' : ''
    }
    
    return (
        <button 
            onClick={clicked} 
            className="answer-button"
            style={styles}
        >
            {children}
        </button>
    )
}
