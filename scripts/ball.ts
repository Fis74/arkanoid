import Block from "./block";
import Game from "./game";

export default class Ball {
  readyToGo: boolean;

  coordinate: { x: number; y: number };

  route: { x: number; y: number };

  game: Game;

  angle: number;

  speed: number;

  color: string;

  isMain: boolean;

  buffer: { x: number; y: number; speed: number };

  radius: number;

  ballSpeed: number;

  constructor(game: Game) {
    this.game = game;
    this.coordinate = {
      x: this.game.movableLine.x1 + (this.game.movableLine.width - 10) / 2,
      y: this.game.movableLine.y1 - 11,
    };
    this.route = { x: 0, y: 0 };
    this.angle = 0;
    this.radius = 5;
    this.ballSpeed = 4;
    this.speed = 0;
    this.color = "#D3F349";
    this.readyToGo = true;
    this.isMain = false;
    this.buffer = {
      x: this.route.x,
      y: this.route.y,
      speed: this.speed,
    };
  }

  public draw() {
    this.game.canvas.drawCircle(
      this.coordinate.x,
      this.coordinate.y,
      this.radius,
      this.color
    );
    this.coordinate.x += this.route.x;
    this.coordinate.y += this.route.y;
    if (this.coordinate.x + 10 > this.game.width - 10 && this.route.x > 0) {
      this.setAngle(180 - this.angle);
    } else if (this.coordinate.x < 10 && this.route.x < 0) {
      this.setAngle(180 - this.angle);
    }
    if (this.coordinate.y <= 10 && this.route.y < 0) {
      this.setAngle(360 - this.angle);
    } else if (
      this.coordinate.y + 10 >= this.game.height - 105 &&
      this.coordinate.y + 10 <= this.game.height - 100 &&
      this.coordinate.x + 10 > this.game.movableLine.x1 &&
      this.coordinate.x < this.game.movableLine.x2
    ) {
      let newDegree = Math.abs(
        ((this.game.movableLine.x2 - this.coordinate.x + 5) * 150) /
          this.game.movableLine.width
      );
      if (newDegree > 170) {
        newDegree = 170;
      } else if (newDegree < 10) {
        newDegree = 10;
      }
      this.setAngle(newDegree);
    } else if (this.coordinate.y >= this.game.height - 75) {
      this.route.x = this.speed;
      this.route.y = this.speed;
      this.speed = 0;
      this.coordinate.x = -10;
      this.coordinate.y = -10;
      this.resetFall();
    }

    if (
      (this.angle >= 45 && this.angle <= 135) ||
      (this.angle <= -45 && this.angle >= -135)
    ) {
      const array = this.game.setting.blockArray.reduce((acc, item, index) => {
        if (this.intersects(item)) {
          acc.push(index);
        }
        return acc;
      }, []);
      if (array.length === 1) {
        this.game.setting.score += 10;
        if (
          this.coordinate.x + 5 >= this.game.setting.blockArray[array[0]].x2 &&
          this.coordinate.x + 5 <= this.game.setting.blockArray[array[0]].x2 + 5
        ) {
          this.setAngle(90 - this.angle);
        } else if (
          this.coordinate.x + 5 >=
            this.game.setting.blockArray[array[0]].x1 - 5 &&
          this.coordinate.x + 5 <= this.game.setting.blockArray[array[0]].x1
        ) {
          this.setAngle(270 - this.angle);
        } else {
          this.setAngle(360 - this.angle);
        }
        this.game.setting.blockArray.splice(array[0], 1);
      }
      if (array.length === 2) {
        this.game.setting.score += 10;
        this.game.setting.blockArray.splice(array[0], 2);
        this.setAngle(360 - this.angle);
      }
    }
    if (
      (this.angle >= 225 && this.angle <= 315) ||
      (this.angle <= -225 && this.angle >= -315)
    ) {
      const array = this.game.setting.blockArray.reduce((acc, item, index) => {
        if (this.intersects(item)) {
          acc.push(index);
        }
        return acc;
      }, []);
      if (array.length === 1) {
        this.game.setting.score += 10;
        if (
          this.coordinate.x + 5 >= this.game.setting.blockArray[array[0]].x2 &&
          this.coordinate.x + 5 <= this.game.setting.blockArray[array[0]].x2 + 5
        ) {
          this.setAngle(270 - this.angle);
        } else if (
          this.coordinate.x + 5 >=
            this.game.setting.blockArray[array[0]].x1 - 5 &&
          this.coordinate.x + 5 <= this.game.setting.blockArray[array[0]].x1
        ) {
          this.setAngle(90 - this.angle);
        } else {
          this.setAngle(360 - this.angle);
        }
        this.game.setting.blockArray.splice(array[0], 1);
      }
      if (array.length === 2) {
        this.game.setting.score += 10;
        this.game.setting.blockArray.splice(array[0], 2);
        this.setAngle(360 - this.angle);
      }
    }
    if (
      (this.angle >= 0 && this.angle <= 45) ||
      (this.angle >= 315 && this.angle <= 360) ||
      (this.angle <= 0 && this.angle >= -45) ||
      (this.angle <= -315 && this.angle >= -360)
    ) {
      const array = this.game.setting.blockArray.reduce((acc, item, index) => {
        if (this.intersects(item)) {
          acc.push(index);
        }
        return acc;
      }, []);
      if (array.length === 1) {
        this.game.setting.score += 10;
        if (
          this.coordinate.y + 5 >= this.game.setting.blockArray[array[0]].y2 &&
          this.coordinate.y + 5 <= this.game.setting.blockArray[array[0]].y2 + 5
        ) {
          this.setAngle(270 - this.angle);
        } else if (
          this.coordinate.y + 5 >=
            this.game.setting.blockArray[array[0]].y1 - 5 &&
          this.coordinate.y + 5 <= this.game.setting.blockArray[array[0]].y1
        ) {
          this.setAngle(90 - this.angle);
        } else {
          this.setAngle(180 - this.angle);
        }
        this.game.setting.blockArray.splice(array[0], 1);
      }
      if (array.length === 2) {
        this.game.setting.score += 10;
        this.game.setting.blockArray.splice(array[0], 2);
        this.setAngle(180 - this.angle);
      }
    }
    if (
      (this.angle >= 135 && this.angle <= 225) ||
      (this.angle <= -135 && this.angle >= -225)
    ) {
      const array = this.game.setting.blockArray.reduce((acc, item, index) => {
        if (this.intersects(item)) {
          acc.push(index);
        }
        return acc;
      }, []);

      if (array.length === 1) {
        this.game.setting.score += 10;
        if (
          this.coordinate.y + 5 >= this.game.setting.blockArray[array[0]].y2 &&
          this.coordinate.y + 5 <= this.game.setting.blockArray[array[0]].y2 + 5
        ) {
          this.setAngle(90 - this.angle);
        } else if (
          this.coordinate.y + 5 >=
            this.game.setting.blockArray[array[0]].y1 - 5 &&
          this.coordinate.y + 5 <= this.game.setting.blockArray[array[0]].y1
        ) {
          this.setAngle(270 - this.angle);
        } else {
          this.setAngle(180 - this.angle);
        }
        this.game.setting.blockArray.splice(array[0], 1);
      }
      if (array.length === 2) {
        this.game.setting.score += 10;
        this.game.setting.blockArray.splice(array[0], 2);
        this.setAngle(180 - this.angle);
      }
    }
  }

  public intersects(block: Block): boolean {
    const halfWidth = block.width / 2;
    const halfHeight = block.height / 2;
    const cx = Math.abs(this.coordinate.x + 5 - block.x1 - halfWidth);
    const xDist = halfWidth + this.radius;
    if (cx > xDist) return false;
    const cy = Math.abs(this.coordinate.y + 5 - block.y1 - halfHeight);
    const yDist = halfHeight + this.radius;
    if (cy > yDist) return false;
    if (cx <= halfWidth || cy <= halfHeight) return true;
    const xCornerDist = cx - halfWidth;
    const yCornerDist = cy - halfHeight;
    const xCornerDistSq = xCornerDist * xCornerDist;
    const yCornerDistSq = yCornerDist * yCornerDist;
    const maxCornerDistSq = this.radius * this.radius;
    return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;
  }

  public startBall() {
    if (this.readyToGo) {
      this.readyToGo = false;
      this.go(90, this.ballSpeed);
    }
  }

  public updatePositionOnMovableLine() {
    this.coordinate.x =
      this.game.movableLine.x1 + (this.game.movableLine.width - 10) / 2;
    this.coordinate.y = this.game.movableLine.y1 - 11;
  }

  public go(degree: number, speed: number) {
    this.setAngle(degree);
    this.setSpeed(speed);
  }

  public stop() {
    this.speed = 0;
    this.updateRoute();
  }

  public setAngle(degree: number) {
    let degreeUpdate = degree;
    if (degreeUpdate === 0) {
      degreeUpdate = 5;
    } else if (degreeUpdate === 180) {
      degreeUpdate = 175;
    } else if (degreeUpdate > 360) {
      degreeUpdate -= 360;
    } else if (degreeUpdate < -360) {
      degreeUpdate += 360;
    }
    this.angle = degreeUpdate;
    this.updateRoute();
  }

  public setSpeed(speed: number) {
    this.speed = speed;
    this.updateRoute();
  }

  public updateRoute() {
    this.route.x = this.speed * Math.cos((Math.PI * this.angle) / 180);
    this.route.y = this.speed * Math.sin((Math.PI * this.angle) / 180) * -1;
  }

  public reset() {
    this.updatePositionOnMovableLine();
    this.readyToGo = true;
    this.stop();
    this.game.movableLine.width = 75;
  }

  public resetFall() {
    this.game.setting.live--;
    this.reset();
  }
}
