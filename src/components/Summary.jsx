import { nanoid } from 'nanoid';
import React, { useEffect } from 'react'
import { useState } from 'react'
import '../css/summary.css'
import SummaryElement from './SummaryElement';

const Summary = (props) => {

    const answers = props.answers;
    let [answerElements, setAnswerElements] = useState([]);
    let [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        buildDisplay();
    },[])

    function updateCorrectAnswers() {
        setCorrectAnswers(prevState => prevState + 1);
    }

    function buildDisplay() {
        setAnswerElements(() => answers.map((question) => {
            return <SummaryElement 
                key={nanoid()}
                question={question}
                update={updateCorrectAnswers}
            />
        }));
    }

    return (
        <div className='box'>
            <h2 className="results-header">You answered {correctAnswers} answers correctly!</h2>
            {answerElements}
        </div>
    )
}

export default Summary