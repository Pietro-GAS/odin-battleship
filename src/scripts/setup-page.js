import { loadMainMenu } from "./mainMenu.js";

export const loadSetup = (boardSize) => {
    //placeholder
    //console.log(boardSize);
    const body = document.querySelector("body");
    body.replaceChildren();

    const header = document.createElement("div");
    header.setAttribute("class", "header");

    const content = document.createElement("div");
    content.setAttribute("id", "content");

    const turnLabel = document.createElement("h1");
    turnLabel.setAttribute("id", "turn-label");
    turnLabel.innerHTML = `It's<span class="player-name"></span>'s turn.`;

    const boardContainer = document.createElement("div");
    boardContainer.setAttribute("id", "board-container");

    const p1Container = document.createElement("div");
    p1Container.setAttribute("class", "player-container");
    p1Container.setAttribute("id", "player1-container");

    const p1Label = document.createElement("h2");
    p1Label.setAttribute("id", "label-player1");
    p1Label.textContent = "PLAYER 1";

    const boardPlayer1 = document.createElement("div");
    boardPlayer1.setAttribute("class", "board");
    boardPlayer1.setAttribute("id", "board-player1");
    boardPlayer1.style.display = "grid";
    boardPlayer1.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
    boardPlayer1.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    const p2Container = document.createElement("div");
    p2Container.setAttribute("class", "player-container");
    p2Container.setAttribute("id", "player2-container");

    const p2Label = document.createElement("h2");
    p2Label.setAttribute("id", "label-player2");
    p2Label.textContent = "PLAYER 2";

    const boardPlayer2 = document.createElement("div");
    boardPlayer2.setAttribute("class", "board");
    boardPlayer2.setAttribute("id", "board-player2");
    boardPlayer2.style.display = "grid";
    boardPlayer2.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
    boardPlayer2.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell1 = document.createElement("div");
            const id1 = `cell-p1-${i}-${j}`;
            cell1.setAttribute("class", "cell");
            cell1.setAttribute("id", id1);
            cell1.textContent = `${i}-${j}`;
            const cell2 = document.createElement("div");
            const id2 = `cell-p2-${i}-${j}`;
            cell2.setAttribute("class", "cell");
            cell2.setAttribute("id", id2);
            cell2.textContent = `${i}-${j}`;

            boardPlayer1.appendChild(cell1);
            boardPlayer2.appendChild(cell2);
        }
    }

    const btnMenu = document.createElement("div");
    btnMenu.setAttribute("class", "button");
    btnMenu.setAttribute("id", "button-menu");
    btnMenu.innerHTML = "Main Menu";
    btnMenu.addEventListener("click", () => loadMainMenu());

    const footer = document.createElement("div");
    footer.setAttribute("class", "footer");

    body.appendChild(header);
    header.appendChild(btnMenu);
    body.appendChild(content);
    content.appendChild(turnLabel);
    content.appendChild(boardContainer);
    boardContainer.appendChild(p1Container);
    boardContainer.appendChild(p2Container);
    p1Container.appendChild(boardPlayer1);
    p1Container.appendChild(p1Label);
    p2Container.appendChild(boardPlayer2);
    p2Container.appendChild(p2Label);
    body.appendChild(footer);
}