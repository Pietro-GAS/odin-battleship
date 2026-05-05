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

    isSunk() {
        return this.#hits === this.#length;
    }
}

export class Gameboard {
    //
}