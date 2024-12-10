import { alert } from '@nativescript/core';

export const handleError = async (error: any, title = 'Error'): Promise<void> => {
  const message = error.message || 'An unknown error occurred';
  
  await alert({
    title,
    message,
    okButtonText: 'OK'
  });
};

export const showConfirmation = async (
  message: string,
  title = 'Confirm',
  okButtonText = 'Yes',
  cancelButtonText = 'No'
): Promise<boolean> => {
  return new Promise((resolve) => {
    alert({
      title,
      message,
      okButtonText,
      cancelButtonText
    }).then((result) => resolve(result));
  });
};