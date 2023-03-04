export default class FPS {
  div: HTMLDivElement;
  frames: Array<number>;
  now: number;

  constructor(div: HTMLDivElement) {
    this.div = div;
    this.frames = [];
    this.now = performance.now();
  }

  render() {
    const now = performance.now();
    const delta = now - this.now;
    this.now = now;
    const fps = (1 / delta) * 1000;
    if (this.frames.push(fps) > 100) this.frames.shift();

    const { min, avg, max } = this.frames.reduce(
      (val, frame, i) => {
        val.avg += frame;
        val.min = Math.min(val.min, frame);
        val.max = Math.max(val.max, frame);
        if (i === this.frames.length - 1) val.avg /= this.frames.length;
        return val;
      },
      {
        min: Infinity,
        avg: 0,
        max: -Infinity,
      }
    );

    this.div.textContent = `
Frames per second (${this.frames.length} frame sample)
	 latest = ${Math.round(fps)}
	minimum = ${Math.round(min)}
	average = ${Math.round(avg)}
	maximum = ${Math.round(max)}
`.trim();
  }
}
