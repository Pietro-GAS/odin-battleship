export class Ship {
    #hits;
    #length;

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

    isSunk() {
        return this.#hits === this.#length;
    }
}

export class Gameboard {
    #size;

    constructor(size) {
        this.#size = size;
        this.board = Array.from( { length: size }, () => Array(size).fill(null));
    }

    placeShip(x, y, length, orientation="x") {
        const ship = new Ship(length);
        if (!this.#validateShip(x, y, ship, orientation)) {
            throw new Error("Invalid ship placement");
        }

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

    #validateShip(x, y, ship, orientation) {
        const positions = [];
        if (orientation === "x") {
            if (x + ship.getLength() >= this.#size) {
                return false;
            }
            for (let i = 0; i < ship.getLength(); i++) {
                positions.push(this.board[y][x + i] === null);
            } 
        } else if (orientation === "y") {
            if (y + ship.getLength() >= this.#size) {
                return false;
            }
            for (let i = 0; i < ship.getLength(); i++) {
                positions.push(this.board[y + i][x] === null);
            }
        }

        return positions.every((element) => element === true);
    }
}