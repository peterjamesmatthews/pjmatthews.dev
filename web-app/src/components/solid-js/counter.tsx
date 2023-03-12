import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <p>
        Count: <span id="count">{count()}</span>
      </p>
      <button id="counter" onClick={() => setCount(count() + 1)}>
        Count
      </button>
    </div>
  );
}
