export class Cell {
    IsMine: boolean;
    IsRevealed: boolean;
    IsFlagged: boolean;
    NeighbourCount: number;
    Triggered: boolean;

    constructor() {
        this.IsMine = false;
        this.IsRevealed = false;
        this.IsFlagged = false;
        this.NeighbourCount = 0;
        this.Triggered = false;
    }


}
