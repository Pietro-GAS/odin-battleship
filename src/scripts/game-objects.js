export class Ship {
    #hits;
    #length;
    #id;

    constructor(length) {
        this.#length = length;
        this.#hits = 0;
    }

    hit() {
        if (this.#hits < this.#length) {
            this.#hits ++;
        }
    }

    getHits() {
        return this.#hits;
    }

    getLength() {
        return this.#length;
    }

    getId() {
        return this.#id;
    }

    setId(string) {
        this.#id = string;
    }

    isSunk() {
        return this.#hits === this.#length;
    }
}

export class Gameboard {
    #size;
    #ships;

    constructor(size) {
        this.#size = size;
        this.board = Array.from( { length: size }, () => Array(size).fill(null));
        this.shots = { hits: [], misses: [] };
        this.#ships = [];
    }

    placeShip(x, y, length, orientation="x") {
        const ship = new Ship(length);
        if (!this.#validateShip(x, y, ship, orientation)) {
            throw new Error("Invalid ship placement");
        }

        ship.setId([x, y].toString());
        this.#ships.push(ship);

        if (orientation === "x") {
            for (let i = 0; i < ship.getLength(); i++) {
                this.board[y][x + i] = ship;
            } 
        } else if (orientation === "y") {
            for (let i = 0; i < ship.getLength(); i++) {
                this.board[y + i][x] = ship;
            }
        }
    }

    receiveAttack(x, y) {
        const attackString = [x, y].toString();
        if (this.#isPreviousAttack(attackString)) {
            alert("Repeated attack! Please select a different cell.");
        }

        if (this.board[y][x] === null) {
            this.shots.misses.push(attackString);
        } else {
            this.shots.hits.push(attackString);
            const shipId = this.board[y][x].getId();
            const ship = this.#ships.find(element => element.getId() === shipId);
            ship.hit();
        }
    }

    allShipsSunk() {
        return this.#ships.length > 0 && this.#ships.every(ship => ship.isSunk());
    }

    getShips() {
        return this.#ships;
    }

    #validateShip(x, y, ship, orientation) {
        const positions = [];
        if (orientation === "x") {
            if (x + ship.getLength() > this.#size) {
                return false;
            }
            for (let i = 0; i < ship.getLength(); i++) {
                positions.push(this.board[y][x + i] === null);
            } 
        } else if (orientation === "y") {
            if (y + ship.getLength() > this.#size) {
                return false;
            }
            for (let i = 0; i < ship.getLength(); i++) {
                positions.push(this.board[y + i][x] === null);
            }
        }

        return positions.every((element) => element === true);
    }

    #isPreviousAttack(coordinateStr) {
        return this.shots.hits.includes(coordinateStr) || this.shots.misses.includes(coordinateStr);
    }
}

export class Player {
    constructor (size, isHuman, name) {
        this.isHuman = isHuman;
        this.gameboard = new Gameboard(size);
        this.name = name;
    }
}