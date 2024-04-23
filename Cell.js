export class Cell {
    constructor() {
        this.IsMine = false;
        this.IsRevealed = false;
        this.IsFlagged = false;
        this.NeighbourCount = 0;
    }
}
