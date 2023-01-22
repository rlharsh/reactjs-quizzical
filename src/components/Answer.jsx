import React, { useState } from 'react'
import '../css/answer.css'

const Answer = (props) => {

    const [selected, setSelected] = useState(false);

    function selectAnswer() {
        setSelected(prevState => !prevState);
        props.select();
    }

    const selectedStyle = {
        backgroundColor: "#293264",
        color: "#F5F7FB"
    }

    return (
        <div onClick={selectAnswer} className='answer' style={selected ? selectedStyle : null}>
            <p>{props.answer}!</p>
        </div>
    )
}

export default Answer