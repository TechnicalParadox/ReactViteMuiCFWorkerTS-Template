export const isDev = import.meta.env.MODE === "development" ? true : false;

// For sending api requests to local development worker or production cloudflare worker
export const baseUrl = isDev ? "http://localhost:8787" : 'https://mycloudflareworker.workers.dev'; // TODO: Change to actual worker
