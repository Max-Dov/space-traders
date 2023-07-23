import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useServerStatusStore, refreshServerStatus, closePanel } from '@zustand';
import { useIsServerUp, formatDate } from '@utils';
import { Panel, Icon, Tooltip, Placeholder } from '@shared';
import './server-status-panel.styles.scss';
import { TimelineProgressBar } from './timeline-progress-bar';
import { CommonFeaturePanelProps } from '@types';

interface ServerStatusPanelProps extends CommonFeaturePanelProps {
}

export const ServerStatusPanel = ({ panelId, panelIndex }: ServerStatusPanelProps) => {
  const { serverStatus } = useServerStatusStore();
  const isServerUp = useIsServerUp();
  const resetOld = serverStatus && formatDate(serverStatus.resetDate, 'DOW, DD MMM');
  const resetNext = serverStatus && formatDate(serverStatus.serverResets.next, 'DOW, DD MMM (HH:mm)');

  /**
   * First render initialization.
   */
  useEffect(() => {
    if (serverStatus === null) {
      refreshServerStatus();
    }
  }, []);

  return <Panel
    className="server-status"
    panelTitle={<div className="server-status-top-bar">
      <span>SERVER STATUS: </span>
      <span className={classNames('server-stat', {
        'server-up': isServerUp,
        'server-down': !isServerUp,
      })}>{isServerUp ? 'Online' : 'Offline'}</span>
    </div>}
    panelButtons={
      <div className="flex-row">
        <button className="inline-button" onClick={refreshServerStatus}>
          <Icon name="Reload" />
        </button>
        <button className="inline-button" onClick={() => closePanel(panelId)}>
          <Icon name="Close" />
        </button>
      </div>
    }
    draggableProps={{ index: panelIndex, draggableIdAndKey: panelId }}
  >
    {serverStatus !== null
      ? (<>
        <div className="flex-row sections">
          <div>
            <div className="flex-row">
              <Tooltip tooltipText="Agents" isIconTooltip customIcon={<Icon name="Users" />} />
              <span className="stat">{serverStatus.stats.agents}</span>
            </div>
            <div className="flex-row">
              <Tooltip tooltipText="Spaceships" isIconTooltip customIcon={<Icon name="Spaceship" />} />
              <span className="stat">{serverStatus.stats.ships}</span>
            </div>
          </div>
          <div>
            <div className="flex-row">
              Systems: {' '}
              <span className="stat">{serverStatus.stats.systems}</span>
            </div>
            <div className="flex-row">
              Waypoints: {' '}
              <span className="stat">{serverStatus.stats.waypoints}</span>
            </div>
          </div>
        </div>
        <section className="reset-timeframe-section">
          <span className="stat">{resetOld} - {resetNext}</span>
          <TimelineProgressBar oldReset={new Date(serverStatus.resetDate)}
                               newReset={new Date(serverStatus.serverResets.next)} />
        </section>
      </>)
      : (<Placeholder>
        <p>
          No data available.
        </p>
        <p>
          Try reloading status by clicking refresh button
          {' '}
          <button className="inline-button">
            <Icon name="Reload" onClick={refreshServerStatus} />
          </button>
          {' '}
          there or on panel bar above.
        </p>
        <p>
          If that does not fix things, inspect <strong>Network</strong> panel for clues.
        </p>
      </Placeholder>)
    }
  </Panel>;
};