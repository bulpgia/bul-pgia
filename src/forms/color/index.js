import React, { useState, useRef, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import { ColorPicker } from './color-picker';
import { colors, reverseColors } from '../../colors';

const backgroundDefault = '#ffebcd'


function ColorForm({ numOfEntries, handleSubmit }) {
    const defaultValues = [...Array(numOfEntries).fill(backgroundDefault)];
    let [values, setValues] = useState(defaultValues)
    const bottomRef = useRef(null);

    const updateValue = (i) => (value) => {
        if (!value) return;
        console.log(value.hex)
        let copy = [...values];
        copy[i] = value.hex;
        setValues(copy)
        bottomRef.current.focus();
    }

    const submit = () => {
        if (values.some(color => color === backgroundDefault)) return;
        handleSubmit(values.map(color => reverseColors[color]));
        setValues(defaultValues);
    }

    useEffect(submit, [values])

    return <div>
            <div className='guess' ref={bottomRef} style={{'margin-bottom': '100px'}}>
            {values.map((i, idx) => {
                return <ColorPicker key={idx} color={i} onChangeComplete={updateValue(idx)}/>
            }
            )}
            </div>
            <div className='color-legend'>
                <CirclePicker colors={colors} width='210px' />
            </div>
        </div>
}

export default ColorForm;