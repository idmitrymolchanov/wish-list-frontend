import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Configuration, type Item, ItemsApi } from "../api";

const api = new ItemsApi(new Configuration({ basePath: "http://94.158.218.136:8085" }));

const login = localStorage.getItem("login");
const isAuthenticated = Boolean(localStorage.getItem("token"));

export function ItemDetailPage() {
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
        <div
            style={{
                marginLeft: "2rem",
                maxWidth: 1000,

                margin: "2rem ",
                padding: "1rem",
                border: "1px solid #bbb",
                borderRadius: "10px",
                backgroundColor: "#fafafa",
                boxShadow: "3px 2px 6px rgba(0,0,0,0.05)",
            }}
        >
            {/* Заголовок и описание */}
            <div
                style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: item.reserved ? "#d9fdd3" : "#f0f0f0",
                }}
            >
                <h1 style={{margin: 0}}>{item.name}</h1>
                {item.description && (
                    <h3 style={{marginTop: "0.5rem", fontWeight: 400}}>
                        {item.description}
                    </h3>
                )}
            </div>

            {/* Изображение */}
            {item.image && (
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "1rem",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "0.5rem",
                        backgroundColor: "#fff",
                    }}
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{
                            width: "100%",
                            maxHeight: "300px",
                            objectFit: "cover",
                            borderRadius: "6px",
                        }}
                    />
                </div>
            )}

            {/* Детали */}
            <div
                style={{
                    padding: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <p>Стоимость: {item.amount} {item.currency}</p>
                {item.linkToSite && (
                    <p>
                        Ссылка на товар:{" "}
                        <a
                            href={item.linkToSite}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.linkToSite}
                        </a>
                    </p>
                )}
                <p>Приоритет: {item.priority}</p>
                <p>
                    <strong>Статус: {item.statusName}</strong>
                </p>
            </div>

            <button
                onClick={async () => {
                    if (!item?.id) return;
                    if(!isAuthenticated) {
                        alert("Нужно авторизоваться!");
                        return;
                    }
                    try {
                        await api.reserveItem({id: item.id, reserved: true});
                        alert("Предмет зарезервирован!");
                        setItem({...item, reserved: true});
                    } catch (err) {
                        console.error("Ошибка при резервировании:", err);
                    }
                }}
                style={{
                    marginTop: "1.5rem",
                    padding: "0.5rem 1rem",
                    border: "1px solid #bbb",
                    borderRadius: "6px",
                    backgroundColor: "#d9fdd3",
                    cursor: "pointer",
                    fontWeight: 500,
                }}
            >
                Зарезервировать
            </button>

            <br></br>

            <button
                onClick={async () => {
                    if (!item?.id) return;
                    if(!isAuthenticated) {
                        alert("Нужно авторизоваться!");
                        return;
                    }
                    if(!(item.userLogin == login)) {
                        alert("Лол, это же не твой товар! Нельзя");
                        return;
                    }
                    try {
                        await api.setItemStatus({id: item.id, statusCode: "COMPLETED"});
                        alert("Предмет выполнен!");
                        setItem({...item, reserved: true});
                    } catch (err) {
                        console.error("Ошибка при завершении:", err);
                    }
                }}
                style={{
                    marginTop: "1.5rem",
                    padding: "0.5rem 1rem",
                    border: "1px solid #bbb",
                    borderRadius: "6px",
                    backgroundColor: "#f4cccc",
                    cursor: "pointer",
                    fontWeight: 500,
                }}
            >
                Завершить
            </button>

            <br></br>

            <button
                onClick={async () => {
                    if (!item?.id) return;
                    if(!isAuthenticated) {
                        alert("Нужно авторизоваться!");
                        return;
                    }
                    if(!(item.userLogin == login)) {
                        alert("Лол, это же не твой товар! Нельзя");
                        return;
                    }
                    try {
                        await api.setItemStatus({id: item.id, statusCode: "CANCELED"});
                        alert("Предмет отменен!");
                        setItem({...item, reserved: true});
                    } catch (err) {
                        console.error("Ошибка при отмене:", err);
                    }
                }}
                style={{
                    marginTop: "1.5rem",
                    padding: "0.5rem 1rem",
                    border: "1px solid #bbb",
                    borderRadius: "6px",
                    backgroundColor: "#e6f3fe",
                    cursor: "pointer",
                    fontWeight: 500,
                }}
            >
                Отменить
            </button>

            <br></br>

            <button
                onClick={() => navigate(-1)}
                style={{
                    marginTop: "1.5rem",
                    padding: "0.5rem 1rem",
                    border: "1px solid #bbb",
                    borderRadius: "6px",
                    backgroundColor: "#eee",
                    cursor: "pointer",
                    // color: "#6bff52",
                    fontWeight: 500,
                }}
            >
                ← Назад
            </button>
        </div>
    );
}
