import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Configuration } from "./api";
import { ItemsApi } from "./api/apis/ItemsApi";
import type { GetItems200Response, ItemBaseInfo, Item } from "./api/models";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import {ItemDetailPage} from "./components/ItemDetailForm.tsx";
import RegisterForm from "./components/RegisterForm.tsx";
import LoginForm from "./components/LoginForm.tsx";
import ProjectInfoPage from "./components/ProjectInfoPage.tsx";

const token = localStorage.getItem("token") || "";

const api = new ItemsApi(
    new Configuration({
        basePath: "http://localhost:8080",
        accessToken: async () => localStorage.getItem("token") || "",
    })
);

const login = localStorage.getItem("login");
const isAuthenticated = Boolean(localStorage.getItem("token"));

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    window.location.reload();
};

function WishListPage() {
    const { currentLogin } = useParams<{ currentLogin: string }>();
    const [items, setItems] = useState<ItemBaseInfo[]>([]);
    const [status, setStatus] = useState<string | null>(null);
    const navigate = useNavigate();

    const isAuthenticated = Boolean(localStorage.getItem("token"));

    const loadItems = async (status?: string | null, loginLocal?: string | null) => {
        try {
            const response: GetItems200Response = await api.getItems({
                userLogin: currentLogin ?? "undefined",
                statusCode: status ?? undefined,
            });
            setItems(response.list ?? []);
        } catch (err) {
            console.error("Ошибка при загрузке предметов:", err);
        }
    };

    useEffect(() => {
        if (!login){
            void loadItems(status);
        }
        else {
            void loadItems(status, login);
        }
    }, [status, login]);

    useEffect(() => {
        void loadItems(status);
    }, [status]);

    const handleItemClick = (id: number) => {
        navigate(`/item/${id}`);
    };

    const handleLogin = () => {
        navigate(`/login`);
    };

    const handleRegistration = () => {
        navigate(`/register`);
    };

    const handleInfoPage = () => {
        navigate(`/info`);
    };

    return (
        <div style={{maxWidth: 600, margin: "0 auto", padding: "2rem"}}>
            <h1>Super WishList</h1>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                {isAuthenticated && <div><h3>Здарова, {login}!</h3></div>}

                {isAuthenticated && (
                    <button onClick={handleLogout} style={{marginBottom: "1rem", backgroundColor: "#ffdada"}}
                    >Выйти</button>
                )}
            </div>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                {(
                    <button onClick={handleInfoPage} style={{marginBottom: "1rem", backgroundColor: "#d3f6ab"}}
                    >О проекте</button>
                )}
            </div>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                {!isAuthenticated && (
                    <button onClick={handleLogin} style={{marginBottom: "1rem", backgroundColor: "#ffdada"}}
                    >Войти</button>
                )}
                {!isAuthenticated && (
                    <button onClick={handleRegistration} style={{marginBottom: "1rem", backgroundColor: "#ffdada"}}
                    >Зарегистрироваться</button>
                )}
            </div>

            {/* Кнопка доступна только авторизованным */}
            {isAuthenticated && currentLogin == login && (
                <button
                    onClick={() => navigate("/add")}
                    style={{marginBottom: "1rem", backgroundColor: "#d3f6ab"}}
                >
                    Добавить новый предмет
                </button>
            )}

            {/* Кнопки фильтрации */}
            <div style={{display: "flex", gap: "1rem", marginBottom: "1rem"}}>
                {["OPEN", "COMPLETED", "CANCELED"].map((s) => (
                    <button
                        key={s}
                        onClick={() => {
                            setStatus(s);
                            void loadItems(s);
                        }}
                    >
                        {s === "OPEN" && "Открыто"}
                        {s === "COMPLETED" && "Завершено"}
                        {s === "CANCELED" && "Отменено"}
                    </button>
                ))}
            </div>

            <ItemList items={items} onItemClick={handleItemClick}/>
        </div>
    );
}

function AddItemPage() {
    const navigate = useNavigate();

    const handleItemAdded = () => {
        navigate("/items/" + login);
    };

    return (
        <div style={{maxWidth: 600, margin: "0 auto", padding: "2rem"}}>
            <h1>Добавить предмет</h1>
            <AddItemForm onItemAdded={handleItemAdded} api={api}/>
            <button onClick={() => navigate("/")} style={{marginTop: "1rem"}}>
                Отмена
            </button>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                    // marginRight:"25%",
                    // width: "50%",
                    // marginLeft: "25%",
                    // minHeight: "100vh",
                    paddingTop: "2rem",
                    // paddingLeft: "150%"
                }}
            >
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    {/*<Route path="/" element={<WishListPage/>}/>*/}
                    <Route path="/add" element={<AddItemPage/>}/>
                    <Route path="/item/:id" element={<ItemDetailPage/>}/>
                    <Route path="/items/:currentLogin" element={<WishListPage/>}/>
                    <Route path="/info" element={<ProjectInfoPage/>}/>
                </Routes>
            </div>
        </Router>
);
}
