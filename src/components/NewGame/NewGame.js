import React from 'react';
import Canvas from './components/Canvas';
const NewGame = () => {
    return (
        <div>
            <h1>Another react Roguelike</h1>
            <Canvas />
        </div>
    );
};
NewGame.customName = 'NewGame';
export default NewGame;
