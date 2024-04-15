import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import {registerUser} from "../api/usersApi.js" 
import { useState } from 'react';
import { setCookie } from './useSetCookie';

export const useRegister = () => {
  const [registration, setRegistration] = useState(false);
  const { register } = useAuthContext();

  const registerClient = async ({ firstLastName, username, password, confirmPassword, email, phoneNumber }) => {
    const success = handleErrors({ firstLastName, username, password, confirmPassword, email, phoneNumber });
    if (!success) return;

    try {
      const data = await registerUser({ firstLastName, username, password, confirmPassword, email, phoneNumber });
      register(data)
      setCookie('token', data.token, 30);
      setRegistration(true);
    } catch (error) {
      setRegistration(false);
      toast.error(error.message);
    }
  };

  return { registration, registerClient };
};

function handleErrors({ firstLastName, username, password, confirmPassword, email, phoneNumber }) {
  if (!firstLastName || !username || !password || !confirmPassword || !email || !phoneNumber) {
    toast.error('Please fill in all fields');
    return false;
  }
  if (password !== confirmPassword || password.length < 6 || username.length < 4 || firstLastName.length < 5 || phoneNumber.length < 8) {
    toast.error(
      password !== confirmPassword ? 'Passwords do not match' :
      password.length < 6 ? 'Password must be at least 6 characters' :
      username.length < 4 ? 'Username must be at least 4 characters' :
      firstLastName.length < 5 ? 'Please enter full first and last name' :
      phoneNumber.length < 8 ? 'Please enter valid phone number' : ''
    );
    return false;
  }
  return true;
}
