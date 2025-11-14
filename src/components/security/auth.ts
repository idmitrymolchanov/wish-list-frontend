import axios from "axios";

const API_BASE = "http://localhost:8080/api/auth";

export async function login(login: string, password: string): Promise<string> {
    const response = await axios.post<string>(`${API_BASE}/login`, { login, password });
    return response.data; // JWT
}

export async function register(login: string, password: string): Promise<string> {
    const response = await axios.post<string>(`${API_BASE}/register`, { login, password });
    return response.data; // JWT
}
