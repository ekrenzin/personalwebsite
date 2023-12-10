import { postWorkerData, getWorkerData } from '$lib/utils/Workers.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch }) {
    const workerUrl = 'https://workers-ai.eankrenzin.workers.dev';
    const data = await postWorkerData(workerUrl, { request, fetch });
    return data;
}

export async function GET({ request, fetch }) {
    //extract the page and limit from the request body and the create a url encoded string
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const page = params.get('page');
    const limit = params.get('limit');
    const workerUrl = `https://workers-ai.eankrenzin.workers.dev?page=${page}&limit=${limit}`;
    const data = await getWorkerData(workerUrl, { request, fetch });
    return data;
}