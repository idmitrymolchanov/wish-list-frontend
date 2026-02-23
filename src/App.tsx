import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate, useParams} from "react-router-dom";
import type {GetItems200Response, ItemBaseInfo, SortField} from "./api/models";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import {ItemDetailPage} from "./components/ItemDetailForm.tsx";
import RegisterForm from "./components/RegisterForm.tsx";
import LoginForm from "./components/LoginForm.tsx";
import ProjectInfoPage from "./components/ProjectInfoPage.tsx";
import {ItemEditPage} from "./components/EditItemForm.tsx";

import { api } from "./api/client";

function WishListPage() {
    const {currentLogin} = useParams<{ currentLogin: string }>();
    const navigate = useNavigate();

    const [items, setItems] = useState<ItemBaseInfo[]>([]);
    const [status, setStatus] = useState<string | null>(null);
    const [sort, setSort] = useState<SortField | undefined>(undefined);

    const [login, setLogin] = useState<string | null>(
        localStorage.getItem("login")
    );

    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem("token"))
    );

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedLogin = localStorage.getItem("login");

        setIsAuthenticated(Boolean(token));
        setLogin(storedLogin);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("login");

        setIsAuthenticated(false);
        setLogin(null);
    };

    const loadItems = async (status?: string | null, loginLocal?: string | null, sort?: SortField | undefined) => {
        console.log(loginLocal)
        try {
            const response: GetItems200Response = await api.getItems({
                userLogin: currentLogin ?? "undefined",
                statusCode: status ?? "OPEN",
                showReservedStatus: login != currentLogin && isAuthenticated,
                sortField: sort
            });
            setItems(response.list ?? []);
        } catch (err) {
            console.error("Ошибка при загрузке предметов:", err);
        }
    };

    useEffect(() => {
        if (!login) {
            void loadItems(status);
        } else {
            void loadItems(status, login);
        }
    }, [status, login]);

    useEffect(() => {
        void loadItems(status);
    }, [status]);

    const handleItemClick = (id: string) => {
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

    const handleHome = () => {
        navigate(`/items/${login}`);
    };

    return (
        <div style={{maxWidth: 600, margin: "0 auto", padding: "2rem"}}>
            <div className="page-container">
                <h1>Super WishList</h1>

                {isAuthenticated && (
                    <div className="greeting">
                        <h3>Welcome, {login}!</h3>
                    </div>
                )}

                <div className="header-actions">
                    <button onClick={handleInfoPage} className="app-button">
                        ABOUT ⓘ
                    </button>

                    {isAuthenticated && (
                        <button onClick={() => {
                            void handleHome()
                            void loadItems("OPEN", login);
                        }} className="app-button">
                            HOME 合
                        </button>
                    )}

                    {isAuthenticated && (
                        <button onClick={handleLogout} className="app-button danger">
                            LOGOUT ↩
                        </button>
                    )}

                    {!isAuthenticated && (
                        <button onClick={handleLogin} className="app-button">
                            LOGIN ↪
                        </button>
                    )}

                    {!isAuthenticated && (
                        <button onClick={handleRegistration} className="app-button">
                            REGISTER ↪
                        </button>
                    )}
                </div>

                {/* Кнопка доступна только авторизованным */}
                {isAuthenticated && currentLogin == login && (
                    <button
                        onClick={() => navigate("/add")} className="app-button-add-item">
                        ADD NEW ITEM
                    </button>
                )}

                {/* Кнопки фильтрации */}
                <div className="status-filter-actions">
                    {["OPEN", "COMPLETED", "CANCELED"].map((s) => (
                        <button
                            key={s}
                            onClick={() => {
                                setStatus(s);
                                void loadItems(s);
                            }}
                            className="app-button-status-filter"
                        >
                            {s === "OPEN" && "Open"}
                            {s === "COMPLETED" && "Completed"}
                            {s === "CANCELED" && "Canceled"}
                        </button>
                    ))}
                </div>

                <div className="sort-container">
                    <select
                        value={sort ?? ""}
                        onChange={(e) => {
                            const value = e.target.value as SortField | undefined;
                            setSort(value);
                            void loadItems(status, login, value);
                        }}
                        className="app-input full-width"
                    >
                        <option value="CREATE_DATE">Sort by date</option>
                        <option value="PRIORITY">Sort by priority</option>
                        <option value="AMOUNT">Sort by amount</option>
                    </select>
                </div>

                <ItemList items={items} onItemClick={handleItemClick}/>
            </div>
        </div>
    );
}

function AddItemPage() {
    const navigate = useNavigate();

    const [login, setLogin] = useState<string | null>(
        localStorage.getItem("login")
    );

    useEffect(() => {
        const storedLogin = localStorage.getItem("login");
        setLogin(storedLogin);
    }, []);

    const handleItemAdded = () => {
        navigate("/items/" + login);
    };

    return (
        <div className="page-container">
            <h1>Add new item</h1>
            <AddItemForm onItemAdded={handleItemAdded} api={api}/>
            <div className="status-filter-actions">
                <button onClick={() => navigate("/items/" + login)} className="app-button">
                    CANCEL
                </button>
            </div>
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
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    {/*<Route path="/" element={<WishListPage/>}/>*/}
                    <Route path="/add" element={<AddItemPage/>}/>
                    <Route path="/item/:id" element={<ItemDetailPage/>}/>
                    <Route path="/items/:currentLogin" element={<WishListPage/>}/>
                    <Route path="/info" element={<ProjectInfoPage/>}/>
                    <Route path="/item/:id/edit" element={<ItemEditPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}
