import init from "@rsw/gol";
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

  const button = <HTMLButtonElement>document.getElementById("play-pause");

  button.addEventListener("click", () => {
    if (button.textContent === "Play") {
      js.play();
      wasm.play();
      button.textContent = "Pause";
    } else {
      js.pause();
      wasm.pause();
      button.textContent = "Play";
    }
  });
});
