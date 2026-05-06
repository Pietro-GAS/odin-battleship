import { Ship, Gameboard, Player } from "../scripts/game-objects.js";


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
    test("The receiveAttack method is working", () => {
        const board = new Gameboard(4);
        board.placeShip(0, 0, 2, "x");
        board.receiveAttack(3, 3);
        let attackString = [3, 3].toString();
        expect(board.shots.misses.includes(attackString)).toBe(true); // the shot misses
        expect(board.shots.hits.includes(attackString)).toBe(false);
        board.receiveAttack(0, 0);
        attackString = [0, 0].toString();
        expect(board.shots.misses.includes(attackString)).toBe(false);
        expect(board.shots.hits.includes(attackString)).toBe(true); // the shot hits
        const ship = board.ships.find(ship => ship.getId() === attackString);
        expect(ship.getHits()).toBe(1); // the ship has 1 hit
    });
    test("The allShipsSunk methos currectly identifies if all ships have been sunk", () => {
        const board = new Gameboard(4);
        expect(board.allShipsSunk()).toBe(false); // no ships: false
        board.placeShip(0, 0, 1, "x");
        expect(board.allShipsSunk()).toBe(false); // 1 ship: false
        board.receiveAttack(0, 0);
        expect(board.allShipsSunk()).toBe(true); // 1 sunken ship: true
        board.placeShip(2, 0, 2, "x");
        expect(board.allShipsSunk()).toBe(false); // 2 ships: false
        board.receiveAttack(2, 0);
        board.receiveAttack(3, 0);
        expect(board.allShipsSunk()).toBe(true); // 2 sunken ships: true
    });
});

describe("Test the Player class", () => {
    test("Player exists", () => {
        expect(Player).toBeDefined();
    });
    test("The player constructor is working", () => {
        const player1 = new Player(8, true);
        const player2 = new Player(8, false);
        expect(player1.gameboard.board.length).toBe(8);
        expect(player1.gameboard.board[0].length).toBe(8);
        expect(player1.type).toBe("human");
        expect(player2.type).toBe("cpu");
    });
});