import React from 'react'
import '../css/summary_answer.css'

const SummaryAnswer = (props) => {


    if (props.correct && props.selected) {
        props.update();
    }

  return (
    <div className={`answer-wrap ${props.selected && !props.correct ? 'incorrect' : null} ${props.correct ? 'correct' : null}`}>
        <h2 className={`summary-answer`}>{props.answer}</h2>
    </div>
  )
}

export default SummaryAnswer