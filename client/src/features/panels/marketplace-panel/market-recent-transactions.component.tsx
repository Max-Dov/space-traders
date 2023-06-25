import { Currency } from '@shared';
import { Market } from '@types';
import { formatDate, formatNumber } from '@utils';
import React from 'react';
import classNames from 'classnames';

interface MarketRecentTransactionsProps {
  market: Market;
}
export const MarketRecentTransactions = ({
  market,
}: MarketRecentTransactionsProps) => {
  const tradeGoodsSymbolToName = market.imports
    .concat(market.exports)
    .reduce((acc, product) => {
      acc[product.symbol] = product.name;
      return acc;
    }, {} as { [key in any]: string });

  return (
    <table className='recent-transactions-table'>
      <thead>
        <tr>
          <th>Product</th>
          <th className="numeric-field">Amount</th>
          <th className="numeric-field">Total Price</th>
          <th>Ship</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {market.transactions.map((transaction) => (
          <tr>
            <td>{tradeGoodsSymbolToName[transaction.tradeSymbol]}</td>
            <td className="numeric-field">{formatNumber(transaction.units)}</td>
            <td
              className={classNames('numeric-field', {
                'buy-transaction': transaction.type === 'PURCHASE',
                'sell-transaction': transaction.type === 'SELL',
              })}
            >
              <Currency amount={transaction.totalPrice} />
            </td>
            <td>{transaction.shipSymbol}</td>
            <td>{formatDate(transaction.timestamp, 'HH:mm:SS, DD MMM')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
