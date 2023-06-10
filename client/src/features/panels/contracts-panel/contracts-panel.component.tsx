import React from 'react';
import classNames from 'classnames';
import { Currency, Icon, Window } from '@shared';
import { acceptContract, getAllContracts, useContractsStore } from '@zustand';
import { Contract } from '@types';
import { formatNumber, formatTimeLeft, useAuthorizedEffect } from '@utils';
import './contracts-panel.styles.scss';

export const ContractsPanel = () => {
  const { contracts } = useContractsStore();

  useAuthorizedEffect(() => {
    if (contracts.length === 0) {
      getAllContracts();
    }
  }, [contracts]);

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
  const { deadlineToAccept, terms, accepted, id } = contract;
  const { deadline, payment, deliver } = terms;
  const { onAccepted, onFulfilled } = payment;
  const timeLeftToComplete = new Date(deadline).getTime() - new Date().getTime();
  const timeLeftToAccept = new Date(deadlineToAccept).getTime() - new Date().getTime();
  const profit = onAccepted + onFulfilled;
  return <section className={classNames('contract-container',
    {
      'is-accepted': contract.accepted,
      'is-pending': !contract.accepted,
    })}>
    <div className="header-details">
      <span className="type">{contract.type}</span>
      <span className={classNames('faction', contract.factionSymbol.toLowerCase())}>[{contract.factionSymbol}]</span>
      <span className="profit">
        <Currency amount={profit} />
      </span>
    </div>
    <div className="todo-info">
      {deliver.map(deliveryItem =>
        <DeliveryItem
          {...deliveryItem}
          key={`${deliveryItem.tradeSymbol}${deliveryItem.destinationSymbol}`}
          isContractAccepted={accepted}
        />,
      )}
    </div>
    <div className="timing-details">
      <div>
        <span className="label">Time to complete:</span>
        {' '}
        <span>{formatTimeLeft(timeLeftToComplete)}</span>
      </div>
      <div className="payment-details">
        <div>On accept: <Currency amount={onAccepted} /></div>
        <div>On fulfill: <Currency amount={onFulfilled} /></div>
      </div>
    </div>
    {!accepted && <button className="accept-button" onClick={() => acceptContract(id)}>
        ACCEPT ({formatTimeLeft(timeLeftToAccept)})
    </button>}
  </section>;
};

type DeliveryItemModel = Contract['terms']['deliver'][number];

interface DeliveryItemProps extends DeliveryItemModel {
  isContractAccepted: Contract['accepted'];
}

const DeliveryItem = ({
  tradeSymbol,
  destinationSymbol,
  unitsRequired,
  unitsFulfilled,
  isContractAccepted,
}: DeliveryItemProps) => {
  const unitsFulfilledFormatted = formatNumber(unitsFulfilled);
  const unitsRequiredFormatted = formatNumber(unitsRequired);

  return <div className="delivery-item">
    <span>
      {isContractAccepted && <span><strong className="amount">{unitsFulfilledFormatted}</strong> / </span>}
      <span className="amount">{unitsRequiredFormatted}</span> {tradeSymbol}
    </span>
    <Icon name="ArrowRight" />
    <span className="destination">
      {destinationSymbol}
    </span>
  </div>;
};