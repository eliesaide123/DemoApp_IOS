import { useState } from 'react';

export const useAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const showAlert = (errorMsg: string) => {
    setErrorMessage(errorMsg);
    setIsVisible(true);
  };

  const hideAlert = () => {
    setIsVisible(false);
    setErrorMessage(''); // Reset error message after hiding
  };

  return {
    isVisible,
    errorMessage,
    showAlert,
    hideAlert,
  };
};
