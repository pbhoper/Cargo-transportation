import {
  useEffect,
  useState,
} from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/waybill")({
  component: RouteComponent,
});

type Waybill = {
  id: number;
  title: string;
  tths: TTH[];
};

type TTH = {
  id: number;
  number: string;
  dateCreated: string;
};

const API_URL = "http://localhost:3000/waybill";
const TTH_API_URL = "http://localhost:3000/tth";

function RouteComponent() {
  const [sheets, setSheets] = useState<Waybill[]>([]);
  const [tthList, setTthList] = useState<TTH[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    tthIds: [] as number[],
  });

  const load = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Токен не найден');
      setSheets([]);
      setTthList([]);
      return;
    }

    try {
      console.log('Token:', token);

      const res = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      console.log('Waybill response status:', res.status);

      if (!res.ok) {
        console.error(`Ошибка загрузки путевых листов: ${res.status}`);
        setSheets([]);
      } else {
        const data = await res.json();
        console.log('Waybill data:', data);
        setSheets(Array.isArray(data) ? data : []);
      }

      const tthRes = await fetch(TTH_API_URL, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      console.log('TTH response status:', tthRes.status);

      if (tthRes.ok) {
        const tthData = await tthRes.json();
        console.log('TTH data:', tthData);
        setTthList(Array.isArray(tthData) ? tthData : []);
      } else {
        const errorText = await tthRes.text();
        console.error(`Ошибка загрузки ТТН: ${tthRes.status}`, errorText);
        setTthList([]);
      }
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
      setSheets([]);
      setTthList([]);
    }
  };

  useEffect(() => {load();},[]);

  const reset = () => {
    setForm({ title: "", tthIds: [] });
    setEditingId(null);
  };

  const save = async () => {
    const token = localStorage.getItem('token');
    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
    }
    reset();
    load();
  };

  const edit = (s: Waybill) => {
    setForm({title: s.title, tthIds: s.tths.map(t => t.id),});
    setEditingId(s.id);
  };

  const remove = async (id: number) => {
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${token}` },
    });
    load();
  };

  const toggleTth = (tthId: number) => {
    setForm(prev => ({...prev, tthIds: prev.tthIds.includes(tthId) ? prev.tthIds.filter(id => id !== tthId)
        :[...prev.tthIds, tthId],
    }));
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
                <div className="meta">
                  ТТН: {s.tths.map(t => t.number).join(', ') || 'Нет'}
                </div>
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

          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'block', marginBottom: 5 }}>Выберите ТТН:</div>
            <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 10 }}>
              {tthList.map((tth) => {
                const isChecked = form.tthIds.includes(tth.id);
                return (
                  <div
                    key={tth.id}
                    onClick={() => toggleTth(tth.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 5,
                      cursor: 'pointer',
                      padding: '5px',
                      background: isChecked ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                      borderRadius: 5,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleTth(tth.id);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      style={{ cursor: 'pointer', width: 'auto', pointerEvents: 'none' }}
                    />
                    <span>#{tth.number} ({tth.dateCreated})</span>
                  </div>
                );
              })}
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