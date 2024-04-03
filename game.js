// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body");
let $lives = document.getElementById("lives");
let zombieId = 0;

const img = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-3.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];

// Iteration 1.2: Add shotgun sound
const shotGunSound = new Audio("./assets/shotgun.wav");
shotGunSound.volume = 0.5;

gameBody.onclick = () => {
  shotGunSound.pause();
  shotGunSound.currentTime = 0;
  shotGunSound.play();
};

// Iteration 1.3: Add background sound
const backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop = true;

// Iteration 1.4: Add lives
let maxLives = 4;

// Iteration 2: Write a function to make a zombie
function invokeZombie(zombieId) {
  let zombieImg = document.createElement("img");
  let random = Math.floor(Math.random() * 6) + 1;
  zombieImg.src = `./assets/zombie-${random}.png`;
  zombieImg.setAttribute("class", "zombie-image");
  zombieImg.setAttribute("id", `${zombieId}`);
  document.body.append(zombieImg);

  let left = generateRandomInt(20, 80);
  zombieImg.style.left = `${left}vw`;

  zombieImg.onclick = () => {
    destroyZombie(zombieImg);
    shotGunSound.pause();
    shotGunSound.currentTime = 0;
    shotGunSound.play();
  };
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {
    maxLives--;
    return true;
  } else {
    return false;
  }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
  zombie.style.display = "none";
  invokeZombie(++zombieId);
}

let timeLeft = parseInt(document.getElementById("timer").textContent);
let elapsedTime = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(elapsedTime);
    location.href = "./win.html";
  } else {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    const zombie = document.querySelector(`.zombie-image[id="${zombieId}"]`);
    if (zombie && checkCollision(zombie)) {
      destroyZombie(zombie);
      if (maxLives === 0) {
        clearInterval(elapsedTime);
        location.href = "./game-over.html";
      }
    }
  }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
invokeZombie(zombieId);

// Iteration 7: Write the helper function to get random integer
function generateRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let random = Math.floor(Math.random() * (max - min) + min);
  return random;
}
