import React from 'react';
import './Slider.css';

export default function Slider({ isOnlyY, isOnlyX, isBoth, children }) {
    let inputReactObject = React.Children.only(children);
    let clonedChild = React.cloneElement(inputReactObject, {
        className: 'slider__overflow',
        onScroll: function (e) {
            if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
                e.target.classList.remove('slider__mask');
            } else {
                e.target.classList.add('slider__mask');
            }
        }
    });

    const [scroll, setScroll] = React.useState({
        isOnlyX: isOnlyX || false,
        isOnlyY: isOnlyY || false,
        isBoth: isBoth || false,
        isScrolling: false,
        scrollLeft: 0,
        clientX: 0,
        scrollTop: 0,
        clientY: 0
    });
    const scroller = React.useRef();

    const onMouseDown = (e) => {
        const { scrollLeft, scrollTop } = scroller.current;

        scroller.current.children[0].classList.add('no__select');
        setScroll({
            isScrolling: true,
            scrollLeft: scrollLeft,
            clientX: e.clientX,
            scrollTop: scrollTop,
            clientY: e.clientY
        });
    };
    const onMouseUp = () => {
        scroller.current.children[0].classList.remove('no__select');
        setScroll({ isScrolling: false, scrollLeft: 0, clientX: 0, scrollTop: 0, clientY: 0 });
    };
    React.useEffect(() => {
        const onMouseMove = (event) => {
            const { clientX, scrollLeft, clientY, scrollTop } = scroll;

            if (isOnlyY) {
                scroller.current.children[0].scrollTop = scrollTop + clientY - event.clientY;
            }
            if (isOnlyX) {
                scroller.current.children[0].scrollLeft = scrollLeft + clientX - event.clientX;
            }
            if (isBoth) {
                scroller.current.children[0].scrollLeft = scrollLeft + clientX - event.clientX;
                scroller.current.children[0].scrollTop = scrollLeft + clientY - event.clientY;
            }
        };

        if (scroll.isScrolling) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [scroll, isOnlyY, isOnlyX, isBoth]);

    return (
        <div ref={scroller} onMouseDown={onMouseDown} className="slider">
            {clonedChild}
        </div>
    );
}
