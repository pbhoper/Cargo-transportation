import {
  Button,
  Flex,
  Form,
  Input,
  message,
} from 'antd';
import type { FC, JSX } from 'react';
import type { FormProps } from 'antd';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({onBackToLogin,}): JSX.Element => {

  const API_URL = "http://localhost:3000/auth/request-password-reset";

  const handleFinish: FormProps<{ email: string }>['onFinish'] = async (values) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }

      message.success('Если email найден, ссылка для восстановления будет отправлена');
    } catch (error) {
      console.error(error);
      message.error('Ошибка при отправке запроса');
    }
  };

  return (
    <Form
      name="forgotPassword"
      onFinish={handleFinish}
      autoComplete="off"
      style={{ margin: '20px 0 10px 0' }}
    >
      <Form.Item<{ email: string }>
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Введите ваш email' },
          { type: 'email', message: 'Некорректный email' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Flex justify="center" style={{ marginTop: '30px', gap: '10px' }}>
          <Button onClick={onBackToLogin}>Назад к входу</Button>
          <Button type="primary" htmlType="submit">
            Отправить ссылку
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;