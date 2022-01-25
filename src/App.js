import React from 'react';
import './App.css';
import Die from "./components/Die/Die";
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {

  /*
      function allNewDice() {
        // new array to hold my numbers
        const newNumbers = [];
        // loop 10 times
        for(let i = 0; i < 10; i++){
            let randomNum = Math.floor(Math.random() * 6 + 1)
            // push a random number from 1-6 to my array
            newNumbers.push(randomNum)
        }
        // return array
        return newNumbers
    }
  */

  const [numbers,setNumbers] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [time, setTime] = React.useState(()=>Date.now())

  const numberElements = numbers.map(number => {
    return (
       <Die key={number.id} id={number.id} value={number.value} isHeld={number.isHeld} holdDice={holdDice} />
    )
  })

  //console.log({numbers})

  function allNewDice(){
    return Array.from({length: 10}, () => makeObj())
  }

  function makeObj(){
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6), 
      isHeld: false
    }
  }

  function handleRoll(){
  
    if(tenzies){
      setNumbers(allNewDice())
      setTenzies(false)
      setCount(0)
      setTime(()=> Date.now())
    } else {
      setNumbers(prevState => prevState.map(number => {
        return number.isHeld ? 
            number : makeObj()
      }))
      setCount(count => count + 1)
    }
  }

  function holdDice(id){

    setNumbers(prevState => {
      let newArr = [];
      for(let i = 0; i < prevState.length; i++){
        if(prevState[i].id === id){
          let newObj = {...prevState[i]}
          newObj.isHeld = !newObj.isHeld;
          newArr.push(newObj)
        } else {
          newArr.push(prevState[i])
        }
      }
      return newArr;
    })
  }

  React.useEffect(()=> {
    let winner = numbers.every( (number, i, arr) => number.isHeld &&  number.value === arr[0].value )
    //console.log({winner})
    if(winner){
      setTenzies(true)
      setTime(prevState => Date.now() - prevState)
    }
  }, [numbers])

  return (
    <>
    {tenzies && <Confetti />}
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {numberElements}
      </div>
      <button className="roll-dice" onClick={handleRoll}>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <p>You won in {count} rolls and {Math.floor(time/1000)} seconds</p>}
    </main>
    </>
  );
}

export default App;
