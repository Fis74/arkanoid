import Line from "./line";

export default class Setting {
  public live: number;

  public level: number;

  public score: number;

  public LineArray: Line[];

  public blockArray: any[];

  public colors: string[];

  public inGame: boolean;

  public levels: { x: number; y: number; color: string }[][];

  constructor() {
    this.live = 3;

    this.level = 1;
    this.score = 0;
    this.LineArray = [];
    this.blockArray = [];
    this.inGame = false;
    this.colors = [
      "#edbf74",
      "#6eaf99",
      "#e68b86",
      "#f9a6c2",
      "#fed070",
      "#b26e47",
      "#88adb3",
      "#94f2f4",
      "#e8cfc8",
      "#d4a3a9",
      "#ecc3c1",
      "#edac8c",
      "#c9b4bb",
      "#f5deb2",
      "#c1cf94",
      "#e38c95",
      "#348f90",
      "#afebe1",
      "#5d97af",
      "#ffbfa1",
      "#e2895f",
      "#9daadf",
      "#ffabb8",
      "#bd84a4",
      "#9898bc",
      "#487ba6",
      "#adddcf",
      "#6eaf99",
      "#e7b74b",
      "#f2a557",
      "#cb7d8b",
      "#88c0e1",
      "#f0c4d5",
      "#f7c9b1",
      "#eab251",
      "#9f6b53",
    ];
    this.levels = [
      [
        { x: 100, y: 100, color: this.colors[1] },
        { x: 120, y: 100, color: this.colors[0] },
        { x: 140, y: 100, color: this.colors[2] },
        { x: 160, y: 100, color: this.colors[1] },
        { x: 180, y: 100, color: this.colors[0] },
        { x: 200, y: 100, color: this.colors[2] },
        { x: 220, y: 100, color: this.colors[1] },
        { x: 240, y: 100, color: this.colors[0] },
        { x: 260, y: 100, color: this.colors[2] },
        { x: 280, y: 100, color: this.colors[1] },
        { x: 300, y: 100, color: this.colors[0] },
      ],
      [
        { x: 120, y: 100, color: this.colors[0] },
        { x: 140, y: 100, color: this.colors[1] },
        { x: 160, y: 100, color: this.colors[0] },
        { x: 180, y: 100, color: this.colors[2] },
        { x: 200, y: 100, color: this.colors[1] },
        { x: 220, y: 100, color: this.colors[1] },
        { x: 240, y: 100, color: this.colors[2] },
        { x: 260, y: 100, color: this.colors[2] },
        { x: 280, y: 100, color: this.colors[1] },
        { x: 210, y: 210, color: this.colors[1] },
        { x: 210, y: 220, color: this.colors[0] },
        { x: 210, y: 230, color: this.colors[1] },
        { x: 210, y: 240, color: this.colors[0] },
        { x: 210, y: 250, color: this.colors[2] },
        { x: 210, y: 260, color: this.colors[1] },
        { x: 210, y: 270, color: this.colors[1] },
        { x: 210, y: 280, color: this.colors[2] },
        { x: 210, y: 290, color: this.colors[2] },
        { x: 210, y: 300, color: this.colors[1] },
        { x: 210, y: 310, color: this.colors[1] },
        { x: 210, y: 320, color: this.colors[0] },
        { x: 210, y: 330, color: this.colors[1] },
        { x: 210, y: 340, color: this.colors[0] },
        { x: 210, y: 350, color: this.colors[2] },
        { x: 210, y: 360, color: this.colors[1] },
        { x: 210, y: 370, color: this.colors[1] },
        { x: 210, y: 380, color: this.colors[2] },
        { x: 210, y: 390, color: this.colors[2] },
      ],
    ];
  }
}
