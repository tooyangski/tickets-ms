import axios from 'axios';

const API_URL = '/api/users';

// register user API
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);

  // wrap the response.data because localStorage can only hold string.
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

  // wrap the response.data because localStorage can only hold string.
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

// register every API call to authService
const authService = {
  register,
  logout,
  login,
};

export default authService;
