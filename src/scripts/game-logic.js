import { Player } from "./game-objects.js";

const initializeGame = (size, playerNumber) => {
    const player1 = new Player(size, true);

    if (playerNumber === 1) {
        const player2 = new Player(size, false);
    } else if (playerNumber === 2) {
        const player2 = new Player(size, true);
    }

    // launch setup phase with player1 and player2
}

const setupPhase = (player1, player2) => {
    // wait for players to ready their ships
    // if p2 is cpu use ogic to select coordinates for their ships

    // placeholder: positions are predetermined

    const positions = [[0,0], [1,1], [3,0]];
    for (let position of positions) {
        player1.gameboard.placeShip(position[0], position[1], 2, "x");
        player2.gameboard.placeShip(position[0], position[1], 2, "x");
    }
}