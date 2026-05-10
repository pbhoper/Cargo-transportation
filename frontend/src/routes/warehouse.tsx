import { createFileRoute } from "@tanstack/react-router";
import {useMemo, useState} from "react";


export const Route = createFileRoute("/warehouse")({
  component: RouteComponent,
});

type Warehouse = {
  id: number;
  name: string;
  address: string;
  trusted: boolean;
};

function RouteComponent() { //eslint-disable-line
  const [warehouses, setWarehouses] = useState<Warehouse[]>([

  ]);

  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    name: "",
    address: "",
    trusted: false,
  });

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter((warehouse) => {
      const query = search.toLowerCase();

      return (
        warehouse.name.toLowerCase().includes(query) ||
        warehouse.address.toLowerCase().includes(query)
      );
    });
  }, [warehouses, search]);

  const totalPages = Math.ceil(filteredWarehouses.length / pageSize);

  const paginatedWarehouses = filteredWarehouses.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleCreate = () => {
    if (!form.name || !form.address) return;

    const newWarehouse: Warehouse = {
      id: Date.now(),
      name: form.name,
      address: form.address,
      trusted: form.trusted,
    };

    setWarehouses((prev) => [newWarehouse, ...prev]);

    setForm({
      name: "",
      address: "",
      trusted: false,
    });
  };

  const handleDelete = (id: number) => {
    setWarehouses((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleTrusted = (id: number) => {
    setWarehouses((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, trusted: !item.trusted }
          : item
      )
    );
  };

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "140px 40px 40px",
      }}
    >
      <h1 style={{ marginBottom: 24 }}>Склады / Получатели</h1>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 12,
          marginBottom: 24,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Название склада"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Адрес"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          style={inputStyle}
        />

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <input
            type="checkbox"
            checked={form.trusted}
            onChange={(e) =>
              setForm({
                ...form,
                trusted: e.target.checked,
              })
            }
          />
          Доверенный склад
        </label>

        <button onClick={handleCreate} style={buttonStyle}>
          Добавить
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Поиск по названию или адресу..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            ...inputStyle,
            width: 300,
          }}
        />

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          style={inputStyle}
        >
          <option value={10}>10 записей</option>
          <option value={20}>20 записей</option>
        </select>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "white",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
          <tr style={{ background: "#ececec" }}>
            <th style={thStyle}>Название</th>
            <th style={thStyle}>Адрес</th>
            <th style={thStyle}>Доверенный</th>
            <th style={thStyle}>Действия</th>
          </tr>
          </thead>

          <tbody>
          {paginatedWarehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td style={tdStyle}>{warehouse.name}</td>
              <td style={tdStyle}>{warehouse.address}</td>

              <td style={tdStyle}>
                <input
                  type="checkbox"
                  checked={warehouse.trusted}
                  onChange={() =>
                    toggleTrusted(warehouse.id)
                  }
                />
              </td>

              <td style={tdStyle}>
                <button
                  onClick={() =>
                    handleDelete(warehouse.id)
                  }
                  style={{
                    ...buttonStyle,
                    background: "#dc2626",
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}

          {paginatedWarehouses.length === 0 && (
            <tr>
              <td
                colSpan={4}
                style={{
                  padding: 24,
                  textAlign: "center",
                }}
              >
                Ничего не найдено
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          style={buttonStyle}
        >
          Назад
        </button>

        <span style={{ alignSelf: "center" }}>
          Страница {page} из {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((prev) => prev + 1)}
          style={buttonStyle}
        >
          Вперед
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  minWidth: 200,
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 14px",
  border: "none",
  borderRadius: 8,
  background: "#111827",
  color: "white",
  cursor: "pointer",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: 14,
};

const tdStyle: React.CSSProperties = {
  padding: 14,
  borderTop: "1px solid #eee",
};