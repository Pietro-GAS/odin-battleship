export const loadMainMenu = () => {
    const body = document.querySelector("body");
    
    const mainMenu = document.createElement("div");
    mainMenu.setAttribute("class", "menu");
    mainMenu.setAttribute("id", "settings-menu");

    const title = document.createElement("h1");
    title.setAttribute("class", "heading");
    title.innerHTML = "BATTLESHIP!";
    
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    container.setAttribute("id", "settings-container");

    const btnOneP = document.createElement("div");
    btnOneP.setAttribute("class", "button");
    btnOneP.setAttribute("id", "button-one-p");
    btnOneP.innerHTML = "One Player";

    const btnTwoP = document.createElement("div");
    btnTwoP.setAttribute("class", "button");
    btnTwoP.setAttribute("id", "button-two-p");
    btnTwoP.innerHTML = "Two Players";
    
    const btnSetup = document.createElement("div");
    btnSetup.setAttribute("class", "button");
    btnSetup.setAttribute("id", "button-setup");
    btnSetup.innerHTML = "Confirm";
    
    body.appendChild(mainMenu);
    mainMenu.appendChild(title);
    mainMenu.appendChild(container);
    container.appendChild(btnOneP);
    container.appendChild(btnTwoP);
    mainMenu.appendChild(btnSetup);
}