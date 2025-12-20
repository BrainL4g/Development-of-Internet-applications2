import { refreshToken, getToken, logout } from './auth';

export const authFetch = async (url, options = {}) => {
  let token = getToken();
  if (!token) {
    throw new Error('Не авторизован');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    try {
      await refreshToken();
      token = getToken();
      headers['Authorization'] = `Bearer ${token}`;
      res = await fetch(url, { ...options, headers });
    } catch (err) {
      logout();
      throw err;
    }
  }

  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }

  return res;
};