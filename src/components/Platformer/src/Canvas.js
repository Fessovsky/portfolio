import React, { useRef, useEffect, useCallback } from 'react';

export default function Canvas(props) {
    const canvasRef = useRef(null);
    const draw = (ctx, deltaTime) => {
        // if (deltaTime) {ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // ctx.fillStyle = '#000000';
        // ctx.beginPath();
        // ctx.arc(0 + 1, 100, 20 * Math.sin(360 * 0.1) ** 2, 0, 2 * Math.PI);
        // ctx.fill()};
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = props.canvasWidth;
        canvas.height = props.canvasHeight;
        canvas.style.border = props.canvasBorder;

        //* deltaTime
        let lastFrameTime = 0;
        const targetFPS = props.fps;
        let frameTimer = 0;
        const framePerSecond = 1000 / targetFPS;
        let animationFrameId;

        const render = (timeStamp) => {
            let deltaTime = timeStamp - lastFrameTime;
            lastFrameTime = timeStamp;

            draw(context, deltaTime);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render(0);
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
        // draw(context);
    }, [draw]);
    return <canvas ref={canvasRef} {...props} />;
}
