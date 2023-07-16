import { Market } from '@types';
import {  Table, Tooltip } from '@shared';
import React from 'react';
import { TradeGoodRow } from './trade-good-row.component';

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
    tableName="MARKET"
    records={tradeGoods}
    recordsPerPage={10}
    enableSorting
    enableFiltering
    columns={[{
      id: 'product',
      getHeader: () => 'Product',
      getFilterValue: (tradeGood) => tradeGoodsSymbolToName[tradeGood.symbol],
      isSortable: true,
    }, {
      id: 'volume-and-supply',
      getHeader: () => <div className="no-wrap">
        Vol. / Supply <Tooltip tooltipText="Once supply of item changes, trade volume changes." isIconTooltip />
      </div>,
      getFilterValue: (tradeGood) => String(tradeGood.tradeVolume),
      isSortable: true,
    }, {
      id: 'buy-at',
      getHeader: () => <div className="numeric-field width-100">Buy At</div>,
      getFilterValue: (tradeGood) => String(tradeGood.purchasePrice),
      isSortable: true,
    }, {
      id: 'sell-at',
      getHeader: () => <div className="numeric-field width-100">Sell At</div>,
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
