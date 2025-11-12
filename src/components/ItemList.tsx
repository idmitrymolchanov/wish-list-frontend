import type {ItemBaseInfo} from "../api";

interface Props {
    items: ItemBaseInfo[];
    onItemClick: (id: string) => void; // колбек при клике на элемент
}

export default function ItemList({ items, onItemClick }: Props) {
    if (!items.length) return <p>Список пуст</p>;

    return (
        <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item) => (
                <li
                    key={item.id}
                    onClick={() => onItemClick(item.id!)}
                    style={{
                        marginBottom: "1rem",
                        padding: "1rem",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // чтобы эмодзи было справа
                        cursor: "pointer",
                        backgroundColor: item.reserved ? "#d9fdd3" : "white", // бледно-салатовый
                        position: "relative",
                        transition: "background-color 0.2s ease-in-out",
                    }}
                >
                    <div>
                        <strong>{item.name}</strong> — {item.amount}
                        <br />
                        <small>
                            {item.createDate
                                ? new Date(item.createDate).toLocaleDateString()
                                : ""}
                        </small>
                    </div>

                    {}
                    {item.reserved && (
                        <span
                            style={{
                                fontSize: "1.5rem",
                                marginLeft: "auto",
                                opacity: 0.8,
                            }}
                        >
                            reserved 💚
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}
