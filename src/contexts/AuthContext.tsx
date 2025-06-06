"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import Cookies from 'js-cookie';

interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const token = Cookies.get('token') || localStorage.getItem('token');
      
      if (token) {
        try {
          // Set the token in the API client
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user data
          const response = await api.get('/user');
          setUser(response.data);
          
          // Ensure both storage methods have the token
          Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
          localStorage.setItem('token', token);
        } catch (error) {
          console.error('Authentication check failed:', error);
          clearAuth();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const clearAuth = () => {
    Cookies.remove('token');
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      
      // Store token in both cookie and localStorage
      Cookies.set('token', response.data.token, { expires: 7, secure: true, sameSite: 'strict' });
      localStorage.setItem('token', response.data.token);
      
      // Set auth header and user state
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    try {
      await api.post('/register', { name, email, password, password_confirmation });
      await login(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};