export const loadMainMenu = () => {
    const body = document.querySelector("body");
    body.replaceChildren();

    const mainMenu = document.createElement("div");
    mainMenu.setAttribute("class", "menu");
    mainMenu.setAttribute("id", "settings-menu");

    const title = document.crea");
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
    mainMenu.appendChild(sizeForm);
    sizeForm.appendChild(sizeLabel);
    sizeForm.appendChild(sizeInput);
    mainMenu.appendChild(container);
    container.appendChild(btnOneP);
    container.appendChild(btnTwoP);
    mainMenu.appendChild(btnSetup);
}