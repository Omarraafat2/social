

import axios from 'axios';

export default async function getMyPosts(id) {
    const headers = {
        token: localStorage.getItem("token"),
    };

    try {
        const response = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Re-throw the error to handle it further up the call stack if needed
    }
}

