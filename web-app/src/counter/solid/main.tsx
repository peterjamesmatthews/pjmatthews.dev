import { createSignal } from "solid-js";
import { render } from "solid-js/web";

function Counter() {
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

const app = document.getElementById("app");
if (app !== null) render(() => <Counter />, app);
