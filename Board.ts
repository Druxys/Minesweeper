import {Cell} from './Cell.js';

export class Board {
    rows: number;
    cols: number;
    cells: Cell[][];
    mineRate: number;

    constructor(rows: number, cols: number, mineRate: number) {
        this.rows = rows;
        this.cols = cols;
        this.mineRate = mineRate;
        this.cells = this.generateBoard(mineRate); // Initialize the board immediately
    }

    generateBoard(mineRate: number): Cell[][] {
        let board: Cell[][] = [];
        for (let i = 0; i < this.rows; i++) {
            let row: Cell[] = [];
            for (let j = 0; j < this.cols; j++) {
                let cell = new Cell();
                row.push(cell);
            }
            board.push(row);
        }

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (Math.random() < mineRate) {
                    board[i][j].IsMine = true;
                }
            }
        }

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (board[i][j].IsMine) {
                    // Incrémenter le compteur des mines voisines pour les cellules adjacentes
                    for (let di = -1; di <= 1; di++) {
                        for (let dj = -1; dj <= 1; dj++) {
                            let ni = i + di, nj = j + dj;
                            if (ni >= 0 && ni < this.rows && nj >= 0 && nj < this.cols) {
                                // Ne pas incrémenter si la cellule actuelle est la mine
                                if (!board[ni][nj].IsMine) {
                                    board[ni][nj].NeighbourCount++;
                                }
                            }
                        }
                    }
                }
            }
        }

        return board;
    }

}
