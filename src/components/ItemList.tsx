import type { ItemBaseInfo } from "../api";

interface Props {
    items: ItemBaseInfo[];
    onItemClick: (id: string) => void;
}

export default function ItemList({ items, onItemClick }: Props) {
    if (!items.length) return <p>Список пуст</p>;

    return (
        <ul className="item-list">
            {items.map((item) => (
                <li
                    key={item.id}
                    onClick={() => onItemClick(item.id!)}
                    className={`item-card ${item.reserved ? "reserved" : ""}`}
                >
                    <div>
                        <strong>{item.name}</strong> — {item.amount} {item.currency}
                        <br />
                        <small>
                            {item.createDate
                                ? new Date(item.createDate).toLocaleDateString()
                                : ""}
                        </small>
                    </div>

                    {item.reserved ? (
                        <span className="item-status">
                            reserved 💚
                        </span>
                    ) : (
                        <span className="item-status">
                            {item.priorityName} 💛
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}
