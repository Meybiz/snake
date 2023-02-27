let snakeGame = document.createElement('div');
snakeGame.innerHTML = '<canvas id="snakeGameCanvas" width="400" height="400"></canvas>';
document.body.appendChild(snakeGame);
let canvas = document.getElementById('snakeGameCanvas');
let ctx = canvas.getContext('2d');
let snake = {
  x: 200,
  y: 200,
  dx: 0,
  dy: 0,
  size: 10,
  speed: 5,
  tail: [],
  tailLength: 0,
  color: '#00FF00'
};
let food = {
  x: 0,
  y: 0,
  size: 10,
  color: '#FF0000'
};
let score = 0;
function drawSnake() {
  ctx.fillStyle = snake.color;
  ctx.fillRect(snake.x, snake.y, snake.size, snake.size);
  for (let i = 0; i < snake.tail.length; i++) {
    ctx.fillRect(snake.tail[i].x, snake.tail[i].y, snake.size, snake.size);
  }
}
function drawFood() {
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x, food.y, food.size, food.size);
}
function drawScore() {
  ctx.fillStyle = '#000000';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 20);
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  drawScore();
}
function update() {
  snake.x += snake.dx;
  snake.y += snake.dy;
  if (snake.x < 0) {
    snake.x = canvas.width - snake.size;
  }
  if (snake.x > canvas.width - snake.size) {
    snake.x = 0;
  }
  if (snake.y < 0) {
    snake.y = canvas.height - snake.size;
  }
  if (snake.y > canvas.height - snake.size) {
    snake.y = 0;
  }
  snake.tail.push({x: snake.x, y: snake.y});
  while (snake.tail.length > snake.tailLength) {
    snake.tail.shift();
  }
  if (snake.x === food.x && snake.y === food.y) {
    snake.tailLength++;
    score++;
    food.x = Math.floor(Math.random() * (canvas.width - food.size));
    food.y = Math.floor(Math.random() * (canvas.height - food.size));
  }
}
function loop() {
  update();
  draw();
  setTimeout(loop, 1000 / snake.speed);
}
function keyDown(e) {
  if (e.keyCode === 37) {
    snake.dx = -snake.size;
    snake.dy = 0;
  }
  if (e.keyCode === 38) {
    snake.dx = 0;
    snake.dy = -snake.size;
  }
  if (e.keyCode === 39) {
    snake.dx = snake.size;
    snake.dy = 0;
  }
  if (e.keyCode === 40) {
    snake.dx = 0;
    snake.dy = snake.size;
  }
}
document.addEventListener('keydown', keyDown);
loop();
