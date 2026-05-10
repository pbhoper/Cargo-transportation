import { createFileRoute } from "@tanstack/react-router";
import  { useState } from "react";

export const Route = createFileRoute("/travel/sheets")({
  component: RouteComponent,
});

type Checkpoint = { id: number; name: string };
type DriverMark = { datetime: string };

type TravelSheet = {
  id: number;
  title: string;
  ttn: string;
  checkpoints: Checkpoint[];
  driverMarks: DriverMark[];
};

function RouteComponent() { //eslint-disable-line
  const [sheets, setSheets] = useState<TravelSheet[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<Omit<TravelSheet, "id">>({
    title: "",
    ttn: "",
    checkpoints: [],
    driverMarks: [],
  });

  const reset = () => {
    setForm({ title: "", ttn: "", checkpoints: [], driverMarks: [] });
    setEditingId(null);
  };

  const save = () => {
    if (editingId) {
      setSheets((p) =>
        p.map((s) => (s.id === editingId ? { ...s, ...form } : s))
      );
    } else {
      setSheets((p) => [...p, { id: Date.now(), ...form }]);
    }
    reset();
  };

  const addCheckpoint = () => {
    const name = prompt("Контрольная точка");
    if (!name) return;

    setForm((p) => ({
      ...p,
      checkpoints: [...p.checkpoints, { id: Date.now(), name }],
    }));
  };

  const addMark = () => {
    setForm((p) => ({
      ...p,
      driverMarks: [
        ...p.driverMarks,
        { datetime: new Date().toLocaleString() },
      ],
    }));
  };

  const edit = (s: TravelSheet) => {
    setForm({
      title: s.title,
      ttn: s.ttn,
      checkpoints: s.checkpoints,
      driverMarks: s.driverMarks,
    });
    setEditingId(s.id);
  };

  return (
    <div className="page">
      <div className="header">
        <h1>Путевые листы</h1>
        <p>Управление рейсами, контрольными точками и отметками водителя</p>
      </div>

      <div className="layout">
        <div className="panel">
          <h2>Список путевых листов</h2>

          {sheets.length === 0 && (
            <div className="empty">Нет созданных путевых листов</div>
          )}

          {sheets.map((s) => (
            <div className="card" key={s.id}>
              <div>
                <div className="title">{s.title}</div>
                <div className="meta">ТТН: {s.ttn}</div>
              </div>

              <button className="btn ghost" onClick={() => edit(s)}>
                Редактировать
              </button>
            </div>
          ))}
        </div>

        <div className="panel form">
          <h2>{editingId ? "Редактирование" : "Создание"}</h2>

          <input
            placeholder="Название рейса"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="ТТН"
            value={form.ttn}
            onChange={(e) => setForm({ ...form, ttn: e.target.value })}
          />

          <div className="block">
            <div className="blockHeader">
              <h3>Контрольные точки</h3>
              <button className="btn small" onClick={addCheckpoint}>
                + добавить
              </button>
            </div>

            <div className="list">
              {form.checkpoints.map((c) => (
                <div key={c.id} className="item">
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          <div className="block">
            <div className="blockHeader">
              <h3>Отметки водителя</h3>
              <button className="btn small" onClick={addMark}>
                + добавить
              </button>
            </div>

            <div className="list">
              {form.driverMarks.map((m, i) => (
                <div key={i} className="item">
                  {m.datetime}
                </div>
              ))}
            </div>
          </div>

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
          font-family: system-ui, -apple-system, sans-serif;
        }

        .header {
          margin-bottom: 25px;
        }

        .header h1 {
          margin: 0;
          font-size: 28px;
        }

        .header p {
          margin: 5px 0 0;
          color: #94a3b8;
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
          backdrop-filter: blur(10px);
        }

        h2 {
          margin-top: 0;
        }

        .card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          margin-top: 10px;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
        }

        .title {
          font-weight: 600;
        }

        .meta {
          font-size: 12px;
          color: #94a3b8;
        }

        .empty {
          color: #64748b;
          padding: 20px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.3);
          color: white;
          outline: none;
        }

        .block {
          margin-top: 15px;
        }

        .blockHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .list {
          margin-top: 8px;
        }

        .item {
          padding: 8px;
          background: rgba(255,255,255,0.05);
          margin-bottom: 6px;
          border-radius: 8px;
          font-size: 14px;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .btn {
          padding: 8px 12px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .btn:hover {
          background: rgba(255,255,255,0.15);
        }

        .primary {
          background: #3b82f6;
        }

        .primary:hover {
          background: #2563eb;
        }

        .ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .small {
          font-size: 12px;
          padding: 6px 10px;
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