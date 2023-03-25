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
 * The `button` element that will trigger a counter.
 */
let counter = <HTMLButtonElement>document.getElementById("counter");

init().then(() => {
  counter.addEventListener(
    "click",
    () => (span.textContent = (count = calculateCount(count)).toString())
  );
});
