import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));

const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;

function update(time) {
  if (lastTime) {
    // used to calculate movement based on frame time
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);

    if (isLose()) handleLose();
  }

  lastTime = time;

  // call the update function before each frame render by window
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.left >= window.innerWidth || rect.right <= 0;
}

function handleLose() {
  const rect = ball.rect();

  if (rect.left >= window.innerWidth) {
    playerScoreElem.textContent = 1 + parseInt(playerScoreElem.textContent);
  } else {
    computerScoreElem.textContent = 1 + parseInt(computerScoreElem.textContent);
  }

  ball.reset();
  computerPaddle.reset();
}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);
