/**
 * The `span` element that displays the count.
 * @type {HTMLSpanElement}
 */
const span: HTMLSpanElement = <HTMLSpanElement>document.getElementById("count");

/**
 * The value of the counter.
 * @type {number}
 */
let count: number = Number.parseInt(span.textContent);

/**
 * The `button` element that increments the counter when clicked.
 * @type {HTMLButtonElement}
 */
const button: HTMLButtonElement = <HTMLButtonElement>(
  document.getElementById("counter")
);

// When the button is clicked, send count to the /count endpoint and update its value with the response
button.addEventListener("click", () => {
  button.disabled = true;
  button.textContent = "Counting...";
  fetch(`/counter/count?count=${count}`)
    .then((response) => response.json())
    .then((body) => (span.textContent = (count = body.count).toString()))
    .finally(() => {
      button.disabled = false;
      button.textContent = "Count";
    });
});
