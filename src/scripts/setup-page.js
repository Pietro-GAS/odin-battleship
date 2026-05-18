import { loadMainMenu } from "./mainMenu.js";
import { Player } from "./game-objects.js";
import { renderBoard } from "./renderer.js";

export const loadSetup = (boardSize) => {
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


    //placeholder
    const btnTest = document.createElement("div");
    btnTest.setAttribute("class", "button");
    btnTest.setAttribute("id", "button-test");
    btnTest.innerHTML = "Test";
    btnTest.addEventListener("click", () => shipPlacement());
    header.appendChild(btnTest);
}

export const shipPlacement = (player) => {
    const body = document.querySelector("body");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.classList.add("active");
    overlay.setAttribute("id", "ship-config-overlay");
    const shipForm = document.createElement("form");
    shipForm.setAttribute("id", "ship-form");

    body.appendChild(overlay);
    overlay.appendChild(shipForm);

    const ships = [
        {
            name: "carrier",
            length: 5
        },
        {
            name: "battleship",
            length: 4
        },
        {
            name: "cruiser",
            length: 3
        },
        {
            name: "submarine",
            length: 3
        },
        {
            name: "destroyer",
            length: 2
        }
    ]

    for (let ship of ships) {
        const container = document.createElement("div");
        container.setAttribute("class", "form-section");
        const label = document.createElement("label");
        label.textContent = `${ship.name} - length: ${ship.length}`;
        const inputContainer = document.createElement("div");
        inputContainer.setAttribute("class", "input-container");
        inputContainer.setAttribute("class", `${ship.name}-input-container`);
        const xLabel = document.createElement("label");
        xLabel.textContent = "x:";
        const xInput = document.createElement("input");
        xInput.setAttribute("class", "ship-config-input");
        xInput.setAttribute("id", `${ship.name}-x-input`);
        const yLabel = document.createElement("label");
        yLabel.textContent = "y:";
        const yInput = document.createElement("input");
        yInput.setAttribute("class", "ship-config-input");
        yInput.setAttribute("id", `${ship.name}-y-input`);
        const orientationLabel = document.createElement("label");
        orientationLabel.textContent = "orientation:";
        const orientationInput = document.createElement("input");
        orientationInput.setAttribute("class", "ship-config-input");
        orientationInput.setAttribute("id", `${ship.name}-orientation-input`);

        shipForm.appendChild(container);
        container.appendChild(label);
        container.appendChild(inputContainer);
        inputContainer.appendChild(xLabel);
        inputContainer.appendChild(xInput);
        inputContainer.appendChild(yLabel);
        inputContainer.appendChild(yInput);
        inputContainer.appendChild(orientationLabel);
        inputContainer.appendChild(orientationInput);
    }
    
    const btnConfirm = document.createElement("div");
    btnConfirm.setAttribute("class", "button");
    btnConfirm.setAttribute("id", "button-confirm");
    btnConfirm.innerHTML = "Confirm";
    shipForm.appendChild(btnConfirm);
    btnConfirm.addEventListener("click", (e) => {
        e.preventDefault();
        const carrierX = Number(document.getElementById("carrier-x-input").value);
        const carrierY = Number(document.getElementById("carrier-y-input").value);
        const carrierOrientation = document.getElementById("carrier-orientation-input").value;
        const battleshipX = Number(document.getElementById("battleship-x-input").value);
        const battleshipY = Number(document.getElementById("battleship-y-input").value);
        const battleshipOrientation = document.getElementById("battleship-orientation-input").value;
        const cruiserX = Number(document.getElementById("cruiser-x-input").value);
        const cruiserY = Number(document.getElementById("cruiser-y-input").value);
        const cruiserOrientation = document.getElementById("cruiser-orientation-input").value;
        const submarineX = Number(document.getElementById("submarine-x-input").value);
        const submarineY = Number(document.getElementById("submarine-y-input").value);
        const submarineOrientation = document.getElementById("submarine-orientation-input").value;
        const destroyerX = Number(document.getElementById("destroyer-x-input").value);
        const destroyerY = Number(document.getElementById("destroyer-y-input").value);
        const destroyerOrientation = document.getElementById("destroyer-orientation-input").value;
        
        player.gameboard.placeShip(carrierX, carrierY, 5, carrierOrientation);
        player.gameboard.placeShip(battleshipX, battleshipY, 4, battleshipOrientation);
        player.gameboard.placeShip(cruiserX, cruiserY, 3, cruiserOrientation);
        player.gameboard.placeShip(submarineX, submarineY, 3, submarineOrientation);
        player.gameboard.placeShip(destroyerX, destroyerY, 2, destroyerOrientation);

        renderBoard(player);
        shipForm.reset();      
        body.removeChild(overlay);
    });
    
    
}