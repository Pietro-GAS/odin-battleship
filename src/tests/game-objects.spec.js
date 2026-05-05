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
    test("The gameboard constructor is working", () => {
        const board = new Gameboard(8).board;
        expect(board.length).toBe(8);
        expect(board[0].length).toBe(8);
    });
    test("The ship placement method is working", () => {
        const board = new Gameboard(8);
        board.placeShip(0, 1, 3); // horizontal
        expect(board.board[7][7]).toBeNull(); // ship is not here
        expect(board.board[1][0]).not.toBeNull(); // ship is here
        expect(board.board[1][1]).not.toBeNull(); // ship is here
        expect(board.board[1][2]).not.toBeNull(); // ship is here
        board.placeShip(5, 0, 4, "y"); // vertical
        expect(board.board[0][5]).not.toBe(null); // ship is here
        expect(board.board[1][5]).not.toBe(null); // ship is here
        expect(board.board[2][5]).not.toBe(null); // ship is here
        expect(board.board[3][5]).not.toBe(null); // ship is here
        expect(() => { board.placeShip(5, 0, 5) }).toThrow(); // squares already occupied
        expect(() => { board.placeShip(6, 6, 5) }).toThrow(); // ship is out of bounds
    });
});