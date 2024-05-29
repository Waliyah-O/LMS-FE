import React, { useState } from 'react';
import { identityService } from '../services';

const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await identityService.logout();
      window.location.replace('/signin');
      //   window.location.replace(process.env.REACT_APP_LOGIN_URL);
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle logout errors if needed
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
