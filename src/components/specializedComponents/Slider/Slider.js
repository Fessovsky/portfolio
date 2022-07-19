import React from 'react';
import './Slider.css';

export default function Slider({ children }) {
    const [scroll, setScroll] = React.useState({
        isScrolling: false,
        scrollLeft: 0,
        clientX: 0
    });
    const scroller = React.useRef();

    const onMouseDown = (e) => {
        e.preventDefault();
        const { scrollLeft } = scroller.current;
        setScroll({ isScrolling: true, scrollLeft: scrollLeft, clientX: e.clientX });
    };
    const onMouseUp = () => {
        setScroll({ isScrolling: false, scrollLeft: 0, clientX: 0 });
    };
    React.useEffect(() => {
        const onMouseMove = (event) => {
            const { clientX, scrollLeft } = scroll;
            scroller.current.scrollLeft = scrollLeft + clientX - event.clientX;
        };
        if (scroll.isScrolling) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [scroll]);
    return (
        <div ref={scroller} draggable={true} onMouseDown={onMouseDown} className="slider__wrapper">
            {children}
        </div>
    );
}
