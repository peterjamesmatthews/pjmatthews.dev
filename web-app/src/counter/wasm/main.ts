import init, { calculateCount } from "@pjm/counter";

/**
 * The `span` element that displays the count.
 */
const span = <HTMLSpanElement>document.getElementById("count");

/**
 * The value of the counter.
 */
let count = Number.parseInt(span.textContent ?? "0");

/**
 * The `button` element that will trigger a count when clicked.
 */
let counter = <HTMLButtonElement>document.getElementById("counter");

// Disable the button and change the text to "Loading..." until the WASM module is loaded.
counter.disabled = true;
counter.textContent = "Loading...";

init().then(() => {
	counter.addEventListener("click", () => {
		counter.disabled = true;
		counter.textContent = "Counting...";

		span.textContent = (count = calculateCount(count)).toString();

		counter.disabled = false;
		counter.textContent = "Count";
	});
	counter.textContent = "Count";
	counter.disabled = false;
});
