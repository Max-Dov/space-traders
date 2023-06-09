import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Currency, Window } from '@shared';
import { getAllContracts, useContractsStore } from '@zustand';
import { Contract } from '@types';
import './contracts-panel.styles.scss';

export const ContractsPanel = () => {
  const { contracts } = useContractsStore();

  useEffect(() => {
    getAllContracts();
  }, []);

  return <Window header={<>
    <span>CONTRACTS</span>
    {' '}
    <span className="contracts-amount">({contracts.length})</span>
  </>} className="contracts-panel">
    {contracts.map(contract => <ContractInfo contract={contract} key={contract.id} />)}
  </Window>;
};

interface ContractInfoProps {
  contract: Contract;
}

const ContractInfo = ({ contract }: ContractInfoProps) => {
  const { onAccepted, onFulfilled } = contract.terms.payment;
  const profit = onAccepted + onFulfilled;
  return <section className={classNames('contract-container',
    {
      'is-accepted': contract.accepted,
      'is-pending': !contract.accepted,
    })}>
    <div className="main-details">
      <span className="type">{contract.type}</span>
      <span className={classNames('faction', contract.factionSymbol.toLowerCase())}>[{contract.factionSymbol}]</span>
      <span className="profit">
        <Currency amount={profit} />
      </span>
    </div>
    <div className="secondary-details">
    </div>
  </section>;
};