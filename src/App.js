import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Form from './forms/form-wrapper.js';
import NumberForm from './forms/number/index.js';
import Guess from './guesses/guess-wrapper.js';
import thumbsUp from './thumbsup.png';

function App() {
  let [entries, setEntries] = useState(0);
  let [guesses, setGuesses] = useState([]);
  let [isNumericMode, setIsNumericMode] = useState(false)
  //todo: change initial step to 0 to allow mode choice
  let [setupStep, setSetupStep] = useState(1)



  const reset = () => {
    setEntries(0);
    setGuesses([])
    setIsNumericMode(false);
    //todo: change initial step to 0 to allow mode choice
    setSetupStep(1);
  }

  let endOfPage = useRef(null);
  useEffect(()=> {
    setTimeout(() => {
      endOfPage.current.scrollIntoView({behavior: "smooth"})
    }, 350);
  }, [guesses])


const checkGuess = (values) => {
  const res = {bull: 0, cow: 0};
  values.forEach((v,idx,arr) =>{
    // if (arr.indexOf(v) !== idx)
    //   return;
    if (v === entries[idx])
      res.bull++;
    else if (entries.includes(v))
      res.cow++
  })
  return res;
}

const setMode = (numeric) => () => {
  setIsNumericMode(numeric);
  setSetupStep(setupStep + 1)
}

const chooseMode = <div>
<h2>?איך תרצו לשחק</h2>
  <button className='mode-choice'
    onClick={setMode(true)}
  >מספרים</button>
  <button className='mode-choice'
    onClick={setMode(false)}
  >צבעים</button>
</div>;

const chooseSize = <div>
<h2>?כמה {isNumericMode ? 'מספרים' : 'צבעים'} להגריל</h2>
<NumberForm
  numOfEntries={1}
  validator={(v) => v < 1 || v > 5}
  showColors={false}
  handleSubmit={(...v) => setEntries(randomizeEntries(parseInt(v)))} />
  <div><button onClick={reset}>חזרה לבחירת מצב</button></div>
</div>;


const setup = [chooseMode, chooseSize];

const randomizeEntries = (amount) => {
  let entries = []
  for (let i=0; i<amount; i++){
    let rand = getRandomDigit();
    while (entries.includes(rand)){
      rand = getRandomDigit()
    }
    entries.push(rand);
  }
  return entries;
}
  let jsx;
  if (!entries)
    jsx = setup[setupStep]
  else{
    let won = false;
    let guessWithRes = [];
    guesses.forEach((g,i) => {
      let res = checkGuess(g)
      won = res.bull === entries.length;
      guessWithRes.push({guess: g, res})
      console.log(guessWithRes);
    })
    jsx=
    <div>
      <Guess isNumericMode={isNumericMode} values={entries.map(e => won ? e : '*')} classes={['non-active-guess']} />
      <div><button onClick={reset}>reset</button></div>
      {guessWithRes.map((gr, idx) => <Guess key={idx} values={gr.guess} res={gr.res} isNumericMode={isNumericMode} classes={['non-active-guess']} />)}
      { !won ? <div>
        <Form
        numOfEntries={entries.length}
        handleSubmit={(v) => setGuesses([...guesses, v])}
        isNumericMode={isNumericMode} />
        </div>
        : 
        <img className="thumbsup" src={thumbsUp} alt="good job"/>}
      </div>
  }
  return <div>
  {jsx}
  <div ref={endOfPage} />
  </div>;
}


function getRandomDigit(){
  return Math.floor(Math.random() * 10);
}

export default App;
