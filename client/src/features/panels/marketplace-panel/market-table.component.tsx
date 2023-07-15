import { Market, Supply } from '@types';
import { Currency, Icon, Input, Table, Tooltip } from '@shared';
import React, { useState } from 'react';
import { buyProduct as buyProductAction } from '@zustand';
import classNames from 'classnames';
import { formatNumber } from '@utils';

const TRADE_VOLUME_TO_LABEL = {
  [Supply.SCARCE]: 'Scarce',
  [Supply.LIMITED]: 'Limited',
  [Supply.MODERATE]: 'Moderate',
  [Supply.ABUNDANT]: 'Abundant',
};

interface MarketTableProps {
  market: Market;
  shipSymbol: string;
}

export const MarketTable = ({ market, shipSymbol }: MarketTableProps) => {
  const { tradeGoods } = market;
  const tradeGoodsSymbolToName = market.imports.concat(market.exports).reduce((acc, product) => {
    acc[product.symbol] = product.name;
    return acc;
  }, {} as { [key in any]: string });

  return <Table
    id={`market-table-${market.symbol}`}
    className="market-table"
    tableName="Market"
    records={tradeGoods}
    recordsPerPage={10}
    columns={[{
      id: 'product',
      getHeader: () => <th>Product</th>,
      getFilterValue: (tradeGood) => tradeGoodsSymbolToName[tradeGood.symbol],
      isSortable: true,
    }, {
      id: 'volume-and-supply',
      getHeader: () => <th className="no-wrap">
        Vol. / Supply <Tooltip tooltipText="Once supply of item changes, trade volume changes." isIconTooltip />
      </th>,
      getFilterValue: (tradeGood) => String(tradeGood.tradeVolume),
      isSortable: true,
    }, {
      id: 'buy-at',
      getHeader: () => <th>Buy At</th>,
      getFilterValue: (tradeGood) => String(tradeGood.purchasePrice),
      isSortable: true,
    }, {
      id: 'sell-at',
      getHeader: () => <th>Sell At</th>,
      getFilterValue: (tradeGood) => String(tradeGood.sellPrice),
      isSortable: true,
    }]}
    renderRow={(tradeGood) =>
      <TradeGoodRow
        key={tradeGood.symbol}
        tradeGood={tradeGood}
        tradeGoodName={tradeGoodsSymbolToName[tradeGood.symbol]}
        shipSymbol={shipSymbol}
      />
    }
  />;
};

interface TradeGoodRowProps {
  tradeGood: Market['tradeGoods'][number];
  tradeGoodName?: string;
  shipSymbol: string;
}

const TradeGoodRow = ({ tradeGood, tradeGoodName, shipSymbol }: TradeGoodRowProps) => {
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
          {formatNumber(tradeGood.tradeVolume)} ({TRADE_VOLUME_TO_LABEL[tradeGood.supply]})
        </td>
        <td>
          <Currency amount={tradeGood.purchasePrice} />
        </td>
        <td>
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
                    className="trade-amount-input"
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
                    className="trade-amount-input"
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
