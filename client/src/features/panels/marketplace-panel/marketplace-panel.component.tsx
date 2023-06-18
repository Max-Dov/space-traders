import { getShips, getMarket, useMarketStore, useShipsStore } from "@zustand";
import React, { useState } from "react";
import { Currency, Tooltip, Panel, Input } from "@shared";
import { useAuthorizedEffect } from "@utils";
import { Market } from "@types";
import "./marketplace-panel.styles.scss";

enum Sections {
  Trade = 1,
  Transactions = 2,
}

export const MarketplacePanel = () => {
  const { ships } = useShipsStore();
  const { market } = useMarketStore();

  useAuthorizedEffect(() => {
    if (ships.length === 0) {
      getShips();
    }
    if (market === null) {
      ships.length > 0 &&
        getMarket(ships[0].nav.systemSymbol, ships[0].nav.waypointSymbol);
    }
  }, []);

  console.log(market);

  const [sectionOpen, setSectionOpen] = useState(Sections.Trade);

  const trade = () => {
    return (
      <>
        <div className="container">
          <div className="title">Export</div>
          <div className="images">
            {market &&
              market.exports.map((el) => (
                <Tooltip
                  key={el.symbol}
                  tooltipText={
                    <ProductCard name={el.name} description={el.description} />
                  }
                >
                  <img src={"assets/images/iron-one.webp"} alt={el.name} />
                </Tooltip>
              ))}
          </div>
        </div>
        <div className="container">
          <div className="title">Import</div>
          <div className="images">
            {market &&
              market.imports.map((el) => (
                <Tooltip
                  key={el.symbol}
                  tooltipText={
                    <ProductCard name={el.name} description={el.description} />
                  }
                >
                  <img src={"assets/images/iron-one.webp"} alt={el.name} />
                </Tooltip>
              ))}
          </div>
        </div>
        <div className="container">
          <table className="goods">
            <thead>
              <tr>
                <th>Good</th>
                <th>Volume</th>
                <th>Supply</th>
                <th>Purchase price</th>
                <th>Sell price</th>
              </tr>
            </thead>
            <tbody>
              {market &&
                market.tradeGoods.map((el) => (
                  <TradeTableRow
                    key={el.symbol}
                    symbol={el.symbol}
                    tradeVolume={el.tradeVolume}
                    supply={el.supply}
                    purchasePrice={el.purchasePrice}
                    sellPrice={el.sellPrice}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const transactions = <div>dfjfjfk</div>;

  return (
    <Panel header="MARKETPLACE" className="marketplace-panel">
      <div className="btns">
        <button onClick={() => setSectionOpen(Sections.Trade)}>trade</button>
        <button onClick={() => setSectionOpen(Sections.Transactions)}>
          transactions
        </button>
      </div>

      {sectionOpen === Sections.Trade && trade()}
      {sectionOpen === Sections.Transactions && transactions}
    </Panel>
  );
};

interface ProductCardProps {
  name: Market["exports"][0]["name"];
  description: Market["exports"][0]["description"];
}

const ProductCard = ({ name, description }: ProductCardProps) => {
  return (
    <div className="info">
      <div className="name">{name}</div>
      <div className="description">{description}</div>
    </div>
  );
};

interface TradeTableRowProps {
  symbol: Market["tradeGoods"][0]["symbol"];
  tradeVolume: Market["tradeGoods"][0]["tradeVolume"];
  supply: Market["tradeGoods"][0]["supply"];
  purchasePrice: Market["tradeGoods"][0]["purchasePrice"];
  sellPrice: Market["tradeGoods"][0]["sellPrice"];
}

const TradeTableRow = ({
  symbol,
  tradeVolume,
  supply,
  purchasePrice,
  sellPrice,
}: TradeTableRowProps) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <tr onClick={(e) => setActive(!active)}>
        <td>
          <div>
            <img src={"assets/images/iron-one.webp"} alt={symbol} />
            {symbol}
          </div>
        </td>
        <td>{tradeVolume}</td>
        <td>{supply}</td>
        <td>
          <Currency amount={purchasePrice} />
        </td>
        <td>
          <Currency amount={sellPrice} />
        </td>
      </tr>
      {active && (
        <tr className="active-row">
          <td colSpan={5}>
            <div>
              <Input
                id={symbol}
                value={value}
                onChange={setValue}
                label="Enter the volume"
                containerClassname="container-input"
              />

              <div className="container-btn">
                <div>
                  <div>Total purchase: {Number(value) * purchasePrice}</div>
                  <button>Purchase</button>
                </div>
                <div>
                  <div>Total sale: {Number(value) * sellPrice}</div>

                  <button>Sell</button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
