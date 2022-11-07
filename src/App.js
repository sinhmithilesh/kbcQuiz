import React, { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Timer from './component/Timer'
import Trivia from './component/Trivia'
import Start from './component/Start'
import { data, moneyPyramid } from './data'

export default function App() {
  const [username, setUserName] = useState("")
  const [questionNumber, setQuestionNumber] = useState(1)
  const [stop, setStop] = useState(false)
  const [holdCount, setHoldCount] = useState(false)
  const [lastCount, setLastCount] = useState(0)
  const [earned, setEarned] = useState(0)



  useEffect(() => {
    if (questionNumber > 1) {
      setHoldCount(false)
      const getAmount = moneyPyramid.find((m) => m.id === questionNumber - 1)
      setEarned(getAmount.amount)
    }
  }, [questionNumber])

  
  const playAgain = () => {
    window.location.reload()
  }


  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <div className='gameEnd'>
              <h1 className="endText">{username}, you earned : Rs {earned} </h1>
              <button className='startButton' onClick={playAgain}>Play Again</button>
              </div>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer 
                      setStop={setStop} 
                      holdCount={holdCount}
                      setLastCount={setLastCount}
                      setHoldCount={setHoldCount}
                      questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    holdCount ={holdCount}
                    setHoldCount={setHoldCount}
                    stop={stop}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {!stop ? moneyPyramid.map((amount) => (
                <li
                  key={amount.id}
                  className={
                    questionNumber === amount.id
                      ? 'moneyListItem active'
                      : 'moneyListItem'
                  }
                  onClick={() => setQuestionNumber(amount.id)}
                >
                  <span className="moneyListItemNumber">{amount.id}.</span>
                  <span className="moneyListItemAmount">{amount.amount}</span>
                </li>
              )) : <h3 className='moneyListItem'>Thanks for playing</h3>}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  )
}
