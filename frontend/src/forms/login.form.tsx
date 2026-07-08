import { Button, Flex, Form, Input, message } from 'antd';
import React, { type FC, type JSX } from 'react';
import type { FormProps } from 'antd';
import type { LoginTypes } from '../types/login.interface.ts';
import { useAuth } from "./authcontext.tsx";
import ForgotPasswordForm from "./forgot.password.form.tsx";

interface Props {
  onSuccess: (token: string) => void;
}

const LoginForm: FC<Props> = ({ onSuccess }): JSX.Element => {
  const { login } = useAuth();
  const [showForgot, setShowForgot] = React.useState(false);

  const API_URL = "http://localhost:3000/auth/login";

  const handleFinish: FormProps<LoginTypes>['onFinish'] = async (values) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка логина');
      }

      const data = await response.json();

      login(data.access_token);

      message.success('Успешный вход');

      onSuccess(data.access_token);
    } catch (error) {
      console.error(error);
      message.error('Неверный логин или пароль');
    }
  };

  const handleFinishFailed: FormProps<LoginTypes>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (showForgot) {
    return <ForgotPasswordForm onBackToLogin={() => setShowForgot(false)} />;
  }

  return (
    <Form
      name="login"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      autoComplete="off"
      style={{ margin: '20px 0 10px 0' }}
    >
      <Form.Item<LoginTypes>
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите своё имя!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginTypes>
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите свой пароль!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Flex justify="center" style={{ marginTop: '30px', gap: '10px' }}>
          <Button onClick={() => setShowForgot(true)}>Забыли пароль?</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;