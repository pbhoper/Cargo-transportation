import { Button, Flex, Form, Input, message } from 'antd';
import type { FC, JSX } from 'react';
import type { FormProps } from 'antd';
import { useSearchParams } from 'react-router'

interface ResetPasswordFormProps {
  onSuccess: () => void;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({onSuccess,}): JSX.Element => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') as string | undefined;

  const API_URL = "http://localhost:3000/auth/reset-password";

  const handleFinish: FormProps<{ newPassword: string; confirmPassword: string }>['onFinish'] =
    async (values) => {
      if (!token) {
        message.error('Токен восстановления отсутствует в ссылке');
        return;
      }

      if (values.newPassword !== values.confirmPassword) {
        message.error('Пароли не совпадают');
        return;
      }

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            newPassword: values.newPassword,
          }),
        });

        if (!response.ok) {
          throw new Error('Ошибка смены пароля');
        }

        message.success('Пароль успешно изменён');
        onSuccess();
      } catch (error) {
        console.error(error);
        message.error('Неверный токен или токен истёк');
      }
    };

  if (!token) {
    return <div>Неверная ссылка для восстановления пароля.</div>;
  }

  return (
    <Form
      name="resetPassword"
      onFinish={handleFinish}
      autoComplete="off"
      style={{ margin: '20px 0 10px 0' }}
    >
      <Form.Item<'newPassword' | 'confirmPassword'>
        label="Новый пароль"
        name="newPassword"
        rules={[
          { required: true, message: 'Введите новый пароль' },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Подтвердите пароль"
        name="confirmPassword"
        rules={[
          { required: true, message: 'Подтвердите пароль' },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Flex justify="center" style={{ marginTop: '30px' }}>
          <Button type="primary" htmlType="submit">
            Сменить пароль
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;