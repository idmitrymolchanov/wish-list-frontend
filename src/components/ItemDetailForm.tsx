import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Configuration, type Item, ItemsApi } from "../api";

const api = new ItemsApi(
    new Configuration({
        // basePath: "http://94.158.218.136:8085",
        basePath: "http://localhost:8085",
        accessToken: async () => localStorage.getItem("token") || "",
    })
);

export function ItemDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [item, setItem] = useState<Item | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [login, setLogin] = useState<string | null>(
        localStorage.getItem("login")
    );

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        Boolean(localStorage.getItem("token"))
    );

    useEffect(() => {
        const syncAuth = () => {
            const storedLogin = localStorage.getItem("login");
            setLogin(storedLogin);
            setIsAuthenticated(Boolean(localStorage.getItem("token")));
        };

        syncAuth();

        window.addEventListener("storage", syncAuth);
        return () => window.removeEventListener("storage", syncAuth);
    }, []);

    useEffect(() => {
        if (!id) return;

        const loadItem = async () => {
            try {
                const data = await api.getItemById({ id: String(id) });
                setItem(data);
            } catch (err) {
                console.error("item detail error:", err);
            }
        };

        void loadItem();
    }, [id]);

    useEffect(() => {
        if (!id) return;

        const loadImage = async () => {
            try {
                const blob = await api.getItemImage({ id: String(id) });

                if (blob && blob.size > 0) {
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                } else {
                    setImageUrl(null);
                }
            } catch (err) {
                console.warn("image loading error:", err);
                setImageUrl(null);
            }
        };

        void loadImage();
    }, [id]);


    if (!item) return <p>Loading...</p>;

    return (
        <div className="page-container">
            <h1 style={{margin: 0}}>{item.name}</h1>
            {item.description && (
                <h3 style={{marginTop: "0.5rem", fontWeight: 400}}>
                    {"description: " + item.description}
                </h3>
            )}

            <div className="item-details">
                <p>Amount: {item.amount} {item.currency}</p>
                {item.linkToSite && (
                    <p>
                        Item link:{" "}
                        <a
                            href={item.linkToSite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="app-link"
                        >
                            {item.linkToSite}
                        </a>
                    </p>
                )}
                <p>Priority: {item.priority}</p>
                <p>
                    <strong>Status: {item.statusCode}</strong>
                </p>
            </div>


            <div className="status-filter-actions">
                <button
                    onClick={async () => {
                        if (!item?.id) return;
                        if (!isAuthenticated) {
                            alert("Нужно авторизоваться!");
                            return;
                        }
                        try {
                            await api.reserveItem({id: item.id, reserved: true});
                            alert("the item reserved successfully!");
                            setItem({...item, reserved: true});
                        } catch (err) {
                            console.error("reserve error:", err);
                        }
                    }}
                    className="app-button-status-filter">
                    RESERVE
                </button>

                <button
                    onClick={async () => {
                        if (!item?.id) return;
                        if (!isAuthenticated) {
                            alert("Нужно авторизоваться!");
                            return;
                        }
                        try {
                            await api.reserveItem({id: item.id, reserved: false});
                            alert("the item's reservation cancelled successfully!");
                            setItem({...item, reserved: true});
                        } catch (err) {
                            console.error("reserve error:", err);
                        }
                    }}
                    className="app-button-status-filter">
                    RESET
                </button>

                {item.userLogin == login && (
                    <button
                        onClick={async () => {
                            if (!item?.id) return;
                            if (!isAuthenticated) {
                                alert("Нужно авторизоваться!");
                                return;
                            }
                            if (!(item.userLogin == login)) {
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
                        className="app-button-status-filter">
                        COMPLETE
                    </button>
                )}

                {item.userLogin == login && (
                    <button
                        onClick={async () => {
                            if (!item?.id) return;
                            if (!isAuthenticated) {
                                alert("Нужно авторизоваться!");
                                return;
                            }
                            if (!(item.userLogin == login)) {
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
                        className="app-button-status-filter">
                        CANCEL
                    </button>
                )}
            </div>

            <div className="image-upload-block">
                {item.userLogin == login && (
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input"
                        onChange={async (e) => {
                            if (!e.target.files?.length) return;
                            const file = e.target.files[0];

                            try {
                                await api.uploadItemImageRaw({
                                    id: item.id!,
                                    file: file,
                                    metadata: "{}"
                                });

                                alert("Изображение обновлено!");
                            } catch (err) {
                                console.error("Ошибка загрузки изображения:", err);
                            alert("Ошибка загрузки изображения: максимальный размер файла - 140KB");
                        }
                    }}
                />
                )}

                {/* Изображение */}
                {imageUrl && (
                    <div className="image-card">
                        <img
                            src={imageUrl}
                            alt={item.name}
                        />
                    </div>
                )}
            </div>

            <button
                onClick={() => navigate(-1)}
                className="app-button full-width">
                back ←
            </button>
        </div>

    );
}
