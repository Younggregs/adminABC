import React from 'react'
import '../styles/Components.css'

const tertiaryButton = (props) => {
    return (
        <button
            className="tertiary-button"
            onClick={props.handleClick}>
            {props.title}
        </button>
    )
}

export default tertiaryButton;