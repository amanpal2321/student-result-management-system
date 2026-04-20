const AUTH_KEY = "student_result_auth";

export const saveAuth = (payload) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
};

export const getAuth = () => {
  const rawValue = localStorage.getItem(AUTH_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
};

export const getToken = () => getAuth()?.token || "";

export const isLoggedIn = () => !!getToken();

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "/";
};
