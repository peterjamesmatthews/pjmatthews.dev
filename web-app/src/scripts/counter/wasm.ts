import init, { calculateCount } from "@rsw/counter";

/**
 * The `span` element that displays the count.
 * @type {HTMLSpanElement}
 */
const span: HTMLSpanElement = document.getElementById("count");

/**
 * The value of the counter.
 * @type {number}
 */
let count: number = Number.parseInt(span.textContent);

init().then(() => {
  document
    .getElementById("counter")
    .addEventListener(
      "click",
      () => (span.textContent = (count = calculateCount(count)).toString())
    );
});
