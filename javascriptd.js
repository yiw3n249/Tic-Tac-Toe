
var origBoard;
const huPlayer = '0';
const aiPlayer = 'X';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

const boxs = document.querySelectorAll('.box');
startGame();

function startGame(){
  document.querySelector(".endgame").style.display = 'none'
  origBoard = Array.from(Array(9).keys());
  for (var i=0; i<boxs.length; i++ ){
    boxs[i].innerText = '';
    boxs[i].style.removeProperty('background-color');
    boxs[i].addEventListener('click', turnClick, false)
  }
}

function turnClick(square){
  if (typeof origBoard[square.target.id] == 'number'){
  turn(square.target.id, huPlayer)
  if (!checkTie()) turn(bestSpot(), aiPlayer);
}
}

function turn(squareId, player){
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player)
  if (gameWon) gameOver(gameWon)
}

function checkWin(board, player){
  let plays = board.reduce((a,e,i) => 
    (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()){
    if (win.every(elem => plays.indexOf(elem) > -1)){
      gameWon = {index: index, player: player};
      break;
      
    }
  }
  return gameWon;
}

function gameOver(gameWon){
  for ( let index of winCombos[gameWon.index]){
    document.getElementById(index).style.backgroundColor = 
    gameWon.player == huPlayer ? 'blue' : 'red';
  }

  for (var i=0; i<boxs.length; i++){
    boxs[i].removeEventListener('click', turnClick, false)
  }

  declareWinner(gameWon.player == huPlayer ? 'You Win!' : 'You Lose!')
}

function declareWinner(who){
  document.querySelector('.endgame').style.display = 'block';
  document.querySelector('.endgame .text').innerText = who;
}

function emptySquare(){
  return origBoard.filter(s => typeof s == 'number');
}

function bestSpot(){
  return emptySquare()[0];
}

function checkTie(){
  if (emptySquare().length == 0){
    for (var i=0; i< boxs.length; i++){
      boxs[i].style.backgroundColor = 'green';
      boxs[i].removeEventListener('click', turnClick, false);
    }
    declareWinner('Tie Game!')
    return true;

  }
  return false;
}

//const container = document.getElementsByClassName("container")[0]
  //let turn = 0
  //l//et board = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
  //container.onclick = function(event) {
      //i//f (event.target != container && event.target.innerText == "") {
          //if (turn % 2 == 0) {
             // event.target.innerText = "X"
             //board[event.target.id] = "X"
          //}
         // else {
            //  event.target.innerText = "0"
             // board[event.target.id] = "0"
          //}
          //turn++
     //}
  //}