import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {getWarehouses, createWarehouse} from "../api/warehouse.ts";

export const Route = createFileRoute("/warehouse")({ //eslint-disable-line
  component: RouteComponent,
});

type Warehouse = {
  id: number;
  name: string;
  city: string;
  street: string;
  house: string;
  apartment?: string;
  isTrusted: boolean;
};

function RouteComponent() {
  const [warehouses, setWarehouses] = useState<
    Warehouse[]
  >([]);

  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    name: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
    isTrusted: false,
  });

  useEffect(() => {
    const loadWarehouses = async () => {
      try {
        const data = await getWarehouses();
        setWarehouses(data ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    loadWarehouses();
  }, []);

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter((warehouse) => {
      const query = search.toLowerCase();

      return (
        warehouse.name
          .toLowerCase()
          .includes(query) ||
        warehouse.city
          .toLowerCase()
          .includes(query) ||
        warehouse.street
          .toLowerCase()
          .includes(query)
      );
    });
  }, [warehouses, search]);

  const totalPages = Math.ceil(
    filteredWarehouses.length / pageSize
  );

  const paginatedWarehouses =
    filteredWarehouses.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  const handleCreate = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Нет токена");
        return;
      }

      const created = await createWarehouse(
        {
          name: form.name,
          city: form.city,
          street: form.street,
          house: form.house,
          apartment: form.apartment,
          isTrusted: form.isTrusted,
        },
      );

      setWarehouses((prev) => [created, ...prev]);

      setForm({
        name: "",
        city: "",
        street: "",
        house: "",
        apartment: "",
        isTrusted: false,
      });

      alert("Склад создан");
    } catch (error: any) { //eslint-disable-line
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Ошибка создания склада"
      );
    }
  };

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "140px 40px 40px",
      }}
    >
      <h1 style={{ marginBottom: 24 }}>
        Склады / Получатели
      </h1>

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
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Город"
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,
              city: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Улица"
          value={form.street}
          onChange={(e) =>
            setForm({
              ...form,
              street: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Дом"
          value={form.house}
          onChange={(e) =>
            setForm({
              ...form,
              house: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Квартира"
          value={form.apartment}
          onChange={(e) =>
            setForm({
              ...form,
              apartment: e.target.value,
            })
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
            checked={form.isTrusted}
            onChange={(e) =>
              setForm({
                ...form,
                isTrusted:
                e.target.checked,
              })
            }
          />
          Доверенный склад
        </label>

        <button
          onClick={handleCreate}
          style={buttonStyle}
          disabled={
            !form.name ||
            !form.city ||
            !form.street ||
            !form.house
          }
        >
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
          placeholder="Поиск..."
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
          <option value={10}>
            10 записей
          </option>

          <option value={20}>
            20 записей
          </option>
        </select>
      </div>

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
          <tr
            style={{
              background: "#ececec",
            }}
          >
            <th style={thStyle}>
              Название
            </th>

            <th style={thStyle}>
              Город
            </th>

            <th style={thStyle}>
              Улица
            </th>

            <th style={thStyle}>
              Дом
            </th>

            <th style={thStyle}>
              Доверенный
            </th>
          </tr>
          </thead>

          <tbody>
          {paginatedWarehouses.map(
            (warehouse) => (
              <tr key={warehouse.id}>
                <td style={tdStyle}>
                  {warehouse.name}
                </td>

                <td style={tdStyle}>
                  {warehouse.city}
                </td>

                <td style={tdStyle}>
                  {warehouse.street}
                </td>

                <td style={tdStyle}>
                  {warehouse.house}
                </td>

                <td style={tdStyle}>
                  {warehouse.isTrusted
                    ? "Да"
                    : "Нет"}
                </td>
              </tr>
            )
          )}

          {paginatedWarehouses.length ===
            0 && (
              <tr>
                <td
                  colSpan={5}
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
          onClick={() =>
            setPage((prev) => prev - 1)
          }
          style={buttonStyle}
        >
          Назад
        </button>

        <span
          style={{
            alignSelf: "center",
          }}
        >
          Страница {page} из{" "}
          {totalPages || 1}
        </span>

        <button
          disabled={
            page === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setPage((prev) => prev + 1)
          }
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

export default RouteComponent;