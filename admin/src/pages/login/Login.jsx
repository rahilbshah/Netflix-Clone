import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function Login() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
  const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const {loading, dispatch } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post('/auth/login',credentials)
            if (res.data.isAdmin) {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                navigate("/")
            } else {
                dispatch({
                    type: "LOGIN_FAILURE",
                    payload: { message: "You are not allowed!" },
                });
            }
            
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
        }
    };

    return (
        <div className="login">
            <form className="loginForm">
                <input
                    type="text"
                    placeholder="Username"
                    className="loginInput"
                    onChange={handleChange}
                    id="username"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="loginInput"
                    onChange={handleChange}
                    id="password"
                />
                <button
                    className="loginButton"
                  onClick={handleLogin}
                  disabled={loading}
                >
                    Login
                </button>
            </form>
        </div>
    );
}