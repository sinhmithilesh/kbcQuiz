import {useState, useEffect } from "react";
import useSound from 'use-sound';
import play from "../sounds/play.mp3"
import wait  from "../sounds/wait.mp3"
import wrong from "../sounds/wrong.mp3"
import correct from "../sounds/correct.mp3"

export default function Trivia({ data,stop, setStop, questionNumber,setQuestionNumber, holdCount, setHoldCount}) {

  const [question , setQuestion] = useState(null)
  const [selectedAnswer , setSelectedAnswer] = useState(null)
  const [className, setClassName] = useState('answer')
  const [iSgameOn, setIsGameOn] = useState(false)
  const [letsPlay] = useSound(play)
  const [correctAnswer] = useSound(correct)
  const [wrongAnswer] = useSound(wrong)
  const [waiting] = useSound(wait)



  useEffect(()=>{
    letsPlay()
  },[letsPlay])

  useEffect(()=>{
    setQuestion(data[questionNumber-1])
   
  },[questionNumber, data])

  const delay = (duration, callback) => {
    setTimeout(()=>{
      callback()
    }, duration)
  }

  const handleClick = (answer) => {
    setHoldCount(true)
    setSelectedAnswer(answer)
    setClassName("answer active")
   
    delay(2000, ()=>{
      setClassName(answer.correct ? "answer correct" : "answer wrong")
    });

    delay(5000, ()=>{
      if(answer.correct){
        correctAnswer()
        delay(1500, ()=>{
          setQuestionNumber(prev=> prev + 1)
          setIsGameOn(true)
          setSelectedAnswer(null)  // once answer selected make null
        })
      }else{
        wrongAnswer()
        delay(1500, ()=>{
          setStop(true)
          setIsGameOn(false)
        })
      }
    })
  }




  return (
    <div className="trivia">
        <div className="question">{question?.question}</div>
        <div className="answers">
            {question?.answer.map((ans,index) => (
              <div 
                key={index} 
                className={selectedAnswer === ans ? className : "answer" } 
                onClick={()=>handleClick(ans)}
                >{ans.text}</div>
            ))}
            
            
        </div>
    </div>
  )
}
