/**
 * The `span` element that displays the count.
 */
const span = <HTMLSpanElement>document.getElementById("count");

/**
 * The value of the counter.
 */
let count = Number.parseInt(span.textContent ?? "0");
count = Number.isNaN(count) ? 0 : count;

const jsButton = <HTMLButtonElement>document.getElementById("counter");

// When the button is clicked, increment count and put it's new value into span.
jsButton.addEventListener(
	"click",
	() => (span.textContent = (++count).toString())
);
