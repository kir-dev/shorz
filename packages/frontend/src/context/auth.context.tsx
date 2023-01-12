import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ApiPaths, UIPaths } from '../config/paths.config';
import { User } from '../types/types';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | undefined;
  token: string | undefined;
  login: (token: string) => void;
  logout: () => void;
  fetchUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: undefined,
  token: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  login: (token: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchUser: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = searchParams.get('access_token') || localStorage.getItem('token');
    if (token) {
      login(token);
    } else {
      logout();
    }
  }, []);

  const login = (accessToken: string) => {
    setLoading(true);
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem('token', accessToken);
      setIsAuthenticated(true);
      setToken(token);
      fetchUser()
        .then(() => {
          navigate(['/', UIPaths.LOGIN].includes(location.pathname) ? UIPaths.DASHBOARD : location.pathname);
        })
        .catch(logout)
        .finally(() => setLoading(false));
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  const logout = () => {
    axios.defaults.headers.common.Authorization = null;
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setToken(undefined);
    setLoading(false);
    setUser(undefined);
    navigate(UIPaths.LOGIN);
  };

  const fetchUser = async () => {
    const { data: user } = await axios.get<User>(ApiPaths.ME);
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
        fetchUser,
      }}
    >
      {loading ? <LoadingPlaceholder /> : children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
