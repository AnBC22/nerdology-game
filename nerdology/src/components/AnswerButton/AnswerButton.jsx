import React from 'react'

export default function AnswerButton({clicked, children }) {


    
    return (
        <button 
            onClick={clicked} 
            className="answer-button"
        >
            {children}
        </button>
    )
}
