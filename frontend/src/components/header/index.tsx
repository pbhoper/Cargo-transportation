import styles from './header.module.css'
import {
  Button,
  Dropdown,
  type MenuProps,
  Space,
} from "antd";
import {useState} from 'react';
import {SettingOutlined} from '@ant-design/icons';
import AuthPage from "../../pages/auth-page.tsx";
import {useAuth} from "../../forms/authcontext.tsx";
import type {Segment} from "../../types/auth.interface.ts";

function DownOutlined() {
  return null;
}

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segment, setSegment] = useState<Segment>("login");

  const {isAuth, logout} = useAuth();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
    },
    {
      key: '3',
      label: 'Billing',
    },
    {
      key: '4',
      label: 'Settings',
      icon: <SettingOutlined/>,
    },
    {
      key: '5',
      danger: true,
      label: 'Logout',
      onClick: () => logout(),
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

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
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
              <Dropdown menu={{items}}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Мой аккаунт
                    <DownOutlined/>
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