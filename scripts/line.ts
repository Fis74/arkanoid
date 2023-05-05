import Game from "./game";

export default class Line {
  public x1: number;

  public y1: number;

  public x2: number;

  public y2: number;

  public width: number;

  public color: string;

  public game: Game;

  constructor(
    game: Game,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string
  ) {
    this.game = game;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.width = this.x2 - this.x1;
  }

  public draw() {
    this.game.canvas.drawLine(
      this.x1,
      this.y1,
      this.x2,
      this.y2,
      3,
      this.color
    );
  }
}
