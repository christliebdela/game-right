import { useAuth } from '@/context/AuthContext';

export function useRequireAuth() {
  const { isAuthenticated, openAuthModal } = useAuth();

  const requireAuth = (action: string, callback: () => void) => {
    if (isAuthenticated) {
      callback();
    } else {
      openAuthModal(action);
    }
  };

  return requireAuth;
}
