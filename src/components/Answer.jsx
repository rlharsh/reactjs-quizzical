import React, { useEffect, useState } from 'react'
import '../css/answer.css'

const Answer = (props) => {

    const [selected, setSelected] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);

    function selectAnswer() {
        setSelected(prevState => !prevState);
        props.click();
    }

    const selectedStyle = {
        backgroundColor: "#4D5B9E",
        color: "#F5F7FB"
    }

    function toggleMouseOver() {
        setMouseOver((prevState) => !prevState);
    }

    return (
        <div onMouseEnter={toggleMouseOver} onMouseLeave={toggleMouseOver} onClick={selectAnswer} className={`answer animate__animated ${mouseOver ? "animate__tada" : null}`} style={selected ? selectedStyle : null}>
            <div className="answer__icon-container">
                <i className="fa-regular fa-lightbulb"></i>
            </div>
            <div className="answer__answer-container">
                <p>{props.answer}</p>
            </div>
        </div>
    )
}

export default Answer