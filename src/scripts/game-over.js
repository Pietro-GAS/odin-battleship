import { loadMainMenu } from "./mainMenu.js";

export const gameOver = (player, otherPlayer) => {
    const body = document.querySelector("body");
    
    const overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay");

    const message = document.createElement("h1");
    message.setAttribute("class", "message");
    message.setAttribute("id", "message-game-over");
    message.textContent = `All ${player.name}'s ships are sunk! ${otherPlayer.name} won!`;
    
    const btnRestart = document.createElement("div");
    btnRestart.setAttribute("class", "button");
    btnRestart.setAttribute("id", "button-restart");
    btnRestart.innerHTML = "Restart";
    btnRestart.addEventListener("click", (e) => {
        e.preventDefault();
        loadMainMenu();
    });

    body.appendChild(overlay);
    overlay.appendChild(message);
    overlay.appendChild(btnRestart);
}