import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useServerStatusStore } from '@zustand';
import { useIsServerUp, formatDate } from '@utils';
import { Window } from '@shared';
import './server-status.styles.scss';
import { TimelineProgressBar } from './timeline-progress-bar';

export const ServerStatus = () => {
  const { serverStatus, refreshServerStatus } = useServerStatusStore();
  const isServerUp = useIsServerUp();
  const resetOld = serverStatus && formatDate(serverStatus.resetDate, 'DOW, DD MMM');
  const resetNext = serverStatus && formatDate(serverStatus.serverResets.next, 'DOW, DD MMM (HH:mm)');

  /**
   * First render initialization.
   */
  useEffect(() => {
    refreshServerStatus();
  }, []);

  return <Window className="server-status">
    <h2 className="header-font">
      Server Status
      <button className="refresh-button" onClick={refreshServerStatus}>Refresh</button>
    </h2>
    {serverStatus &&
        <>
            <p className="flex-row">
                <span>
                Status:{' '}
                    <span className={classNames('stat', {
                      'server-up': isServerUp,
                      'server-down': !isServerUp,
                    })}>{serverStatus.status}</span>
                </span>
                <span>
                  Version:{' '}
                    <span className="stat">{serverStatus.version}</span>
                </span>
            </p>
            <p className="flex-row">
                <span>
                  Agents: {' '}
                    <span className="stat">{serverStatus.stats.agents}</span>
                </span>
                <span>
                  Ships: {' '}
                    <span className="stat">{serverStatus.stats.ships}</span>
                </span>
                <span>
                  Systems: {' '}
                    <span className="stat">{serverStatus.stats.systems}</span>
                </span>
                <span>
                  Waypoints: {' '}
                    <span className="stat">{serverStatus.stats.waypoints}</span>
                </span>
            </p>
            <p className="reset-timeframe-section">
                Reset timeframes:{' '}
                <div>
                    <span className="stat">{resetOld} - {resetNext}</span>
                    <TimelineProgressBar oldReset={new Date(serverStatus.resetDate)} newReset={new Date(serverStatus.serverResets.next)}/>
                </div>
            </p>
        </>}
  </Window>;
};