import type { AppRouter } from "@pjm/web-server/src/server";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

const tRPC = createTRPCProxyClient<AppRouter>({
	links: [
		loggerLink({ enabled: () => true }),
		httpBatchLink({
			url: "http://localhost:3000/trpc",
		}),
	],
});

/**
 * The `span` element that displays the count.
 */
const span = <HTMLSpanElement>document.getElementById("count");

/**
 * The value of the counter.
 */
let count = Number.parseInt(span.textContent ?? "0");
count = Number.isNaN(count) ? 0 : count;

/**
 * The `button` element that will trigger a count when clicked.
 */
const counter = <HTMLButtonElement>document.getElementById("counter");

counter.addEventListener("click", async () => {
	counter.disabled = true;
	counter.textContent = "Counting...";

	const newCount = await tRPC.count.query({ count });
	span.textContent = (count = newCount).toString();

	counter.disabled = false;
	counter.textContent = "Count";
});
