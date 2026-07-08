import { createFileRoute } from '@tanstack/react-router';
import ResetPasswordForm from "../forms/reset.password.form.tsx";

export const Route = createFileRoute('/reset')({
  component: ResetPasswordPage,
});

function ResetPasswordPage() { //eslint-disable-line
  return (
    <div>
      <h2>Восстановление пароля</h2>
      <ResetPasswordForm onSuccess={() => {
        window.location.href = '/login';
      }} />
    </div>
  );
}