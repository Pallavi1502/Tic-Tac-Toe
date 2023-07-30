const X_class = 'X';
const O_class = 'O';
let circleTurn = false
const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const board =  document.getElementById('board')
const winningMsgText = document.getElementById('data-winning-msg-text')
const winningMsgElement = document.getElementById('winningMsg')
const cellElements = document.querySelectorAll('[data-cell]')
const restartButton = document.querySelector('.btn')


startGame()

restartButton.addEventListener('click' , startGame)
function startGame(){
    let circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_class)
        cell.classList.remove(O_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click' , handleClick, {once:true})
    })
    setBoardHover()
    winningMsgElement.classList.remove('show')
}


function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? O_class: X_class 
    placeMark(cell, currentClass)
   if( checkWin(currentClass)){
    endGame(false)
   }
   else if(isDraw()){
     endGame(true)
   }
  else{
    swapTurn()
   setBoardHover()
  }
}

function endGame(draw){
    if(draw){
        winningMsgText.innerText = "Draw!"
    }
    else{
        winningMsgText.innerText = circleTurn ? "O\'s win!" : "X\'s win!" 
    }
    winningMsgElement.classList.add('show');
   
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
function swapTurn() {
    circleTurn = !circleTurn
}
function  setBoardHover(){
    board.classList.remove(O_class)
    board.classList.remove(X_class)
    if(circleTurn){
        board.classList.add(O_class)
    }
    else{
        board.classList.add(X_class)
    }
}
function  checkWin(currentClass){
    return WIN_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_class) ||
        cell.classList.contains(O_class)
        })
}