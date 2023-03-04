self.addEventListener("message", async ({ data }) => {
  await new Promise((res) => setTimeout(res, 1500));
  postMessage(data + 1);
});
