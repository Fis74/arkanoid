import Game from "./game";

export default class Block {
  public game: Game;

  public color: string;

  public x1: number;

  public y1: number;

  public x2: number;

  public y2: number;

  public height: number;

  public width: number;

  constructor(game: Game, xInd: number, yInd: number, color: string) {
    this.game = game;
    this.x1 = xInd;
    this.y1 = yInd;
    this.x2 = xInd + 20;
    this.y2 = yInd + 10;
    this.color = color;
    this.height = 10;
    this.width = 20;
    this.game.setting.blockArray.push(this);
  }

  draw() {
    this.game.canvas.drawRectangle(
      this.x1 + 0.5,
      this.y1 + 0.5,
      this.width - 0.5,
      this.height - 0.5,
      this.color
    );
  }
}
