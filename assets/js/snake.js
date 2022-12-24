// Constant variable declaration
let direction = {x:0, y:0};
const foodSound = new Audio('../assets/sound/food.mp3');
const bgSound = new Audio('../assets/sound/bg_music.mp3');
const gameoverSound = new Audio('../assets/sound/gameover.mp3');
const moveSound = new Audio('../assets/sound/move.wav');
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x:10, y:13 }]
foodLoc = { x:13, y:15}
let isRunning = true

// Game Functions
function main(ctime){
    if(!isRunning){
        bgSound.pause();
        gameEngine()
        return;
    }
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine()
}

function isCollide(snake) {
    // If the snake bump into himself
   for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
    }
}
    // If the snake bump into wall
    if (snake[0].x >= 20 || snake[0].x <=0 || snake[0].y >= 20 || snake[0].y <=0) {
        return true;
    }
   }

function gameEngine() {
    // Updating snake and variable
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        bgSound.pause();
        direction = { x:0, y:0 };
        alert("Game Over. Press any key to play again!!")
        speed = 5;
        scorevalue = 0;
        scoreDisplay.innerHTML = "Score: " + scorevalue
        snakeArr = [{ x:10, y:13 }]
        bgSound.play();
        score = 0;
    }

    // If user eat food increment score and change food co-ordinated
    if(snakeArr[0].y === foodLoc.y && snakeArr[0].x === foodLoc.x ){
        foodSound.play();
        if(score%5==0){
            speed+=2;
        }
        score += 1;
        scorevalue = JSON.parse(localStorage.getItem('highscore'));
        if(score>scorevalue){
            scorevalue=score
            localStorage.setItem('highscore', JSON.stringify(scorevalue));
            highScore.innerHTML= "High Score: " + scorevalue
        }
        scoreDisplay.innerHTML = "Score: " + score
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y})
        let a = 2, b = 18;
        foodLoc = {x: Math.round(a + (b -a)* Math.random()), y: Math.round(a + (b -a)* Math.random())};
    }
    // Move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // Display snake and food
    // Displaying Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElem = document.createElement('div');
        snakeElem.style.gridRowStart = e.y;
        snakeElem.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElem.classList.add('snake-head');
        }else{
            snakeElem.classList.add('snake-body');
        }
        board.appendChild(snakeElem);
    })

    //Displaying Food
        snakeFood = document.createElement('div');
        snakeFood.style.gridRowStart = foodLoc.y;
        snakeFood.style.gridColumnStart = foodLoc.x;
        snakeFood.classList.add('snake-food');
        board.appendChild(snakeFood);
}

  window.onkeydown = function(event){
    if(event.keyCode === 32) {
        isRunning=!isRunning;
        if(isRunning){
            bgSound.play();
            window.requestAnimationFrame(main);
        }
    }
};

// Main logic
highscore = localStorage.getItem('highscore');
if (highscore = 'null'){
    scorevalue = 0;
    localStorage.setItem('highscore', JSON.stringify(scorevalue));
}else{
    scorevalue = JSON.parse(localStorage.getItem('highscore'));
    highScore.innerHTML= "High Score: " + scorevalue
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1} // Start Game
    bgSound.play();
    switch (e.key) {
        case 'ArrowUp':
            direction.x = 0;
            direction.y = -1;
            break;

        case 'ArrowDown':
            direction.x = 0;
            direction.y = 1;
            break;

        case 'ArrowLeft':
            direction.x = -1;
            direction.y = 0;
            break;

        case 'ArrowRight':
            direction.x = 1;
            direction.y = 0;
            break;
    
        default:
            break;
    }
})