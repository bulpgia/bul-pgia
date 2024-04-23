import React from 'react';
import { colors } from '../colors';


function ColorGuess({ values }){
    return <div className='values'>
        {values.map((v,i)=> 
         <div key={i} className="swatch" style={{ backgroundColor: colors[v] }} />
         )}
    </div>
}


export default ColorGuess;