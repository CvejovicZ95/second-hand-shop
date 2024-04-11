const API_BASE_URL = 'http://localhost:4000';

export const loginUser = async (username, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ username, password }) 
    });
    const data = await res.json();
    if (data.error) {
      if (data.error === 'Invalid username or password') {
        throw new Error('Incorrect username or password');
      } else {
        throw new Error(data.error);
      }
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const registerUser = async ({ firstLastName, username, password, confirmPassword, email, phoneNumber }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ firstLastName, username, password, confirmPassword, email, phoneNumber }) 
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
