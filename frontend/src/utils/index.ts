export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const getHeaderToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return null;
};

export const setHeaderToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};
