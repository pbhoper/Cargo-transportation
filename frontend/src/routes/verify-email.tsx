import {
  useEffect,
  useState,
} from 'react';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';

type VerifyEmailSearch = {
  token: string;
};

export const Route = createFileRoute('/verify-email')({
  validateSearch: (search: Record<string, unknown>): VerifyEmailSearch => {
    return {
      token: (search.token as string) || '',
    };
  },
  component: VerifyEmailComponent,
});

function VerifyEmailComponent() { //eslint-disable-line

  const { token } = Route.useSearch();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Подтверждение почты...');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Токен отсутствует.');
      return;
    }

    axios.get(`http://localhost:3000/auth/verify-email?token=${token}`)
      .then((res) => {
        setStatus('success');
        setMessage(res.data.message || 'Успешно!');

        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Ошибка верификации.');
      });
  }, [token]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Верификация Email</h2>
      {status === 'loading' && <p>{message}</p>}
      {status === 'success' && <p style={{ color: 'green' }}>{message}</p>}
      {status === 'error' && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}