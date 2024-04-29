const PARAMETER ={
    circleTurn : true, //サークルの手番の場合true
    turnCount : 0, //ターンのカウント
    tableValue: document.querySelectorAll(".js-cell"),
    stateMessage: document.querySelector(".js-state-message"),
    circleActive: document.querySelector(".turn-symbol.circle"),
    crossActive: document.querySelector(".turn-symbol.cross"),
    cellData :  new Array(9).fill(-1),
    win: false,
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

function writeCell(){

}

function displayTurn(turn){
    if(turn){
        PARAMETER.circleActive.classList.add("active")
        PARAMETER.crossActive.classList.remove("active")
    }
    else{
        PARAMETER.crossActive.classList.add("active")
        PARAMETER.circleActive.classList.remove("active")
    }
}

function checkWin(first,second,third){
    if(PARAMETER.cellData[first] === 0 && (PARAMETER.cellData[first] === PARAMETER.cellData[second]) && ( PARAMETER.cellData[second] === PARAMETER.cellData[third])){
        PARAMETER.win = true
        PARAMETER.stateMessage.textContent = PATTERN.circle + " win!!"
        return 
    }
    if(PARAMETER.cellData[first] === 1 && (PARAMETER.cellData[first] === PARAMETER.cellData[second]) && ( PARAMETER.cellData[second] === PARAMETER.cellData[third])){
        PARAMETER.win = true
        PARAMETER.stateMessage.textContent = PATTERN.cross + " win!!"
        return 
    }
}

function checkDraw(num){
    if(num === 9 && !PARAMETER.win){
        PARAMETER.win = true
        PARAMETER.stateMessage.textContent =  "draw"
        return 
    }
}

//クリック時の動作
function cellClick(v){
    //セルの書き込み
    if(v.currentTarget.textContent === "" && !PARAMETER.win){
        if(PARAMETER.circleTurn){
            v.currentTarget.textContent = PATTERN.circle
            PARAMETER.cellData[v.currentTarget.dataset.key-1] = 0
            PARAMETER.circleTurn = false
        }
        else{
            v.currentTarget.textContent = PATTERN.cross
            PARAMETER.cellData[v.currentTarget.dataset.key-1] = 1
            PARAMETER.circleTurn = true
        }
        PARAMETER.turnCount++

        displayTurn(PARAMETER.circleTurn)

        WIN_PATTERN.forEach(ptn =>
            {
                checkWin(ptn[0],ptn[1],ptn[2])
        })
        checkDraw(PARAMETER.turnCount)
    }
}


function reset(){
    const restart = document.querySelector(".js-restart")
    restart.addEventListener("click",()=>{
        location.reload()
    })
}


function runGame(PARAMETER) {
    const {tableValue} = PARAMETER
    tableValue.forEach( v => 
        v.addEventListener('click',cellClick)
    )
    reset()
}

runGame(PARAMETER)