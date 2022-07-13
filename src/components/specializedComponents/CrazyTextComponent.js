import React, { useEffect, useState, useRef } from 'react';

export default function CrazyTextComponent(props) {
    const [text, setText] = useState(props.text);
    const interval = useRef(150);

    function crazyTextFunction(componentText) {
        let text = componentText.split('').map((char) => {
            char = Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
            return char;
        });
        return text.join('');
    }
    useEffect(() => {
        const intervalModification = setInterval(() => {
            interval.current = Math.floor(Math.random() * 200) + 50;
        }, 500);
        const intervalNormalization = setInterval(() => {
            setText(props.text);
            interval.current = 500;
        }, 1000);
        return () => {
            clearInterval(intervalModification);
            clearInterval(intervalNormalization);
        };
    }, [props.text]);
    useEffect(() => {
        const intervalID = setInterval(() => {
            let newText = crazyTextFunction(props.text);
            setText(newText);
        }, interval.current);

        return () => {
            clearInterval(intervalID);
        };
    }, [text, props.text]);

    return <>{text}</>;
}
