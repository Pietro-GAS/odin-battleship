import { Player } from "./game-objects.js";
import { loadSetup } from "./setup-page.js";
import { gameOver } from "./game-over.js";
import { renderBoard, renderName } from "./renderer.js";

export const initializeGame = (size, playerNumber, p1Name, p2Name) => {
    const player1 = new Player(size, true, p1Name, 1);
    let player2Human;

    if (playerNumber === 1) {
        player2Human = false;
    } else if (playerNumber === 2) {
        player2Human = true;
    }

    const player2 = new Player(size, player2Human, p2Name, 2);

    // launch setup phase with player1 and player2
    loadSetup(size);
    //clearBoard();
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

    renderBoard(player1, 1);
    renderBoard(player2, 2);
}

const gamePhase = (player1, player2) => {
    const players = [player1, player2];
    const startingPlayerNum = getRandomInt(1, 2);
    const startingPlayer = players.find((player) => player.number === startingPlayerNum);
    const secondPlayer = players.find((player) => player.number !== startingPlayerNum);

    console.log(`first player: ${startingPlayer.name}`);
    console.log(`second player: ${secondPlayer.name}`)
    
    //activateCells(player2, player1);
    //if (player2.isHuman) {
    //    // 2-player game
    //    activateCells(player1, player2);
    //}
    playTurn(startingPlayer, secondPlayer);
}

const activateCells = (player, otherPlayer) => {
    const allCells = document.querySelectorAll(`#board-player${player.number} .cell`);
    allCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            e.preventDefault();
            const coordX = Number(cell.id.slice(10, 11));
            const coordY = Number(cell.id.slice(8, 9));
            if(cell.classList.contains("ship")) {
                if(cell.classList.contains("hit")) {
                    console.log("already hit");
                } else {
                    console.log("hit!");
                } 
            } else {
                    console.log("miss!");
            }   
            player.gameboard.receiveAttack(coordX, coordY);
            renderBoard(player);
            //checkLoss(player, otherPlayer);
        });
    });
}

//const checkLoss = (player, otherPlayer) => {
//    if(player.gameboard.allShipsSunk()) {
//        gameOver(player, otherPlayer);
//    }
//}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const playTurn = (player, otherPlayer) => {
    console.log(`It's ${player.name}'s turn`);
    renderName(player);
    //const playerNameLabel = document.querySelector(".player-name");
    //playerNameLabel.textContent = ` ${player.name}`;
    //if (player.number === 1) {
    //    playerNameLabel.id = "player1";
    //} else if (player.number === 2) {
    //    playerNameLabel.id = "player2";
    //}
    
    // inactive: current player's board
    const inactiveCells = document.querySelectorAll(`#board-player${player.number} .cell`);
    inactiveCells.forEach((cell) => {
        const newCell = cell.cloneNode(true);
        cell.replaceWith(newCell);
    });
    
    if(!player.isHuman) {
        //placeholder
        const enemyCells = document.querySelectorAll(`#board-player${otherPlayer.number} .cell`);
        // cells not targeted before
        const possibleTargets = Array.from(enemyCells).filter((cell) => !Array.from(cell.classList).includes("miss") && !Array.from(cell.classList).includes("hit"));
        //console.log(possibleTargets);
        const rand = getRandomInt(0, possibleTargets.length - 1);
        const selectedTarget = possibleTargets[rand];
        const coordX = Number(selectedTarget.id.slice(10, 11));
        const coordY = Number(selectedTarget.id.slice(8, 9));
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        (async () => {
            await delay(2000);
            console.log("Waited 2s");
            otherPlayer.gameboard.receiveAttack(coordX, coordY);
            renderBoard(otherPlayer);
            if(otherPlayer.gameboard.allShipsSunk()) {
                gameOver(otherPlayer, player);
                return;
            }
            playTurn(otherPlayer, player);
        })();
    }

    // active: other player's board
    const activeCells = document.querySelectorAll(`#board-player${otherPlayer.number} .cell`);
    activeCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            e.preventDefault();
            const coordX = Number(cell.id.slice(10, 11));
            const coordY = Number(cell.id.slice(8, 9));
            if(cell.classList.contains("ship")) {
                if(cell.classList.contains("hit")) {
                    console.log("already hit");
                } else {
                    console.log("hit!");
                } 
            } else {
                    console.log("miss!");
            }   
            otherPlayer.gameboard.receiveAttack(coordX, coordY);
            renderBoard(otherPlayer);
            if(otherPlayer.gameboard.allShipsSunk()) {
                gameOver(otherPlayer, player);
                return;
            }
            playTurn(otherPlayer, player);
        });
    });
}