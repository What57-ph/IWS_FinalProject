import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const access_token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user');
      if (access_token && userData) {
        setUser(userData);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', userData);
    setUser(userData);
  }

  const logout = (userData, token) => {
    localStorage.removeItem('access_token', token);
    localStorage.removeItem('user', userData);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

