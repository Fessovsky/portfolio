import React, { useState, useEffect } from 'react';

export default function Input(props) {
    const [state, setState] = useState('');
    useEffect(() => {
        console.log('Input element rendered', props.changed);

        props.changed.isChanged && setState('');
    }, [props.changed]);
    return (
        <input
            onChange={(e) => {
                setState(e.target.value);
            }}
            value={state}
            ref={props.refer}
            {...props}></input>
    );
}
