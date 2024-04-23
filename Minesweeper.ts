import {Board} from './Board.js';

export class Minesweeper {
    board: Board;
    gameOver: boolean = false;

    constructor(difficulty: string) {
        let rows = 10, cols = 10, mineRate = 0.2;
        switch (difficulty) {
            case 'easy':
                rows = cols = 8;
                mineRate = 0.1;
                break;
            case 'medium':
                rows = cols = 14;
                mineRate = 0.15;
                break;
            case 'hard':
                rows = cols = 20;
                mineRate = 0.2;
                break;
            case 'custom':
                rows = parseInt(prompt("Entrez le nombre de lignes:", "10") || "10");
                cols = parseInt(prompt("Entrez le nombre de colonnes:", "10") || "10");
                mineRate = parseFloat(prompt("Entrez le pourcentage de mines (0.1 pour 10%):", "0.2") || "0.2");
                break;
        }
        this.board = new Board(rows, cols, mineRate);
    }

    startGame() {
        this.board.generateBoard(this.board.mineRate);
        this.render();
    }

    handleClick(row: number, col: number) {
        if (this.gameOver) return;  // Ne rien faire si le jeu est fini
        const cell = this.board.cells[row][col];
        if (cell.IsRevealed || cell.IsFlagged) return;

        cell.IsRevealed = true;
        if (cell.IsMine) {
            cell.Triggered = true;  // Marquer la mine qui a été déclenchée
            console.log(`Boom! You clicked on a mine at ${row}, ${col}`);
            this.revealAllCells();  // Révéler toutes les cellules
            this.gameOver = true;
            this.checkGameStatus();
        } else {
            console.log(`Clicked on cell ${row}, ${col}`);
            if (cell.NeighbourCount === 0) {
                this.revealSafeCells(row, col);
            }
            this.render();
            this.checkGameStatus();
        }
    }




    revealSafeCells(row: number, col: number) {
        let queue = [[row, col]];
        let directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]; // Pour accéder aux 8 directions autour de la cellule
        while (queue.length > 0) {
            let [r, c] = queue.shift()!;
            for (let [dr, dc] of directions) {
                let nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < this.board.rows && nc >= 0 && nc < this.board.cols) {
                    let adjCell = this.board.cells[nr][nc];
                    if (!adjCell.IsRevealed && !adjCell.IsMine) {
                        adjCell.IsRevealed = true;
                        if (adjCell.NeighbourCount === 0) {
                            queue.push([nr, nc]);
                        }
                    }
                }
            }
        }
    }


    handleRightClick(row: number, col: number, event: MouseEvent) {
        event.preventDefault(); // Prévenir l'ouverture du menu contextuel
        const cell = this.board.cells[row][col];
        if (!cell.IsRevealed) {
            cell.IsFlagged = !cell.IsFlagged; // Basculer l'état du drapeau
            console.log(`Flag toggled on cell ${row}, ${col}`);
            this.render(); // Re-dessiner la grille pour mettre à jour l'affichage des drapeaux
        }
    }

    checkGameStatus() {
        let win = true;
        for (let row = 0; row < this.board.rows; row++) {
            for (let col = 0; col < this.board.cols; col++) {
                const cell = this.board.cells[row][col];
                if (cell.IsMine && cell.IsRevealed) {
                    this.gameOver = true;
                    this.revealAllCells();  // Révéler toutes les cellules après une défaite
                    this.showModal('Défaite', 'Boom! Vous avez cliqué sur une mine! Partie perdue.');
                    return;
                }
                if (!cell.IsMine && !cell.IsRevealed) {
                    win = false;
                }
            }
        }
        if (win) {
            this.gameOver = true;
            this.showModal('Victoire', 'Félicitations! Vous avez déminé tout le terrain!');
        }
    }


    showModal(title: string, message: string) {
        alert(title + ": " + message);
    }

    render() {
        const boardElement = document.getElementById('game')!;
        boardElement.innerHTML = '';
        for (let row = 0; row < this.board.rows; row++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';
            for (let col = 0; col < this.board.cols; col++) {
                let cell = this.board.cells[row][col];
                let cellElement = document.createElement('div');
                cellElement.className = 'cell';
                if (cell.IsRevealed) {
                    cellElement.classList.add('revealed'); // Applique la classe 'revealed' pour toutes les cellules révélées
                    if (cell.IsMine) {
                        cellElement.textContent = cell.Triggered ? '💥' : '💣'; // Change l'icône pour la mine déclenchée
                        if (cell.Triggered) {
                            cellElement.classList.add('triggered'); // Applique la classe 'triggered' si la mine a été déclenchée
                        }
                    } else {
                        cellElement.textContent = cell.NeighbourCount > 0 ? cell.NeighbourCount.toString() : '';
                    }
                } else if (cell.IsFlagged) {
                    cellElement.textContent = '🚩';
                }

                cellElement.addEventListener('click', () => this.handleClick(row, col));
                cellElement.addEventListener('contextmenu', (event) => this.handleRightClick(row, col, event));
                rowElement.appendChild(cellElement);
            }
            boardElement.appendChild(rowElement);
        }
    }



    revealAllCells() {
        for (let row = 0; row < this.board.rows; row++) {
            for (let col = 0; col < this.board.cols; col++) {
                this.board.cells[row][col].IsRevealed = true;
            }
        }
        this.render();  // Redessine le plateau avec toutes les cellules révélées
    }

}

const newGameButton = document.getElementById('newGame');
newGameButton?.addEventListener('click', () => {
    const difficulty = (document.getElementById('difficulty') as HTMLSelectElement).value;
    let game = new Minesweeper(difficulty);
    game.startGame();
});

