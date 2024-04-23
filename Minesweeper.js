import { Board } from './Board';
export class Minesweeper {
    constructor(rows, cols) {
        this.board = new Board(rows, cols);
    }
    startGame() {
        this.board.generateBoard();
        this.render();
    }
    handleClick(row, col) {
        const cell = this.board.cells[row][col];
        if (cell.IsRevealed)
            return;
        cell.IsRevealed = true;
        console.log(`Clicked on cell ${row}, ${col}`);
        this.render();
    }
    render() {
        const boardElement = document.getElementById('game');
        boardElement.innerHTML = '';
        for (let row = 0; row < this.board.rows; row++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';
            for (let col = 0; col < this.board.cols; col++) {
                let cell = this.board.cells[row][col];
                let cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.textContent = cell.IsRevealed ? (cell.IsMine ? '💣' : cell.NeighbourCount.toString()) : '';
                cellElement.addEventListener('click', () => this.handleClick(row, col));
                rowElement.appendChild(cellElement);
            }
            boardElement.appendChild(rowElement);
        }
    }
}
// Initialize the game
const newGameButton = document.getElementById('newGame');
newGameButton === null || newGameButton === void 0 ? void 0 : newGameButton.addEventListener('click', () => {
    let game = new Minesweeper(10, 10);
    game.startGame();
});
