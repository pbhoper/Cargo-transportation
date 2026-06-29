import {Button, Flex, Form, type FormProps, Input, notification} from "antd";
import type {FC, JSX} from "react";
import type {RegisterTypes} from "../types/register.interface.ts";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_HOME_URL

const http = axios.create({
  baseURL: API_URL,
  params: {},
  withCredentials: true
})

interface Props {
  onSuccess: (token: string) => void;
}

const RegisterForm: FC<Props> = ({ onSuccess }): JSX.Element => {
  const handleFinish: FormProps<RegisterTypes>['onFinish'] = async (values) => {
    console.log('Success:', values);

    try {
      const { data } = await http.post("auth/register", values);
      console.log('data', data);

      const token = data?.token || data?.accessToken;

      if (token) {
        onSuccess(token);
      } else {
        console.warn("Токен не найден в ответе сервера, но регистрация прошла.");

        onSuccess("");
      }

      notification.success({
        message: "Регистрация успешна!",
        description: "Добро пожаловать в систему."
      });
    } catch (error: unknown) {
      let errorMessage = "Неизвестная ошибка";

      if (error instanceof AxiosError) {
        const responseErrorMessage = error.response?.data?.message;

        if (responseErrorMessage) {
          errorMessage = Array.isArray(responseErrorMessage)
            ? responseErrorMessage.join(", ")
            : responseErrorMessage;
        } else if (error.message) {
          errorMessage = error.message;
        }
      }

      notification.error({
        message: "Ошибка регистрации",
        description: errorMessage
      })
    }
  };

  return (
    <Form
      name="register"
      onFinish={handleFinish}
      autoComplete="off"
      style={{margin: '20px 0 10px 0'}}
    >
      <Form.Item<RegisterTypes>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Пожалуйста введите своё имя!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<RegisterTypes>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите свой пароль!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<RegisterTypes>
        label="Repeat Password"
        name="passwordRepeat"
        rules={[{ required: true, message: 'Пожалуйста подтвердите свой пароль!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<RegisterTypes>
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Пожалуйста введите своё имя!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<RegisterTypes>
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Пожалуйста введите свою Фамилию!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<RegisterTypes>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Пожалуйста введите свою электронную почту!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Flex justify="center" style={{ marginTop: '30px' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm;