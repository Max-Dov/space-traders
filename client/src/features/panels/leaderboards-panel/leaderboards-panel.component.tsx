import React from 'react';
import { Currency, Icon, Panel, Placeholder } from '@shared';
import { closePanel, refreshServerStatus, useServerStatusStore } from '@zustand';
import { Agent } from '@types';
import './leaderboards-panel.styles.scss';
import { formatNumber } from '@utils';

interface LeaderboardsPanelProps {
  panelId: string;
}

export const LeaderboardsPanel = ({ panelId }: LeaderboardsPanelProps) => {
  const { serverStatus } = useServerStatusStore();

  return (
    <Panel
      className="leaderboards"
      panelTitle="LEADERBOARDS"
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
    >{
      serverStatus === null
        ? (
          <Placeholder>
            No data available.
          </Placeholder>
        ) : (
          <>
            <BoardContainer title="Most Credits">
              {serverStatus.leaderboards.mostCredits.map((agent, i) => (
                <LeaderData
                  key={agent.agentSymbol}
                  rank={i + 1}
                  agentSymbol={agent.agentSymbol}
                  amount={<Currency amount={agent.credits} />}
                />
              ))}
            </BoardContainer>
            <BoardContainer title="Most Submitted Charts">
              {serverStatus.leaderboards.mostSubmittedCharts.map((agent, i) => (
                <LeaderData
                  key={agent.agentSymbol}
                  rank={i + 1}
                  agentSymbol={agent.agentSymbol}
                  amount={formatNumber(agent.chartCount)}
                />
              ))}
            </BoardContainer>
          </>
        )
    }</Panel>
  );
};

interface LeaderBoardProps {
  rank: number;
  agentSymbol: Agent['symbol'];
  amount: React.ReactNode;
}

const LeaderData = ({ rank, agentSymbol, amount }: LeaderBoardProps) => {
  return (
    <div className="data-container">
      <div className="name">
        {rank}. <span>{agentSymbol}</span>
      </div>
      <div className="amount">{amount}</div>
    </div>
  );
};

interface BoardContainerProps {
  title: string;
  children: React.ReactNode;
}

const BoardContainer = ({ title, children }: BoardContainerProps) => {
  return (
    <div className="board-container">
      <div className="title">{title}</div>
      <div className="board">{children}</div>
    </div>
  );
};
