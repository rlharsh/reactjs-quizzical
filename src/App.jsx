import { useState } from 'react'
import { useEffect } from 'react'

/* Images */
import blueBlob from './assets/images/blob_blue.svg'
import yelloBlob from './assets/images/blob_yellow.svg'

/* Components */
import Menu from './components/Menu'
import Container from './components/Container'

/* CSS */
import './css/app.css'

import { nanoid } from 'nanoid'

function App() {

  /* States */
  const [menuShowing, setMenuShowing] = useState(true);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState([]);

  /* Start The Game */
  function startGame() {
    if (gameRunning) { return; }
    setGameRunning(true);
    setGameStart(true);
    setMenuShowing(prevState => !prevState);
  }

  /* Set the Active Question */
  function setQuestion(question) {
    setActiveQuestion(question);
  }

  useEffect(() =>{   
    fetch(`https://opentdb.com/api.php?amount=5`)
    .then((response) => response.json())
    .then((data) => {
      setQuizQuestions(() => 
      data.results.map((question) => {
        return {
          key: nanoid(),
          category: question.category,
          difficulty: question.difficulty,
          question: question.question,
          answerCorrect: question.correct_answer,
          answerIncorrect: [...question.incorrect_answers]
        }
      }));
    })
  }, [gameStart])

  return (
    <div className="App">
      <img src={blueBlob} className="blob blob__blue" />
      <img src={yelloBlob} className="blob blob__yellow" />
      <main>
        {menuShowing && <Menu startGame={startGame}/>}
        {gameRunning && <Container quizQuestions={quizQuestions} />}
      </main>

    </div>
  )
}

export default App
