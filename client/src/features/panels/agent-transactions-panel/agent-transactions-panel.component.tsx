import { Currency, Icon, Panel, Placeholder } from '@shared';
import { CommonFeaturePanelProps } from '@types';
import { formatDate, formatNumber } from '@utils';
import {
  closePanel,
  useMyAgentDetailsStore,
  useMyTransactionsStore,
} from '@zustand';
import React from 'react';
import './agent-transactions-panel.styles.scss';

interface MyTransactionsPanelProps extends CommonFeaturePanelProps {}

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
        <table className="my-transactions-table">
          <thead>
            <tr>
              <th className="name">Product</th>
              <th className="aline-right">Amount</th>
              <th className="aline-right">Wallet Total</th>
              <th className="aline-right">Total</th>
              <th>Waypoint</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions[agentDetails.symbol].map((transaction, i) => (
              <tr key={i}>
                <td className="name">
                  {tradeGoodsSymbolToName[transaction.transaction.tradeSymbol]}
                </td>
                <td className="aline-right">{formatNumber(transaction.transaction.units)}</td>
                <td className="aline-right" style={{color: transaction.transaction.type === 'PURCHASE' ? '#ED264E' : '#26ED4A'}}>
                  <Currency amount={transaction.transaction.totalPrice} />
                </td>
                <td className="aline-right"><Currency amount={transaction.agent.credits} /></td>
                <td>{transaction.transaction.waypointSymbol}</td>
                <td>
                  {formatDate(
                    transaction.transaction.timestamp,
                    'HH:mm, DD.MO.YYYY'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Placeholder>No data available.</Placeholder>
      )}
    </Panel>
  );
};
