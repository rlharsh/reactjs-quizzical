import { nanoid } from 'nanoid';
import React, { useEffect } from 'react'
import { useState } from 'react';
import '../css/summary_element.css'
import SummaryAnswer from './SummaryAnswer';

const SummaryElement = (props) => {

    const [questionHeadline, setQuestionHeadline] = useState(null);
    const [questionAnswers, setQuestionAnswers] = useState([]);

    function buildIndex() {
        props.question.map((question) => {
            if (questionHeadline === null) {
                setQuestionHeadline(question.question);
            }
            setQuestionAnswers((...prevState) => [...prevState, 
                <SummaryAnswer 
                    key={nanoid()}
                    answer={question.answer}
                    selected={question.selected}
                    correct={question.correct}
                    update={props.update}
                />
            ])
        })
    }

    useEffect(() => {
        buildIndex();
    }, [])

    return (
        <div className="element-wrapper">
            <div className="element">
                <div className="element__question">
                    <h2>{questionHeadline}</h2>
                </div>
                <div className="element__responses">
                    {questionAnswers}
                </div>
            </div>
        </div>
    )
}

export default SummaryElement