import { create } from 'zustand';

interface Request {
  id: string;
  url: string;
  method: string;
  /**
   * Response code.
   */
  response: number | 'no internet' | null;
  errorMessage?: string;
}


interface NetworkStore {
  requests: Array<Request>;
  addRequest: (request: Request) => void;
  updateRequest: (request: Request) => void;
}

export const useNetworkStore = create<NetworkStore>()((set, get) => ({
  requests: [],
  addRequest: (request) => {
    set({
      requests: [...get().requests, request],
    });
  },
  updateRequest: (updatedRequest) => {
    const requests = [...get().requests];
    const requestIndex = requests.findIndex(request => request.id === updatedRequest.id);
    if (requestIndex !== -1) {
      requests[requestIndex] = updatedRequest;
      set({
        requests,
      });
    }
  },
}));