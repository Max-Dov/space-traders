import { Contract } from '@types';
import { acceptContract as acceptContractRequest } from '@utils';
import { getContract } from '@zustand';

export const acceptContract = async (contractId: Contract['id']) => {
  const response = await acceptContractRequest(contractId);
  if (response !== null) {
    getContract(contractId);
  }
};