import { Cell } from './Cell';
export class Board {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.cells = this.generateBoard(); // Initialize the board immediately
    }
    generateBoard() {
        let board = [];
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.cols; j++) {
                let cell = new Cell();
                if (Math.random() < 0.2)
                    cell.IsMine = true;
                row.push(cell);
            }
            board.push(row);
        }
        // Update neighbor counts here if necessary
        return board;
    }
}
