import init from "@pjm/gol";
import JSUniverse from "./JSUniverse";
import WASMUniverse from "./WASMUniverse";

init().then(async ({ memory }) => {
	const js = new JSUniverse(
		<HTMLCanvasElement>document.getElementById("gol-js"),
		64,
		64,
		<HTMLDivElement>document.getElementById("fps-js")
	);

	const wasm = new WASMUniverse(
		<HTMLCanvasElement>document.getElementById("gol-wasm"),
		64,
		64,
		memory,
		<HTMLDivElement>document.getElementById("fps-wasm")
	);

	const jsButton = <HTMLButtonElement>document.getElementById("play-pause-js");

	jsButton.addEventListener("click", () => {
		if (jsButton.textContent === "Play") {
			js.play();
			jsButton.textContent = "Pause";
		} else {
			js.pause();
			jsButton.textContent = "Play";
		}
	});

	const wasmButton = <HTMLButtonElement>(
		document.getElementById("play-pause-wasm")
	);

	wasmButton.addEventListener("click", () => {
		if (wasmButton.textContent === "Play") {
			wasm.play();
			wasmButton.textContent = "Pause";
		} else {
			js.pause();
			wasm.pause();
			wasmButton.textContent = "Play";
		}
	});
});
