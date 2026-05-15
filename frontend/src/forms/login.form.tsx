import { Button, Flex, Form, Input, message,} from 'antd';
import type { FC, JSX,} from 'react';
import type { FormProps,} from 'antd';
import type { LoginTypes } from '../interfaces/login.interface.ts';

interface Props {
  onSuccess: () => void;
}

const LoginForm: FC<Props> = ({onSuccess,}): JSX.Element => {

  const handleFinish: FormProps<LoginTypes>['onFinish'] =
    async (values) => {

      try {
        const response = await fetch(
          'http://localhost:3000/auth/login',
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              email: values.username,
              password: values.password,
            }),
          },
        );

        if (!response.ok) {
          throw new Error('Ошибка логина');
        }

        const data = await response.json();

        localStorage.setItem(
          'token',
          data.access_token,
        );

        message.success('Успешный вход');

        onSuccess();

      } catch (error) {
        console.error(error);

        message.error('Неверный логин или пароль');
      }
    };

  const handleFinishFailed:
    FormProps<LoginTypes>['onFinishFailed'] =
    (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

  return (
    <Form
      name="login"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      autoComplete="off"
      style={{
        margin: '20px 0 10px 0',
      }}
    >
      <Form.Item<LoginTypes>
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message:
              'Пожалуйста введите своё имя!',
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
            message:
              'Пожалуйста введите свой пароль!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Flex
          justify="center"
          style={{
            marginTop: '30px',
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;