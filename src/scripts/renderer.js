export const renderBoard = (player, playerNum) => { 
    clearBoard();
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

    const hits = [];
    for (let hit of player.gameboard.shots.hits) {
        const hitX = hit.slice(0,1);
        const hitY = hit.slice(2,3);
        const hitCellId = `cell-p${playerNum}-${hitY}-${hitX}`;
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
        const missCellId = `cell-p${playerNum}-${missY}-${missX}`;
        misses.push(missCellId);
    }

    for (let cellId of misses) {
        const cell = document.getElementById(cellId);
        cell.classList.add("miss");
    }
}

const clearBoard = () => {
    const allCells = document.querySelectorAll(".cell");
    allCells.forEach(cell => {
        cell.classList.remove("ship", "hit");
    });
}