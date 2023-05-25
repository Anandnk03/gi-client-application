import { API_URL } from '../config/config';
import axios from 'axios';

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem('token');
  if (!tokenDetailsString) {
    // dispatch(logout(history));
    alert('logout');
    return;
  }
}

export const isAuthenticated = () => {
  let token = localStorage.getItem('token');
  if (token) return true;
  return false;
};

export const Logout = () => {
  // let isConfirmed = window.confirm('Do you really want to logout ?');
  // if (!isConfirmed) return;
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const handleAPILogin = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(`${API_URL}auth/login`, token, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handleAPIRegister = async (token, fname, lname, email) => {
  try {
    const headers = {
      Authorization: `${token}`,
    };
    const body = {
      OAuth: `${token}`,
      fname,
      lname,
      email,
    };

    const response = await axios.post(`${API_URL}auth/signup`, body, {
      headers,
    });
    return response.data.token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
