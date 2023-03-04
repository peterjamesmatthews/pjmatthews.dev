export default interface Universe {
  /**
   * Starts this universe.
   *
   * Each call will process and render the next iteration of this universe, then request the browser
   * to continue rendering it via:
   *
   * [`requestAnimationFrame(this.play)`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
   */
  play(): void;

  /**
   * Stops this universe.
   *
   * Cancels any request to the browser to keep processing this universe via:
   *
   * [`cancelAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame)
   */
  pause(): void;
}
