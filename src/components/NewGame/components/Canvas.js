import React from 'react';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { Raven, Explosion } from './GameData';

const CanvasWrapper = styled.div`
    @media (max-height: 670px) {
        height: 70vh;
    }
`;
const Canvas = styled.canvas`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    @media (max-height: 670px) {
        top: calc(50% + 150px);
    }
    border: 1px solid #ccc;
    transform: translate(-50%, -50%);
`;

const CanvasComponent = ({ handleStatus }) => {
    const [isScrollable, setIsScrollable] = React.useState(false);
    const canvas = useRef();
    const ctx = useRef();
    const collisionCanvas = useRef();
    const collisionCtx = useRef();

    const requestIdRef = useRef(null);

    let score = useRef(0);
    let isGameOver = useRef(false);
    let difficulty = useRef(1);
    let ravens = useRef([]);
    let explosions = useRef([]);
    let timer = useRef(0);
    const timeToNextRaven = useRef(0);
    const ravenInterval = useRef(500);

    const lastTime = useRef(0);
    const animate = React.useCallback(
        (deltaTime) => {
            ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
            collisionCtx.current.clearRect(
                0,
                0,
                collisionCanvas.current.width,
                collisionCanvas.current.height
            );

            if (timeToNextRaven.current > ravenInterval.current) {
                timer.current++;
                if (timer.current > 5) {
                    difficulty.current += 0.01;
                }
                ravens.current.push(new Raven(ctx.current, canvas.current, difficulty.current));
                timeToNextRaven.current = 0;
                ravens.current.sort((a, b) => {
                    return a.width - b.width;
                });
            }

            drawScore();
            [...ravens.current, ...explosions.current].forEach((raven) =>
                raven.update(deltaTime, handleStatus, score.current, isGameOver)
            );
            [...ravens.current, ...explosions.current].forEach((raven) => raven.draw(collisionCtx.current));

            ravens.current = ravens.current.filter((raven) => !raven.markedForDeletion);
            explosions.current = explosions.current.filter((explosion) => !explosion.markedForDeletion);
        },
        [handleStatus]
    );

    const tick = React.useCallback(
        (time) => {
            if (time !== lastTime.current) {
                let deltaTime = time - lastTime.current;

                lastTime.current = time;
                timeToNextRaven.current += deltaTime;
                animate(deltaTime);
            }
            if (!isGameOver.current) {
                requestIdRef.current = requestAnimationFrame(tick);
            } else {
                ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
                collisionCtx.current.clearRect(
                    0,
                    0,
                    collisionCanvas.current.width,
                    collisionCanvas.current.height
                );
                ctx.current.fillStyle = 'black';
                ctx.current.textAlign = 'center';
                ctx.current.fillText(
                    'GAME OVER! Your score: ' + score.current,
                    canvas.current.width / 2,
                    canvas.current.height / 2
                );
                ravens.current = [];
            }
        },
        [animate]
    );

    const drawScore = () => {
        ctx.current.fillStyle = 'black';
        ctx.current.fillText('Score: ' + score.current, 10, 20);
    };
    useEffect(() => {
        console.log('draw canvas');

        ctx.current = canvas.current.getContext('2d');
        collisionCtx.current = collisionCanvas.current.getContext('2d');
        canvas.current.width = window.innerWidth > 500 ? 500 : window.innerWidth * 0.9;
        canvas.current.height = window.innerHeight > 400 ? 400 : window.innerHeight * 0.45;
        collisionCanvas.current.width = window.innerWidth > 500 ? 500 : window.innerWidth * 0.9;
        collisionCanvas.current.height = window.innerHeight > 400 ? 400 : window.innerHeight * 0.45;

        requestIdRef.current = requestAnimationFrame(tick);

        const detectPixel = (e) => {
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left; // x position within the element.
            let y = e.clientY - rect.top; // y position within the element
            const detectPixelColor = collisionCtx.current.getImageData(x, y, 1, 1);
            const pc = detectPixelColor.data;

            ravens.current.forEach((raven) => {
                if (
                    raven.randomColors[0] === pc[0] &&
                    raven.randomColors[1] === pc[1] &&
                    raven.randomColors[2] === pc[2]
                ) {
                    raven.markedForDeletion = true;
                    score.current++;
                    explosions.current.push(new Explosion(raven.x, raven.y, raven.width, ctx.current));
                }
            });
        };
        requestAnimationFrame(tick);
        window.addEventListener('click', detectPixel);
        return () => {
            window.removeEventListener('click', detectPixel);
            cancelAnimationFrame(requestIdRef.current);
        };
    }, [tick]);

    return (
        <>
            <button
                id="new_game_button"
                className="btn"
                onClick={() => {
                    handleStatus('start');
                    ravens.current = [];
                    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
                    collisionCtx.current.clearRect(
                        0,
                        0,
                        collisionCanvas.current.width,
                        collisionCanvas.current.height
                    );
                    isGameOver.current = false;
                    score.current = 0;
                    requestIdRef.current = requestAnimationFrame(tick);
                }}>
                New game
            </button>
            <button
                className="btn"
                onClick={() => {
                    setIsScrollable((prevState) => {
                        document.querySelector('body').style.overflow = prevState ? 'hidden' : 'auto';
                        prevState && document.querySelector('#new_game_button').scrollIntoView();
                        return !prevState;
                    });
                }}>
                Game mode {isScrollable ? 'off' : 'on'}
            </button>
            <CanvasWrapper>
                <Canvas id="canvas1" ref={canvas}></Canvas>
                <Canvas
                    id="canvas2"
                    style={{ opacity: 0, backgroundColor: 'grey' }}
                    ref={collisionCanvas}></Canvas>
            </CanvasWrapper>
        </>
    );
};
export default CanvasComponent;
