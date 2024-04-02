import React from 'react'

export default function AnswerButton({clicked, children, id }) {

    console.log(`answer ${children} has the id: ${id}`)
    
    return (
        <button 
            onClick={clicked} 
            className="answer-button"
        >
            {children}
        </button>
    )
}
