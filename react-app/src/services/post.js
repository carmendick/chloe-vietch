import axios from "axios";



export const API =
    import.meta.env.VITE_API_URL || "http://localhost:5001";
// const API = " https://creatordesk-api.onrender.com";

export async function createPost(token, post) {

    const response = await axios.post(

        `${API}/posts`,

        post,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

}

export async function getPosts(token) {

    const response = await axios.get(

        `${API}/posts`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

}

export async function uploadVideo(token, file) {

    const formData = new FormData();

    formData.append("video", file);

    const response = await axios.post(

        `${API}/posts/upload`,

        formData,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

}


export async function deletePost(token, id) {

    const response = await axios.delete(

        `${API}/posts/${id}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

}


export async function updatePost(
    token,
    id,
    caption
) {

    const response = await axios.put(

        `${API}/posts/${id}`,

        {
            caption
        },

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

}