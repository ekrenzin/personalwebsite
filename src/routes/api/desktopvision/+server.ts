
interface ctx {
    request: Request;
}

export async function GET(context: ctx) {
    return new Response(JSON.stringify({ id: "XmPCklhl8U6SL2fY3jQw", key: "95cf3089-d886-4a1c-883d-b24d9c6f75a6" }))
}