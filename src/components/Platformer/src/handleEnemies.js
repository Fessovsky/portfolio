export default function handleEnemies(
    deltaTime,
    enemyTimer,
    enemyInterval,
    randomEnemyInterval,
    Enemy,
    enemies,
    score,
    canvas,
    ctx
) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
        enemies.push(new Enemy(canvas.width, canvas.height));
        randomEnemyInterval = Math.random() * 1000 + 500;
        enemyTimer = 0;
    } else {
        enemyTimer += deltaTime;
    }
    enemies.forEach((enemy) => {
        enemy.draw(ctx);
        enemy.update(deltaTime);
        if (enemy.isSkipped && !enemy.scored) {
            score++;
            enemy.scored = true;
        }
    });
    enemies = enemies.filter((enemy) => !enemy.setToDelete);
}
