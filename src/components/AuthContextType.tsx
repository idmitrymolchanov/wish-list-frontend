import {createContext, useState} from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: string;
    loginUser: (token: string, login: string) => void;
    logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );
    const [login, setLogin] = useState(
        localStorage.getItem("login") || ""
    );

    const loginUser = (token: string, login: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("login", login);
        setIsAuthenticated(true);
        setLogin(login);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("login");
        setIsAuthenticated(false);
        setLogin("");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};