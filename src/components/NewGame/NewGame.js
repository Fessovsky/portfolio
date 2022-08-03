import React from 'react';
import { useState } from 'react';

import Canvas from './components/Canvas';

const NewGame = () => {
    const [game, setGame] = useState({
        message: "Don't let them pass!!! Current score: ",
        score: 0
    });
    const handleStatus = (score) => {
        if (score === 'start') {
            setGame((prevState) => {
                return { ...prevState, message: "Don't let them pass!!! Last score: " };
            });
            return;
        }
        setGame((prevState) => {
            return { ...prevState, message: 'GAME OVER. Your score: ', score: score || '0' };
        });
    };
    return (
        <div>
            <h6>
                {game.message} {game.score}
            </h6>
            <Canvas handleStatus={handleStatus} />
        </div>
    );
};
NewGame.customName = 'NewGame';
export default NewGame;
