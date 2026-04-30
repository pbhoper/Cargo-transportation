import styles from './header.module.css'
import { Button, Flex, Modal, Segmented } from "antd";
import { useState } from 'react';
import LoginForm from "../../forms/login.form.tsx";
import RegisterForm from "../../forms/register.form.tsx";

type Segment = "login" | "register";

const options = [{label: "ВОЙТИ", value:  "login"}, {label: "ЗАРЕГИСТРИРОВАТЬСЯ", value:  "register"}];

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segment, setSegment] = useState("login");
  console.log("segment", segment);

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

            <Flex justify="flex-end" align="flex-start" style={{ width: '100%' }}>
              <Button type="primary" onClick={showModal}>Вход</Button>
            </Flex>
            <Modal
              title="Basic Modal"
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isModalOpen}
              footer={false}
              width="400px"
              onCancel={cancelModal}
            >
              <Segmented options={options} block onChange={(value)=> handleChangeSegment(value as Segment)}></Segmented>
              {segment === "login" ? <LoginForm/> : <RegisterForm/>}
            </Modal>
          </ul>
        </nav>
      </div>
    </header>
  )
}