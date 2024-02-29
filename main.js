const startBtn = document.createElement("button")
startBtn.innerHTML = "START"
document.body.appendChild(startBtn);

startBtn.addEventListener("click",()=>{
  startBtn.remove()
  let points = 0;
  const canvas = document.createElement("canvas");
  const pauseBtn = document.createElement("button");
  const h1 = document.createElement("h1")

  document.body.appendChild(canvas)
  
  canvas.width = 1200;
  canvas.height = 700;
  document.body.appendChild(pauseBtn)
  pauseBtn.innerHTML = "pause"
  document.body.appendChild(h1)
  h1.innerHTML = "score: "
  let counter = 1000000;
  let bossF = false;
  
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  
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

/* const Boss1Image = new Image();
Boss1Image.src = "alfa_boss_1.png";

const spoiledEggImage = new Image();
spoiledEggImage.src = "spoiledEgg.png"; */

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
  
  
  function getRandomInt(max, min) {
    return Math.floor(Math.random() * max + min);
  }

  function createEgg() {
    if(bossF == true){
      let egg = {
        x: getRandomInt(1170,0),
        y: 0,
        v: getRandomInt(2,0),
      };
      eggs.push(egg);
    } else{
      let egg = {
        x: getRandomInt(1170,0),
        y: 0,
        v: 1,
      };
      eggs.push(egg);
    }
    
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
      if(points>=counter){
        bossF = true;
        counter = 999999;
      }
    } else if(egg.y >= canvas.height){
      eggs.shift();
    }
    
    // ctx.drawImage(eggImage, egg.x, egg.y, 30, 40);
    // egg.y += 1;
  });
}

function drawEggs() {
  if(bossF == true){
    eggs.forEach((egg) => {
      if(egg.v == 1)
      {
        ctx.drawImage(eggImage, egg.x, egg.y, 30, 40);
        egg.y += 2;
        killEgg();
      } else{
        ctx.drawImage(spoiledEggImage, egg.x, egg.y, 30, 40);
        egg.y += 5;
        killEgg();
      }
      
    });
  } else{
    eggs.forEach((egg) => {
      ctx.drawImage(eggImage, egg.x, egg.y, 30, 40);
      egg.y += 2;
      killEgg();
    });
  }
  
}

function drawBoss(){
  ctx.drawImage(Boss1Image, 0, 0, 1200, 100);
}

function update() {
  if (!paused) {
    ctx.clearRect(0, 0, 1200, 700);
    ctx.fillStyle = "#0f0";
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    if(bossF == true){
      drawBoss();
    }
    drawBunny();
    drawEggs();
    
    
    if (keys["a"] && bunny.x > 0 + 50) {
      bunny.x -= speed;
    } else if (keys["d"] && bunny.x < canvas.width - 50) {
      bunny.x += speed;
    }
    h1.innerHTML = `score: ${points}`;
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

})
// boss fight
