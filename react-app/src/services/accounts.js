import axios from "axios";

const API = "http://127.0.0.1:5001";

export async function getAccounts(token){

    const response = await axios.get(

        `${API}/accounts`,

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );

    return response.data;

}

export async function connectDemoAccount(token){

    const response = await axios.post(

        `${API}/accounts/demo-connect`,

        {},

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );

    return response.data;

}