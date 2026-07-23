import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const savedToken = localStorage.getItem("token");

        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {

            setToken(savedToken);

            setUser(JSON.parse(savedUser));

        }

        setLoading(false);

    }, []);

    function login(userData, jwtToken) {

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        localStorage.setItem(
            "token",
            jwtToken
        );

        setUser(userData);

        setToken(jwtToken);

    }

    function logout() {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);

    setToken(null);

    window.location.href = "/";

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}