import React from 'react'
import '../css/menu.css'

const Menu = (props) => {
  return (
    <div className='menu'>
      <h1 className='menu__title'>Quizzical</h1>
        <h3 className='menu__subheader'>
          "Quizzical is a game where you test your witts against randomly generated questions."
        </h3>

        <button className='button' onClick={props.startGame}>Start Quiz</button>
    </div>
  )
}

export default Menu