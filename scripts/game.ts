import Canvas from "./canvas";
import Control from "./control";
import GameLoop from "./gameLoop";
import Context, { Start } from "./state";
import Setting from "./setting";
import DrawScreen from "./drawScreen";
import Ball from "./ball";
import Line from "./line";

export default class Game {
  public width: number;

  public height: number;

  public canvas: Canvas;

  public gameLoop: GameLoop;

  public control: Control;

  public switchState: Context;

  public setting: Setting;

  public movableLine: Line;

  public drawScreen: DrawScreen;

  public ball: Ball;

  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.canvas = new Canvas(this.width, this.height);
    this.gameLoop = new GameLoop(this);
    this.switchState = new Context(new Start(this));
    this.setting = new Setting();
    this.movableLine = new Line(
      this,
      (this.width - 75) / 2,
      this.height - 100,
      (this.width - 75) / 2 + 75,
      this.height - 100,
      "#57b0ff"
    );
    this.control = new Control(this);
    this.drawScreen = new DrawScreen(this);
    this.ball = new Ball(this);
    this.init();
  }

  public init(): void {
    this.gameLoop.init();
  }
}

window.onload = () => new Game(430, 600);
