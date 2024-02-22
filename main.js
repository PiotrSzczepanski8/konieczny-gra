const canvas = document.createElement('canvas');
canvas.width = 1200;
canvas.height = 600;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let bunny = {
    x: canvas.width /2,
    y: canvas.height - 50,
    size: 100,
    color: "#f00"
};

const bunnyImg = new Image();
bunnyImg.src = 'bunny.png';

function drawBunny(){
    ctx.fillStyle = bunny.color;
    ctx.drawImage(bunnyImg, bunny.x - bunny.size / 2, bunny.y - 160, bunny.size, bunny.size * 2);
}

function update(){
    ctx.clearRect(0, 0, 1200, 600);
    ctx.fillStyle =  "#0f0";
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    drawBunny();
    if (keys['a'] && bunny.x > 0+50) {
        bunny.x -= speed;
    } else if (keys['d'] && bunny.x < canvas.width-50) {
        bunny.x += speed;
    }
    requestAnimationFrame(update);
}

function onKeyDown(e) {
    keys[e.key] = true;
  }
  
  function onKeyUp(e) {
    keys[e.key] = false;
  }

speed = 15;

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
const keys = {};

update();
