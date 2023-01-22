import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Answer from './Answer';

import '../css/container.css'
import { nanoid } from 'nanoid';

const Container = (props) => {

    const [answerSubmitted, setAnswerSubmitted] = useState(false);
    const [availableAnswers, setAvailableAnswers] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState({});
    const [activeIndex, setActiveIndex] = useState(0);

    function selectAnswer(id) {

        // How the hell does this say {0} on the console,
        // but I can clearly see all of the answers on the screen?
        console.log(availableAnswers.length);
    }

    useEffect(() => {
        setActiveQuestion(() => props.quizQuestions[activeIndex])
    }, [])

    useEffect(() => {
        let answers = [];
        if (!isEmptyObject(activeQuestion)) {
            answers = activeQuestion.answerIncorrect.map((answer) => {
                const id = nanoid();
                return <Answer
                    key ={id}
                    answer={answer}
                    correct={false}
                    id={id}
                    select={() => selectAnswer(id)}
                />
        });

        const id = nanoid();
        answers.push(
            <Answer
                key={id}
                answer={activeQuestion.answerCorrect}
                correct={true}
                id={id}
                select={() => selectAnswer(id)}
            />
        );

        setAvailableAnswers(answers);
        }
    
        return () => {
            console.log("cleanup")
        }

    }, [activeIndex, activeQuestion])

    function isEmptyObject(obj){
        return JSON.stringify(obj) === '{}'
    }

    return (
        <div className='container'>
            <h3 className='container__question-number'>Question: <span className='container__question-number__emphasize'>2</span>/5</h3>
            <div className='container__question'>
                <h2>{activeQuestion.question}</h2>
            </div>
            <div className="container__answer">
                {availableAnswers}
            </div>
            {/* <button className='button button--submit'>Next Question</button> */}
        </div>
    )
}

export default Container