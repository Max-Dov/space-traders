import React from 'react';
import { useMarketsStore, closePanel, refreshMarkets, setSelectedMarket } from '@zustand';
import { Tooltip, Panel, Tabs, Placeholder, Icon, Select } from '@shared';
import { formatDate, useAuthorizedEffect } from '@utils';
import { CommonFeaturePanelProps } from '@types';
import './marketplace-panel.styles.scss';
import { MarketOverview } from './market-overview.component';

interface MarketplacePanelProps extends CommonFeaturePanelProps {
}

export const MarketplacePanel = ({ panelIndex, panelId }: MarketplacePanelProps) => {
  const { markets, selectedMarket } = useMarketsStore();
  const selectableMarkets = Object.keys(markets);

  useAuthorizedEffect(() => {
    if (selectableMarkets.length === 0) {
      refreshMarkets();
    }
  }, []);

  return (
    <Panel
      panelTitle={
        <div className="panel-header">
          MARKETPLACE
          <Icon name="CaretRight" />
          <Select
            option={selectedMarket}
            onOptionSelect={setSelectedMarket} placeholder="Select Market"
            options={selectableMarkets.map(market => ({ label: market, key: market }))}
          />
          {selectedMarket &&
              <Tooltip tooltipText="Last time market was updated." tooltipDelay="short" omitTextUnderline>
                <span className="updated-at no-wrap">
                  {formatDate(markets[selectedMarket].updatedAt, 'HH:mm, DD.MO')}
                </span>
              </Tooltip>}
        </div>
      }
      className="marketplace-panel"
      panelButtons={<div className="flex-row">
        <button className="inline-button" onClick={refreshMarkets}>
          <Icon name="Reload" />
        </button>
        <button className="inline-button" onClick={() => closePanel(panelId)}>
          <Icon name="Close" />
        </button>
      </div>}
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
        }]} omitContentWrap />}
    </Panel>
  );
};