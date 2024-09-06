/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import {Context, Hono} from "hono";
import { cors } from "hono/cors";
import { verifyRequestOrigin } from "oslo/request";
import './types.d.ts'

const devDomains = ["http://localhost:5173", "http://localhost:8787"];
const prodDomains = ["mysite.com", "mysite.pages.dev"];

const app = new Hono();

// MIDDLEWARE
// ----------

// Options handler for preflight requests
app.options('*', async (c) => {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Origin': c.req.header('Origin') as string,
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': '86400',
			'Access-Control-Allow-Credentials': 'true',
		},
	});
});

// CORS policy
app.use('*', async (c: Context, next) => {
	const corsMiddleware = cors({
		origin: c.env.environment === "development" ? devDomains : prodDomains,
		credentials: true,
	})
	await corsMiddleware(c, next)
});

// Cross Site Request Forgery Protection (CSRF)
app.use('*', async (c: Context, next) => {
	// Only apply CSRF protection to non-GET requests.
	if (c.req.method === 'GET') {
		return next();
	}

	// Get the origin and host headers from the request.
	const originHeader = c.req.header('Origin'); // May need to use X-Forwarded Host instead
	const hostHeader = c.req.header('Host');

	// Allow requests from your frontend domain and subdomains.
	const allowedHosts = c.env.environment === "development" ? devDomains : prodDomains;

	// Verify the request origin against the allowed hosts.
	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, allowedHosts)) {
		// If the origin is invalid, return a 403 Forbidden response.
		return c.body(null, 403);
	}
	// If the origin is valid, continue to the next middleware.
	return next();
});

// ROUTES
// ------

app.all('*', (c: Context) => {
	console.log(c);
	return c.json( { message: `Hello From Worker. Running in ${c.env.environment} environment.` }, 200 );
});

// EXPORT APP
// ----------

export default app;
