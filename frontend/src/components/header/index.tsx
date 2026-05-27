import styles from './header.module.css'
import { Button, Dropdown, type MenuProps, Space } from "antd";
import { useState } from 'react';
import AuthPage from "../../pages/auth-page.tsx";
import { useAuth } from "../../forms/authcontext.tsx";
import type { Segment } from "../../types/auth.interface.ts";
import { useNavigate } from '@tanstack/react-router';

function DownOutlined() {
  return null;
}

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segment, setSegment] = useState<Segment>("login");

  const { isAuth, logout, login } = useAuth();
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },

    {
      key: '5',
      danger: true,
      label: 'Logout',
      onClick: () => {
        logout();
        navigate({ to: '/' });
      },
    },
  ];

  const handleChangeSegment = (value: Segment) => {
    if (!value) return;
    setSegment(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginSuccess = (token: string) => {
    setIsModalOpen(false);

    if (login) {
      login(token);
    }

    navigate({ to: '/' });
  };

  return (
    <header>
      <div className={styles.container}>
        <h1>Грузоперевозки</h1>

        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li><a href="/">Главная</a></li>

            {isAuth && (
              <>
                <li><a href="/reports">Отчеты</a></li>
                <li><a href="/tth">ТТН</a></li>
                <li><a href="/waybill">Путевые листы</a></li>
                <li><a href="/warehouse">Склады</a></li>
              </>
            )}

            <li><a href="#services">Услуги</a></li>
            <li><a href="#contacts">Контакты</a></li>
          </ul>

          <div className={styles.auth}>
            {!isAuth ? (
              <>
                <Button type="primary" onClick={showModal}>
                  Вход
                </Button>

                <AuthPage
                  segment={segment}
                  isModalOpen={isModalOpen}
                  cancelModal={cancelModal}
                  onChangeSegment={handleChangeSegment}
                  onSuccess={handleLoginSuccess}
                />
              </>
            ) : (
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Мой аккаунт
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};