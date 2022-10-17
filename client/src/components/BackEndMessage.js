import React from 'react'

export default function BackEndMessage(props) {
    const styles = {
        color: props.success ? 'Green' : 'Red',
    }

    return (
        props.message && <h4 className="backEndMessage" style={styles}>{props.success ? "Great job:" : "Error:"} {props.message} </h4>
    )
}