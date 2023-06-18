import React, { useState } from 'react';
import { getShips, getMarket, useMarketsStore, useShipsStore, closePanel } from '@zustand';
import { Tooltip, Panel, Tabs, Placeholder, Icon, Select } from '@shared';
import { formatDate, useAuthorizedEffect } from '@utils';
import { CommonFeaturePanelProps } from '@types';
import './marketplace-panel.styles.scss';
import { MarketOverview } from './market-overview.component';

interface MarketplacePanelProps extends CommonFeaturePanelProps {
}

export const MarketplacePanel = ({ panelIndex, panelId }: MarketplacePanelProps) => {
  const { ships } = useShipsStore();
  const { markets } = useMarketsStore();
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null); // waypointSymbol
  const selectableMarkets = Object.keys(markets);

  useAuthorizedEffect(() => {
    if (ships.length === 0) {
      getShips();
    } else {
      // TODO cleanup
      const whateverShip = ships[0];
      const { waypointSymbol, systemSymbol } = whateverShip.nav;
      getMarket(systemSymbol, waypointSymbol);
    }
  }, [ships]);

  return (
    <Panel
      panelTitle={
        <div className="panel-header">
          MARKETPLACE
          <Icon name="CaretRight" />
          <Select
            options={selectableMarkets.map(market => ({ label: market, key: market }))}
            onOptionSelect={setSelectedMarket} placeholder="Select Market"
            defaultOptionIndex={0}
          />
          {selectedMarket && <Tooltip tooltipText="Updated at timestamp. (day.month, hours:minutes)." omitTextUnderline>
            <span className="updated-at">
              {formatDate(markets[selectedMarket].updatedAt, 'DD.MO, HH:mm')}
            </span>
          </Tooltip>}
        </div>
      }
      className="marketplace-panel"
      panelButtons={<>
        <button className="inline-button" onClick={() => closePanel(panelId)}>
          <Icon name="Close" />
        </button>
      </>}
      draggableProps={{ draggableIdAndKey: panelId, index: panelIndex }}
    >
      {selectedMarket === null
        ? <Placeholder>
          Select market from dropdown above. <br />
          Note: You have access to markets where your ships are stationed (or were previously stationed).
        </Placeholder>
        : <Tabs tabs={[{
          header: 'Overview',
          content: <MarketOverview market={markets[selectedMarket]} />,
        }, {
          header: 'Transactions',
          content: <Placeholder>Not Implemented Yet.</Placeholder>,
        }]} omitContentWrap/>}
    </Panel>
  );
};