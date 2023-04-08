import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { z } from "zod";

// created for each request
const createContext = () => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const tRPC = initTRPC.context<Context>().create();
const router = tRPC.router({
	/**
	 * @param {number} count - The current count.
	 * @returns {number} The new count.
	 */
	count: tRPC.procedure
		.input(z.object({ count: z.number().finite() }))
		.query(async (request) => {
			const { count } = request.input;
			// wait 1.5 seconds before returning to simulate a long-running task
			await new Promise((resolve) => setTimeout(resolve, 1.5e3));
			return count + 1;
		}),
});

const app = express();

if (process.env.NODE_ENV !== "production") app.use(cors({ origin: "*" }));

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router,
		createContext,
	})
);

app.listen(3000, () => console.log("Listening on port 3000"));

export type AppRouter = typeof router;
