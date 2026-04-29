import styles from './header.module.css'
import {Button, Checkbox, Flex, Form, type FormProps, Input, Modal} from "antd";
import { useState } from 'react';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </ul>
        </nav>
      </div>
    </header>
  )
}