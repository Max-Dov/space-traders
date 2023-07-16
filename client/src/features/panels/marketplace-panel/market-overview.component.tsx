import React, { ReactNode } from 'react';
import { Market } from '@types';
import { Icon, Tooltip } from '@shared';
import { useShipsStore } from '@zustand';
import { MarketSection, TradeGoodsSymbols } from '@constants';
import classNames from 'classnames';
import { generateMarketSections } from './generate-market-sections.util';
import { MarketTable } from './market-table.component';

const MARKET_SECTION_TO_LABEL = {
  [MarketSection.WEAPONRY]: 'Weaponry',
  [MarketSection.COMPONENTS]: 'Components',
  [MarketSection.INDUSTRY_AND_SCIENCE]: 'Industry and Science',
  [MarketSection.RAW_MATERIALS]: 'Raw Materials',
  [MarketSection.SHIP_MODULES]: 'Ship Modules',
  [MarketSection.CIVILIAN_SUPPLIES]: 'Civilian Supplies',
};

interface MarketOverviewProps {
  market: Market;
}

export const MarketOverview = ({ market }: MarketOverviewProps) => {
  const { imports, exports } = market;
  const shipSymbol = useShipsStore().ships?.[0]?.symbol;

  const renderTradeGoodTooltip = (
    tradeGoodSymbol: TradeGoodsSymbols,
    marketSection: MarketSection,
    shouldHighlight: boolean
  ): ReactNode => {
    const tradeGood =
      imports.find(tradeGood => tradeGood.symbol === tradeGoodSymbol)
      || exports.find(tradeGood => tradeGood.symbol === tradeGoodSymbol);
    if (!tradeGood) return null;
    const lowerCaseSymbol = tradeGood.symbol.toLowerCase();
    const lowerMarketSection = marketSection.toLowerCase();
    return <Tooltip
      key={tradeGood.symbol}
      omitTextUnderline
      tooltipText={
        <div className="trade-good-tooltip">
          <strong>{tradeGood.name}</strong>
          {' '}
          <i className={lowerMarketSection}>({MARKET_SECTION_TO_LABEL[marketSection]})</i>
          <div>{tradeGood.description}</div>
        </div>
      }
    >
      <img src={`/${lowerCaseSymbol}.webp`} alt={lowerCaseSymbol}
           className={classNames('clickable', { [lowerMarketSection]: shouldHighlight })} />
    </Tooltip>;
  };

  const renderSectionTooltips = (marketSection: MarketSection, sectionTradeGoodsSet: Set<TradeGoodsSymbols>) => {
    const shouldHighlight = sectionTradeGoodsSet.size > 1;
    return [...sectionTradeGoodsSet.keys()]
      .map(tradeGoodSymbol => renderTradeGoodTooltip(tradeGoodSymbol, marketSection, shouldHighlight));
  };

  const renderMarketTooltips = (marketSections: ReturnType<typeof generateMarketSections>) =>
    Object.entries(marketSections).map(([marketSection, sectionTradeGoodsSet]) =>
      renderSectionTooltips(marketSection as MarketSection, sectionTradeGoodsSet)
    );

  return (
    <section className="market-overview">
      <div className="import-export-row">
        <div className="label">
          <Tooltip tooltipText="Exports" isIconTooltip customIcon={<Icon name="Export" />} />
        </div>
        <div className="import-export-icons">
          {renderMarketTooltips(
            generateMarketSections(exports.map(tradeGood => tradeGood.symbol))
          )}
        </div>
      </div>
      <div className="import-export-row">
        <div className="label">
          <Tooltip tooltipText="Imports" isIconTooltip customIcon={<Icon name="Import" />} />
        </div>
        <div className="import-export-icons">
          {renderMarketTooltips(
            generateMarketSections(imports.map(tradeGood => tradeGood.symbol))
          )}
        </div>
      </div>
      <MarketTable market={market} shipSymbol={shipSymbol} />
    </section>
  );
};