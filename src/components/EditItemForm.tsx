import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {type Item, type ItemUpdate} from "../api";
import { api } from "../api/client";

interface LocationState {
    item?: Item;
}
export function ItemEditPage() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const [item, setItem] = useState<Item | null>(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        amount: 0,
        currency: "",
        linkToSite: "",
        priority: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const state = location.state as LocationState;

        if (state?.item) {
            setItem(state.item);
        } else if (id) {
            api.getItemById({ id })
                .then(setItem)
                .catch((err) => {
                    console.error("Ошибка загрузки item:", err);
                    setError("Ошибка загрузки данных");
                });
        }
    }, [id, location.state]);

    // Заполняем форму после загрузки item
    useEffect(() => {
        if (item) {
            setForm({
                name: item.name || "",
                description: item.description || "",
                amount: Number(item.amount) || 0,
                currency: item.currency || "",
                linkToSite: item.linkToSite || "",
                priority: item.priority || 0,
            });
        }
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!item?.id) return;

        const itemUpdate: ItemUpdate = {
            name: form.name,
            description: form.description,
            amount: form.amount ?? 0,
            currency: form.currency,
            linkToSite: form.linkToSite,
            priority: form.priority?.toString(),
            reserved: false,
        };

        try {
            await api.patchItem({
                id: item.id,
                itemUpdate: itemUpdate
            });
            alert("Item saved successfully!");
            navigate(`/item/${item.id}`);
        } catch (err) {
            console.error("Ошибка при сохранении item:", err);
            setError("Ошибка при сохранении item");
        } finally {
            setLoading(false);
        }
    };

    if (!item) return <p>Loading...</p>;

    return (
        <div className="page-container">
            <h1>Edit item: {item.name}</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} className="app-form">
                <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="app-input"
                />
                <input
                    name="description"
                    type="text"
                    value={form.description}
                    placeholder="Description"
                    onChange={handleChange}
                    className="app-input"
                />
                <input
                    name="amount"
                    type="number"
                    value={form.amount}
                    placeholder="Amount"
                    onChange={handleChange}
                    className="app-input"
                />
                <input
                    name="currency"
                    type="text"
                    value={form.currency}
                    placeholder="Currency"
                    onChange={handleChange}
                    className="app-input"
                />
                <input
                    name="linkToSite"
                    type="text"
                    value={form.linkToSite}
                    placeholder="Link to site"
                    onChange={handleChange}
                    className="app-input"
                />
                <input
                    name="priority"
                    type="number"
                    value={form.priority}
                    placeholder="Priority"
                    onChange={handleChange}
                    className="app-input"
                />
                <button type="submit" className="app-button full-width" disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
    );
}
