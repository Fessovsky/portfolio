import React from 'react';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { Raven, Explosion } from './GameData';

window.mobileCheck = function () {
    let check = false;
    (function (a) {
        if (
            // eslint-disable-next-line
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                a
            ) ||
            // eslint-disable-next-line
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

const CanvasWrapper = styled.div`
    position: relative;
    @media (max-height: 845px) {
        height: 75vh;
    }
`;
const Canvas = styled.canvas`
    display: block;
    position: absolute;
    left: 50%;
    top: 225px;
    border: 1px solid #ccc;
    transform: translate(-50%, -50%);
`;

const CanvasComponent = ({ handleStatus }) => {
    const [isScrollable, setIsScrollable] = React.useState(true);
    const [gameSpeed, setGameSpeed] = React.useState({ speed: 1 });

    const canvasWrapper = useRef();
    const gameSpeedRef = useRef(gameSpeed);
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
        (deltaTime, speed) => {
            canvas.current && ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

            collisionCtx.current &&
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
            [...ravens.current, ...explosions.current].forEach((raven) => {
                raven.update(deltaTime, handleStatus, score.current, isGameOver, speed.speed);
            });
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
                // check if canvases mounted
                canvas.current && collisionCtx.current && animate(deltaTime, gameSpeedRef.current);
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
        const useEffectCanvasWrapper = canvasWrapper.current;
        requestIdRef.current = requestAnimationFrame(tick);

        const detectPixel = (e) => {
            e.preventDefault();
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

        window.mobileCheck()
            ? useEffectCanvasWrapper.addEventListener('pointerdown', detectPixel)
            : useEffectCanvasWrapper.addEventListener('click', detectPixel);

        return () => {
            if (!useEffectCanvasWrapper) return;
            window.mobileCheck()
                ? useEffectCanvasWrapper.removeEventListener('pointerdown', detectPixel)
                : useEffectCanvasWrapper.removeEventListener('click', detectPixel);
            cancelAnimationFrame(requestIdRef.current);
        };
    }, [tick]);
    const handleSpeed = (e) => {
        e.preventDefault();
        setGameSpeed((prevState) => {
            let newValue = e.target.value > 600 ? 600 : e.target.value;
            gameSpeedRef.current = { ...prevState, speed: newValue };
            return { ...prevState, speed: newValue };
        });
    };

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
                {isScrollable ? 'turn on ' : 'turn off '}game mode
            </button>
            <input value={gameSpeed.speed} onChange={(e) => handleSpeed(e)} type="number" max="600" min="0" />
            <div className="small mt-4" style={{ textAlign: 'center', padding: '0 10px' }}>
                This is {window.mobileCheck() ? 'Mobile' : 'Desktop'}
            </div>
            <CanvasWrapper ref={canvasWrapper}>
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
