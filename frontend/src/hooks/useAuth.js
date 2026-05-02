import { useSelector } from 'react-redux';

const useAuth = () => {
  const { user, token, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isAdmin: user?.role === 'ADMIN',
  };
};

export default useAuth;
