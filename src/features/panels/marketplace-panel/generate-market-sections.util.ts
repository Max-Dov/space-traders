import { MARKET_SECTION_TO_TRADE_GOODS, MarketSection, TradeGoodsSymbols } from '@constants';

/**
 * Generates market sections structure from provided trade goods.
 */
export const generateMarketSections = (tradeGoodSymbols: Array<TradeGoodsSymbols>) => ({
  [MarketSection.SHIP_MODULES]: new Set(
    tradeGoodSymbols.filter((tradeGoodSymbol) =>
      MARKET_SECTION_TO_TRADE_GOODS[MarketSection.SHIP_MODULES].has(tradeGoodSymbol)
    )
  ),
  [MarketSection.COMPONENTS]: new Set(
    tradeGoodSymbols.filter((tradeGoodSymbol) =>
      MARKET_SECTION_TO_TRADE_GOODS[MarketSection.COMPONENTS].has(tradeGoodSymbol)
    )
  ),
  [MarketSection.RAW_MATERIALS]: new Set(
    tradeGoodSymbols.filter((tradeGoodSymbol) =>
      MARKET_SECTION_TO_TRADE_GOODS[MarketSection.RAW_MATERIALS].has(tradeGoodSymbol)
    )
  ),
  [MarketSection.CIVILIAN_SUPPLIES]: new Set(
    tradeGoodSymbols.filter((tradeGoodSymbol) =>
      MARKET_SECTION_TO_TRADE_GOODS[MarketSection.CIVILIAN_SUPPLIES].has(tradeGoodSymbol)
    )
  ),
  [MarketSection.INDUSTRY_AND_SCIENCE]: new Set(
    tradeGoodSymbols.filter((tradeGoodSymbol) =>
      MARKET_SECTION_TO_TRADE_GOODS[MarketSection.INDUSTRY_AND_SCIENCE].has(tradeGoodSymbol)
    )
  ),
  [MarketSection.WEAPONRY]: new Set(
    tradeGoodSymbols.filter((tradeGoodSymbol) =>
      MARKET_SECTION_TO_TRADE_GOODS[MarketSection.WEAPONRY].has(tradeGoodSymbol)
    )
  ),
});