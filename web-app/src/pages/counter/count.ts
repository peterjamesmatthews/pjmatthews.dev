import { APIContext } from "astro";

/**
 * Handle a GET request.
 * @returns {Promise<Response>} - A response containing the incremented count, or an error response.
 */
export async function get({ url }: APIContext): Promise<Response> {
  // Wait for 1.5 seconds to simulate server delay.
  await new Promise((res) => setTimeout(res, 1500));

  // Extract the "count" query parameter from the request URL.
  const countParam = new URLSearchParams(url.search).get("count");

  // If the "count" parameter is missing, return a 400 Bad Request response.
  if (countParam === null) return new Response(null, { status: 400 });

  // Parse the "count" parameter as an integer.
  const count = Number.parseInt(countParam);

  // If the "count" parameter is not a valid integer, return a 400 Bad Request response.
  if (Number.isNaN(count)) return new Response(null, { status: 400 });

  // Increment the count and return a JSON response with the new count.
  return new Response(JSON.stringify({ count: count + 1 }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
