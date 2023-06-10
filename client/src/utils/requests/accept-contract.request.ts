import { Contract } from '@types';
import { makeApiRequest } from '@utils';
import { ApiUrls } from '@constants';

export const acceptContract = (contractId: Contract['id']) =>
  makeApiRequest<void>({
    method: 'POST',
    url: ApiUrls.ACCEPT_CONTRACT,
    urlParams: { contractId },
  });