import React, { useState, ReactElement, useCallback } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorModal from './ErrorModal';

type ErrorBoundaryWrapperProps = {
  children: ReactElement | ReactElement[]; // Children components that the error boundary will wrap
};

/**
 * ErrorBoundaryWrapper is a component that wraps its children with an error boundary.
 * In case of any error in the child components, it displays an ErrorModal with the error message.
 */
const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);

  // Handler to close the error modal
  const handleErrorClose = () => {
    setError(null);
  };

  // Custom fallback component to display when there's an error
  const ErrorFallbackComponent = useCallback(
    (props: { error: Error }) => {
      setError(props.error.message);
      return (
        <ErrorModal
          isVisible={!!error}
          message={error || ''}
          onClose={handleErrorClose}
        />
      );
    },
    [error],
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
