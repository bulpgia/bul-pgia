import React from 'react';
import NumericGuess from './numeric';
import ColorGuess from './color';

function Guess({values, res, isNumericMode, classes}){
    let feedback = '';
    if (res){
        feedback += 'בול '.repeat(res.bull).trim()
        feedback += '  פגיעה'.repeat(res.cow)
    }
    return <div className={['guess', ...classes].join(' ')}>
    {res && <div className="feedback">
        {feedback}
        </div>}
    { isNumericMode ? <NumericGuess values={values} /> : <ColorGuess values={values} />}
    </div>


}


export default Guess;