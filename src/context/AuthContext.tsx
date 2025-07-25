'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { authenticateUser, addUser, getUserByEmail, MockUser } from '@/utils/mockDb';
import { useToast } from './ToastContext';

interface AuthContextType {
  isAuthenticated: boolean;
  user: MockUser | null;
  showAuthModal: boolean;
  pendingAction: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  openAuthModal: (action: string) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  showAuthModal: false,
  pendingAction: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  resetPassword: async () => false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<MockUser | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to restore session:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = authenticateUser(email, password);

      setUser(userData);
      setIsAuthenticated(true);
      setShowAuthModal(false);
      setPendingAction(null);

      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      showToast({
        type: 'login',
        message: `Welcome back, ${userData.name}!`
      });
    } catch (error) {
      console.error('Login failed:', error);
      showToast({
        type: 'error',
        message: 'Login failed. Please check your credentials.'
      });
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = addUser({
        name,
        email,
        password
      });

      setUser(userData);
      setIsAuthenticated(true);
      setShowAuthModal(false);
      setPendingAction(null);

      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      showToast({
        type: 'success',
        message: `Account created! Welcome to GameRight, ${userData.name}!`
      });
    } catch (error) {
      console.error('Signup failed:', error);
      showToast({
        type: 'error',
        message: 'Failed to create account. Please try again.'
      });
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('currentUser');
    
    showToast({
      type: 'logout',
      message: 'You have been signed out successfully'
    });
  };

  const openAuthModal = (action: string) => {
    setPendingAction(action);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setPendingAction(null);
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { resetPassword: resetPasswordInDb } = await import('@/utils/mockDb');
      const result = resetPasswordInDb(email);
      
      if (result) {
        showToast({
          type: 'success',
          message: 'Password reset link sent to your email'
        });
      } else {
        showToast({
          type: 'error',
          message: 'Account not found with that email'
        });
      }
      
      return result;
    } catch (error) {
      console.error('Password reset failed:', error);
      showToast({
        type: 'error',
        message: 'Password reset failed. Please try again later.'
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        showAuthModal,
        pendingAction,
        login,
        signup,
        logout,
        resetPassword,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
