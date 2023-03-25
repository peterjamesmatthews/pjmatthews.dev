self.addEventListener("message", async ({ data: count }) => {
	await new Promise((res) => setTimeout(res, 1500));
	postMessage(count + 1);
});
