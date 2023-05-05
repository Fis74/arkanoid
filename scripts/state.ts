import Block from "./block";
import Game from "./game";

export default class Context {
  private state: State;

  constructor(state: State) {
    this.state = state;
    this.transitionTo(state);
  }

  public getState() {
    return this.state;
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }

  public clickCursor(e: MouseEvent): void {
    this.state.clickCursor(e);
  }

  public moveCursor(e: MouseEvent): void {
    this.state.moveCursor(e);
  }
}

export abstract class State {
  protected context!: Context;

  public moveScale!: boolean;

  public setContext(context: Context) {
    this.context = context;
  }
  public abstract moveCursor(e: MouseEvent): void;
  public abstract clickCursor(e: MouseEvent): void;
  public abstract update(): void;
}

export class Start extends State {
  public game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
    this.moveScale = false;
  }

  public update(): void {
    this.game.drawScreen.drawWelcome();
    if (this.moveScale) {
      this.game.drawScreen.drawPlay();
    }
  }

  public clickCursor(e: MouseEvent) {
    if (
      e.offsetX >= this.game.width / 2 - 20 &&
      e.offsetX <= this.game.width / 2 + 20 &&
      e.offsetY >= this.game.height / 2 - 20 &&
      e.offsetY <= this.game.height / 2 + 20
    ) {
      this.context.transitionTo(new LoadLevel(this.game));
    }
  }

  public moveCursor(e: MouseEvent): void {
    if (
      e.offsetX >= this.game.width / 2 - 20 &&
      e.offsetX <= this.game.width / 2 + 20 &&
      e.offsetY >= this.game.height / 2 - 20 &&
      e.offsetY <= this.game.height / 2 + 20
    ) {
      this.moveScale = true;
    } else {
      this.moveScale = false;
    }
  }
}

class LoadLevel extends State {
  public game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
    this.init();
  }

  public init() {
    if (this.game.setting.inGame) {
      this.loadLevel(this.game.setting.level);
    } else {
      this.game.setting.live = 3;
      this.game.setting.score = 0;
      this.game.setting.level = 1;
      this.loadLevel(this.game.setting.level);
      this.game.setting.inGame = true;
    }
    setTimeout(() => this.clickCursor(), 500);
  }

  public update(): void {
    this.game.drawScreen.drawLoad();
  }

  public clickCursor() {
    this.context.transitionTo(new Play(this.game));
  }

  // eslint-disable-next-line class-methods-use-this
  public moveCursor() {}

  public loadLevel(level: number) {
    this.game.setting.blockArray = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const i of this.game.setting.levels[level - 1]) {
      // eslint-disable-next-line no-new
      new Block(this.game, i.x, i.y, i.color);
    }
  }
}

class Play extends State {
  public game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
    this.init();
  }

  public init() {
    if (this.game.setting.inGame) {
      this.game.ball.route.x = this.game.ball.buffer.x;
      this.game.ball.route.y = this.game.ball.buffer.y;
      this.game.ball.speed = this.game.ball.buffer.speed;
    }
  }

  public update(): void {
    this.game.ball.draw();
    this.game.movableLine.draw();
    for (let i = 0; i < this.game.setting.blockArray.length; i++) {
      if (this.game.setting.blockArray[i]) {
        this.game.setting.blockArray[i].draw();
      }
    }
    this.game.drawScreen.drawUIResume();
    if (this.game.setting.live < 1) {
      this.context.transitionTo(new GameOver(this.game));
    }
    if (this.game.setting.blockArray.length === 0) {
      this.game.setting.level++;
      this.game.setting.live++;
      this.game.ball.reset();
      if (this.game.setting.levels.length >= this.game.setting.level) {
        this.context.transitionTo(new LoadLevel(this.game));
      } else {
        this.context.transitionTo(new Win(this.game));
        this.game.setting.inGame = false;
      }
    }
  }

  public clickCursor(e: MouseEvent) {
    if (
      e.offsetY < this.game.height - 50 &&
      e.offsetX > 10 &&
      e.offsetX < this.game.width - 10
    ) {
      this.game.ball.startBall();
    } else if (
      e.offsetX >= this.game.width - 60 &&
      e.offsetX <= this.game.width - 20 &&
      e.offsetY >= this.game.height - 50 &&
      e.offsetY <= this.game.height - 20
    ) {
      this.context.transitionTo(new Pause(this.game));
    }
  }

  public moveCursor(e: MouseEvent) {
    if (e.offsetY <= this.game.height - 65 && e.offsetY > 15) {
      const newX1 = e.offsetX - 40;
      const newX2 = newX1 + this.game.movableLine.width;
      this.game.movableLine.x1 = newX1;
      this.game.movableLine.x2 = newX2;
      if (newX1 <= 10) {
        this.game.movableLine.x1 = 13;
        this.game.movableLine.x2 = this.game.movableLine.width + 10;
      } else if (newX2 > this.game.width - 10) {
        this.game.movableLine.x1 =
          this.game.width - 10 - this.game.movableLine.width;
        this.game.movableLine.x2 = this.game.width - 13;
      }
      if (this.game.ball.readyToGo) {
        this.game.ball.updatePositionOnMovableLine();
      }
    }
  }
}

class Pause extends State {
  public game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
    this.init();
  }

  public init() {
    this.game.ball.buffer.x = this.game.ball.route.x;
    this.game.ball.buffer.y = this.game.ball.route.y;
    this.game.ball.buffer.speed = this.game.ball.speed;
    this.game.ball.stop();
  }

  public update(): void {
    this.game.ball.draw();
    this.game.movableLine.draw();
    for (let i = 0; i < this.game.setting.blockArray.length; i++) {
      if (this.game.setting.blockArray[i]) {
        this.game.setting.blockArray[i].draw();
      }
    }
    this.game.drawScreen.drawUIPause();
  }

  public clickCursor(e: MouseEvent) {
    if (
      e.offsetX >= this.game.width - 60 &&
      e.offsetX <= this.game.width - 20 &&
      e.offsetY >= this.game.height - 50 &&
      e.offsetY <= this.game.height - 20
    ) {
      this.context.transitionTo(new Play(this.game));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public moveCursor(): void {}
}

class GameOver extends State {
  public game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
    this.moveScale = false;
    this.init();
  }

  public init() {
    this.game.setting.inGame = false;
  }

  public update(): void {
    if (this.moveScale) {
      this.game.drawScreen.drawPlay();
    }
    this.game.drawScreen.drawGameOver();
  }

  public clickCursor(e: MouseEvent) {
    if (
      e.offsetX >= this.game.width / 2 - 20 &&
      e.offsetX <= this.game.width / 2 + 20 &&
      e.offsetY >= this.game.height / 2 - 20 &&
      e.offsetY <= this.game.height / 2 + 20
    ) {
      this.context.transitionTo(new LoadLevel(this.game));
    }
  }

  public moveCursor(e: MouseEvent) {
    if (
      e.offsetX >= this.game.width / 2 - 20 &&
      e.offsetX <= this.game.width / 2 + 20 &&
      e.offsetY >= this.game.height / 2 - 20 &&
      e.offsetY <= this.game.height / 2 + 20
    ) {
      this.moveScale = true;
    } else {
      this.moveScale = false;
    }
  }
}

class Win extends State {
  public game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
    this.moveScale = false;
    this.init();
  }

  public init() {
    this.game.setting.inGame = false;
  }

  public update(): void {
    if (this.moveScale) {
      this.game.drawScreen.drawPlay();
    }
    this.game.drawScreen.drawTheEnd();
  }

  public clickCursor(e: MouseEvent) {
    if (
      e.offsetX >= this.game.width / 2 - 20 &&
      e.offsetX <= this.game.width / 2 + 20 &&
      e.offsetY >= this.game.height / 2 - 20 &&
      e.offsetY <= this.game.height / 2 + 20
    ) {
      this.context.transitionTo(new LoadLevel(this.game));
    }
  }

  public moveCursor(e: MouseEvent) {
    if (
      e.offsetX >= this.game.width / 2 - 20 &&
      e.offsetX <= this.game.width / 2 + 20 &&
      e.offsetY >= this.game.height / 2 - 20 &&
      e.offsetY <= this.game.height / 2 + 20
    ) {
      this.moveScale = true;
    } else {
      this.moveScale = false;
    }
  }
}
