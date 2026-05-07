import styles from './header.module.css'
import { Button, Flex,} from "antd";
import { useState } from 'react';
import AuthPage from "../../pages/auth-page.tsx";


type Segment = "login" | "register";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segment, setSegment] = useState<Segment>("login");

  const handleChangeSegment = (value: Segment) => {
    if (!value) {
      return;
    }
    setSegment(value);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header>
      <div className={styles.container}>
        <h1>Грузоперевозки</h1>
        <nav>
          <ul>
            <li><a href="#main">Главная</a></li>
            <li><a href="#services">Услуги</a></li>
            <li><a href="#contacts">Контакты</a></li>
            <li><a href="/warehouse">Склады</a></li>
            <Flex justify="flex-end" align="flex-start" style={{ width: '100%' }}>
              <Button type="primary" onClick={showModal}>Вход</Button>
            </Flex>
            <AuthPage segment={segment} isModalOpen={isModalOpen} cancelModal={cancelModal} onChangeSegment={handleChangeSegment}/>
          </ul>
        </nav>
      </div>
    </header>
  )
}