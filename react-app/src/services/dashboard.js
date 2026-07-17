import axios from "axios";

const API = "http://127.0.0.1:5001";

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