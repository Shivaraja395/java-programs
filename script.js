const bird = document.getElementById("bird");
const pipe = document.getElementById("pipe");
const scoreDisplay = document.getElementById("score");

let birdTop = 250;
let gravity = 2;
let isGameOver = false;
let score = 0;

// Function to start the pipe moving
function startPipeMovement() {
    pipe.style.right = "-50px";
    setInterval(() => {
        let pipeRight = parseInt(window.getComputedStyle(pipe).getPropertyValue("right"));
        pipe.style.right = pipeRight + 2 + "px";

        // Reset pipe position and increase score when it goes off screen
        if (pipeRight > 350) {
            pipe.style.right = "-50px";
            pipe.style.height = Math.floor(Math.random() * 200) + 100 + "px";
            if (!isGameOver) {
                score++;
                scoreDisplay.textContent = "Score: " + score;
            }
        }

        // Check collision with bird
        const pipeLeft = 300 - pipeRight;
        const pipeHeight = parseInt(window.getComputedStyle(pipe).getPropertyValue("height"));
        if (pipeLeft < 80 && pipeLeft > 50 && (birdTop < pipeHeight || birdTop > pipeHeight + 120)) {
            gameOver();
        }
    }, 20);
}

// Function for bird's gravity and jump
function updateBird() {
    if (birdTop < 470) {
        birdTop += gravity;
        bird.style.top = birdTop + "px";
    }
}

function jump() {
    if (birdTop > 0) birdTop -= 40;
}

// Game over function
function gameOver() {
    isGameOver = true;
    alert("Game Over! Your score: " + score);
    document.location.reload();
}

// Event listeners
document.addEventListener("keydown", () => {
    if (!isGameOver) jump();
});

// Start the game
setInterval(updateBird, 20);
startPipeMovement();

