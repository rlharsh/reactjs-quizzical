import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Answer from './Answer';

import '../css/container.css'
import { nanoid } from 'nanoid';

const Container = (props) => {
    
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [endGame, setEndGame] = useState(false);
    
    const quizQuestions = props.quizQuestions;

    let quizQuestion = "";
    let quizCategory = "";
    let quizAnswers = [];

    useEffect(() => {
        if (endGame) {
            setTimeout(() => {
                props.onSelectionChanged(answeredQuestions);
            }, 2000);
        }
    }, [endGame]);

    let bookmarkedQuestions = [];

    function answerSelected(id) {
        let newArray = [];

        newArray = quizAnswers.map((answer) => {
            return {
                key: nanoid(),
                question: quizQuestion,
                id: answer.props.id,
                answer: answer.props.answer,
                selected: id === answer.props.id ? true : false,
                correct: answer.props.correct
            }
        })
        
        setAnsweredQuestions((prevState) => [...prevState, newArray]);
        processNextQuestion();
    }


    function handleBookmark(id) {

    }

    function processNextQuestion() {
        if (questionIndex + 1 < props.quizQuestions.length) {
            setQuestionIndex((prevState) => prevState + 1);
        } else {
            // The game is over!
            setEndGame(true);
        }
    }

    function buildAnswerIndex() {
        quizAnswers = quizQuestions[questionIndex].answerIncorrect.map((answer) => {
            let id = nanoid();
            return <Answer 
                key={id}
                answer={answer}
                selected={false}
                click={() => answerSelected(id)}
                correct={false}
                id={id}
                bookmarked={false}
            />
        });
        let id = nanoid();
        quizAnswers.push(
            <Answer
                key={nanoid()}
                answer={quizQuestions[questionIndex].answerCorrect}
                selected={false}
                click={() => answerSelected(id)}
                correct={true}
                id={id}
                bookmarked={false}
            />
        );
        quizQuestion = quizQuestions[questionIndex].question;
        quizCategory = quizQuestions[questionIndex].category;
    }

    // Build the answer index!
    buildAnswerIndex();

    return (
        <div className={`container animate__animated animate__bounceInRight ${endGame ? "animate__hinge" : null}`}>
            <h3 className='container__question-number'>Question: <span className='container__question-number__emphasize'>{questionIndex + 1}</span>/5<br /></h3>
            <span className='container__question-number__category'>{quizCategory}</span>
            <div className='container__question'>
                <h2>{quizQuestion}</h2>
            </div>
            <div className="container__answer">
                {quizAnswers}
            </div>
            <div className='button-container'>
                <button className='small-button'><i className="fa-regular fa-bookmark"></i></button>
            </div>
        </div>
    )
}

export default Container