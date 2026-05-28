import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SenderSelector } from "../types/sender.selector.tsx";

export const Route = createFileRoute("/tth")({
  component: RouteComponent,
});

type Status = "Оформлен" | "Принят" | "Доставлен";

type Product = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type TTH = {
  id: number;
  number: string;
  date: string;
  sender: string;
  receiver: string;
  status: Status;
  products: Product[];
};

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

const today = new Date().toISOString().split("T")[0];

const API_URL = "http://localhost:3000/tth";

const emptyForm: TTH = {
  id: 0,
  number: "",
  date: today,
  sender: "",
  receiver: "",
  status: "Оформлен",
  products: [],
};

function RouteComponent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tthList, setTthList] = useState<TTH[]>([]);
  const [form, setForm] = useState<TTH>(emptyForm);
  const [sender, setSender] = useState<User | null>(null);

  const filtered = useMemo(() => {
    return tthList.filter((t) => {
      const q =
        t.number.toLowerCase().includes(search.toLowerCase()) ||
        t.sender.toLowerCase().includes(search.toLowerCase()) ||
        t.receiver.toLowerCase().includes(search.toLowerCase());

      const s = statusFilter ? t.status === statusFilter : true;

      return q && s;
    });
  }, [search, statusFilter, tthList]);

  const statusColor = (status: Status) => {
    switch (status) {
      case "Оформлен":
        return "#f59e0b";
      case "Принят":
        return "#3b82f6";
      case "Доставлен":
        return "#10b981";
    }
  };

  const saveTTH = async () => {
    if (!form.number.trim()) return alert("Введите номер");

    const payload = {
      number: form.number,
      dateCreated: form.date,
      senderName: sender ? `${sender.firstName} ${sender.lastName}` : form.sender,
      senderId: sender ? String(sender.id) : "1",
      recipientId: "1",
      recipientName: form.receiver,
      vehicleId: "1",
      vehicleBrandModel: "N/A",
      vehicleLicensePlate: "N/A",
      driverId: "1",
      driverFullName: "N/A",
      driverPassport: "N/A",
      items: form.products,
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    setTthList((prev) => [
      ...prev,
      {
        id: data.id,
        number: data.number,
        date: data.dateCreated,
        sender: payload.senderName,
        receiver: data.recipientName,
        status: "Оформлен",
        products: data.items || [],
      },
    ]);

    setForm(emptyForm);
    setSender(null);
  };

  const addProduct = () => {
    setForm((p) => ({
      ...p,
      products: [
        ...p.products,
        { id: Date.now(), name: "", quantity: 1, price: 0 },
      ],
    }));
  };

  const updateProduct = (
    id: number,
    field: keyof Product,
    value: string | number
  ) => {
    setForm((p) => ({
      ...p,
      products: p.products.map((x) =>
        x.id === id ? { ...x, [field]: value } : x
      ),
    }));
  };

  const removeProduct = (id: number) => {
    setForm((p) => ({
      ...p,
      products: p.products.filter((x) => x.id !== id),
    }));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>ТТН система</h1>

        <div style={styles.filters}>
          <input
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.input}
          >
            <option value="">Все статусы</option>
            <option value="Оформлен">Оформлен</option>
            <option value="Принят">Принят</option>
            <option value="Доставлен">Доставлен</option>
          </select>
        </div>

        <div style={styles.grid}>
          {filtered.map((t) => (
            <div key={t.id} style={styles.card}>
              <div style={styles.cardTop}>
                <b>#{t.number}</b>
                <span
                  style={{
                    ...styles.badge,
                    background: statusColor(t.status),
                  }}
                >
                  {t.status}
                </span>
              </div>

              <div style={styles.row}>
                <span>{t.date}</span>
              </div>

              <div style={styles.row}>
                <span>{t.sender}</span>
              </div>

              <div style={styles.row}>
                <span>{t.receiver}</span>
              </div>

              <button
                onClick={() => setForm(t)}
                style={styles.editBtn}
              >
                Редактировать
              </button>
            </div>
          ))}
        </div>

        <div style={styles.form}>
          <h2>Создание / редактирование</h2>

          <div style={styles.formGrid}>
            <input
              placeholder="Номер"
              value={form.number}
              onChange={(e) =>
                setForm({ ...form, number: e.target.value })
              }
              style={styles.input}
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              style={styles.input}
            />

            <SenderSelector
              onSelect={setSender}
              value={sender}
            />

            <input
              placeholder="Получатель"
              value={form.receiver}
              onChange={(e) =>
                setForm({ ...form, receiver: e.target.value })
              }
              style={styles.input}
            />
          </div>

          <div style={styles.productsHeader}>
            <h3>Товары</h3>
            <button onClick={addProduct} style={styles.addBtn}>
              + Добавить
            </button>
          </div>

          {form.products.map((p) => (
            <div key={p.id} style={styles.productRow}>
              <input
                placeholder="Название"
                value={p.name}
                onChange={(e) =>
                  updateProduct(p.id, "name", e.target.value)
                }
                style={styles.input}
              />

              <input
                type="number"
                value={p.quantity}
                onChange={(e) =>
                  updateProduct(p.id, "quantity", Number(e.target.value))
                }
                style={styles.input}
              />

              <input
                type="number"
                value={p.price}
                onChange={(e) =>
                  updateProduct(p.id, "price", Number(e.target.value))
                }
                style={styles.input}
              />

              <button
                onClick={() => removeProduct(p.id)}
                style={styles.deleteBtn}
              >
                ✕
              </button>
            </div>
          ))}

          <div style={styles.actions}>
            <button onClick={saveTTH} style={styles.saveBtn}>
              Сохранить
            </button>

            <button onClick={() => { setForm(emptyForm); setSender(null); }} style={styles.clearBtn}>
              Очистить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#0f172a",
    minHeight: "100vh",
    padding: 30,
    color: "white",
    fontFamily: "Arial",
  },

  container: {
    maxWidth: 1100,
    margin: "0 auto",
  },

  title: {
    fontSize: 28,
    marginBottom: 20,
  },

  filters: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: 15,
    marginBottom: 30,
  },

  card: {
    background: "#1e293b",
    padding: 15,
    borderRadius: 12,
    border: "1px solid #334155",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  badge: {
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
    color: "white",
  },

  row: {
    marginBottom: 5,
    fontSize: 14,
  },

  editBtn: {
    marginTop: 10,
    width: "100%",
    padding: 8,
    borderRadius: 8,
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },

  form: {
    background: "#1e293b",
    padding: 20,
    borderRadius: 12,
    border: "1px solid #334155",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 15,
  },

  productsHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },

  productRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr auto",
    gap: 10,
    marginBottom: 10,
  },

  actions: {
    display: "flex",
    gap: 10,
    marginTop: 15,
  },

  saveBtn: {
    flex: 1,
    padding: 10,
    background: "#22c55e",
    border: "none",
    borderRadius: 10,
    color: "white",
    cursor: "pointer",
  },

  clearBtn: {
    flex: 1,
    padding: 10,
    background: "#64748b",
    border: "none",
    borderRadius: 10,
    color: "white",
    cursor: "pointer",
  },

  addBtn: {
    padding: "6px 12px",
    background: "#10b981",
    border: "none",
    borderRadius: 8,
    color: "white",
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    borderRadius: 8,
    color: "white",
    padding: "0 10px",
  },
};