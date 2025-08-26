// let gameSeq = [];
// let userSeq = [];

// let btn = ["red", "yellow", "green","purple" ];

// let started = false;
// let level = 0;

// let highScore = 0; // NEW: highest score track karne ke liye

// let h2 = document.querySelector("h2");

// document.addEventListener("keypress", function(){
//   // console.log("game started!");
//   if(started == false) {
//     console.log("Game is Started!");
//     started = true;
//     levelUp();
//   }
// }); 
//      function gameFlash(btn){
//       btn.classList.add("flash"); 
//       setTimeout(function(){
//         btn.classList.remove("flash");
//       },250);
//      }

//      function userFlash(btn){
//       btn.classList.add("userflash"); 
//       setTimeout(function(){
//         btn.classList.remove("userflash");
//       },  250);
//      }
     
//      function levelUp(){
//       userSeq = [];
//       level++;
//       h2.innerText = `Level ${level}`;

//       let randIdx = Math.floor(Math.random() * 4);
//       let randColor = btn[randIdx];
//       let randbtn = document.querySelector(`.${randColor}`);
//       // console.log(randIdx);
//       // console.log(randColor);
//       // console.log(randbtn);
//       gameSeq.push(randColor);
//       console.log(gameSeq);     // for game hints
//       gameFlash(randbtn);
     
//      }
//         function checkAns(indx){
//           // console.log("Current level :", level);
//           // let indx = level-1;
//           if(userSeq[indx] === gameSeq[indx]){
//             if(userSeq.length == gameSeq.length){
//               // levelUp();
//               setTimeout(levelUp, 1000);
//             }
//             // console.log("same value");
//           }else{
//             h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> press any key to start.`;
//             document.querySelector("body").style.backgroundColor = "red";
//             setTimeout(function (){
//               document.querySelector("body").style.backgroundColor = "white";
//             },150);
//             // reset(); //both are working 
//             level = 0;
//           }
//         }

//      function btnPress(){
//       // console.log(this);
//       let btn = this;
//       userFlash(btn);

//       userColor = btn.getAttribute("id");
//       // console.log(userColor);
//       userSeq.push(userColor);
//       checkAns(userSeq.length-1);
//      }

//      let allBtns = document.querySelectorAll(".btn");
//      for( btnn of allBtns){
//       btnn.addEventListener("click", btnPress);
//      }

//      function reset(){
//       started = false;
//       gameSeq = [];
//       userSeq = [];
//       // levelUp = 0;
//       level = 0; // fixed bug: was levelUp = 0 earlier
//      }



// document.addEventListener("keypress", function() {
//   if (!started) {
//     startGame();
//   }
// });

// document.getElementById("start-btn").addEventListener("click", function() {
//   if (!started) {
//     startGame();
//   }
// });

// function startGame() {
//   started = true;
//   level = 0;
//   nextSequence();
// }




let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

// 🔹 For PC: Start with key press
document.addEventListener("keypress", function () {
  if (!started) {
    startGame();
  }
});

// 🔹 For Mobile: Start button click
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

// ---------------- Functions ----------------

// Computer button flash
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// User button flash
function userFlash(btn) {
  btn.classList.add("userflash");
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
  console.log(gameSeq); // Debugging sequence
  gameFlash(randbtn);
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

    h2.innerHTML = `Game Over! Your score: <b>${level}</b> <br> High Score: <b>${highScore}</b> <br> Press any key or Start button to play again.`;

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
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

// Attach event to all buttons
let allBtns = document.querySelectorAll(".btn");
for (btnn of allBtns) {
  btnn.addEventListener("click", btnPress);
}

// Reset game
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
