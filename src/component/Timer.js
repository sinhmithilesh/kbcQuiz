import { useEffect, useState } from "react"

export default function Timer({setStop, questionNumber,holdCount, setHoldCount, setLastCount}) {

    const [timer, setTimer] = useState(30)


     useEffect(()=>{
        
        if(timer === 0){
            return setStop(true)
        }

        if(holdCount){
            return setLastCount(timer)
        }
                            
        const interval = setInterval(()=>{
             setTimer(prev => prev-1)  
        },1000)

        return () => clearInterval(interval) //clean up functon
    },[setStop, timer])
        

     useEffect(()=>{
        if(questionNumber> 4){
            setTimer(45)
        }
        else{
            setTimer(30)
        }
     },[questionNumber])

  return timer
}
