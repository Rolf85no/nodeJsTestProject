import React from 'react'

export default function ErrorMessage(props) {
    return (
        props.message && <h3 className="errorMessage">{props.message} </h3>
    )
}