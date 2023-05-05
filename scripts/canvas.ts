export default class Canvas {
  public context: CanvasRenderingContext2D;

  public element: HTMLCanvasElement;

  constructor(width: number, height: number) {
    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d") as CanvasRenderingContext2D;
    this.element.width = width;
    this.element.height = height;
    document.getElementById("game")!.append(this.element);
  }

  public get getCanvas() {
    return this.element;
  }

  public drawCircle(x: number, y: number, radius: number, color: string) {
    this.context.beginPath();
    this.context.arc(x + radius, y + radius, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = color;
    this.context.fill();
  }

  public drawTriangle(
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string
  ) {
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.fillStyle = color;
    this.context.fill();
  }

  public drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    width: number,
    color: string
  ) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.lineWidth = width;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  public drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.context.beginPath();
    this.context.moveTo(x, y + height / 2);
    this.context.lineTo(x + width, y + height / 2);
    this.context.lineWidth = height;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  public drawText(
    text: string,
    color: string,
    font: string,
    x: number,
    y: number
  ) {
    this.context.fillStyle = color;
    this.context.font = font;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(text, x, y);
  }

  public clearCanvas() {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  }
}
