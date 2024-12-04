// Selecting elements
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');

let score = 0;
let activeHole = null;
let gameInterval = null;

// Function to start the game
function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    startButton.disabled = true;

    // Start mole popping logic
    gameInterval = setInterval(() => {
        if (activeHole) {
            activeHole.querySelector('.mole').classList.remove('active');
        }
        const randomIndex = Math.floor(Math.random() * holes.length);
        activeHole = holes[randomIndex];
        activeHole.querySelector('.mole').classList.add('active');
    }, 1000);

    // Stop the game after 30 seconds
    setTimeout(() => {
        clearInterval(gameInterval);
        alert(`Game Over! Your final score is ${score}`);
        startButton.disabled = false;
    }, 30000);
}

// Function to handle mole clicks
function whackMole(event) {
    if (event.target.classList.contains('mole') && event.target.classList.contains('active')) {
        score++;
        scoreDisplay.textContent = score;
        event.target.classList.remove('active');
    }
}

// Add moles to holes
holes.forEach(hole => {
    const mole = document.createElement('div');
    mole.classList.add('mole');
    hole.appendChild(mole);
    mole.addEventListener('click', whackMole);
});

// Add event listener to start button
startButton.addEventListener('click', startGame);
