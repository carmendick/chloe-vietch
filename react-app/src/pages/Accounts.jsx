import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { useAuth } from "../context/AuthContext";

import { getAccounts, connectDemoAccount } from "../services/accounts";


export default function Accounts() {

    const { token } = useAuth();

    const [accounts, setAccounts] = useState([]);

    async function loadAccounts() {

        try {

            const data = await getAccounts(token);

            setAccounts(data);

        }

        catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        if (token) {

            loadAccounts();

        }

    }, [token]);

    return (

        <DashboardLayout>

            <h1>

                Connected Accounts

            </h1>

            <button
                onClick={connectDemo}
                className="primary-button"
            >

                Connect Demo Account

            </button>

            <br />
            <br />

                        <br />

            {

                accounts.length === 0 ?

                (

                    <p>

                        No TikTok accounts connected.

                    </p>

                )

                :

                (

                    accounts.map(account => (

                        <div
                            key={account.id}
                            className="account-card"
                        >

                            <img
                                src={account.avatar}
                                alt=""
                                width="50"
                            />

                            <div>

                                <strong>

                                    {account.nickname}

                                </strong>

                            </div>

                        </div>

                    ))

                )

            }

        </DashboardLayout>

    );

}

async function connectDemo(){

    try{

        await connectDemoAccount(token);

        loadAccounts();

    }

    catch(err){

        console.error(err);

    }

}