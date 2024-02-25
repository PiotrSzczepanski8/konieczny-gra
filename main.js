const canvas = document.createElement("canvas");
const pauseBtn = document.querySelector("button");
canvas.width = 1200;
canvas.height = 700;
document.body.appendChild(canvas);

let points = 0;

const ctx = canvas.getContext("2d");

let bunny = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  size: 100,
  color: "#f00",
};

const bunnyImg = new Image();
bunnyImg.src = "bunny.png";

const eggImage = new Image();
eggImage.src = "egg.png";

function drawBunny() {
  ctx.fillStyle = bunny.color;
  ctx.drawImage(
    bunnyImg,
    bunny.x - bunny.size / 2,
    bunny.y - 160,
    bunny.size,
    bunny.size * 2
  );
}

let eggs = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createEgg() {
  let egg = {
    x: getRandomInt(1170),
    y: 0,
  };
  eggs.push(egg);
}

function killEgg() {
  eggs.forEach((egg) => {
    if (
      egg.x >= bunny.x - bunny.size / 2 &&
      egg.x + 30 <= bunny.x + bunny.size / 2 &&
      egg.y + 40 >= bunny.y - 160 &&
      egg.y <= bunny.y
    ) {
      //do poprawy hitbox jajka
      eggs.shift();
      points += 1;
    }

    // ctx.drawImage(eggImage, egg.x, egg.y, 30, 40);
    // egg.y += 1;
  });
}

function drawEggs() {
  eggs.forEach((egg) => {
    ctx.drawImage(eggImage, egg.x, egg.y, 30, 40);
    egg.y += 2;
    killEgg();
  });
}

function update() {
  if (!paused) {
    ctx.clearRect(0, 0, 1200, 700);
    ctx.fillStyle = "#0f0";
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    drawBunny();
    drawEggs();

    if (keys["a"] && bunny.x > 0 + 50) {
      bunny.x -= speed;
    } else if (keys["d"] && bunny.x < canvas.width - 50) {
      bunny.x += speed;
    }
    document.getElementById("pt").textContent = points;
}
requestAnimationFrame(update);
}

function onKeyDown(e) {
  keys[e.key] = true;
}

function onKeyUp(e) {
  keys[e.key] = false;
}

speed = 4;
let paused = false;
let game = setInterval(createEgg, 1400);
function pause() {
  paused = !paused;
  if (paused) {
    clearInterval(game);
  } else {
    game = setInterval(createEgg, 1400);
  }
}
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
const keys = {};

pauseBtn.addEventListener("click", pause);
update();
