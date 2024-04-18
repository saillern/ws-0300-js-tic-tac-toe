const PARAMETER ={
    circleTrun : true, //サークルの手番の場合true
    turnCount : 0, //ターンのカウント
    tableValue: document.querySelectorAll(".js-cell"),
    stateMessage: document.querySelector(".js-state-message"),
    circleActive: document.querySelector(".turn-symbol.circle"),
    crossActive: document.querySelector(".turn-symbol.cross"),
    circleCell :  new Array(10).fill(false),
    crossCell :  new Array(10).fill(false),
    win: false,
}

const STATE_MESSAGE = {
    play : "starting...",
    win : "win!!",
    draw : "drow",
}

const PATTERN = {
    circle: "◯",
    cross: "✕"
}

const WIN_PATTERN = [
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[2,5,8],[3,6,9],
    [1,5,9],[3,5,7]
]


//クリック時の動作
function cellClick(v){
    //セルの書き込み
    if(v.currentTarget.textContent === "" && !PARAMETER.win){
        if(PARAMETER.circleTrun){
            v.currentTarget.textContent = PATTERN.circle
            PARAMETER.circleCell[v.currentTarget.dataset.key] = true
            PARAMETER.circleTrun = false
        }
        else{
            v.currentTarget.textContent = PATTERN.cross
            PARAMETER.crossCell[v.currentTarget.dataset.key] = true
            PARAMETER.circleTrun = true
        }
        PARAMETER.turnCount++

        //Turn表示(アンダーバー)の更新
        if(PARAMETER.circleTrun){
            PARAMETER.circleActive.classList.add("active")
            PARAMETER.crossActive.classList.remove("active")
        }
        else{
            PARAMETER.crossActive.classList.add("active")
            PARAMETER.circleActive.classList.remove("active")
        }

        //勝利判定
        WIN_PATTERN.forEach(ptn =>

            {
                if(PARAMETER.circleCell[ptn[0]] && PARAMETER.circleCell[ptn[1]] && PARAMETER.circleCell[ptn[2]]){
                    PARAMETER.win = true
                    PARAMETER.stateMessage.textContent = PATTERN.circle + " win!!"
                    return 
                }
                if(PARAMETER.crossCell[ptn[0]] && PARAMETER.crossCell[ptn[1]] && PARAMETER.crossCell[ptn[2]]){
                    PARAMETER.win = true
                    PARAMETER.stateMessage.textContent = PATTERN.cross + " win!!"
                    console.log("WIN")
                    return 
                }
        })

        //ドロー判定
            //footerメッセージ更新
    }

}


//リスタートButton
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