/**
 * The `<span>` element that displays the count.
 */
const span = <HTMLSpanElement>document.getElementById("count");

/**
 * The value of the counter.
 */
let count = Number.parseInt(span.textContent ?? "0");

/**
 * A web worker that will calculate the next count when messaged the current count.
 *
 * ---
 * <br/>
 *
 * ```js
 * counter.postMessage(4);
 * // ...
 * counter.addEventListener("message", ({ data }) => {
 * 	console.log(data); // prints 5
 * });
 * ```
 */
const counter = new Worker(new URL("./worker.ts", import.meta.url));

/**
 * The `<button>` element that triggers a count.
 */
const button = <HTMLButtonElement>document.getElementById("counter");

button.addEventListener("click", () => {
	button.textContent = "Counting...";
	button.disabled = true;
	counter.postMessage(count);
});

counter.addEventListener("message", ({ data }) => {
	span.textContent = count = data;
	button.textContent = "Count";
	button.disabled = false;
});
