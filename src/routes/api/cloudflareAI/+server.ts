import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch }) {
   
    // Endpoint URL of the Cloudflare worker
    const workerUrl = 'https://workers-ai.eankrenzin.workers.dev';
  
    try {
        const body = JSON.stringify(await request.json())
        // Sending request to the Cloudflare worker
        const workerResponse = await fetch(workerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });

        // Check if the request was successful
        if (!workerResponse.ok) {
            throw new Error(`Error from Cloudflare worker: ${workerResponse.status}`);
        }

        // Getting the response from the worker
        const workerData = await workerResponse.json();

        // Returning the response back to the client
        return json({
            output: workerData,
        });
    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        return json({ output: error.message }, { status: 500 });
    }
}