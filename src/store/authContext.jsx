import { useContext, useState } from 'react';
import { createContext } from 'react';

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: '',
  token: null,
  user_id: null,
  user_name: null,
});

AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
  const [user_name, setUser_name] = useState(localStorage.getItem('user_name'));

  const login = (token, user_id, user_name) => {
    // console.log('tokenas store', token);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('user_name', user_name);
  };

  const logout = () => {
    setToken(null);

    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
  };

  const ctx = {
    login,
    logout,
    isUserLoggedIn: !!token,
    token,
    user_id,
    user_name,
  };
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthCtx = () => {
  return useContext(AuthContext);
};
