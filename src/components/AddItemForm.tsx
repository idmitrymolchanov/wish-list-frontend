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
        amount: 0.00,
        currency: "RUB",
        linkToSite: "",
        priority: 0,
    });

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
        };

        try {
            await api.createItem({ item });
            setForm({name: "", description: "", amount: 0.00, currency: "RUB", linkToSite: "", priority: 0});
            onItemAdded();
        } catch (err) {
            console.error("Ошибка при добавлении предмета:", err);
            setError("Не удалось добавить предмет. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="app-form">
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="item name"
                required
                className="app-input"
            />
            <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="description"
                className="app-input"
            />
            <input
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="amount"
                type="number"
                className="app-input"
            />
            <input
                name="currency"
                value={form.currency}
                onChange={handleChange}
                placeholder="currency"
                className="app-input"
            />
            <input
                name="linkToSite"
                value={form.linkToSite}
                onChange={handleChange}
                placeholder="item link"
                className="app-input"
            />

            <div className="form-group">
                <label htmlFor="priority">Priority:  </label>
                <input
                    id="priority"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    placeholder="0 - 10"
                    className="app-input"
                    type="number"
                    min={0}
                    max={10}
                />
            </div>

            <button type="submit" disabled={loading} className="app-button-status-filter">
                {loading ? "Saving..." : "Save"}
            </button>
            {error && <p style={{color: "red"}}>{error}</p>}
        </form>
    );
}
