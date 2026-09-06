const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
let score = 0;

let speed = 3;
let itemSpeed = 2;

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        movePlayer(-10);
    } else if (e.key === 'ArrowRight') {
        movePlayer(10);
    }
});

function movePlayer(distance) {
    const left = parseInt(player.style.left, 10);
    player.style.left = `${left + distance}px`;
}

function createItem(className) {
    const item = document.createElement('div');
    item.classList.add('item', className);
    item.style.left = Math.random() * (gameContainer.clientWidth - 30) + 'px';
    gameContainer.appendChild(item);
    moveItem(item);
}

function moveItem(item) {
    let position = parseInt(item.style.bottom, 10);

    const interval = setInterval(() => {
        if (position > gameContainer.clientHeight) {
            clearInterval(interval);
            item.remove();
            handleMiss(item.classList[1]);
        } else {
            position += speed;
            item.style.bottom = `${position}px`;

            // Check for collision
            if (isCollision(player, item)) {
                clearInterval(interval);
                item.remove();
                handleCatch(item.classList[1]);
            }
        }
    }, 20);
}

function isCollision(player, item) {
    const playerRect = player.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    return !(
        playerRect.bottom < itemRect.top ||
        playerRect.top > itemRect.bottom ||
        playerRect.right < itemRect.left ||
        playerRect.left > itemRect.right
    );
}

function handleCatch(className) {
    if (className === 'water') {
        score += 10;
    } else if (className === 'co2') {
        score -= 5;
    } else if (className === 'sunlight') {
        score += 15;
    } else if (className === 'rock') {
        score -= 8;
    } else if (className === 'o2') {
        score -= 3;
    }
    updateScore();
}

function handleMiss(className) {
    // No score change on miss
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Create items at random intervals
setInterval(() => {
    const itemTypes = ['water', 'co2', 'sunlight', 'rock', 'o2'];
    const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
    createItem(randomType);
}, 1000);

// Increase difficulty over time
setTimeout(() => {
    speed += 0.5;
    itemSpeed += 0.5;
    setInterval(() => {
        const itemTypes = ['water', 'co2', 'sunlight', 'rock', 'o2'];
        const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        createItem(randomType);
    }, 900);
}, 30000); // Increase difficulty after 30 seconds
