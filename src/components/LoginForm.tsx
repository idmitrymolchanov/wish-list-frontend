import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const API_BASE = "http://94.158.218.136:8085/api/auth";
const API_BASE = "http://localhost:8085/api/auth";

export default function LoginForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post<string>(`${API_BASE}/login`, {
                login,
                password,
            });

            localStorage.setItem("token", response.data);
            localStorage.setItem("login", login);
            navigate("/items/" + login);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.code || "login error");
        }
    };

    return (
        <div className="page-container">
            <h1>LOG IN</h1>

            {error && <p className="form-error">{error}</p>}

            <div className="item-details">
                <form onSubmit={handleSubmit} className="app-form">
                    <label htmlFor="login">username</label>
                    <div className="form-group">
                        <input
                            id="login"
                            type="text"
                            placeholder="enter login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            className="app-input"
                        />
                    </div>
                    <label htmlFor="password">password</label>
                    <div className="form-group">
                        <input
                            id="password"
                            type="password"
                            placeholder="enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="app-input"
                        />
                    </div>
                    <button type="submit" className="app-button full-width">
                        ENTER
                    </button>
                </form>
            </div>
        </div>
    );
}
