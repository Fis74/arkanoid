import Game from "./game";

export default class GameLoop {
  public game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public init(): void {
    this.loop();
  }

  public update(): void {
    this.game.switchState.getState().update();
  }

  public loop(): void {
    this.game.canvas.clearCanvas();
    this.update();
    requestAnimationFrame(() => this.loop());
  }
}
