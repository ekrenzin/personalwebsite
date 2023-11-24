import { ELEVEN_LABS_API_KEY } from '$env/static/private';

/** 
 * @type {import('./$types').RequestHandler} 
 */
export async function POST({ request }) {
    try {
        const { message } = await request.json();
        const voice_id = "5pxMrnjiJ6kWFQJZ6udH"
        const model_id = "eleven_monolingual_v1"
        const requestBody = {
            model_id: model_id, 
            text: message,
            voice_settings: {
              similarity_boost: 1,
              stability: 0.7,
              style: 1,
              use_speaker_boost: true
            }
          };
          

        // Prepare API request options
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': ELEVEN_LABS_API_KEY // Use the API key securely
            },
            body: JSON.stringify(requestBody)
        };


        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, options)
       
        // Check if the response is okay
        if (!res.ok) {
            throw new Error(`API responded with status: ${res.status}`);
        }

        return res
    } catch (err) {
        // Handle any errors
        return {
            status: 500,
            body: { error: err.message }
        };
    }
}
