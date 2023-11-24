import { ELEVEN_LABS_API_KEY } from '$env/static/private';

/** 
 * @type {import('./$types').RequestHandler} 
 */
export async function POST({ request, platform }) {
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

        //the response body is a readable stream
        //we need to upload it to R2
        // try {
        //     console.log(platform)
        // const R2 = platform.env.R2;


        //     // Convert the response stream to a Buffer
        //     const buffer = await streamToBuffer(res.body);
            
        //     // Upload the buffer to R2
        //     const audioURL = await uploadToR2(buffer, R2);

        // } catch (error) {
        //     console.error('Error in readMessage:', error);
        // }

        return res
    } catch (err) {
        // Handle any errors
        return {
            status: 500,
            body: { error: err.message }
        };
    }
}


/**
 * Uploads an audio file to R2 storage and returns the URL.
 * 
 * @param {ArrayBuffer} audioData - The audio file data to upload.
 * @param {R2} bucket - The R2 bucket instance.
 * @returns {Promise<string>} - The URL of the uploaded audio file.
 */
async function uploadToR2(audioData, bucket) {
    const fileName = `recording-${Date.now()}.mp3`;
    let uploadResponse;
    let retries = 0;

    while (!uploadResponse && retries < 3) {
        try {
            // Attempt to upload the audio file
            uploadResponse = await bucket.put(fileName, audioData, {
                contentType: 'audio/mpeg', // Correct content type for MP3
                cacheControl: 'public, max-age=31536000', // Cache control settings
            });
        } catch (error) {
            console.error(`Error uploading audio: ${error.message}`);
            retries++;

            if (retries < 3) {
                console.log('Retrying upload...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                throw new Error(`Failed to upload after ${retries} attempts: ${error.message}`);
            }
        }
    }

    if (uploadResponse) {
        // Construct the URL of the uploaded audio file
        const audioURL = `https://<your-r2-url>/${fileName}`;
        console.log(`Audio uploaded to ${audioURL}`);
        return audioURL;
    } else {
        throw new Error('Failed to upload audio after retries');
    }
}


/**
 * Converts a readable stream into a Buffer.
 * 
 * @param {ReadableStream} stream - The readable stream to convert.
 * @returns {Promise<Buffer>} - A promise that resolves to a Buffer.
 */
async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}