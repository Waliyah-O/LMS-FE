/* eslint-disable no-undef */
import { toast } from 'react-toastify';
import cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React from 'react';

const isBrowser = typeof window !== 'undefined';
const host = global.window?.location.host;
// const domainParts = host?.split('.');
// domainParts?.shift();
let domain;

if (host) {
  const domainParts = host.split('.');
  if (domainParts.length > 1) {
    domainParts.shift();
    domain = domainParts.join('.');
  } else {
    domain = host;
  }
}

export const getGreeting = () => {
  const date = new Date();
  let greetings = 'Good ';
  if (date.getHours() >= 0 && date.getHours() < 12) greetings += 'Morning';
  else if (date.getHours() >= 12 && date.getHours() < 16) greetings += 'Afternoon';
  else if (date.getHours() >= 16) greetings += 'Evening';
  return greetings;
};

export const getDecodedAccessToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (Error) {
    console.error('Error decoding JWT', Error);
    return null;
  }
};

export const isAuth = () => (_getTokenFromSession() ? true : false);

export const hasAuthority = (token) => {
  const decodedToken = getDecodedAccessToken(token);
  if (!decodedToken) return false; // Token is invalid or expired
  const { role } = decodedToken; // Assuming 'role' is the key for user role in the token
  console.log(role);
  return role.includes('OrganizationAdmin') || role.includes('SuperAdmin');
};


export const _getTokenFromSession = (key) => global.window?.sessionStorage.getItem(key);
export const _removeTokenFromSession = (key) => global.window?.sessionStorage.removeItem(key);
export const _setTokenToSession = (token, name) => global.window?.sessionStorage.setItem(name, token);
export const _setRefreshTokenToSession = (token) => {
  sessionStorage.setItem('refreshToken', JSON.stringify(token));
};
export const _setUserToSession = (data) => {
  sessionStorage.setItem('user', JSON.stringify(data));
};

export const _getTokenFromStorage = (key) => {
  return isBrowser && cookies.get(key);
};

export const _setTokenToStorage = (key, value, expiresAt) => {
  return isBrowser && cookies.set(key, value, { path: '', expires: expiresAt });
};

export const _removeTokenFromStorage = (key) => isBrowser && cookies.remove(key, { domain: domain });

export const generateActions = (action) => {
  action = action.toUpperCase();
  return {
    REQUEST: `${action}_REQUEST`,
    SUCCESS: `${action}_SUCCESS`,
    FAILURE: `${action}_FAILURE`,
  };
};

export const showToast = (message, type, option = {}) => {
  toast.dismiss();
  switch (type?.toLowerCase()) {
    case 'success':
      toast.success(message, option);
      break;
    case 'info':
      toast.info(message, option);
      break;
    case 'loading':
      toast.loading(message, option);
      break;
    case 'warn':
      toast.warn(message, option);
      break;
    case 'error':
      toast.error(message, option);
      break;
    default:
      toast.info(message, option);
      break;
  }
};

export const capitalize = (s) => {
  return typeof s === 'string' ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
};

export const isElement = (element) => {
  return React.isValidElement(element);
};

export const isArray = (data) => data instanceof Array;

export const getInitials = (string) => {
  if (string) {
    const names = string?.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
};

export function calcDate(value) {
  const date1 = new Date();
  const tempDate = new Date(value);
  const diff = Math.floor(date1.getTime() - tempDate.getTime());
  const day = 1000 * 60 * 60 * 24;

  const hours = Math.abs(Math.round(diff / (1000 * 60 * 60)));
  const days = Math.floor(diff / day);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);

  let message = '';

  if (years > 0) {
    message = years + ' years';
  } else if (months > 0) {
    message = months + ' months ';
  } else if (days > 1) {
    message = days + ' days';
  } else if (day === 1) {
    message = '1 day';
  } else if (hours > 1) {
    message = hours + ' hours';
  } else {
    message = '1 hour';
  }
  return message;
}
