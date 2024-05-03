const parameters ={
    circleTurn : true,
    turnCount : 0, 
    cellElements: document.querySelectorAll(".js-cell"),
    stateMessageElement: document.querySelector(".js-state-message"),
    circleActiveElement: document.querySelector(".js-turn-symbol.circle"),
    crossActiveElement: document.querySelector(".js-turn-symbol.cross"),
    cells :  new Array(9).fill(""), 
    done: false,
}

const STATE_MESSAGE = {
    play : "starting...",
    win : "win!!",
    draw : "drow",
}

const PATTERN = {
    circle: "○",
    cross: "×"
}

const WIN_PATTERN = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]


function displayTurn(turn){
    if(turn){
        parameters.circleActiveElement.classList.add("active")
        parameters.crossActiveElement.classList.remove("active")
    }
    else{
        parameters.crossActiveElement.classList.add("active")
        parameters.circleActiveElement.classList.remove("active")
    }
}


function checkWin(cells){
    return WIN_PATTERN.some(row => { 
        const [first, second, third] = row
        return cells[first] != "" && (cells[first] === cells[second]) && (cells[first] === cells[third])
    })
}

function checkDraw(num){
    if(num === 9 && !parameters.done){
        parameters.done = true
        parameters.stateMessageElement.textContent =  "draw"
    }
}

function cellClick(ele, index){
    if (ele.textContent != "" || parameters.done)return
    const {cells, turnCount, stateMessageElement} = parameters
    const {circle, cross} = PATTERN
    const circleTurn = (turnCount%2 === 0)
    const textContent = circleTurn? circle : cross

    ele.textContent = textContent
    cells[index] = textContent

    displayTurn(!circleTurn)
    if(checkWin(cells)){
        stateMessageElement.textContent = textContent + " win!!"
        parameters.done = true
    }

    parameters.turnCount++
    checkDraw(turnCount+1)
}


function reset(){
    const restart = document.querySelector(".js-restart")
    restart.addEventListener("click",()=>{
        location.reload()
    })
}


function runGame() {
    const {cellElements} = parameters
    cellElements.forEach( (ele, index) => 
        ele.addEventListener('click',() => cellClick(ele,index))
    )
    reset()
}

runGame()