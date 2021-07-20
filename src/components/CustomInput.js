import React from 'react'

export default function CustomInput(props) {
    return (
        <div className="custom-input">
            <label>{props.label}</label>
            <input type={props.type} id={props.id} placeholder={props.placeholder} />
        </div>
    )
}
