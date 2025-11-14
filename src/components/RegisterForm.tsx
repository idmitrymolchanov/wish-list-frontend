import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/auth";

export default function RegisterForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post<string>(`${API_BASE}/register`, {
                login,
                password,
            });

            localStorage.setItem("token", response.data);
            localStorage.setItem("login", login);

            navigate("/items/" + login);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data || "Ошибка при регистрации");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto", padding: "2rem", border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>Регистрация</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" style={{ padding: "0.5rem 1rem" }}>Зарегистрироваться</button>
                <h3>НЕ ВВОДИТЕ РЕАЛЬНЫЕ ПАРОЛИ</h3>
                <h4>ключ шифрования пока не спрятан</h4>
            </form>
        </div>
    );
}
