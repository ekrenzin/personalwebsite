import { json } from '@sveltejs/kit';
import { EAN_API_KEY } from '$env/static/private';

export async function postWorkerData(workerUrl, { request, fetch }) {
    try {
        // Convert the request body to JSON
        const body = JSON.stringify(await request.json());

        // Sending request to the Cloudflare worker
        const workerResponse = await fetch(workerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': EAN_API_KEY,
            },
            body,
        });
        //get the text of the response
        // const workerResponseText = await workerResponse.text();
        
        // console.log(workerResponse.status, workerResponseText, workerUrl);

        // Check if the request was successful
        if (!workerResponse.ok) {
            throw new Error(`Error from Cloudflare worker: ${workerResponse.status}`);
        }

        // Getting the response from the worker and converting it to JSON
        const workerData = await workerResponse.json() || [];

        // Returning the response back to the client
        return json(workerData);
    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        console.error("Error fetching data:", error.message);
        return json({ output: error.message }, { status: 500 });
    }
}

/**
 * Fetches data from a Cloudflare worker using a GET request.
 * 
 * @param {string} workerUrl - The URL of the Cloudflare worker.
 * @param {{ fetch: Function }} param1 - An object containing the fetch function.
 * @returns {Promise<Response>} - The response from the worker, formatted as JSON.
 */
export async function getWorkerData(workerUrl, { fetch }) {
    try {
        // Sending a GET request to the Cloudflare worker
        const workerResponse = await fetch(workerUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': EAN_API_KEY,
            },
        });

        // Check if the request was successful
        if (!workerResponse.ok) {
            throw new Error(`Error from Cloudflare worker: ${workerResponse.status}`);
        }

        // Getting the response from the worker and converting it to JSON
        const workerData = await workerResponse.json() || [];

        // Returning the response back to the client
        return json(workerData);
    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        console.error("Error fetching data:", error.message);
        return json({ output: error.message }, { status: 500 });
    }
}

