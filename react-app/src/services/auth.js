import axios from "axios";

export const API =
    import.meta.env.VITE_API_URL || "http://localhost:5001";

// const API = "http://127.0.0.1:5001, https://creatordesk-api.onrender.com";

export async function loginUser(email, password) {

    const response = await axios.post(
        `${API}/auth/login`,
        {
            email,
            password
        }
    );

    return response.data;
}