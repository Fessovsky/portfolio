import React from 'react';
import { useEffect, useRef, useCallback } from 'react';

import handleEnemies from './src/handleEnemies';

import BackgroundLayer from './src/Background';
import Player from './src/Player';
import Enemy from './src/Enemy';

import './style.css';
// const backgroundLayer1 = new BackgroundLayer(
//     document.getElementById('background-bg'),
//     backgroundModifiers.layer1,
//     canvas.width,
//     canvas.height,
//     gameSpeed
// );
// const backgroundLayer2 = new BackgroundLayer(
//     document.getElementById('background-far-trees'),
//     backgroundModifiers.layer2,
//     canvas.width,
//     canvas.height,
//     gameSpeed
// );
// const backgroundLayer3 = new BackgroundLayer(
//     document.getElementById('background-mid-trees'),
//     backgroundModifiers.layer3,
//     canvas.width,
//     canvas.height,
//     gameSpeed
// );
// const backgroundLayer4 = new BackgroundLayer(
//     document.getElementById('background-trees'),
//     backgroundModifiers.layer4,
//     canvas.width,
//     canvas.height,
//     gameSpeed
// );
function Platformer() {
    return <div>Game</div>;
}

Platformer.customName = 'Platformer';
export default Platformer;
