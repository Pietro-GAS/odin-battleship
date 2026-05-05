import { Ship, Gameboard } from "../scripts/game-objects.js";

describe("Test the Ship class", () => {
    test("Ship exists", () => {
        expect(Ship).toBeDefined();
    });
    test("The isSunk method returns true when hits = length, false otherwise", () => {
        const ship = new Ship(2);
        expect(ship.isSunk()).toBe(false); // 0 hits
        ship.hit();
        expect(ship.isSunk()).toBe(false); // 1 hit
        ship.hit();
        expect(ship.isSunk()).toBe(true); // 2 hits
    })
});

describe("Test the Gameboard class", () => {
    test("Gameboard exists", () => {
        expect(Gameboard).toBeDefined();
    });
});