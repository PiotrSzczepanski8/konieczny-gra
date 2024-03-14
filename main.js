const startBtn = document.createElement("button");
startBtn.innerHTML = "START";
document.body.appendChild(startBtn);
// startBtn.style.backgroundColor = "rgb(6, 190, 231)";
// startBtn.style.color = "#0f0";
// startBtn.style.border = "none";
// startBtn.style.fontSize = "x-large";
startBtn.style.padding = "1em";
startBtn.style.border;
let canvasE = false;
let BeggY = 1;
let eggY = 2;
let canvas, h1, progressBar, progress,div;
startBtn.addEventListener("click", () => {
  startBtn.remove();
  if (canvasE) {
    canvas.remove();
    h1.remove();
  }
  canvasE = true;
  let points = 0;
  div = document.createElement("div");
  canvas = document.createElement("canvas");
  h1 = document.createElement("h1");

  
  document.body.appendChild(div)
  div.appendChild(canvas);
  div.classList += "container";

  canvas.width = 1200;
  canvas.height = 700;

  document.body.appendChild(h1);
  h1.innerHTML = "score: ";
  progressBar = document.createElement("div");
  div.appendChild(progressBar);
  progressBar.classList += "progress"
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

  // jajka
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
        egg.x >= bunny.x - bunny.size &&
        egg.x + 60 <= bunny.x + bunny.size &&
        egg.y + 80 >= bunny.y - 120 &&
        egg.y <= bunny.y &&
        boost == false
      ) {
        //do poprawy hitbox jajka
        // console.log(lifes);
        // console.log(hearts);
          egg.x = 999;
          egg.y = 999;
          hearts.pop();
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
      egg.y += eggY
      killEgg();
    });
    badEggs.forEach((egg) => {
      ctx.drawImage(spoiledEggImage, egg.x, egg.y, 60, 80);
      egg.y += BeggY;
      killEgg();
    });
  }
  // strzelanie
  let fireT = true;
  let bullets = []
  function fire(){
    let bullet = {
      x: bunny.x,
      y: bunny.y,
    };
    bullets.push(bullet);
  }
  function drawBullet(){
    bullets.forEach((bullet) => {
      ctx.drawImage(eggImage, bullet.x, bullet.y, 30, 40);
      bullet.y -= 5;
    });
  }
  function nic(){
    fireT = true;
  }
  function killBullet(){
      bullets.forEach((bullet) => {
        if (
          bullet.y <= bossH &&
          bullet.y >=0
        ) {
          //do poprawy hitbox jajka
          bullet.x = 999;
          bullet.y = 1000;
          if(bossF == true){
            bossHP -=1;

          }
        if(bullets.length > 300){
          bullets.shift();
        }
      }
      if (
        bullet.y >canvas.height
      ) {
        //do poprawy hitbox jajka
        bullet.x = 999;
        bullet.y = 1000;
      if(bullets.length > 300){
        bullets.shift();
      }
    }
    });
  }



// boss
const shieldImg = new Image();
shieldImg.src = "door.png";
let bossHP = 10;
let maxBossHP = 10;
let bossW = 1200;
let bossH = 100
let shieldx = 0;
let shields = []
let idShield = 0;
let deleteShield = true;
  function drawBoss() {
    ctx.drawImage(Boss1Image, 0, 0, bossW, bossH);
    
    if(bossHP <= 0){
      bossF = false;
      maxBossHP*=1.4
      counter *= 4
      bossHP = maxBossHP;
    }
    console.log(bossHP)
  }
  function createShield() {
    let shield = {
      id: idShield,
      x: shieldx,
      y: bossH,
      v: 1,
    };idShield +=1;
    shieldx += 240;
    shields.push(shield);
  }
  function drawShield() {
    shields.forEach((shield) => {
      // ctx.fillStyle = "red"
      if(shield.v == 1){
        ctx.drawImage(shieldImg, shield.x, shield.y, 240, 50);
      }
    });
  }
  function randShield(){
    shields.forEach((shield) => {
      if(shield.id == idShield){
        shield.v = 1;   
      }     
    });
    idShield = getRandomInt(5,0);
    shields.forEach((shield) => {
      if(shield.id == idShield){
        shield.v = 0; 
      }
    });
    deleteShield = true;
  }
  function killShield() {
    shields.forEach((shield) => {
      // ctx.fillStyle = "red"
      shield.v = 0;
    });
  }

  const bgGrass = new Image();
  bgGrass.src = "grass_bg.png";

  const grass = new Image();
  grass.src = "grass.png";

  function drawBgGrass() {
    ctx.drawImage(bgGrass, 0, canvas.height - 60, canvas.width, 60);
  }
  let directory;
let boost;
let boostCooldown = false;

const dash = new Image();
dash.src = 'dashRight.png';

const dash_available = new Image();
dash_available.src = 'dash_available.png';

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
        progressBar.style.backgroundColor= "red";
        progressBar.innerHTML = Math.round(bossHP/maxBossHP*100) + "%"
        updatePrpgressBar(bossHP/maxBossHP*100)
        if(shields.length < 1){
          for(let a = 0;a < 5;a++){
            createShield();
          }
          idShield = getRandomInt(5,0);
          
        }
        if(shields.length > 1){
          if(deleteShield == true){
            deleteShield = false;
            setTimeout(randShield,1000);
          
          }
        }
        
      }  
      drawShield();
      drawBgGrass();
      drawBunny();
      drawEggs();
      drawHeart();
      drawPause();
      drawBullet();
      killBullet();
      if (lifes <= 0) {
        setTimeout(() => {
          paused = true;
          ctx.clearRect(0, 0, 1200, 700);
          startBtn.innerHTML = "restart";
          document.body.append(startBtn);
          div.removeChild(canvas);
          div.removeChild(progressBar)
        }, 5);
      }
      
      if (keys["a"] && bunny.x > 0 + 50) {
        if(boost){
          bunny.x -= speed*3;
          drawBoost();
        } else {
          bunny.x -= speed;
        }
        directory = 'l';
      }
      
      if (keys["d"] && bunny.x < canvas.width - 50) {
        if(boost){
          bunny.x += speed*3;
          drawBoost();
        } else {
          bunny.x += speed;
        }
        directory = 'r';
      }

      if (keys["Shift"] && boostCooldown == false){
        boostCooldown = true;
        setTimeout(() => {
          boost = false;
        }, 1000);
        setTimeout(() => {
          boostCooldown = false;
        }, 3000);
        boost = true;
      }

      if(boostCooldown == false){
        ctx.drawImage(dash_available, 1140, 60, 30, 30);
      }
      
      if(keys[" "]&& fireT && points > 0){
        fire();
        fireT = false
        points -= 1
        setTimeout(nic,1000)
      }
      h1.innerHTML = `score: ${points}`;
      if(bossF == false){
        killShield();
        progress = counter - points;
        progressBar.innerHTML = `do bosa zostało ${Math.round(progress)}`;
        progressBar.style.backgroundColor = "royalblue"
        updatePrpgressBar((points / counter) * 100);
      }
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
  let game = setInterval(createEgg, 1000);
  for (let i = 0; i < 3; i++) {
    createHeart();
  }
  function pause() {
    if (mouseX > 10 && mouseX < 60 && mouseY > 10 && mouseY < 60) {
      paused = !paused;
      if (paused) {
        clearInterval(game);
      } else {
        game = setInterval(createEgg, 1000);
      }
    }
  }
  let mouseX;
  let mouseY;
  function onMouseMove(e) {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
  }
  setInterval(()=>{
    if(!paused){
  
      if(speed<6){
        speed+= 0.00015;
        eggY += 0.00005;
        BeggY += 0.00002;
      }else if((speed>6) && (speed<8)){
        speed += 0.0008
        eggY += 0.00003;
        BeggY += 0.00001;
      }
    }
  
    },2)
  
  
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("click", pause);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  const keys = {};

  update();
});
// boss fight
