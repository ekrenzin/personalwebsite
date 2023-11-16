import { postWorkerData } from '$lib/utils/Workers.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch }) {
    const workerUrl = 'https://website-comments-db.eankrenzin.workers.dev';
    return await postWorkerData(workerUrl, { request, fetch });
}