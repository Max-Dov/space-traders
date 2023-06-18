import React from 'react';
import { Market } from '@types';
import { Icon, Tooltip } from '@shared';

interface MarketOverviewProps {
  market: Market;
}

export const MarketOverview = ({ market }: MarketOverviewProps) => {
  const { imports, exports } = market;

  return (
    <section className="market-overview">
      <div className="import-export-row">
        <div className="label">
          <Tooltip tooltipText="Exports" isIconTooltip customIcon={<Icon name="Export" />} />
        </div>
        <div className="import-export-icons">
          {exports.map(good =>
            <Tooltip tooltipText={good.description} key={good.symbol} omitTextUnderline>
              <img src={`/ammonia_ice.webp`} alt={good.symbol.toLowerCase()} />
              {/*<img src={`/${good.symbol.toLowerCase()}.webp`} alt={good.symbol.toLowerCase()} />*/}
            </Tooltip>)}
        </div>
      </div>
      <div className="import-export-row">
        <div className="label">
          <Tooltip tooltipText="Imports" isIconTooltip customIcon={<Icon name="Import" />} />
        </div>
        <div className="import-export-icons">
          {imports.map(good =>
            <Tooltip tooltipText={good.description} key={good.symbol} omitTextUnderline>
              <img src={`/ammonia_ice.webp`} alt={good.symbol.toLowerCase()} />
              {/*<img src={`/${good.symbol.toLowerCase()}.webp`} alt={good.symbol.toLowerCase()} />*/}
            </Tooltip>)}
        </div>
      </div>
      <MarketTable market={market} />
    </section>
  );
};

interface MarketTableProps {
  market: Market;
}

const MarketTable = ({ market }: MarketTableProps) => {
  const { tradeGoods } = market;
  return <table className="market-table">
    <thead>
    <tr>
      <th>Product</th>
      <th>
        Volume / Supply
        {' '}
        <Tooltip tooltipText="Once supply of item changes, trade volume changes." isIconTooltip />
      </th>
      <th>Buy At</th>
      <th>Sell At</th>
    </tr>
    </thead>
    <tbody>
    {
      tradeGoods.map(tradeGood => {
        return <tr>
          <td>
            <img src={`/ammonia_ice.webp`} alt={tradeGood.symbol.toLowerCase()} />
            {/*<img src={`/${tradeGood.symbol.toLowerCase()}.webp`} alt={tradeGood.symbol.toLowerCase()} />*/}
            {tradeGood.symbol.toLowerCase()}
          </td>
        </tr>
      })
    }
    </tbody>
  </table>;
};