import React from 'react';

function NumericGuess({ values }){
    return <div className='values'>
        {values.map((v,i)=>  <span key={i}>{v}</span>)}
    </div>


}


export default NumericGuess;