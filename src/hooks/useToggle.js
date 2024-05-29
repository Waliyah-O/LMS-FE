import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return { isVisible, toggleVisibility };
};

export default useToggle;
