let gameSeq = [];
let userSeq = [];

let btn = ["red", "yellow", "green","purple" ];

let started = false;
let level = 0;

let highScore = 0; // NEW: highest score track karne ke liye

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
  // console.log("game started!");
  if(started == false) {
    console.log("Game is Started!");
    started = true;
    levelUp();
  }
}); 
     function gameFlash(btn){
      btn.classList.add("flash"); 
      setTimeout(function(){
        btn.classList.remove("flash");
      },250);
     }

     function userFlash(btn){
      btn.classList.add("userflash"); 
      setTimeout(function(){
        btn.classList.remove("userflash");
      },  250);
     }
     
     function levelUp(){
      userSeq = [];
      level++;
      h2.innerText = `Level ${level}`;

      let randIdx = Math.floor(Math.random() * 4);
      let randColor = btn[randIdx];
      let randbtn = document.querySelector(`.${randColor}`);
      // console.log(randIdx);
      // console.log(randColor);
      // console.log(randbtn);
      gameSeq.push(randColor);
      console.log(gameSeq);     // for game hints
      gameFlash(randbtn);
     
     }
        function checkAns(indx){
          // console.log("Current level :", level);
          // let indx = level-1;
          if(userSeq[indx] === gameSeq[indx]){
            if(userSeq.length == gameSeq.length){
              // levelUp();
              setTimeout(levelUp, 1000);
            }
            // console.log("same value");
          }else{
            h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> press any key to start.`;
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(function (){
              document.querySelector("body").style.backgroundColor = "white";
            },150);
            // reset(); //both are working 
            level = 0;
          }
        }

     function btnPress(){
      // console.log(this);
      let btn = this;
      userFlash(btn);

      userColor = btn.getAttribute("id");
      // console.log(userColor);
      userSeq.push(userColor);
      checkAns(userSeq.length-1);
     }

     let allBtns = document.querySelectorAll(".btn");
     for( btnn of allBtns){
      btnn.addEventListener("click", btnPress);
     }

     function reset(){
      started = false;
      gameSeq = [];
      userSeq = [];
      // levelUp = 0;
      level = 0; // fixed bug: was levelUp = 0 earlier
     }



  //    let score = 0;
  //    let highScore = 0;

  // // Game me jab bhi score update hota hai
  // function updateScore() {
  //     score++;
  //     document.querySelector("#score").innerText = score;

  //     // Highest score check/update
  //     if (score > highScore) {
  //         highScore = score;
  //         document.querySelector("#highScore").innerText = highScore;
  //     }
  // }

  // // Game over hone pe
  // function gameOver() {
  //     score = 0;
  //     document.querySelector("#score").innerText = score;
  // }
