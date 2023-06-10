import React from 'react';
import { Currency, Window } from '@shared';
import { useServerStatusStore } from '@zustand';
import { Agent } from '@types';
import "./leader-board-panel.styles.scss";
import { formatNumber } from '@utils';

export const LeaderBoardPanel = () => {
  const { serverStatus } = useServerStatusStore();

  return (
    <Window header="LEADERBOARDS" className="leaderboards">
      <BoardContainer title="Most Credits">
        {serverStatus?.leaderboards.mostCredits.map((agent, i) => (
          <LeaderData
            key={agent.agentSymbol}
            rank={i + 1}
            agentSymbol={agent.agentSymbol}
            amount={<Currency amount={agent.credits} />}
          />
        ))}
      </BoardContainer>
      <BoardContainer title="Most Submitted Charts">
        {serverStatus?.leaderboards.mostSubmittedCharts.map((agent, i) => (
          <LeaderData
            key={agent.agentSymbol}
            rank={i + 1}
            agentSymbol={agent.agentSymbol}
            amount={formatNumber(agent.chartCount)}
          />
        ))}
      </BoardContainer>
    </Window>
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
