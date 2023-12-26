import { Activity, Market, Supply } from '@types';
import React, { useState } from 'react';
import { buyProduct as buyProductAction } from '@zustand';
import classNames from 'classnames';
import { formatNumber } from '@utils';
import { Currency, Icon, Input, Tooltip } from '@shared';

const TRADE_VOLUME_TO_LABEL = {
  [Supply.SCARCE]: 'Scarce',
  [Supply.LIMITED]: 'Limited',
  [Supply.MODERATE]: 'Moderate',
  [Supply.ABUNDANT]: 'Abundant',
};

const TRADE_ACTIVITY_TO_LABEL = {
  [Activity.GROWING]: 'Growing',
  [Activity.STRONG]: 'Strong',
  [Activity.WEAK]: 'Weak',
  [Activity.RESTRICTED]: 'Restricted',
};

interface TradeGoodRowProps {
  tradeGood: Market['tradeGoods'][number];
  tradeGoodName?: string;
  shipSymbol: string;
}

export const TradeGoodRow = ({ tradeGood, tradeGoodName, shipSymbol }: TradeGoodRowProps) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false);
  const [buyAmount, setBuyAmount] = useState<number>(1);
  const [sellAmount, setSellAmount] = useState<number>(1);

  const buyProduct = () => {
    buyProductAction(tradeGood.symbol, buyAmount, shipSymbol);
    setBuyAmount(1);
  };

  const sellProduct = () => {
    // todo implement logic
    setSellAmount(1);
  };

  return (
    <>
      <tr
        className={classNames({ 'is-expanded': isRowExpanded })}
        onClick={() => setIsRowExpanded(!isRowExpanded)}
        tabIndex={0}
      >
        <td>
          <div className="good-name-with-icon">
            <img src={`/${tradeGood.symbol.toLowerCase()}.webp`} alt={tradeGood.symbol.toLowerCase()} />
            {tradeGoodName || tradeGood.symbol.toLowerCase()}
          </div>
        </td>
        <td className="no-wrap">
          {formatNumber(tradeGood.tradeVolume)}
          {' '}
          ({TRADE_VOLUME_TO_LABEL[tradeGood.supply]}, {TRADE_ACTIVITY_TO_LABEL[tradeGood.activity]})
        </td>
        <td className="numeric-field">
          <Currency amount={tradeGood.purchasePrice} />
        </td>
        <td className="numeric-field">
          <Currency amount={tradeGood.sellPrice} />
        </td>
      </tr>
      {isRowExpanded && (
        <>
          <tr className="trade-row">
            <td colSpan={4}>
              <div className="action">
                <Icon name="ArrowElbowDownRight" className="arrow-icon" />
                <span className="no-wrap">
                  <span className="action-word">Buy</span> {tradeGoodName}
                  {'. '}
                </span>
                <span className="no-wrap">
                  1<Tooltip isIconTooltip customIcon={<Icon name="Package" />} tooltipText="Unit" />
                  {' = '}
                  <Currency amount={tradeGood.purchasePrice} />
                  {'. '}
                </span>
                <span className="trade-amount-input-wrapper">
                  Amount:
                  <Input
                    id="amount"
                    className="trade-amount-input inline-input"
                    value={String(buyAmount)}
                    onChange={(amount) => setBuyAmount(Number(amount))}
                  />
                  <button className="action-button" onClick={buyProduct}>
                    Buy {buyAmount}
                    <Icon name="Package" />
                    {' for '}
                    <Currency amount={tradeGood.purchasePrice * buyAmount} />
                  </button>
                </span>
              </div>
            </td>
          </tr>
          <tr className="trade-row">
            <td colSpan={4}>
              <div className="action">
                <Icon name="ArrowElbowDownRight" className="arrow-icon" />
                <span>
                  <span className="action-word">Sell</span> {tradeGoodName}
                  {'. '}
                </span>
                <span>
                  1<Tooltip isIconTooltip customIcon={<Icon name="Package" />} tooltipText="Unit" />
                  {' = '}
                  <Currency amount={tradeGood.sellPrice} />
                  {'. '}
                </span>
                <span className="trade-amount-input-wrapper">
                  Amount:
                  <Input
                    id="amount"
                    className="trade-amount-input inline-input"
                    value={String(sellAmount)}
                    onChange={(amount) => setSellAmount(Number(amount))}
                  />
                  <button className="action-button" onClick={sellProduct}>
                    <span>Sell {sellAmount}</span>
                    <Icon name="Package" />
                    {' for '}
                    <Currency amount={tradeGood.sellPrice * sellAmount} />
                  </button>
                </span>
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  );
};