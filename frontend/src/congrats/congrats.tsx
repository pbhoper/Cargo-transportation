import React, { useMemo, useState } from 'react';

type Template = {
  id: number;
  name: string;
  text: string;
  backgroundColor: string;
  image?: string;
};

const defaultTemplates: Template[] = [
  {
    id: 1,
    name: 'Шаблон 1',
    backgroundColor: '#f5f5f5',
    text: `Уважаемый(ая) {Получатель}!

Поздравляем Вас с {Дата}. Желаем крепкого здоровья, счастья и успехов!

С уважением,
коллектив ООО "Транспортные системы"`,
  },
  {
    id: 2,
    name: 'Шаблон 2',
    backgroundColor: '#fff4e6',
    text: `Уважаемый(ая) {Получатель}!

Поздравляем Вас с днем рождения ({Дата})!
Пусть каждый день приносит радость и новые достижения.

С уважением,
ООО "Транспортные системы"`,
  },
];

const users = [
  { id: 1, name: 'Сергей Иванович' },
  { id: 2, name: 'Ольга Ивановна' },
];

export const BirthdayTemplateForm: React.FC = () => {
  const [templates, setTemplates] = useState(defaultTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(1);

  const selectedTemplate = useMemo(
    () => templates.find((t) => t.id === selectedTemplateId)!,
    [templates, selectedTemplateId]
  );

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const previewText = useMemo(() => {
    return selectedTemplate.text
      .replace('{Получатель}', selectedUser?.name || '')
      .replace('{Дата}', '45-летием');
  }, [selectedTemplate, selectedUser]);

  const handleTextChange = (value: string) => {
    setTemplates((prev) => prev.map((t) =>
        t.id === selectedTemplateId ? { ...t, text: value } : t
      )
    );
  };

  const handleColorChange = (value: string) => {
    setTemplates((prev) => prev.map((t) =>
        t.id === selectedTemplateId ? { ...t, backgroundColor: value }:t
      )
    );
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {setTemplates((prev) => prev.map((t) =>
          t.id === selectedTemplateId ? { ...t, image: reader.result as string }:t
        )
      );
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    console.log('Сохранено:', templates);
    alert('Шаблон сохранен');
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h2>Шаблоны поздравлений</h2>

      <div style={{ marginBottom: 16 }}>
        <label>Пользователь:</label>
        <br />
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Выбор шаблона:</label>
        <br />
        <select
          value={selectedTemplateId}
          onChange={(e) => setSelectedTemplateId(Number(e.target.value))}
        >
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Текст шаблона:</label>
        <br />
        <textarea
          rows={10}
          style={{ width: '100%' }}
          value={selectedTemplate.text}
          onChange={(e) => handleTextChange(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Цвет фона:</label>
        <br />
        <input
          type="color"
          value={selectedTemplate.backgroundColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Картинка заголовка:</label>
        <br />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={handleCancel}>Отменить</button>
      </div>

      <hr style={{ margin: '32px 0' }} />

      <h3>Preview Email</h3>

      <div
        style={{
          background: selectedTemplate.backgroundColor,
          padding: 24,
          borderRadius: 12,
        }}
      >
        {selectedTemplate.image && (
          <img
            src={selectedTemplate.image}
            alt="header"
            style={{
              width: '100%',
              maxHeight: 220,
              objectFit: 'cover',
              borderRadius: 8,
              marginBottom: 20,
            }}
          />
        )}

        <pre
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'inherit',
            fontSize: 16,
          }}
        >
          {previewText}
        </pre>
      </div>
    </div>
  );
};