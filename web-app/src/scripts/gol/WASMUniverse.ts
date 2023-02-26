import { Universe } from "@rsw/gol";
import FPS from "../FPS";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCC";
const DEAD_COLOR = "#FFF";
const ALIVE_COLOR = "#000";

const CELL = {
  ALIVE: 1,
  DEAD: 0,
} as const;

export default class WASMUniverse {
  private canvas: HTMLCanvasElement;
  private cells: Uint8Array;
  private context: CanvasRenderingContext2D;
  private height: number;
  private width: number;
  private universe: Universe;
  private animationId: number;
  private memory: WebAssembly.Memory;
  private fps?: FPS;

  constructor(
    canvas: HTMLCanvasElement,
    height: number,
    width: number,
    memory: WebAssembly.Memory,
    fpsId?: string
  ) {
    this.canvas = canvas;
    this.canvas.height = (CELL_SIZE + 1) * height + 1;
    this.canvas.width = (CELL_SIZE + 1) * width + 1;
    this.height = height;
    this.width = width;
    this.context = canvas.getContext("2d");
    this.fps = fpsId === undefined ? null : new FPS(fpsId);
    this.universe = Universe.new(height, width);
    this.memory = memory;
    this.cells = new Uint8Array(
      this.memory.buffer,
      this.universe.getCells(),
      height * width
    );
    this.drawGrid();
    this.drawCells();
  }

  private getIndex(row: number, col: number): number {
    return row * this.width + col;
  }

  private drawGrid() {
    this.context.beginPath();
    this.context.strokeStyle = GRID_COLOR;
    for (let col = 0; col <= this.width; col++) {
      this.context.moveTo(col * (CELL_SIZE + 1) + 1, 0);
      this.context.lineTo(
        col * (CELL_SIZE + 1) + 1,
        (CELL_SIZE + 1) * this.height + 1
      );
    }
    for (let row = 0; row <= this.height; row++) {
      this.context.moveTo(0, row * (CELL_SIZE + 1) + 1);
      this.context.lineTo(
        (CELL_SIZE + 1) * this.width + 1,
        row * (CELL_SIZE + 1) + 1
      );
    }
    this.context.stroke();
  }

  private drawCells() {
    this.context.beginPath();
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.context.fillStyle =
          this.cells[this.getIndex(row, col)] === CELL.ALIVE
            ? ALIVE_COLOR
            : DEAD_COLOR;
        this.context.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }
    this.context.stroke();
  }

  public play() {
    if (this.fps !== null) this.fps.render();
    this.universe.tick();
    this.drawGrid();
    this.drawCells();
    this.animationId = requestAnimationFrame(() => this.play());
  }

  public pause() {
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }
}
