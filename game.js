let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

//  Sounds
let sounds = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  purple: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  wrong: new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg")
};

//  PC ke liye (keypress se start)
document.addEventListener("keypress", function () {
  if (!started) {
    startGame();
  }
});

//  Mobile ke liye (Start button)
document.getElementById("start-btn").addEventListener("click", function () {
  if (!started) {
    startGame();
  }
});

function startGame() {
  started = true;
  level = 0;
  gameSeq = [];
  userSeq = [];
  levelUp();
}

// Computer button flash
function gameFlash(btn, color) {
  btn.classList.add("flash");
  sounds[color].play(); // play sound
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// User button flash
function userFlash(btn, color) {
  btn.classList.add("userflash");
  sounds[color].play(); // play sound
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

// Next level
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log("Game Seq:", gameSeq); // Debug
  gameFlash(randbtn, randColor);
}

// Check user input
function checkAns(indx) {
  if (userSeq[indx] === gameSeq[indx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    // Update high score
    if (level > highScore) {
      highScore = level;
    }

    sounds.wrong.play(); // Wrong sound

    h2.innerHTML = `❌ Game Over! Your score: <b>${level}</b> <br> 🏆 High Score: <b>${highScore}</b> <br><br> Press any key or Start button to try again.`;

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    reset();
  }
}

// User button press
function btnPress() {
  let btn = this;
  let userColor = btn.getAttribute("id");

  userFlash(btn, userColor);
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

// Attach event to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btnn of allBtns) {
  btnn.addEventListener("click", btnPress);
}

// Reset game
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
