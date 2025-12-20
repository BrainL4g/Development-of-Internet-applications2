export const login = async (email, password) => {
  const res = await fetch('http://127.0.0.1:8000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Неверные данные');
  const data = await res.json();
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  return data.user;
};

export const register = async (email, password, password_confirm) => {
  const res = await fetch('http://127.0.0.1:8000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, password_confirm }),
  });
  if (!res.ok) throw new Error('Регистрация не удалась');
  return await res.json();
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  if (!refresh) throw new Error('Нет refresh-токена');

  const res = await fetch('http://127.0.0.1:8000/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refresh }),
  });

  if (!res.ok) {
    logout();
    throw new Error('Обновление токена не удалось');
  }

  const data = await res.json();
  localStorage.setItem('access_token', data.access_token);
  return data.access_token;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getToken = () => localStorage.getItem('access_token');