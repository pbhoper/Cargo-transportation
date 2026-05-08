import {Modal, Segmented} from "antd";
import LoginForm from "../forms/login.form.tsx";
import RegisterForm from "../forms/register.form.tsx";
import type {FC} from "react";
import type {Segment} from "../interfaces/auth.interface.ts";

const options = [{label: "ВОЙТИ", value: "login"}, {label: "ЗАРЕГИСТРИРОВАТЬСЯ", value: "register"}];

interface IProps {
  segment: Segment;
  isModalOpen: boolean;
  cancelModal: () => void;
  onChangeSegment: (value: Segment) => void;
  onSuccess: () => void;
}

const AuthPage: FC<IProps> = ({segment, isModalOpen, cancelModal, onChangeSegment, onSuccess}) => {
  return (
    <Modal
      title="Авторизация"
      open={isModalOpen}
      footer={false}
      width="400px"
      onCancel={cancelModal}
    >
      <Segmented
        options={options}
        block
        onChange={(value) => onChangeSegment(value as Segment)}
      />

      {segment === "login"
        ? <LoginForm onSuccess={onSuccess}/>
        : <RegisterForm onSuccess={onSuccess}/>
      }
    </Modal>
  );
};

export default AuthPage;