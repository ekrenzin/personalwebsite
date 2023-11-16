import { json } from '@sveltejs/kit';


export async function postWorkerData(workerUrl, { request, fetch }) {
    try {
        // Convert the request body to JSON
        const body = JSON.stringify(await request.json());
        console.log(body);

        // Sending request to the Cloudflare worker
        const workerResponse = await fetch(workerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
