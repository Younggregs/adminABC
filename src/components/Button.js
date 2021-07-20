import React from 'react'
import '../styles/Components.css'

const Button = (props) => {
    return (
        <button
            className="main-button"
            onClick={props.handleClick}>
            {props.title}
        </button>
    )
}

export default Button;