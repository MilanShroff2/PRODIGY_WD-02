let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            if (checkWin()) {
                isGameOver = true;
                document.querySelector("#Results").innerHTML = turn + " Wins";
                document.querySelector("#play_again").style.display = "inline";
            } else if (checkDraw()) {
                document.querySelector("#Results").innerHTML = "It's a Draw!";
                document.querySelector("#play_again").style.display = "inline";
            } else {
                changeTurn();
            }
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".mln").style.left = "50%";
    } else {
        turn = "X";
        document.querySelector(".mln").style.left = "0";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            
            winConditions[i].forEach(index => {
                boxes[index].classList.add("win");
            });
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return [...boxes].every(box => box.innerHTML !== "");
}

document.querySelector("#play_again").addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove("win"); 
    });
    isGameOver = false;
    turn = "X";
    document.querySelector(".mln").style.left = "0";
    document.querySelector("#Results").innerHTML = "";
    document.querySelector("#play_again").style.display = "none";
});
