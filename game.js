let currentScore = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameInterval;
let currentScoreElement;
let highScoreElement;
const gameContainer = document.getElementById('gameContainer');

// Initialize the game
function initGame() {
    // Clear existing balloons and display score container
    gameContainer.innerHTML = '<div id="scoreContainer"><div id="currentScore">Score: 0</div><div id="highScore">High Score: 0</div></div>';
    
    // Update references to score elements inside the game container
    currentScoreElement = document.getElementById('currentScore');
    highScoreElement = document.getElementById('highScore');
    
    // Reset and display scores
    currentScore = 0;
    currentScoreElement.innerText = `Score: ${currentScore}`;
    highScore = localStorage.getItem('highScore') || 0;
    highScoreElement.innerText = `High Score: ${highScore}`;

    startGame();

    // Remove click listener to prevent restarting game while playing
    gameContainer.removeEventListener('click', initGame);
}

function startGame() {
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(createBalloon, 450);
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    const maxLeft = gameContainer.clientWidth - balloon.offsetWidth - 40; // Subtract the balloon width and container padding
    balloon.style.left = `${Math.random() * maxLeft}px`;
    balloon.style.bottom = '-100px';

    let popped = false;

    balloon.addEventListener('click', function() {
        popped = true;
        currentScore++;
        currentScoreElement.innerText = `Score: ${currentScore}`;
        if (currentScore > highScore) {
            highScore = currentScore;
            localStorage.setItem('highScore', highScore);
            highScoreElement.innerText = `High Score: ${highScore}`;
        }
        balloon.remove();
    });

    gameContainer.appendChild(balloon);

    let balloonInterval = setInterval(function() {
        let currentPosition = parseInt(balloon.style.bottom, 10);
        if (currentPosition > window.innerHeight) {
            balloon.remove();
            clearInterval(balloonInterval);
            if (!popped) {
                endGame();
            }
        } else {
            balloon.style.bottom = `${currentPosition + 7}px`;
        }
    }, 10);
}

function endGame() {
    clearInterval(gameInterval); // Stop creating balloons
    gameContainer.innerHTML = `<div id="endGameScreen">Game Ended<br>Your Score: ${currentScore}<br>High Score: ${highScore}<br>Click anywhere to restart
    <br> hint: tap the top of the balloon to increase its chances of popping</div>`;

    // Listen for a click to restart the game
    gameContainer.addEventListener('click', initGame);
}

// Initialize high score display and start the game
highScoreElement = document.getElementById('highScore'); // Initial reference
highScoreElement.innerText = `High Score: ${highScore}`;
initGame();
