import React from 'react';
import { Icon } from '@shared';
import { formatNumber } from '@utils';
import './currency.styles.scss';

interface CurrencyProps {
  amount: number;
}

/**
 * Representative component of game currency amount.
 */
export const Currency = ({ amount }: CurrencyProps) =>
  <div className="currency-container">
    <div className="currency-label">
      <Icon name="Money" />
      <span>
      {formatNumber(amount)}
    </span>
    </div>
  </div>;