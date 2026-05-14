export const renderBoard = (player) => { 
    clearBoard(player);
    const shipsCellsIds = [];
  
    for (let i = 0; i <player.gameboard.board.length; i++) {
        for (let j = 0; j <player.gameboard.board[i].length; j++) {
            if (player.gameboard.board[i][j] !== null) {
                shipsCellsIds.push(`cell-p${player.number}-${i}-${j}`);
            }
        }
    }

    for (let cellId of shipsCellsIds) {
        const cell = document.getElementById(cellId);
        cell.classList.add("ship");
        if (player.isHuman) { cell.classList.add("visible") }
    }

    const hits = [];
    for (let hit of player.gameboard.shots.hits) {
        const hitX = hit.slice(0,1);
        const hitY = hit.slice(2,3);
        const hitCellId = `cell-p${player.number}-${hitY}-${hitX}`;
        hits.push(hitCellId);
    }

    for (let cellId of hits) {
        const cell = document.getElementById(cellId);
        cell.classList.add("hit");
    }

    const misses = [];
    for (let miss of player.gameboard.shots.misses) {
        const missX = miss.slice(0,1);
        const missY = miss.slice(2,3);
        const missCellId = `cell-p${player.number}-${missY}-${missX}`;
        misses.push(missCellId);
    }

    for (let cellId of misses) {
        const cell = document.getElementById(cellId);
        cell.classList.add("miss");
    }
}

const clearBoard = (player) => {
    const allCells = document.querySelectorAll(`#board-player${player.number} .cell`);
    allCells.forEach(cell => {
        cell.classList.remove("ship", "hit");
    });
}

export const renderName = (player) => {
    const playerNameLabel = document.querySelector(".player-name");
    if (player.number === 1) {
        playerNameLabel.id = "player1";
    } else if (player.number === 2) {
        playerNameLabel.id = "player2";
    }
    playerNameLabel.textContent = ` ${player.name}`;
    return;
}