import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

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

function RouteComponent() {  //eslint-disable-line
  const currentDate = new Date().toISOString().split("T")[0];

  const emptyForm: TTH = {
    id: 0,
    number: "",
    date: currentDate,
    sender: "",
    receiver: "",
    status: "Оформлен",
    products: [],
  };

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [tthList, setTthList] = useState<TTH[]>([]);

  const [form, setForm] = useState<TTH>(emptyForm);

  const filteredList = useMemo(() => {
    return tthList.filter((item) => {
      const matchesSearch =
        item.number.toLowerCase().includes(search.toLowerCase()) ||
        item.sender.toLowerCase().includes(search.toLowerCase()) ||
        item.receiver.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter
        ? item.status === statusFilter
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, tthList]);

  const saveTTH = () => {
    if (!form.number.trim()) {
      alert("Введите номер ТТН");
      return;
    }

    if (form.id) {
      setTthList((prev) =>
        prev.map((item) => (item.id === form.id ? form : item))
      );
    } else {
      setTthList((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
        },
      ]);
    }

    setForm(emptyForm);
  };

  const editTTH = (item: TTH) => {
    setForm(item);
  };

  const addProduct = () => {
    setForm((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          id: Date.now(),
          name: "",
          quantity: 1,
          price: 0,
        },
      ],
    }));
  };

  const updateProduct = (
    id: number,
    field: keyof Product,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.map((product) =>
        product.id === id
          ? {
              ...product,
              [field]: value,
            }
          : product
      ),
    }));
  };

  const removeProduct = (id: number) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>ТТН</h1>

      {/* Фильтры */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Поиск ТТН..."
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

      {/* Таблица */}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Номер</th>
              <th style={styles.th}>Дата</th>
              <th style={styles.th}>Отправитель</th>
              <th style={styles.th}>Получатель</th>
              <th style={styles.th}>Статус</th>
              <th style={styles.th}>Действия</th>
            </tr>
          </thead>

          <tbody>
            {filteredList.map((item) => (
              <tr key={item.id}>
                <td style={styles.td}>{item.number}</td>
                <td style={styles.td}>{item.date}</td>
                <td style={styles.td}>{item.sender}</td>
                <td style={styles.td}>{item.receiver}</td>
                <td style={styles.td}>{item.status}</td>

                <td style={styles.td}>
                  <button
                    onClick={() => editTTH(item)}
                    style={styles.editButton}
                  >
                    Редактировать
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Форма */}
      <div style={styles.card}>
        <h2 style={styles.subtitle}>
          {form.id ? "Редактирование ТТН" : "Создание ТТН"}
        </h2>

        <div style={styles.formGrid}>
          <input
            type="text"
            placeholder="Номер ТТН"
            value={form.number}
            onChange={(e) =>
              setForm({
                ...form,
                number: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Отправитель"
            value={form.sender}
            onChange={(e) =>
              setForm({
                ...form,
                sender: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Получатель"
            value={form.receiver}
            onChange={(e) =>
              setForm({
                ...form,
                receiver: e.target.value,
              })
            }
            style={styles.input}
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as Status,
              })
            }
            style={styles.input}
          >
            <option value="Оформлен">Оформлен</option>
            <option value="Принят">Принят</option>
            <option value="Доставлен">Доставлен</option>
          </select>
        </div>

        {/* Товары */}
        <div style={{ marginTop: 20 }}>
          <div style={styles.productsHeader}>
            <h3>Товары</h3>

            <button onClick={addProduct} style={styles.addButton}>
              Добавить товар
            </button>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Название</th>
                <th style={styles.th}>Количество</th>
                <th style={styles.th}>Цена</th>
                <th style={styles.th}>Удалить</th>
              </tr>
            </thead>

            <tbody>
              {form.products.map((product) => (
                <tr key={product.id}>
                  <td style={styles.td}>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) =>
                        updateProduct(
                          product.id,
                          "name",
                          e.target.value
                        )
                      }
                      style={styles.input}
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProduct(
                          product.id,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      style={styles.input}
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        updateProduct(
                          product.id,
                          "price",
                          Number(e.target.value)
                        )
                      }
                      style={styles.input}
                    />
                  </td>

                  <td style={styles.td}>
                    <button
                      onClick={() => removeProduct(product.id)}
                      style={styles.deleteButton}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Кнопки */}
        <div style={styles.buttons}>
          <button onClick={saveTTH} style={styles.saveButton}>
            Сохранить
          </button>

          <button
            onClick={() => setForm(emptyForm)}
            style={styles.clearButton}
          >
            Очистить
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "30px",
    backgroundColor: "#f5f6fa",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },

  filters: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    textAlign: "left",
  },

  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  productsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },

  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  saveButton: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  clearButton: {
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  editButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  addButton: {
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};