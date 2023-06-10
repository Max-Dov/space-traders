import { makeApiRequest } from '@utils';
import { ApiUrls } from '@constants';
import { Contract } from '@types';

interface Response {
  data: Contract;
}

export const getContract = async (contractId: Contract['id']) => {
  const response = await makeApiRequest<Response>({
    url: ApiUrls.GET_CONTRACT,
    method: 'GET',
    urlParams: { contractId },
  })
  return response === null ? null : response.data;
}