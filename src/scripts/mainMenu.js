import { initializeGame } from "./game-logic.js";

export const loadMainMenu = () => {
    const body = document.querySelector("body");
    body.replaceChildren();

    const header = document.createElement("div");
    header.setAttribute("class", "header");

    const mainMenu = document.createElement("div");
    mainMenu.setAttribute("class", "menu");
    mainMenu.setAttribute("id", "settings-menu");

    const title = document.createElement("h2");
    title.setAttribute("class", "heading");
    title.innerHTML = "BATTLESHIP!";
    
    const sizeForm = document.createElement("form");
    sizeForm.setAttribute("id", "size-form");

    const sizeLabel = document.createElement("label");
    sizeLabel.setAttribute("id", "size-label");
    sizeLabel.setAttribute("for", "size-input");
    sizeLabel.innerHTML = "Board size:";

    const sizeInput = document.createElement("input");
    sizeInput.setAttribute("type", "text");
    sizeInput.setAttribute("id", "size-input");
    sizeInput.setAttribute("name", "size-input");
    
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    container.setAttribute("id", "settings-container");

    const btnOneP = document.createElement("div");
    btnOneP.setAttribute("class", "button");
    btnOneP.classList.add("clicked");
    btnOneP.setAttribute("id", "button-one-p");
    btnOneP.innerHTML = "One Player";
    btnOneP.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("playerNumber", "1");
        btnOneP.classList.add("clicked");
        btnTwoP.classList.remove("clicked");
    })

    const btnTwoP = document.createElement("div");
    btnTwoP.setAttribute("class", "button");
    btnTwoP.setAttribute("id", "button-two-p");
    btnTwoP.innerHTML = "Two Players";
    btnTwoP.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("playerNumber", "2");
        btnTwoP.classList.add("clicked");
        btnOneP.classList.remove("clicked");
    })

    const p1NameInput = document.createElement("input");
    p1NameInput.setAttribute("type", "text");
    p1NameInput.setAttribute("id", "p1-name-input");
    p1NameInput.setAttribute("name", "p1-name-input");
    p1NameInput.setAttribute("placeHolder", "Player 1");

    const p2NameInput = document.createElement("input");
    p2NameInput.setAttribute("type", "text");
    p2NameInput.setAttribute("id", "p2-name-input");
    p2NameInput.setAttribute("name", "p2-name-input");
    p2NameInput.setAttribute("placeHolder", "Player 2");
    
    const btnSetup = document.createElement("div");
    btnSetup.setAttribute("class", "button");
    btnSetup.setAttribute("id", "button-setup");
    btnSetup.innerHTML = "Confirm";
    btnSetup.addEventListener("click", (e) => {
        e.preventDefault();
        const boardSize = Number(sizeInput.value);
        const playerNumber = Number(localStorage.getItem("playerNumber"));
        const p1Name = p1NameInput.value !== '' ? p1NameInput.value : p1NameInput.placeholder;
        const p2Name = p2NameInput.value !== '' ? p2NameInput.value : p2NameInput.placeholder;
        initializeGame(boardSize, playerNumber, p1Name, p2Name); // playerNumber to be determined
    });

    const footer = document.createElement("div");
    footer.setAttribute("class", "footer");
    
    body.appendChild(header);
    body.appendChild(mainMenu);
    mainMenu.appendChild(title);
    mainMenu.appendChild(sizeForm);
    sizeForm.appendChild(sizeLabel);
    sizeForm.appendChild(sizeInput);
    mainMenu.appendChild(container);
    container.appendChild(btnOneP);
    container.appendChild(btnTwoP);
    mainMenu.appendChild(p1NameInput);
    mainMenu.appendChild(p2NameInput);
    mainMenu.appendChild(btnSetup);
    body.appendChild(footer);
}