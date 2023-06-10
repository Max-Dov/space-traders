import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useServerStatusStore, refreshServerStatus } from '@zustand';
import { useIsServerUp, formatDate } from '@utils';
import { Window } from '@shared';
import './server-status-panel.styles.scss';
import { TimelineProgressBar } from './timeline-progress-bar';
import { Icon } from '@shared/icon/icon.component';

export const ServerStatusPanel = () => {
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

  return <Window
    className="server-status"
    header={<div className="server-status-top-bar">
      <span>SERVER STATUS: </span>
      <span className={classNames('server-stat', {
        'server-up': isServerUp,
        'server-down': !isServerUp,
      })}>{isServerUp ? 'Online' : 'Offline'}</span>
    </div>}
  >
    <button onClick={refreshServerStatus}>Refresh Status</button>
    {serverStatus &&
        <>
            <div className="flex-row sections">
                <div>
                    <div className="flex-row">
                        <Icon name="Users" />
                        <span className="stat">{serverStatus.stats.agents}</span>
                    </div>
                    <div className="flex-row">
                        <Icon name="Spaceship" />
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
        </>}
  </Window>;
};