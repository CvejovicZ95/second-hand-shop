import {toast} from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';
import {setCookie} from './useSetCookie';
import { loginUser } from '../api/usersApi';

const useLogin = () => {
  const { login } = useAuthContext();

  const loginHandler = async (username, password) => {
    const success = handleErrors({ username, password });
    if (!success) return;

    try {
      const data = await loginUser(username, password);
      login(data);
      setCookie('token', data.token, 30);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { loginHandler };
};

export { useLogin };

function handleErrors({ username, password }) {
  return username && password ? true : (toast.error('Please fill in fields'), false);
}
