import { create } from 'zustand';
import { Contract } from '@types';

interface ContractsStore {
  contracts: Array<Contract>;
}

export const useContractsStore = create<ContractsStore>()(() => ({
  contracts: [],
}));