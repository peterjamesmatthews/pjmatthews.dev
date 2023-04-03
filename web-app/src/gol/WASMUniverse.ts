import { Universe } from "@pjm/gol";
import FPS from "./FPS";
import UniverseInterface from "./Universe";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCC";
const DEAD_COLOR = "#FFF";
const ALIVE_COLOR = "#000";

const CELL = {
	ALIVE: 1,
	DEAD: 0,
} as const;

export default class WASMUniverse implements UniverseInterface {
	private canvas: HTMLCanvasElement;
	private cells: Uint8Array;
	private context: CanvasRenderingContext2D;
	private diffs: Uint32Array; // ? in WASM `diffs` is a Vec<usize>, is `Uint32Array` the right choice here?
	private height: number;
	private width: number;
	private universe: Universe;
	private requestId: number | null = null;
	private memory: WebAssembly.Memory;
	private fps: FPS | null;

	/**
	 * @param canvas The HTML `canvas` element for this universe to draw on.
	 * @param height The number of cells high this universe will contain (1 cell = 5px square).
	 * @param width The number of cells wide this universe will contain (1 cell = 5px square).
	 * @param memory The memory buffer returned from the WebAssembly module's initialization.
	 */
	constructor(
		canvas: HTMLCanvasElement,
		height: number,
		width: number,
		memory: WebAssembly.Memory,
		fpsDiv?: HTMLDivElement
	) {
		this.canvas = canvas;
		canvas.style.backgroundColor = GRID_COLOR;
		this.canvas.height = (CELL_SIZE + 1) * height + 1;
		this.canvas.width = (CELL_SIZE + 1) * width + 1;
		this.height = height;
		this.width = width;
		this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
		this.fps = fpsDiv === undefined ? null : new FPS(fpsDiv);
		this.universe = Universe.new(height, width);
		this.memory = memory;
		this.cells = new Uint8Array(
			this.memory.buffer,
			this.universe.getCells(),
			height * width
		);
		this.diffs = new Uint32Array(
			this.memory.buffer,
			this.universe.getDiffs(),
			height * width
		);
		this.drawCells();
	}

	private coordsToIndex(row: number, col: number): number {
		return col * this.width + row;
	}

	// ? is this true for non-square universes?
	private indexToCoords(index: number): [number, number] {
		const row = index % this.width;
		return [row, (index - row) / this.width];
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
		for (let row = 0; row < this.height; row++) {
			for (let col = 0; col < this.width; col++) {
				this.context.fillStyle =
					this.cells[this.coordsToIndex(row, col)] === CELL.ALIVE
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
	}

	private drawDiffs(diffs: number) {
		for (let i = 0; i < diffs; i++) {
			const iCell = this.diffs[i];
			this.context.fillStyle =
				this.cells[iCell] === CELL.ALIVE ? ALIVE_COLOR : DEAD_COLOR;

			// convert the cell index to its row and coordinates
			const [row, col] = this.indexToCoords(iCell);
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
		this.drawDiffs(this.universe.tick());
		this.requestId = requestAnimationFrame(() => this.play());
	}

	public pause() {
		if (this.requestId === null) return;
		cancelAnimationFrame(this.requestId);
		this.requestId = null;
	}
}
