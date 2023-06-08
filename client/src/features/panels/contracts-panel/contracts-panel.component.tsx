import React, { useEffect } from 'react';
import { Window } from '@shared';
import { getAllContracts } from '@zustand';

export const ContractsPanel = () => {

  useEffect(() => {
    getAllContracts()
  }, [])

  return <Window header="CONTRACTS">
    ?
  </Window>
}