import { useState } from "react";
import { ItemsApi, type Item, ItemStatus } from "../api";

interface Props {
    onItemAdded: () => void;
    api: ItemsApi;
}

export default function AddItemForm({ onItemAdded, api }: Props) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        amount: "0.00",
        currency: "RUB",
        linkToSite: "",
        priority: 0,
        image: ""
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file); // конвертируем в base64
            reader.onload = () => {
                setForm({ ...form, image: reader.result as string });
            };
        }
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const item: Item = {
            name: form.name,
            description: form.description,
            amount: form.amount,
            currency: form.currency,
            linkToSite: form.linkToSite,
            priority: form.priority,
            statusCode: ItemStatus.Open,
            reserved: false,
            image: form.image
        };

        try {
            await api.createItem({ item });
            setForm({name: "", description: "", amount: "0.00", currency: "RUB", linkToSite: "", priority: 0, image: ""});
            onItemAdded();
        } catch (err) {
            console.error("Ошибка при добавлении предмета:", err);
            setError("Не удалось добавить предмет. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Название"
                required
            />
            <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Описание"
            />
            <input
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Сумма"
                type="number"
            />
            <input
                name="currency"
                value={form.currency}
                onChange={handleChange}
                placeholder="Валюта"
            />
            <input
                name="linkToSite"
                value={form.linkToSite}
                onChange={handleChange}
                placeholder="ссылка на товар"
            />
            <input
                name="priority"
                value={form.priority}
                onChange={handleChange}
                placeholder="приоритет"
            />
            <input type="file" accept="image/*" onChange={handleFileChange}/>
            <button type="submit" disabled={loading}>
                {loading ? "Сохраняем..." : "Сохранить"}
            </button>
            {error && <p style={{color: "red"}}>{error}</p>}
        </form>
    );
}
