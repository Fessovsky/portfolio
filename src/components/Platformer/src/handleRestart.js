export default function handleRestart({ player, backgroundLayers, enemies, gameOver }) {
    player.restart();
    [...backgroundLayers].forEach((layer) => {
        layer.restart();
    });
    enemies = [];
    gameOver = false;
    // score = 0;
    // lastTime = 0;
    // enemyTimer = 0;
    // enemyInterval = 1000;
    // randomEnemyInterval = Math.random() * 2000 + 500;
    // animate(0);
}
