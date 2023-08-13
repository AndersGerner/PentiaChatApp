import React, { createContext, useContext, useState } from 'react';

type ErrorContextType = {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

// Create a context for error handling
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

type ErrorProviderProps = {
  children: React.ReactNode;
};

/**
 * ErrorProvider component wraps its children with an error context provider.
 * This allows child components to set and access the current error state.
 */
export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

/**
 * useError is a custom hook that provides access to the error context.
 * It allows components to get and set the current error state.
 * @throws Error if used outside of an ErrorProvider.
 * @returns The error context with the current error state and a setter function.
 */
export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
