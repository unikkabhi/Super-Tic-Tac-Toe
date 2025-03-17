let boxes = document.querySelectorAll(".box");
let boxes0 = document.querySelectorAll(".box0");
let boxes1 = document.querySelectorAll(".box1");
let boxes2 = document.querySelectorAll(".box2");
let boxes3 = document.querySelectorAll(".box3");
let boxes4 = document.querySelectorAll(".box4");
let boxes5 = document.querySelectorAll(".box5");
let boxes6 = document.querySelectorAll(".box6");
let boxes7 = document.querySelectorAll(".box7");
let boxes8 = document.querySelectorAll(".box8");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let bigBox = document.querySelectorAll(".bigBox");
let gameGrid = document.querySelectorAll(".grid");
let oMoves = [];
let xMoves = [];
let turnO = true; //playerX, playerO
let count = [0,0,0,0,0,0,0,0,0]; //To Track Draw
let checker = true;
let bigCount = 0;

const winPatterns = [
  [0, 1, 2],[0, 3, 6],[0, 4, 8],[1, 4, 7],[2, 5, 8],[2, 4, 6],[3, 4, 5],[6, 7, 8],
];
// const winPatterns1 = [
//   [9,10,11],[12,13,14],[15,16,17],[9,12,15],[10,13,16],[11,14,17],[9,13,17],[11,13,15],
// ];
// const winPatterns2 = [
//   [18,19,20],[21,22,23],[24,25,26],[18,21,24],[19,22,25],[20,23,26],[18,22,26],[20,22,24],
// ];
// const winPatterns3 = [
//   [27,28,29],[30,31,32],[33,34,35],[27,30,33],[28,31,34],[29,32,35],[27,31,35],[29,31,33],
// ];
// const winPatterns4 = [
//   [36,37,38],[39,40,41],[42,43,44],[36,39,42],[37,40,43],[38,41,44],[36,40,44],[38,40,42],
// ];
// const winPatterns5 = [
//   [45,46,47],[48,49,50],[51,52,53],[45,48,51],[46,49,52],[47,50,53],[45,49,53],[47,49,51],
// ];
// const winPatterns6 = [
//   [54,55,56],[57,58,59],[60,61,62],[54,57,60],[55,58,61],[56,59,62],[54,58,62],[56,58,60],
// ];
// const winPatterns7 = [
//   [63,64,65],[66,67,68],[69,70,71],[63,66,69],[64,67,70],[65,68,71],[63,67,71],[65,67,69],
// ];
// const winPatterns8 = [
//   [72,73,74],[75,76,77],[78,79,80],[72,75,78],[73,76,79],[74,77,80],[72,76,80],[74,76,78],
// ];


const resetGame = () => {
  turnO = true;
  count = [0,0,0,0,0,0,0,0,0];
  enableBoxes();
  oMoves=[];
  xMoves=[];
  console.clear();
  bigCount=0;
  msgContainer.classList.add("hide");
  for(bigbox of bigBox){
    bigbox.disabled = false;
    bigbox.classList.add("hide");
    bigbox.innerText =""; 
  }
 
  for(box of boxes){
    box.classList.remove("hide");
  }
  for(grid of gameGrid){
    grid.classList.remove("neonText");
  }
};

async function sendGameDataToServer(winner, xMoves, yMoves) {
  fetch('/saveGame', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ winner, xMoves, yMoves }),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Game data successfully sent to server:', data);
  })
  .catch((error) => {
      console.error('Error sending game data to server:', error);
  });
}


const gameDraw = (x) => {
  bigBox[x/9].classList.remove("hide");
  bigBox[x/9].innerText = "-";
  disableBigBox(x/9);
  bigCount+=1;
  for(i = x; i<x+9 ;i++){
    boxes[i].classList.add("hide");
  }

  // msg.innerText = `Game was a Draw.`;
  // msgContainer.classList.remove("hide");
  // disableBoxes();
};
const disableBigBox = (y) =>{
  bigBox[y].disabled = true;
  bigCount+=1;
  gameGrid[y].classList.remove(".neonText");
}
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  sendGameDataToServer();
};

const gameBigDraw = () =>{
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  sendGameDataToServer();
}

const bigCheckWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = bigBox[pattern[0]].innerText;
    let pos2Val = bigBox[pattern[1]].innerText;
    let pos3Val = bigBox[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

boxes0.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      oMoves.push(box.classList[2]);
      console.log(oMoves);
      if(oMoves.length===1){
        removePrevious(oMoves);
        playBoxHighlight(oMoves);
      }
      else{
        removePrevious(xMoves);
        playBoxHighlight(oMoves);
      }


    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      xMoves.push(box.classList[2]);
      console.log(xMoves);
      removePrevious(oMoves);
      playBoxHighlight(xMoves);
      
    }
    box.disabled = true;
    count[0]+=1;
     let isWinner0 = checkWinner0();
     if(count[0]===9 && !isWinner0){
        gameDraw(0);
     }
  });
});


const checkWinner0 = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes0[pattern[0]].innerText;
    let pos2Val = boxes0[pattern[1]].innerText;
    let pos3Val = boxes0[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        addBig0(pos1Val);
        removeSmall0();
        return true;
      }
    }
  }
}

const addBig0 = (pos1Val) => {
    bigBox[0].classList.remove("hide");
    bigBox[0].innerHTML=pos1Val;
    disableBigBox(0);
    console.log(bigCount);
    let isBigWinner = bigCheckWinner();
    if(bigCount===9 && !isBigWinner){
      gameBigDraw();
    }
}

const removeSmall0 = () =>{
  for(i = 0 ; i<9;i++){
    boxes[i].classList.add("hide");
  }
}


boxes1.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      oMoves.push(box.classList[2]);
      console.log(oMoves);
      if(oMoves.length===1){
        removePrevious(oMoves);
        playBoxHighlight(oMoves);
      }
      else{
        removePrevious(xMoves);
        playBoxHighlight(oMoves);
      }
      
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      xMoves.push(box.classList[2]);
      console.log(xMoves);
      removePrevious(oMoves);
      playBoxHighlight(xMoves);
      
    }
    box.disabled = true;
    count[1]+=1;
     let isWinner1 = checkWinner1();
     if(count[1]===9 && !isWinner1){
        gameDraw(9);
     }
  });
});


const checkWinner1 = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes1[pattern[0]].innerText;
    let pos2Val = boxes1[pattern[1]].innerText;
    let pos3Val = boxes1[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        addBig1(pos1Val);
        removeSmall1();
        return true;
      }
    }
  }
}

const addBig1 = (pos1Val) => {
    bigBox[1].classList.remove("hide");
    bigBox[1].innerHTML=pos1Val;
    disableBigBox(1);
    let isBigWinner = bigCheckWinner();
    if(bigCount===9 && !isBigWinner){
      gameBigDraw();
    }
}

const removeSmall1 = () =>{
  for(i = 9 ; i<18;i++){
    boxes[i].classList.add("hide");
  }
}

boxes2.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      oMoves.push(box.classList[2]);
      console.log(oMoves);
      if(oMoves.length===1){
        removePrevious(oMoves);
        playBoxHighlight(oMoves);
      }
      else{
        removePrevious(xMoves);
        playBoxHighlight(oMoves);
      }
      
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      xMoves.push(box.classList[2]);
      console.log(xMoves);
      removePrevious(oMoves);
      playBoxHighlight(xMoves);
      
    }
    box.disabled = true;
    count[2]+=1;
     let isWinner2 = checkWinner2();
     if(count[2]===9 && !isWinner2){
        gameDraw(18);
     }  
  });
});


const checkWinner2 = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes2[pattern[0]].innerText;
    let pos2Val = boxes2[pattern[1]].innerText;
    let pos3Val = boxes2[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        addBig2(pos1Val);
        removeSmall2();
        return true;
      }
    }
  }
}

const addBig2 = (pos1Val) => {
    bigBox[2].classList.remove("hide");
    bigBox[2].innerHTML=pos1Val;
    disableBigBox(2);
    let isBigWinner = bigCheckWinner();
    if(bigCount===9 && !isBigWinner){
      gameBigDraw();
    }
}

const removeSmall2 = () =>{
  for(i = 18 ; i<27;i++){
    boxes[i].classList.add("hide");
  }
}

boxes3.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      oMoves.push(box.classList[2]);
      console.log(oMoves);
      if(oMoves.length===1){
        removePrevious(oMoves);
        playBoxHighlight(oMoves);
      }
      else{
        removePrevious(xMoves);
        playBoxHighlight(oMoves);
      }
      
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      xMoves.push(box.classList[2]);
      console.log(xMoves);
      removePrevious(oMoves);
      playBoxHighlight(xMoves);
      
    }
    box.disabled = true;
    count[3]+=1;
     let isWinner3 = checkWinner3();
     if(count[3]===9 && !isWinner3){
        gameDraw(27);
     }
  });
});


const checkWinner3 = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes3[pattern[0]].innerText;
    let pos2Val = boxes3[pattern[1]].innerText;
    let pos3Val = boxes3[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        addBig3(pos1Val);
        removeSmall3();
        return true;
      }
    }
  }
}

const addBig3 = (pos1Val) => {
    bigBox[3].classList.remove("hide");
    bigBox[3].innerHTML=pos1Val;
    disableBigBox(3);
    let isBigWinner = bigCheckWinner();
    if(bigCount===9 && !isBigWinner){
      gameBigDraw();
    }
}

const removeSmall3 = () =>{
  for(i = 27 ; i<36;i++){
    boxes[i].classList.add("hide");
  }
}

boxes4.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      oMoves.push(box.classList[2]);
      console.log(oMoves);
      if(oMoves.length===1){
        removePrevious(oMoves);
        playBoxHighlight(oMoves);
      }
      else{
        removePrevious(xMoves);
        playBoxHighlight(oMoves);
      }
      
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      xMoves.push(box.classList[2]);
      console.log(xMoves);
      removePrevious(oMoves);
      playBoxHighlight(xMoves);
      
    }
    box.disabled = true;
    count[4]+=1;
    let isWinner4 = checkWinner4();
    if(count[4]===9 && !isWinner4){
       gameDraw(36);
    }
  });
});


const checkWinner4 = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes4[pattern[0]].innerText;
    let pos2Val = boxes4[pattern[1]].innerText;
    let pos3Val = boxes4[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        addBig4(pos1Val);
        removeSmall4();
        return true;
      }
    }
  }
}

const addBig4 = (pos1Val) => {
    bigBox[4].classList.remove("hide");
    bigBox[4].innerHTML=pos1Val;
    disableBigBox(4);
    let isBigWinner = bigCheckWinner();
    if(bigCount===9 && !isBigWinner){
      gameBigDraw();
    }
}

const removeSmall4 = () =>{
  for(i = 36 ; i<45;i++){
    boxes[i].classList.add("hide");
  }
}

boxes5.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      oMoves.push(box.classList[2]);
      console.log(oMoves);
      if(oMoves.length===1){
        removePrevious(oMoves);
        playBoxHighlight(oMoves);
      }
      else{
        removePrevious(xMoves);
        playBoxHighlight(oMoves);
      }
      
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      xMoves.push(box.classList[2]);
      console.log(xMoves);
      removePrevious(oMoves);
      playBoxHighlight(xMoves);
      
    }
    box.disabled = true;
    count[5]+=1;
    let isWinner5 = checkWinner5();
    if(count[5]===9 && !isWinner5){
       gameDraw(45);
    }
  });
});


const checkWinner5 = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes5[pattern[0]].innerText;
    let pos2Val = boxes5[pattern[1]].innerText;
    let pos3Val = boxes5[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        addBig5(pos1Val);
        removeSmall5();
        return true;
      }
    }
  }
}

const addBig5 = (pos1Val) => {
    bigBox[5].classList.remove("hide");
    bigBox[5].innerHTML=pos1Val;
    disableBigBox(5);
    let isBigWinner = bigCheckWinner();
    if(bigCount===9 && !isBigWinner){
      gameBigDraw();
    }
}

const removeSmall5 = () =>{
  for(i = 45 ; i<54;i++){
    boxes[i].classList.add("hide");
  }
}

boxes6.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      oMoves.push(box.classList[2]);
      console.log(oMoves);
      if(oMoves.length===1){
        removePrevious(oMoves);
        playBoxHighlight(oMoves);
      }
      else{
        removePrevious(xMoves);
        playBoxHighlight(oMoves);
      }
      
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      xMoves.push(box.classList[2]);
      console.log(xMoves);
      removePrevious(oMoves);
      playBoxHighlight(xMoves);
      
    }
    box.disabled = true;
    count[6]+=1;
    let isWinner6 = checkWinner6();
    if(count[6]===9 && !isWinner6){
       gameDraw(54);
    }
  });
});


const checkWinner6 = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes6[pattern[0]].innerText;
    let pos2Val = boxes6[pattern[1]].innerText;
    let pos3Val = boxes6[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        addBig6(pos1Val);
        removeSmall6();
        return true;
      }
    }
  }
}

const addBig6 = (pos1Val) => {
    bigBox[6].classList.remove("hide");
    bigBox[6].innerHTML=pos1Val;
    disableBigBox(6);
    let isBigWinner = bigCheckWinner();
    if(bigCount===9 && !isBigWinner){
      gameBigDraw();
    }
}

const removeSmall6 = () =>{
  for(i = 54 ; i<63;i++){
    boxes[i].classList.add("hide");
  }
}

boxes7.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      oMoves.push(box.classList[2]);
      console.log(oMoves);
      if(oMoves.length===1){
        removePrevious(oMoves);
        playBoxHighlight(oMoves);
      }
      else{
        removePrevious(xMoves);
        playBoxHighlight(oMoves);
      }
      
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      xMoves.push(box.classList[2]);
      console.log(xMoves);
      removePrevious(oMoves);
      playBoxHighlight(xMoves);
      
    }
    box.disabled = true;
    count[7]+=1;
    let isWinner7 = checkWinner7();
    if(count[7]===9 && !isWinner7){
       gameDraw(63);
    }
  });
});


const checkWinner7 = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes7[pattern[0]].innerText;
    let pos2Val = boxes7[pattern[1]].innerText;
    let pos3Val = boxes7[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        addBig7(pos1Val);
        removeSmall7();
        return true;
      }
    }
  }
}

const addBig7 = (pos1Val) => {
    bigBox[7].classList.remove("hide");
    bigBox[7].innerHTML=pos1Val;
    disableBigBox(7);
    let isBigWinner = bigCheckWinner();
    if(bigCount===9 && !isBigWinner){
      gameBigDraw();
    }
}

const removeSmall7 = () =>{
  for(i = 63 ; i<72;i++){
    boxes[i].classList.add("hide");
  }
}

boxes8.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      oMoves.push(box.classList[2]);
      console.log(oMoves);
      if(oMoves.length===1){
        removePrevious(oMoves);
        playBoxHighlight(oMoves);
      }
      else{
        removePrevious(xMoves);
        playBoxHighlight(oMoves);
      }
      
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      xMoves.push(box.classList[2]);
      console.log(xMoves);
        removePrevious(oMoves);
        playBoxHighlight(xMoves);     
     
    }
    box.disabled = true;
    count[8]+=1;
    let isWinner8 = checkWinner8();
    if(count[8]===9 && !isWinner8){
       gameDraw(72);
    }
  });
});


const checkWinner8 = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes8[pattern[0]].innerText;
    let pos2Val = boxes8[pattern[1]].innerText;
    let pos3Val = boxes8[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        addBig8(pos1Val);
        removeSmall8();
        return true;
      }
    }
  }
}

const addBig8 = (pos1Val) => {
    bigBox[8].classList.remove("hide");
    bigBox[8].innerHTML=pos1Val;
    disableBigBox(8);
    let isBigWinner = bigCheckWinner();
    if(bigCount===9 && !isBigWinner){
      gameBigDraw();
    }
}

const removeSmall8 = () =>{
  for(i = 72 ; i<81;i++){
    boxes[i].classList.add("hide");
  }
}


playBoxHighlight = (arr) =>{
    let grid = arr[arr.length-1];
    grid = grid.charAt(grid.length-1);
    console.log(grid);
    if(bigBox[grid].disabled!=true){
      gameGrid[grid].classList.add("neonText");
    }
    else{
      for(i=0;i<9;i++){
        if(bigBox[i].disabled!=true){
          gameGrid[i].classList.add("neonText");
        }
      }
    }
}

removePrevious = (arr) => {
  if(arr.length>1){
    let prevGrid = arr[arr.length-1];
    prevGrid = prevGrid.charAt(prevGrid.length-1);
    console.log(prevGrid);
    if(bigBox[prevGrid].disabled!=true){
      gameGrid[prevGrid].classList.remove("neonText");
    }
    else{
      for(i=0;i<9;i++){
        if(bigBox[i].disabled!=true){
          gameGrid[i].classList.remove("neonText");
        }
      }
    }
  }
  else{
    let prevGrid = arr[0];
    prevGrid = prevGrid.charAt(prevGrid.length-1);
    console.log(prevGrid);
    gameGrid[prevGrid].classList.remove("neonText");
  }
}
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);