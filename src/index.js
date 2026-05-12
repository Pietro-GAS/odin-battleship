import "./css/default.css";
import { loadMainMenu } from "./scripts/mainMenu.js";

(() => {
    document.addEventListener("DOMContentLoaded", () => {
        localStorage.setItem("playerNumber", "1");
        loadMainMenu();
    });    
})();