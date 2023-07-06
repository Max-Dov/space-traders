import React, { useState } from 'react';
import { Market, Supply } from '@types';
import { Currency, Icon, Input, Tooltip } from '@shared';
import { formatNumber } from '@utils';
import { buyProduct as buyProductAction, useShipsStore } from '@zustand';
import { GOOD_SYMBOL_TO_TAG } from '@constants';
import classNames from 'classnames';

const TRADE_VOLUME_TO_LABEL = {
  [Supply.SCARCE]: 'Scarce',
  [Supply.LIMITED]: 'Limited',
  [Supply.MODERATE]: 'Moderate',
  [Supply.ABUNDANT]: 'Abundant',
};

const getSingleGoodsAndGroupedGoods = (array: Market['imports'] | Market['exports']) => {
  const filteredDataByCategory = GOOD_SYMBOL_TO_TAG.map((obj) =>
    Object.keys(obj).filter((el) => {
      for (let i = 0; i < array.length; i++) {
        if (el === array[i].symbol) {
          return true;
        }
      }
    })
  );

  const singleGoods = filteredDataByCategory
    .filter((el) => el.length === 1)
    .flat()
    .map((el) => {
      for (let i = 0; i < array.length; i++) {
        if (array[i].symbol === el) {
          return array[i];
        }
      }
    });

  const groupedGoods = filteredDataByCategory
    .filter((el) => el.length > 1)
    .flat()
    .map((el) => {
      for (let i = 0; i < array.length; i++) {
        if (array[i].symbol === el) {
          return array[i];
        }
      }
    });

  return { singleGoods, groupedGoods };
};

const getGoodTag = (symbol: string) => {
  const goodTag = GOOD_SYMBOL_TO_TAG
    .filter((obj) => Object.keys(obj).some((el) => el === symbol))[0][symbol]
    .toLowerCase();

  return goodTag;
};

interface MarketOverviewProps {
  market: Market;
}

export const MarketOverview = ({ market }: MarketOverviewProps) => {
  const { imports, exports } = market;
  const shipSymbol = useShipsStore().ships?.[0]?.symbol;

  const { singleGoods: singleImportGoods, groupedGoods: groupedImportGoods } = getSingleGoodsAndGroupedGoods(imports);
  const { singleGoods: singleExportGoods, groupedGoods: groupedExportGoods } = getSingleGoodsAndGroupedGoods(exports);

  return (
    <section className="market-overview">
      <div className="import-export-row">
        <div className="label">
          <Tooltip tooltipText="Exports" isIconTooltip customIcon={<Icon name="Export" />} />
        </div>
        <div className="import-export-icons">
          {groupedExportGoods.map(
            (good) =>
              good && (
                <Tooltip
                  tooltipText={
                    <div className="tooltip-container">
                      <strong>
                        {good.name} 
                        {' '}
                        <i data-tag={getGoodTag(good.symbol)}>({getGoodTag(good.symbol)})</i>
                      </strong>
                      <div>{good.description}</div>
                    </div>
                  }
                  key={good.symbol}
                  omitTextUnderline
                >
                  <img
                    src={`/${good.symbol.toLowerCase()}.webp`}
                    alt={good.symbol.toLowerCase()}
                    className="clickable"
                    data-tag={getGoodTag(good.symbol)}
                  />
                </Tooltip>
              )
          )}
          {singleExportGoods.map(
            (good) =>
              good && (
                <Tooltip
                  tooltipText={
                    <div>
                      <strong>{good.name}</strong>
                      <div>{good.description}</div>
                    </div>
                  }
                  key={good.symbol}
                  omitTextUnderline
                >
                  <img
                    src={`/${good.symbol.toLowerCase()}.webp`}
                    alt={good.symbol.toLowerCase()}
                    className="clickable"
                  />
                </Tooltip>
              )
          )}
        </div>
      </div>
      <div className="import-export-row">
        <div className="label">
          <Tooltip tooltipText="Imports" isIconTooltip customIcon={<Icon name="Import" />} />
        </div>
        <div className="import-export-icons">
          {groupedImportGoods.map(
            (good) =>
              good && (
                <Tooltip
                  tooltipText={
                    <div className="tooltip-container">
                      <strong>
                        {good.name} 
                        {' '}
                        <i data-tag={getGoodTag(good.symbol)}>({getGoodTag(good.symbol)})</i>
                      </strong>
                      <div>{good.description}</div>
                    </div>
                  }
                  key={good.symbol}
                  omitTextUnderline
                >
                  <img
                    src={`/${good.symbol.toLowerCase()}.webp`}
                    alt={good.symbol.toLowerCase()}
                    className="clickable"
                    data-tag={getGoodTag(good.symbol)}
                  />
                </Tooltip>
              )
          )}
          {singleImportGoods.map(
            (good) =>
              good && (
                <Tooltip
                  tooltipText={
                    <div>
                      <strong>{good.name}</strong>
                      <div>{good.description}</div>
                    </div>
                  }
                  key={good.symbol}
                  omitTextUnderline
                >
                  <img
                    src={`/${good.symbol.toLowerCase()}.webp`}
                    alt={good.symbol.toLowerCase()}
                    className="clickable"
                  />
                </Tooltip>
              )
          )}
        </div>
      </div>
      <MarketTable market={market} shipSymbol={shipSymbol} />
    </section>
  );
};

interface MarketTableProps {
  market: Market;
  shipSymbol: string;
}

const MarketTable = ({ market, shipSymbol }: MarketTableProps) => {
  const { tradeGoods } = market;
  const tradeGoodsSymbolToName = market.imports.concat(market.exports).reduce((acc, product) => {
    acc[product.symbol] = product.name;
    return acc;
  }, {} as { [key in any]: string });
  return (
    <table className="market-table">
      <thead>
        <tr>
          <th>Product</th>
          <th className="no-wrap">
            Vol. / Supply <Tooltip tooltipText="Once supply of item changes, trade volume changes." isIconTooltip />
          </th>
          <th>Buy At</th>
          <th>Sell At</th>
        </tr>
      </thead>
      <tbody>
        {tradeGoods.map((tradeGood) => (
          <TradeGoodRow
            key={tradeGood.symbol}
            tradeGood={tradeGood}
            tradeGoodName={tradeGoodsSymbolToName[tradeGood.symbol]}
            shipSymbol={shipSymbol}
          />
        ))}
      </tbody>
    </table>
  );
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
