import { postWorkerData } from '$lib/utils/Workers.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch }) {
    const workerUrl = 'https://workers-ai.eankrenzin.workers.dev';
    const data = await postWorkerData(workerUrl, { request, fetch });
    return data;
}