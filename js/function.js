const PARAMETER ={
    circleTurn : true, //サークルの手番の場合true
    turnCount : 0, //ターンのカウント
    tableValue: document.querySelectorAll(".js-cell"),
    stateMessage: document.querySelector(".js-state-message"),
    //修正1 js-xxxに修正
    circleActive: document.querySelector(".js-turn-symbol.circle"),
    crossActive: document.querySelector(".js-turn-symbol.cross"),
    cellData :  new Array(9).fill(""), //文字列表現に修正
    //修正2 変数名を"win"から"done"に修正
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


//修正3 不要な関数を削除 消し忘れ

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


//修正4. ピュアな関数に修正
//return を値が入力済みかつ、first~thirdの要素が一致する
function checkWin(cells){
    return WIN_PATTERN.some(row => { //
        const [first, second, third] = row
        return cells[first] != "" && (cells[first] === cells[second]) && (cells[first] === cells[third])
    })
}

function checkDraw(num){
    if(num === 9 && PARAMETER.win){
        PARAMETER.done = true
        PARAMETER.stateMessage.textContent =  "draw"
    }
}

//修正6
//変数をconstで宣言し直す
//ifが減るように修正
function cellClick(ele, index){
    //修正5 早期returnをするように修正
    if (ele.textContent != "" || PARAMETER.done)return
    const {cellData, turnCount, stateMessage} = PARAMETER
    const {circle, cross} = PATTERN
    const circleTurn = (turnCount%2 === 0)
    const textContent = circleTurn? circle : cross

    ele.textContent = textContent
    cellData[index] = textContent

    displayTurn(circleTurn)
    console.log(checkWin(cellData))
    if(checkWin(cellData)){
        stateMessage.textContent = textContent + " win!!"
        PARAMETER.done = true
    }

    PARAMETER.turnCount++
    checkDraw(turnCount+1)
}


function reset(){
    const restart = document.querySelector(".js-restart")
    restart.addEventListener("click",()=>{
        location.reload()
    })
}


function runGame() {
    const {tableValue} = PARAMETER
    tableValue.forEach( (ele, index) => 
        ele.addEventListener('click',() => cellClick(ele,index))
    )
    reset()
}

runGame()