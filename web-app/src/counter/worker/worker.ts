self.addEventListener("message", async ({ data: count }) => {
	// wait 1.5 seconds before returning to simulate a long-running task
	await new Promise((resolve) => setTimeout(resolve, 1.5e3));
	postMessage(count + 1);
});
