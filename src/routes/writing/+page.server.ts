// src/routes/blog/+page.js
export const load = async ({ fetch }) => {
	//if localhost otherwise redirect
	const response = await fetch(`/api/writing`);
	const posts = await response.json();
	return posts;
};