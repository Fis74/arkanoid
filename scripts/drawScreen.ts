import Game from "./game";

export default class DrawScreen {
  public game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public drawLoad() {
    this.game.canvas.drawText(
      `Уровень ${this.game.setting.level}`,
      "#f5f5f5",
      "40px Noto Sans",
      this.game.canvas.getCanvas.width / 2,
      this.game.canvas.getCanvas.height / 3
    );
    this.game.canvas.drawText(
      `❤ ${this.game.setting.live}`,
      "#f5f5f5",
      "18px",
      this.game.canvas.getCanvas.width / 2,
      this.game.canvas.getCanvas.height / 2
    );
  }

  public drawGameOver() {
    this.game.canvas.drawText(
      "Проигрыш",
      "#f5f5f5",
      "40px Noto Sans",
      this.game.canvas.getCanvas.width / 2,
      this.game.canvas.getCanvas.height / 2 - 90
    );
    this.game.canvas.drawCircle(
      this.game.canvas.getCanvas.width / 3,
      this.game.canvas.getCanvas.height / 2 + 70,
      14,
      "#f5f5f5"
    );
    this.game.canvas.drawText(
      `${this.game.setting.score}`,
      "#f5f5f5",
      "40px Noto Sans",
      this.game.canvas.getCanvas.width / 2 + 30,
      this.game.canvas.getCanvas.height / 2 + 85
    );
    this.drawPlayButton();
  }

  public drawTheEnd() {
    this.game.canvas.drawText(
      "Выигрыш",
      "#f5f5f5",
      "40px Noto Sans",
      this.game.canvas.getCanvas.width / 2,
      this.game.canvas.getCanvas.height / 2 - 90
    );
    this.game.canvas.drawCircle(
      this.game.canvas.getCanvas.width / 3,
      this.game.canvas.getCanvas.height / 2 + 70,
      14,
      "#f5f5f5"
    );
    this.game.canvas.drawText(
      `${this.game.setting.score}`,
      "#f5f5f5",
      "40px Noto Sans",
      this.game.canvas.getCanvas.width / 2 + 30,
      this.game.canvas.getCanvas.height / 2 + 85
    );
    this.drawPlayButton();
  }

  public drawPlayButton() {
    this.game.canvas.drawTriangle(
      this.game.canvas.getCanvas.width / 2 + 15,
      this.game.canvas.getCanvas.height / 2,
      this.game.canvas.getCanvas.width / 2 - 15,
      this.game.canvas.getCanvas.height / 2 - 20,
      this.game.canvas.getCanvas.width / 2 - 15,
      this.game.canvas.getCanvas.height / 2 + 20,
      "#f5f5f5"
    );
  }

  public drawPlay() {
    this.game.canvas.drawTriangle(
      this.game.canvas.getCanvas.width / 2 + 25,
      this.game.canvas.getCanvas.height / 2,
      this.game.canvas.getCanvas.width / 2 - 25,
      this.game.canvas.getCanvas.height / 2 - 30,
      this.game.canvas.getCanvas.width / 2 - 25,
      this.game.canvas.getCanvas.height / 2 + 30,
      "#f5f5f5"
    );
  }

  public drawWelcome() {
    this.game.canvas.drawText(
      "Игра арканоид",
      "#f5f5f5",
      "40px Noto Sans",
      this.game.canvas.getCanvas.width / 2,
      this.game.canvas.getCanvas.height / 3
    );
    this.drawPlayButton();
  }

  public drawUI() {
    this.game.canvas.drawLine(10, 10, this.game.width - 10, 10, 3, "#f5f5f5");
    this.game.canvas.drawLine(10, 10, 10, this.game.height - 10, 3, "#f5f5f5");
    this.game.canvas.drawLine(
      this.game.width - 10,
      10,
      this.game.width - 10,
      this.game.height - 10,
      3,
      "#f5f5f5"
    );
    this.game.canvas.drawLine(
      10,
      this.game.height - 65,
      this.game.width - 10,
      this.game.height - 65,
      3,
      "#f5f5f5"
    );
    this.game.canvas.drawLine(
      10,
      this.game.height - 10,
      this.game.width - 10,
      this.game.height - 10,
      3,
      "#f5f5f5"
    );

    this.game.canvas.drawText(
      `Уровень ${this.game.setting.level} / ${this.game.setting.levels.length}`,
      "#f5f5f5",
      "18px Noto Sans",
      270,
      this.game.canvas.getCanvas.height - 35
    );
    this.game.canvas.drawText(
      `❤ ${this.game.setting.live}`,
      "#f5f5f5",
      "18px Noto Sans",
      60,
      this.game.canvas.getCanvas.height - 35
    );

    this.game.canvas.drawCircle(
      120,
      this.game.canvas.getCanvas.height - 43,
      7,
      "#f5f5f5"
    );
    this.game.canvas.drawText(
      `${this.game.setting.score}`,
      "#f5f5f5",
      "18px Noto Sans ",
      150,
      this.game.canvas.getCanvas.height - 35
    );
  }

  public drawUIPause() {
    this.drawUI();
    this.game.canvas.drawTriangle(
      this.game.canvas.getCanvas.width - 38,
      this.game.canvas.getCanvas.height - 38,
      this.game.canvas.getCanvas.width - 50,
      this.game.canvas.getCanvas.height - 45,
      this.game.canvas.getCanvas.width - 50,
      this.game.canvas.getCanvas.height - 30,
      "#f5f5f5"
    );
    this.game.canvas.drawText(
      "Пауза",
      "#f5f5f5",
      "40px Noto Sans",
      this.game.canvas.getCanvas.width / 2,
      this.game.canvas.getCanvas.height / 2
    );
  }

  public drawUIResume() {
    this.drawUI();
    this.game.canvas.drawLine(
      this.game.width - 50,
      this.game.height - 38,
      this.game.width - 44,
      this.game.height - 38,
      15,
      "#f5f5f5"
    );
    this.game.canvas.drawLine(
      this.game.width - 42,
      this.game.height - 38,
      this.game.width - 36,
      this.game.height - 38,
      15,
      "#f5f5f5"
    );
  }
}
