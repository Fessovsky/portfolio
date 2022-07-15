import React, { useState, useRef, useEffect } from 'react';

export default function Learning(props) {
    const [message, setMessage] = useState('');
    const [learned, setLearned] = useState([]);
    const counter = useRef(0);

    useEffect(() => {
        console.log(learned, message, counter);
        if (props.newKnowledge[counter.current] === undefined) {
            setMessage('!!!NOTHING TO LEARN!!!');
            setTimeout(() => {
                props.stopLearning();
                return;
            }, 1000);
        }
        setTimeout(() => {
            if (counter.current < props.newKnowledge.length) {
                setMessage(() => props.newKnowledge[counter.current]);
            } else {
                props.stopLearning();
                return;
            }
            setLearned((prevState) => {
                console.log(counter.current);
                console.log(props.newKnowledge[counter.current - 1]);
                let newArr = [...prevState];
                newArr.push(props.newKnowledge[counter.current - 1]);
                return newArr;
            });
            counter.current++;
        }, 1000);
    }, [message, props, learned]);
    return (
        <div>
            {counter.current < props.newKnowledge.length && 'Learning...'} {message}
            <pre style={{ height: '150px' }}>
                <code>"learnedKnowledge": "{learned.length > 1 ? learned.join('", "') : learned}"</code>
            </pre>
        </div>
    );
}
