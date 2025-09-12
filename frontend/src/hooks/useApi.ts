import { useState, useCallback } from 'react';
import { api } from '../lib/api';

type ApiFunction<T, P extends any[]> = (...args: P) => Promise<T>;

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  initialData?: T | null;
}

export function useApi<T, P extends any[]>(
  apiFunction: ApiFunction<T, P>,
  options: UseApiOptions<T> = {}
) {
  const { onSuccess, onError, initialData = null } = options;
  
  const [data, setData] = useState<T | null>(initialData);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: P) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await apiFunction(...args);
        setData(result);
        if (onSuccess) onSuccess(result);
        return result;
      } catch (err) {
        setError(err);
        if (onError) onError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, onSuccess, onError]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { data, error, isLoading, execute, clearError };
}

// Example usage:
// const { data, error, isLoading, execute: fetchUser } = useApi(api.getCurrentUser);
// const { execute: loginUser } = useApi(api.login, {
//   onSuccess: (data) => {
//     // Handle successful login
//   },
//   onError: (error) => {
//     // Handle login error
//   },
// });
