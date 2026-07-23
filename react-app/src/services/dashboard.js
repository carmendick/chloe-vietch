import axios from "axios";


export const API =
    import.meta.env.VITE_API_URL || "http://localhost:5001";
// const API = "http://127.0.0.1:5001";

export async function getDashboardStats(token) {

    const response = await axios.get(

        `${API}/dashboard/stats`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

}