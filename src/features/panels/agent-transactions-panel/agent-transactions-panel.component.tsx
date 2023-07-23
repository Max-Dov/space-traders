import { Currency, Icon, Panel, Placeholder, Tooltip } from '@shared';
import { CommonFeaturePanelProps, MarketTransaction } from '@types';
import { formatDate, formatNumber } from '@utils';
import {
  closePanel, useAgentsTokensStore,
  useAgentsTransactionsStore,
} from '@zustand';
import React, { useEffect, useState } from 'react';
import './agent-transactions-panel.styles.scss';
import classNames from 'classnames';

interface MyTransactionsPanelProps extends CommonFeaturePanelProps {
}

const useAgentTransactions = () => {
  const [agentTransactions, setAgentTransactions] = useState<Array<MarketTransaction>>([]);
  const { transactions } = useAgentsTransactionsStore();
  const { agentToken } = useAgentsTokensStore();

  useEffect(() => {
    if (agentToken !== null) {
      setAgentTransactions(transactions[agentToken] || []);
    }
  }, [transactions, agentToken]);

  return agentTransactions;
};

/**
 * Returns map of <productSymbol, productName>.
 * Market transactions have info about updated ship cargo where trade goods display names can be obtained.
 */
const useTradeGoodsNames = () => {
  const [names, setNames] = useState<{
    [key in string]: string;
  }>({});
  const marketTransactions = useAgentTransactions();

  useEffect(() => {
    const newNames = { ...names };
    marketTransactions.forEach(transaction => {
      transaction.cargo.inventory.forEach(product => {
        newNames[product.symbol] = product.name;
      });
    });
    setNames(newNames);
  }, [marketTransactions]);

  return names;
};

export const AgentTransactionsPanel = ({
  panelIndex,
  panelId,
}: MyTransactionsPanelProps) => {
  const marketTransactions = useAgentTransactions();
  const tradeGoodsNames = useTradeGoodsNames();

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
      {marketTransactions.length > 0 ? (
        <table className="transactions-table">
          <thead>
          <tr>
            <th className="name">Product</th>
            <th className="numeric-field">Amount</th>
            <th className="no-wrap numeric-field">
              Wallet Change
              {' '}
              <Tooltip isIconTooltip tooltipText={
                <>
                  Red credits stand for buying products,<br />
                  Green credits stand for selling products.
                </>
              } />
            </th>
            <th className="numeric-field">Wallet Total</th>
            <th>Waypoint</th>
            <th>Timestamp</th>
          </tr>
          </thead>
          <tbody>
          {marketTransactions.map((marketTransaction, i) => {
            const { tradeSymbol, units, type, totalPrice, waypointSymbol, timestamp } = marketTransaction.transaction;
            return (
              <tr key={i}>
                <td className="product">{tradeGoodsNames[tradeSymbol]}</td>
                <td className="numeric-field">{formatNumber(units)}</td>
                <td className={classNames('numeric-field', {
                  'buy-transaction': type === 'PURCHASE',
                  'sell-transaction': type === 'SELL',
                })}>
                  <Currency amount={totalPrice} />
                </td>
                <td className="numeric-field"><Currency amount={marketTransaction.agent.credits} /></td>
                <td>{waypointSymbol}</td>
                <td>{formatDate(timestamp, 'HH:mm:SS, DD MMM')}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      ) : (
        <Placeholder>Agent market transactions would be shown there. At the moment there's none!</Placeholder>
      )}
    </Panel>
  );
};
