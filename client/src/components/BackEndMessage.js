import React from 'react'

export default function BackEndMessage({ message }) {


    const styles = {
        color: message.success ? 'Green' : 'Red'
    }

    return (
        message.message && <h4 className="backEndMessage" style={styles}>{message.success ? "Great job:" : "Error:"} {message.message} </h4>
    )
}