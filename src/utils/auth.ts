export const AUTH_KEY = "user";

export const login = (user: any) => {
  const userWithAvatar = {
    ...user,
    avatar: `https://ui-avatars.com/api/?name=${user.name}&background=random`,
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(userWithAvatar));
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getUser();
};