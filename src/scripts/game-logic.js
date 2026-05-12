import { Player } from "./game-objects.js";
import { loadSetup } from "./setup-page.js";
import { gameOver } from "./game-over.js";

export const initializeGame = (size, playerNumber) => {
    const player1 = new Player(size, true, "Player 1");
    let player2Human;

    if (playerNumber === 1) {
        player2Human = false;
    } else if (playerNumber === 2) {
        player2Human = true;
    }

    const player2 = new Player(size, player2Human, "Player 2");

    // launch setup phase with player1 and player2
    loadSetup(size);
    clearBoard();
    setupPhase(player1, player2);
    gamePhase(player1, player2);
}

const setupPhase = (player1, player2) => {
    // wait for players to ready their ships
    // if p2 is cpu use logic to select coordinates for their ships

    // placeholder: positions are predetermined

    const positions = [[0,0], [1,1], [3,0]];
    for (let position of positions) {
        player1.gameboard.placeShip(position[0], position[1], 2, "x");
        player2.gameboard.placeShip(position[0], position[1], 2, "x");
    }

    displayShips(player1, 1);
    displayShips(player2, 2);
}

const displayShips = (player, playerNum) => { 
    const shipsCellsIds = []; 
  
    for (let i = 0; i <player.gameboard.board.length; i++) {
        for (let j = 0; j <player.gameboard.board[i].length; j++) {
            if (player.gameboard.board[i][j] !== null) {
                shipsCellsIds.push(`cell-p${playerNum}-${i}-${j}`);
            }
        }
    }

    for (let cellId of shipsCellsIds) {
        const cell = document.getElementById(cellId);
        cell.classList.add("ship");
    }
}

const clearBoard = () => {
    const allCells = document.querySelectorAll(".cell");
    allCells.forEach(cell => {
        cell.classList.remove("ship", "hit");
    });
}

const gamePhase = (player1, player2) => {
    activateCells(player2, 2, player1);
    if (player2.isHuman) {
        // 2-player game
        activateCells(player1, 1, player2);
    }
}

const activateCells = (player, playerNum, otherPlayer) => {
    const allCells = document.querySelectorAll(`#board-player${playerNum} .cell`);
    allCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(`x: ${cell.id.slice(10, 11)}`);
            console.log(`y: ${cell.id.slice(8, 9)}`);
            const coordX = Number(cell.id.slice(10, 11));
            const coordY = Number(cell.id.slice(8, 9));
            if(cell.classList.contains("ship")) {
                if(cell.classList.contains("hit")) {
                    console.log("already hit");
                } else {
                    cell.classList.add("hit");
                    console.log("hit!");
                } 
            } else {
                    console.log("miss!");
            }   
            player.gameboard.receiveAttack(coordX, coordY);
            checkLoss(player, otherPlayer);
        });
    });
}

const checkLoss = (player, otherPlayer) => {
    if(player.gameboard.allShipsSunk()) {
        //alert(`All ${player.name}'s ships are sunk! ${otherPlayer.name} won!`);
        gameOver(player, otherPlayer);
    }
}