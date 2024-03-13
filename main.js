const startBtn = document.createElement("button");
startBtn.innerHTML = "START";
document.body.appendChild(startBtn);
startBtn.style.padding = "1em";
startBtn.style.border;
let canvasE = false;
let canvas, h1, progressBar, progress;
startBtn.addEventListener("click", () => {
  startBtn.remove();
  if (canvasE) {
    canvas.remove();
    h1.remove();
  }
  canvasE = true;
  let points = 0;
  canvas = document.createElement("canvas");
  h1 = document.createElement("h1");

  document.body.appendChild(canvas);

  canvas.width = 1200;
  canvas.height = 700;

  document.body.appendChild(h1);
  h1.innerHTML = "score: ";
  progressBar = document.createElement("div");
  document.body.appendChild(progressBar);
  let counter = 10;
  let bossF = false;

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  let bunny = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    size: 80,
    color: "#f00",
  };

  const bunnyImg = new Image();
  bunnyImg.src = "bunny.png";

  const eggImage = new Image();
  eggImage.src = "egg.png";
  const heartImage = new Image();
  heartImage.src = "serce.png";
  const Boss1Image = new Image();
  Boss1Image.src = "alfa_boss_1.png";
  

  let lifes = 3;

  const spoiledEggImage = new Image();
  spoiledEggImage.src = "spoiledEgg.png";
  let heartx = 1200;
  let hearts = [];
  function createHeart() {
    let heart = {
      x: heartx,
      y: 0,
    };
    heartx -= 40;
    hearts.push(heart);
  }
  function drawHeart() {
    hearts.forEach((heart) => {
      // ctx.fillStyle = "red"
      ctx.drawImage(heartImage, heart.x - 60, heart.y + 20, 30, 30);
    });
  }

  function drawBunny() {
    ctx.fillStyle = bunny.color;
    ctx.drawImage(
      bunnyImg,
      bunny.x - bunny.size / 2,
      bunny.y - 120,
      bunny.size,
      bunny.size * 2
    );
  }

  let eggs = [];
  let badEggs = [];

  function getRandomInt(max, min) {
    return Math.floor(Math.random() * max + min);
  }

  function createEgg() {
    let egg = {
      x: getRandomInt(1170, 0),
      y: 0,
    };
    eggs.push(egg);
    if (bossF) {
      let egg = {
        x: getRandomInt(1170, 0),
        y: 0,
      };

      badEggs.push(egg);
    }
  }
  pauseImg = new Image();
  pauseImg.src = "pause.png";
  function drawPause() {
    ctx.drawImage(pauseImg, 10, 10, 50, 50);
  }
  function killEgg() {
    eggs.forEach((egg) => {
      if (
        egg.x >= bunny.x - bunny.size * 0.8 &&
        egg.x + 30 <= bunny.x + bunny.size * 0.8 &&
        egg.y + 40 >= bunny.y - 120 &&
        egg.y <= bunny.y
      ) {
        //do poprawy hitbox jajka
        egg.x = 999;
        egg.y = 999;
        points += 1;
        if (points >= counter) {
          bossF = true;
          counter = 9999999;
        }
      } else if (egg.y + 40 >= canvas.height) {
        egg.x = 999;
        egg.y = 999;
      }
      if(eggs.length > 300){
        eggs.shift();
      }
    });
    badEggs.forEach((egg) => {
      if (
        egg.x >= bunny.x - bunny.size * 0.8 &&
        egg.x + 60 <= bunny.x + bunny.size * 0.8 &&
        egg.y + 80 >= bunny.y - 160 &&
        egg.y <= bunny.y
      ) {
        //do poprawy hitbox jajka
        hearts.pop();
        // console.log(lifes);
        // console.log(hearts);
        egg.x = 999;
        egg.y = 999;
        lifes -= 1;
      } else if (egg.y + 80 >= canvas.height) {
        egg.x = 999;
        egg.y = 999;
      }
      if(badEggs.length > 300){
        badEggs.shift();
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
    badEggs.forEach((egg) => {
      ctx.drawImage(spoiledEggImage, egg.x, egg.y, 60, 80);
      egg.y += 1;
      killEgg();
    });
  }

  function drawBoss() {
    ctx.drawImage(Boss1Image, 0, 0, 1200, 100);
  }
  const bgGrass = new Image();
  bgGrass.src = "grass_bg.png";

  const grass = new Image();
  grass.src = "grass.png";

  function drawBgGrass() {
    ctx.drawImage(bgGrass, 0, canvas.height - 60, canvas.width, 60);
  }

  
let directory;
let superBoost;
let boost;
let superBoostCooldown = false;
let boostCooldown = false;
function boostCooldownControl(){
  boostCooldown = false;
}
function superBoostCooldownControl(){
  superBoostCooldown = false;
}

const dash = new Image();
dash.src = 'dashRight.png';

function drawBoost(){
  if(directory == 'r'){
    dash.src = 'dashRight.png';
    ctx.drawImage(dash, bunny.x - 160, bunny.y - 120, 160, 160);
  }
  if(directory == 'l'){
    dash.src = 'dashLeft.png';
    ctx.drawImage(dash, bunny.x, bunny.y - 120, 160, 160);
  }
}

  function update() {
    if (!paused) {
      ctx.clearRect(0, 0, 1200, 700);
      if (bossF == true) {
        drawBoss();
      }
      drawBgGrass();
      drawBunny();
      drawEggs();
      drawHeart();
      drawPause();
      if (lifes <= 0) {
        setTimeout(() => {
          paused = true;
          ctx.clearRect(0, 0, 1200, 700);
          startBtn.innerHTML = "restart";
          document.body.append(startBtn);
          document.body.removeChild(canvas);
        }, 5);
      }
      if (keys["a"] && bunny.x > 0 + 50) {
        bunny.x -= speed;
      }
      
      if (keys["d"] && bunny.x < canvas.width - 50) {
        bunny.x += speed;
      }
      
      if (keys["a"] && bunny.x > 0 + 50) {
        bunny.x -= speed;
        directory = 'l';
      }
      if (keys["d"] && bunny.x < canvas.width - 50) {
        bunny.x += speed;
        directory = 'r';
      } 
      if (keys["v"] && superBoostCooldown == false){
        superBoost = true;
      }
      if (keys["c"] && boostCooldown == false){
        boost = true;
      }
      if (superBoost == true && superBoostCooldown == false){
        for (let i = 0; i < 10; i++) {
          if(directory == 'r' && bunny.x + 85 <= canvas.width){
            bunny.x += 10;
          }else if(directory == 'l' && bunny.x > 5){
            bunny.x -= 10;
          }
        }
        superBoost = false;
        superBoostCooldown = true;
        setTimeout(superBoostCooldownControl, 7000);
      }
      if (boost == true && boostCooldown == false){
        drawBoost();
        for (let i = 0; i < 10; i++) {
          if(directory == 'r' && bunny.x + 85 <= canvas.width){
                    bunny.x += 3;
                  }else if(directory == 'l' && bunny.x > 5){
                    bunny.x -= 3;
                  }
                }
              }
                boost = false;
                boostCooldown = true;
                setTimeout(boostCooldownControl, 3000);

                h1.innerHTML = `score: ${points}`;
                progress = counter - points;
                progressBar.innerHTML = `do bosa zostało ${progress}`;
                updatePrpgressBar((points / counter) * 100);
              
  }
    ctx.drawImage(grass, 0, canvas.height - 40, canvas.width, 40);
    requestAnimationFrame(update);
  }

  function onKeyDown(e) {
    keys[e.key] = true;
  }

  function onKeyUp(e) {
    keys[e.key] = false;
  }
  function updatePrpgressBar(progress) {
    progressBar.style.width = `${progress}%`;
  }
  speed = 5;
  let paused = false;
  let game = setInterval(createEgg, 100);
  for (let i = 0; i < 3; i++) {
    createHeart();
  }
  function pause() {
    if (mouseX > 10 && mouseX < 60 && mouseY > 10 && mouseY < 60) {
      paused = !paused;
      if (paused) {
        clearInterval(game);
      } else {
        game = setInterval(createEgg, 2100);
      }
    }
  }
  let mouseX;
  let mouseY;
  function onMouseMove(e) {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
  }

  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("click", pause);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  const keys = {};

  update();
});
// boss fight
