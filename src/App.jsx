import { useState } from 'react'
import { useEffect } from 'react'

/* Images */
import blueBlob from './assets/images/blob_blue.svg'
import yelloBlob from './assets/images/blob_yellow.svg'
import scrimbaLogo from './assets/images/scrimba-logo.svg'

/* Components */
import Menu from './components/Menu'
import Container from './components/Container'
import Summary from './components/Summary'

/* CSS */
import './css/app.css'

import { nanoid } from 'nanoid'

function App() {

  /* States */
  const [menuShowing, setMenuShowing] = useState(true);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [summaryShowing, setSummaryShowing] = useState(false);

  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const onSelectionChanged = index => {

    setAnsweredQuestions(index);
    endGame();

  }

  /* Start The Game */
  function startGame() {
    if (gameRunning) { return; }
    setGameRunning(true);
    setGameStart(true);
    setMenuShowing(prevState => !prevState);
  }

  function endGame() {
    setGameRunning(false);
    setGameStart(false);
    setSummaryShowing(prevState => !prevState);
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
          question: decodeHTMLEntities(question.question),
          answerCorrect: decodeHTMLEntities(question.correct_answer),
          answerIncorrect: [...question.incorrect_answers]
        }
      }));
    })
  }, [gameStart])

  function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    <div className="App">
      {/* <img src={blueBlob} className="blob blob__blue" />
      <img src={yelloBlob} className="blob blob__yellow" /> */}
      <a href='https://www.scrimba.com/' target='_blank' alt='Scrimba Logo'><img src={scrimbaLogo} className="logo" /></a>
      <main>
        {menuShowing && <Menu startGame={startGame}/>}
        {gameRunning && <Container quizQuestions={quizQuestions} onSelectionChanged={onSelectionChanged} />}
        {summaryShowing && <Summary answers={answeredQuestions} />}
      </main>

    </div>
  )
}

export default App
