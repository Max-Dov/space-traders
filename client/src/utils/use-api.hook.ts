import { useEffect, useState } from 'react';

/**
 * Use API data via request function.
 */
export const useApi = <ApiResponse = unknown>(
  apiRequestFunction: () => Promise<ApiResponse>,
): ApiResponse | null => {
  const [response, setResponse] = useState<ApiResponse | null>(null);

  useEffect(() => {
    apiRequestFunction().then(setResponse);
  }, [apiRequestFunction]);

  return response;
};