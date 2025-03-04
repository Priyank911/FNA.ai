import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [expiryTime, setExpiryTime] = useState(localStorage.getItem('expiryTime') || null);
    const navigate = useNavigate();
    const LOGOUT_AFTER_MS = 60 * 60 * 1000 //1 hour
    const setTime = () => {
        let expiry = new Date().getTime() + LOGOUT_AFTER_MS
        setExpiryTime(expiry)
        localStorage.setItem('expiryTime', expiry)
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const storedExpiryTime = localStorage.getItem('expiryTime');

        if (storedToken && storedExpiryTime) {
            const currentTime = new Date().getTime();
            if (currentTime < storedExpiryTime) {
                setToken(storedToken);
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error("Error parsing user from localStorage:", error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } else {
                //Token has expired
                logout();
                navigate('/login');

            }
        }
    }, []);

    useEffect(() => {

        const logoutAfterInactivity = () => {
            if (user) {
                const expiry = localStorage.getItem('expiryTime')
                let parsedExpiry = JSON.parse(expiry)
                let now = new Date().getTime();

                if (now >= parsedExpiry) {
                    logout();
                    navigate('/login');
                } else {
                    setTimeout(() => {
                        logout()
                        navigate('/login')
                    }, parsedExpiry - now)
                }

            }

        }
        logoutAfterInactivity()
    }, [user])

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/login', { // Replace with your actual login API endpoint
                username: email,
                password: password,
            });
            if (response.status === 200) {
                const token = response.data.token;
                setToken(token);
                localStorage.setItem('token', token)
            }
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data)); // Store the user data as JSON
            setTime()

        } catch (error) {
            console.error("Login failed:", error);
            throw new Error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, username, dateOfBirth) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/register', { // Replace with your actual register API endpoint
                username: username,
                password: password,
                email: email,
                dateOfBirth: dateOfBirth
            });
            if (response.status === 201) {
                const data = response.data;
                console.log("User register:", data);
            }
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data)); // Store the user data as JSON
            setTime()

        } catch (error) {
            console.error("Registration failed:", error);
            throw new Error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setExpiryTime(null)
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Remove the user from localStorage
        localStorage.removeItem('expiryTime');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};