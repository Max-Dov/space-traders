import { Contract } from '@types';
import { getContract as getContractRequest } from '@utils';
import { useContractsStore } from '@zustand';

export const getContract = async (contractId: Contract['id']) => {
  const contract = await getContractRequest(contractId);
  if (contract !== null) {
    const contracts = [...useContractsStore.getState().contracts];
    const contractIndex = contracts.findIndex(contract => contract.id === contractId);
    if (contractIndex !== -1) {
      contracts[contractIndex] = contract;
      useContractsStore.setState({ contracts });
    } else {
      console.warn('Weird: could not find contract index.');
    }
  }
};