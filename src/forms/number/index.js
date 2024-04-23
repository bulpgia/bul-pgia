import React, { useState, useRef } from 'react';
import { colors } from '../../colors';


function Input({ value, handleChange, inputRef, isNumericMode, showColors}) {
    let props = {
        value,
        ref: inputRef,
        onChange: (e) => handleChange(e.target.value[e.target.value.length - 1]),
    }
    return <div className='guess-row'>
            <div><input {...props}/></div>
            { !isNumericMode && showColors ? <div style={{ backgroundColor: colors[value], width: '30%', height: '10%', marginTop: '5px'}}></div> : ''}
        </div>
}


function NumberForm({ numOfEntries, handleSubmit, validator, isNumericMode, showColors }) {
    let [values, setValues] = useState([...Array(numOfEntries).fill('')])
    const firstInput = useRef(null);

    const updateValue = (i) => (value) => {
        console.log(value)
        if (value && !/^\d*$/.test(value)) {
            alert('only digits are allowed')
            return;
        }
        let copy = [...values];
        copy[i] = value ? parseInt(value) : '';
        setValues(copy)
    }

    const sendForm = (e) => {
        e.preventDefault();
        console.log(values)
        if (values.some(v => !Number.isInteger(v) || validator(v))) {
            alert('you have to complete the form with valid values')
            return;
        }
        handleSubmit(values)
        setValues([...Array(numOfEntries).fill('')])
        firstInput.current.focus()
    }

    return <div className='guess'>
    <form className='values' onSubmit={(e) => sendForm(e)}>
        {values.map((i, idx) => {
            let props = {
                key: idx,
                value: values[idx],
                handleChange: updateValue(idx),
                isNumericMode,
                showColors,
            }
            if (!idx)
                props.inputRef = firstInput;
            return <Input {...props} />
        }
        )}
        <input type="submit" value="Submit" />
    </form>
    </div>
}

export default NumberForm;