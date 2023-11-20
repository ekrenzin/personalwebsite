import { redirect } from '@sveltejs/kit';

export async function load({ params: { slug: $slug }, fetch }) {
    //returns the md file from the blog folder based on the slug
    //if the slug is not found, it redirects to the blog page
    //get the slug from the route
    const slug = $slug;
    try {
        const prefix = slug.split('_')[0];
        //the suffix is everything combined after the prefix
        const suffix = slug.split('_').slice(1).join('_');
        const response = await fetch(`/api/writing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prefix, suffix })
        });

        const data = await response.json();
        data.contentType = prefix;
        
        //const {post,nextPost, previousPost, currentPost} = data;

        return data
    } catch (error) {
        console.log(error)
        return redirect(302, '/writing');
    }

}