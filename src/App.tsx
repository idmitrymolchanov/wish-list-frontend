import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Configuration } from "./api";
import { ItemsApi } from "./api/apis/ItemsApi";
import type { GetItems200Response, ItemBaseInfo, Item } from "./api/models";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";

const api = new ItemsApi(new Configuration({ basePath: "http://localhost:8080" }));

function WishListPage() {
    const [items, setItems] = useState<ItemBaseInfo[]>([]);
    const navigate = useNavigate();

    const loadItems = async () => {
        try {
            const response: GetItems200Response = await api.getItems();
            setItems(response.list ?? []);
        } catch (err) {
            console.error("Ошибка при загрузке предметов:", err);
        }
    };

    useEffect(() => {
        void loadItems();
    }, []);

    const handleItemClick = (id: number) => {
        navigate(`/item/${id}`);
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
            <h1>Super Wish List haha</h1>
            <button onClick={() => navigate("/add")} style={{ marginBottom: "1rem" }}>
                Добавить новый предмет
            </button>
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

function ItemDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        const loadItem = async () => {
            try {
                const data = await api.getItemById({ id: String(id) });
                setItem(data);
            } catch (err) {
                console.error("Ошибка при загрузке деталей:", err);
            }
        };
        void loadItem();
    }, [id]);

    if (!item) return <p>Загрузка...</p>;

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
            <h1>Детали предмета</h1>
            {item.image && (
                <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "200px", objectFit: "cover", marginBottom: "1rem" }}
                />
            )}
            <p>
                <strong>{item.name}</strong>
            </p>
            <p>{item.description}</p>
            <p>
                {item.amount} {item.currency}
            </p>
            <p>Статус: {item.statusName}</p>
            <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
                Назад
            </button>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WishListPage />} />
                <Route path="/add" element={<AddItemPage />} />
                <Route path="/item/:id" element={<ItemDetailPage />} />
            </Routes>
        </Router>
    );
}
