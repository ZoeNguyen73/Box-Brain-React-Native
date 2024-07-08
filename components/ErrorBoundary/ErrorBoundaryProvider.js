import { ErrorBoundary } from "react-error-boundary";
import FallBack from "./FallBack";

const ErrorBoundaryProvider = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallBack}
    >
      {children}
    </ErrorBoundary>
  )
};

export default ErrorBoundaryProvider;