const X_CLASS='x'
const CIRCLE_CLASS='circle'
const WIN_COMBO=[  [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]  ]
const restart=document.getElementById("restartButton")
const board=document.getElementById("board");
const winm=document.getElementById("winningMessage");
const cellElements = document.querySelectorAll('[data-cell]')
const winmsg = document.querySelector('[data-winning-message-text]')
let circleTurn

startgame()

restart.addEventListener('click',startgame)
restart.addEventListener('click',function(){
    var audio = new Audio("sounds/place.mp3");
    audio.play();
})

function startgame(){
    circleTurn=false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click' , handleClick,{once:true})
    })
    setBoardHoverClass()
    winm.classList.remove('show');
}

function handleClick(e){
    const cell=e.target
    const currentClass= circleTurn? CIRCLE_CLASS: X_CLASS
    placeMark(cell,currentClass)
    if(checkwin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }
    swapTurns()
    setBoardHoverClass()
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(draw){
    if(draw){
            var audio = new Audio("sounds/lose.wav");
            audio.play();
            winmsg.innerText='DRAW!'
    }else{
        var audio=new Audio("sounds/win.mp3")
        audio.play();
        winmsg.innerText = `${circleTurn ? "O's" :"X's"} wins!`
    }
    winm.classList.add('show');
}

function placeMark(cell,currentClass){
    var audio = new Audio("sounds/click.wav");
    audio.play();
    cell.classList.add(currentClass)
}

function checkwin(currentClass){
    return WIN_COMBO.some(combinations=>{
        return combinations.every(index=>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}


function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}