const TOKEN_NAME = "token";
export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const setTokenToLocalStorage = (token) => {
  return localStorage.setItem(TOKEN_NAME, token);
};
