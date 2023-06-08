import { fetchFullList } from '@utils/fetch-full-list.util';
import { ApiUrls } from '@constants';
import { useContractsStore } from '@zustand';
import { Contract } from '@types';

/**
 * Loads all contracts assigned to me.
 */
export const getAllContracts = async () => {
  const contracts = await fetchFullList<Contract>(ApiUrls.MY_CONTRACTS);
  if (contracts !== null) {
    useContractsStore.setState({ contracts });
  }
};