import Game from "./game";

export default class Control {
  public game: Game;

  constructor(game: Game) {
    this.game = game;
    this.init();
  }

  init() {
    this.game.canvas.getCanvas.addEventListener("mousemove", (e) =>
      this.moveCursor(e)
    );
    this.game.canvas.getCanvas.addEventListener("click", (e) =>
      this.clickCursor(e)
    );
  }

  public clickCursor(e: MouseEvent) {
    this.game.switchState.clickCursor(e);
  }

  public moveCursor(e: MouseEvent) {
    this.game.switchState.moveCursor(e);
  }
}
