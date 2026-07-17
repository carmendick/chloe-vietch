import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login: saveLogin } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function login() {

        try {

            const data = await loginUser(
                email,
                password
            );

            saveLogin(
                data.user,
                data.token
            );

            navigate("/dashboard");

        }

        catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Login failed."
            );

        }

    }

    return (

        <div className="login-page">

            <div className="login-box">

                <h1>CreatorDesk</h1>

                <p>
                    Creator Publishing Platform
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>
                        setPassword(e.target.value)
                    }
                />

                {error && (

                    <p
                        style={{
                            color:"red"
                        }}
                    >
                        {error}
                    </p>

                )}

                <button
                    onClick={login}
                >
                    Continue
                </button>

            </div>

        </div>

    );

}