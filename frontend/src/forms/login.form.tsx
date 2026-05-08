import {Button, Flex, Form, type FormProps, Input} from "antd";
import type {FC, JSX} from "react";
import type {LoginTypes} from "../interfaces/login.interface.ts";


interface Props {
  onSuccess: () => void;
}

const LoginForm: FC<Props> = ({ onSuccess }): JSX.Element => {

  const handleFinish: FormProps<LoginTypes>['onFinish'] = (values) => {
    console.log('Success:', values);
    onSuccess();
  };

  const handleFinishFailed: FormProps<LoginTypes>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="login"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      autoComplete="off"
      style={{margin: '20px 0 10px 0'}}
    >
      <Form.Item<LoginTypes>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Пожалуйста введите своё имя!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginTypes>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите свой пароль!' }]}
      >
        <Input.Password />
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

export default LoginForm;