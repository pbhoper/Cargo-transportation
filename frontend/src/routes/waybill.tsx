import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/waybill")({
  component: RouteComponent,
});

type Waybill = {
  id: number;
  title: string;
  ttn: string;
};

const API = "http://localhost:3000/waybill";

function RouteComponent() { //eslint-disable-line
  const [sheets, setSheets] = useState<Waybill[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    ttn: "",
  });

  const load = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setSheets(data);
  };

  useEffect(() => {
    load(); //eslint-disable-line
  }, []);

  const reset = () => {
    setForm({ title: "", ttn: "" });
    setEditingId(null);
  };

  const save = async () => {
    if (editingId) {
      await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    reset();
    load();
  };

  const edit = (s: Waybill) => {
    setForm({ title: s.title, ttn: s.ttn });
    setEditingId(s.id);
  };

  const remove = async (id: number) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    load();
  };

  return (
    <div className="page">
      <div className="header">
        <h1>Путевые листы</h1>
      </div>

      <div className="layout">
        <div className="panel">
          <h2>Список</h2>

          {sheets.length === 0 && (
            <div className="empty">Нет данных</div>
          )}

          {sheets.map((s) => (
            <div className="card" key={s.id}>
              <div>
                <div className="title">{s.title}</div>
                <div className="meta">ТТН: {s.ttn}</div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn ghost" onClick={() => edit(s)}>
                  Редактировать
                </button>
                <button className="btn" onClick={() => remove(s.id)}>
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <h2>{editingId ? "Редактирование" : "Создание"}</h2>

          <input
            placeholder="Название"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="ТТН"
            value={form.ttn}
            onChange={(e) =>
              setForm({ ...form, ttn: e.target.value })
            }
          />

          <div className="actions">
            <button className="btn primary" onClick={save}>
              {editingId ? "Сохранить" : "Создать"}
            </button>

            <button className="btn" onClick={reset}>
              Сброс
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(180deg, #0f172a, #111827);
          color: #e5e7eb;
          padding: 30px;
        }

        .layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .panel {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px;
        }

        .card {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          margin-top: 10px;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.3);
          color: white;
        }

        .btn {
          padding: 8px 12px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .primary {
          background: #3b82f6;
        }

        .ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .empty {
          color: #64748b;
          padding: 20px;
        }

        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}