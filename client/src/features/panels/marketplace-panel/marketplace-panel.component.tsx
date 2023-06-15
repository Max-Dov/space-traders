import { getShips, getMarket, useMarketStore, useShipsStore } from "@zustand";
import React from "react";
import { Currency, Tooltip, Window } from "@shared";
import { useAuthorizedEffect } from "@utils";
import { Market } from "@types";
import "./marketplace-panel.styles.scss";

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

  return (
    <Window header="MARKETPLACE" className="marketplace-panel">
      <div className="btns">
        <button>transactions</button>
      </div>
      <div className="products-container">
        <div className="title">Export</div>
        <div className="images">
          {market &&
            market.exports.map((el) => (
              <Tooltip
                tooltipText={
                  <ProductCard name={el.name} description={el.description} />
                }
              >
                <img src={"assets/images/iron-one.webp"} alt={el.name} />
              </Tooltip>
            ))}
        </div>
      </div>
      <div className="products-container">
        <div className="title">Import</div>
        <div className="images">
          {market &&
            market.imports.map((el) => (
              <Tooltip
                tooltipText={
                  <ProductCard name={el.name} description={el.description} />
                }
              >
                <img src={"assets/images/iron-one.webp"} alt={el.name} />
              </Tooltip>
            ))}
        </div>
      </div>
      <div className="products-container">
        <table className="goods">
          <tr>
            <th>Good</th>
            <th>Volume</th>
            <th>Supply</th>
            <th>Purchase price</th>
            <th>Sell price</th>
          </tr>

          {market &&
            market.tradeGoods.map((el) => (
              <tr>
                <td>
                  <div>
                    <img src={"assets/images/iron-one.webp"} alt={el.symbol} />
                    {el.symbol}
                  </div>
                </td>
                <td>{el.tradeVolume}</td>
                <td>{el.supply}</td>
                <td>
                  <Currency amount={el.purchasePrice} />
                </td>
                <td>
                  <Currency amount={el.sellPrice} />
                </td>
              </tr>
            ))}
        </table>
      </div>
    </Window>
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
