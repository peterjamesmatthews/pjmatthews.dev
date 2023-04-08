import FPS from "./FPS";
import Universe from "./Universe";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCC";
const DEAD_COLOR = "#FFF";
const ALIVE_COLOR = "#000";

const CELL = {
	ALIVE: 1,
	DEAD: 0,
} as const;

export default class JSUniverse implements Universe {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private diffs: Array<[number, number]>;
	private height: number;
	private width: number;
	private cells: Array<Array<number>>;
	private requestId: number | null = null;
	private fps: FPS | null;

	/*
	 * @param canvas The HTML `canvas` element for this universe to draw on.
	 * @param height The number of cells high this universe will contain (1 cell = 5px square).
	 * @param width The number of cells wide this universe will contain (1 cell = 5px square).
	 * @param fpsDiv _(optional)_ The HTML `div` element for this universe to render its frame-per-second to.
	 */
	constructor(
		canvas: HTMLCanvasElement,
		height: number,
		width: number,
		fpsDiv?: HTMLDivElement
	) {
		this.canvas = canvas;
		this.canvas.style.backgroundColor = GRID_COLOR;
		this.height = height;
		this.width = width;
		this.canvas.height = (CELL_SIZE + 1) * height + 1;
		this.canvas.width = (CELL_SIZE + 1) * width + 1;
		this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
		if (this.context === null) throw new Error("unable to get canvas context");
		this.cells = [];
		for (let row = 0; row < height; row++) {
			this.cells[row] = [];
			for (let col = 0; col < width; col++) {
				this.cells[row][col] =
					(col * width + row) % 2 === 0 || (col * width + row) % 7 === 0
						? CELL.ALIVE
						: CELL.DEAD;
			}
		}
		this.diffs = new Array(height * width).fill(0);
		this.fps = fpsDiv === undefined ? null : new FPS(fpsDiv);
		this.drawCells();
	}

	private drawCells() {
		this.context.beginPath();
		for (let row = 0; row < this.height; row++) {
			for (let col = 0; col < this.width; col++) {
				this.context.fillStyle =
					this.cells[row][col] === CELL.ALIVE ? ALIVE_COLOR : DEAD_COLOR;
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

	private countLiveNeighbors(row: number, col: number) {
		let count = 0;
		for (const deltaRow of [this.height - 1, 0, 1]) {
			for (const deltaCol of [this.width - 1, 0, 1]) {
				if (deltaRow === 0 && deltaCol === 0) continue;

				const neighborRow = (row + deltaRow) % this.height;
				const neighborCol = (col + deltaCol) % this.width;
				count += this.cells[neighborRow][neighborCol];
			}
		}
		return count;
	}

	private tick() {
		let diffs = 0;
		for (let row = 0; row < this.height; row++) {
			for (let col = 0; col < this.width; col++) {
				const neighbors = this.countLiveNeighbors(row, col);
				if (this.cells[row][col] === CELL.ALIVE) {
					if (!(neighbors === 2 || neighbors === 3))
						this.diffs[diffs++] = [row, col];
				} else {
					// assuming this.cells[row][col] === CELL.DEAD...
					if (neighbors === 3) this.diffs[diffs++] = [row, col];
				}
			}
		}
		for (let i = 0; i < diffs; i++) {
			const [row, col] = this.diffs[i];
			const newCell =
				this.cells[row][col] === CELL.ALIVE ? CELL.DEAD : CELL.ALIVE;

			this.cells[row][col] = newCell;
			// update canvas
			this.context.fillStyle =
				newCell === CELL.ALIVE ? ALIVE_COLOR : DEAD_COLOR;
			this.context.fillRect(
				col * (CELL_SIZE + 1) + 1,
				row * (CELL_SIZE + 1) + 1,
				CELL_SIZE,
				CELL_SIZE
			);
		}
	}

	public play() {
		if (this.fps !== null) this.fps.render();
		this.tick();
		this.requestId = requestAnimationFrame(() => this.play());
	}

	public pause() {
		if (this.requestId === null) return;
		cancelAnimationFrame(this.requestId);
		this.requestId = null;
	}
}
