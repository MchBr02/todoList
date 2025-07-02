// frontend/src/utils/authToken.js

export const setToken = (token, shareId) => {
  const data = { token, shareId };
  localStorage.setItem('auth_data', JSON.stringify(data));
};

export const getToken = () => {
  try {
    const data = JSON.parse(localStorage.getItem('auth_data'));
    return data && data.token ? data : null;
  } catch {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem('auth_data');
};
