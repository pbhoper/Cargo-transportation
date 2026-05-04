import {Button, Flex, Form, type FormProps, Input, notification} from "antd";
import type {FC, JSX} from "react";
import type {RegisterTypes} from "../interfaces/register.interface.ts";
import axios, { AxiosError } from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/",
  params: {},
  withCredentials: true
})

const RegisterForm: FC = (): JSX.Element => {
  const handleFinish: FormProps<RegisterTypes>['onFinish'] = async (values) => {
    console.log('Success:', values);

    try {
      const {data} = await http.post("auth/register", values);
      console.log('data', data);
    } catch (error: unknown) {
      let errorMessage = "Неизвестная ошибка";

      if (error instanceof AxiosError) {
        const responseErrorMessage = error.response?.data.message;

        if (responseErrorMessage) {
          errorMessage = (responseErrorMessage)
            ? responseErrorMessage.join(", ")
            : [responseErrorMessage];
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

      <Form.Item label={null}>
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