import { Currency, Icon, Panel, Placeholder, Tooltip } from '@shared';
import { CommonFeaturePanelProps } from '@types';
import { formatDate, formatNumber } from '@utils';
import {
  closePanel,
  useMyAgentDetailsStore,
  useMyTransactionsStore,
} from '@zustand';
import React from 'react';
import './agent-transactions-panel.styles.scss';
import classNames from 'classnames';

interface MyTransactionsPanelProps extends CommonFeaturePanelProps {
}

export const AgentTransactionsPanel = ({
  panelIndex,
  panelId,
}: MyTransactionsPanelProps) => {
  const { transactions } = useMyTransactionsStore();
  const { agentDetails } = useMyAgentDetailsStore();

  let tradeGoodsSymbolToName = {} as { [key in any]: string };

  if (agentDetails && transactions[agentDetails.symbol]) {
    tradeGoodsSymbolToName = transactions[
      agentDetails.symbol
      ][0].cargo.inventory.reduce((acc, product) => {
      acc[product.symbol] = product.name;
      return acc;
    }, {} as { [key in any]: string });
  }

  return (
    <Panel
      className="agent-transactions-panel"
      panelTitle="AGENT TRANSACTIONS"
      panelButtons={
        <div className="flex-row">
          <button className="inline-button" onClick={() => closePanel(panelId)}>
            <Icon name="Close" />
          </button>
        </div>
      }
      draggableProps={{ index: panelIndex, draggableIdAndKey: panelId }}
    >
      {agentDetails &&
      agentDetails.symbol &&
      transactions[agentDetails.symbol] ? (
        <table className="transactions-table">
          <thead>
          <tr>
            <th className="name">Product</th>
            <th>Amount</th>
            <th className="no-wrap">
              Wallet Change
              {' '}
              <Tooltip isIconTooltip tooltipText={
                <>
                  Red credits stand for buying products<br />
                  Green markers stand for gaining credits.
                </>
              } />
            </th>
            <th>Wallet Total</th>
            <th>Waypoint</th>
            <th>Timestamp</th>
          </tr>
          </thead>
          <tbody>
          {transactions[agentDetails.symbol].map((transaction, i) => (
            <tr key={i}>
              <td className="product">
                {tradeGoodsSymbolToName[transaction.transaction.tradeSymbol]}
              </td>
              <td className="numeric-field">{formatNumber(transaction.transaction.units)}</td>
              <td className={classNames('numeric-field', {
                'buy-transaction': transaction.transaction.type === 'PURCHASE',
                'sell-transaction': transaction.transaction.type === 'SELL',
              })}>
                <Currency amount={transaction.transaction.totalPrice} />
              </td>
              <td className="numeric-field"><Currency amount={transaction.agent.credits} /></td>
              <td>{transaction.transaction.waypointSymbol}</td>
              <td>
                {formatDate(
                  transaction.transaction.timestamp,
                  'HH:mm:SS, DD MMM',
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <Placeholder>Agent market transactions would be shown there. At the moment there's none!</Placeholder>
      )}
    </Panel>
  );
};
