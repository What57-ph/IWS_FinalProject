import { createContext, useContext, useEffect, useState } from 'react';
import { callEvents } from '../config/api';
import { fetchUserByEmail } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // for event
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const fetchUserDataByEmail = async (email) => {
      if (!email) return;
      const data = await fetchUserByEmail(email);
      setCurrentUser(data);
    };
    fetchUserDataByEmail(user?.email);

  }, [user]);
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to parse user data:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [])


  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const res = await callEvents();
      // console.log("Fetching data for event: ", res.data);

      if (res && res.data) {
        setEvents(res.data.result);
      }
      setLoadingEvents(false);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Fetch failed';
      console.log({ errorMessage });
      // alert(errorMessage);
    }
  }


  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated, currentUser, events }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

