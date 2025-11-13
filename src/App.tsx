import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Configuration } from "./api";
import { ItemsApi } from "./api/apis/ItemsApi";
import type { GetItems200Response, ItemBaseInfo, Item } from "./api/models";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import {ItemDetailPage} from "./components/ItemDetailForm.tsx";

const api = new ItemsApi(new Configuration({ basePath: "http://localhost:8080" }));

function WishListPage() {
    const [items, setItems] = useState<ItemBaseInfo[]>([]);
    const [status, setStatus] = useState<string | null>(null);
    const navigate = useNavigate();

    const loadItems = async (status?: string | null) => {
        try {
            const response: GetItems200Response = await api.getItems({
                statusCode: status ?? undefined,
            });
            setItems(response.list ?? []);
        } catch (err) {
            console.error("Ошибка при загрузке предметов:", err);
        }
    };

    useEffect(() => {
        void loadItems(status);
    }, [status]);

    const handleItemClick = (id: number) => {
        navigate(`/item/${id}`);
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
            <h1>Super Wish List haha</h1>

            <button onClick={() => navigate("/add")} style={{ marginBottom: "1rem" }}>
                Добавить новый предмет
            </button>

            {/* Кнопки фильтрации */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
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

            <ItemList items={items} onItemClick={handleItemClick} />
        </div>
    );
}


function AddItemPage() {
    const navigate = useNavigate();

    const handleItemAdded = () => {
        navigate("/");
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
            <h1>Добавить предмет</h1>
            <AddItemForm onItemAdded={handleItemAdded} api={api} />
            <button onClick={() => navigate("/")} style={{ marginTop: "1rem" }}>
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
                    <Route path="/" element={<WishListPage/>}/>
                    <Route path="/add" element={<AddItemPage/>}/>
                    <Route path="/item/:id" element={<ItemDetailPage/>}/>
                </Routes>
            </div>
        </Router>
);
}
