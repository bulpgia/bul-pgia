import React from 'react';
import NumberForm from './number';
import ColorForm from './color';



function Form({ numOfEntries, handleSubmit, isNumericMode }) {
    return isNumericMode ? <NumberForm 
        numOfEntries={numOfEntries}
        validator={(v) => v < 0 || v > 9}
        handleSubmit={handleSubmit}
    /> : <ColorForm numOfEntries={numOfEntries} handleSubmit={handleSubmit} />
}

export default Form;