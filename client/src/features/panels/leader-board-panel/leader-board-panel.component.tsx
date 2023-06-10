import React from 'react';
import { useServerStatusStore } from '@zustand/index';
import { Currency, Window } from '@shared';
import "./leader-board-panel.styles.scss";

export const LeaderBoardPanel = () => {
  const { serverStatus } = useServerStatusStore();

  return (
    <Window header="LEADER BOARD" className="leader-board">
      <BoardContainer title="Most Credits">
        {serverStatus?.leaderboards.mostCredits.map((el, i) => (
          <LeaderData
            key={i}
            id={i + 1}
            agentSymbol={el.agentSymbol}
            amount={<Currency amount={el.credits} />}
          />
        ))}
      </BoardContainer>
      <BoardContainer title="Most Submitted Charts">
        {serverStatus?.leaderboards.mostSubmittedCharts.map((el, i) => (
          <LeaderData
            key={i}
            id={i + 1}
            agentSymbol={el.agentSymbol}
            amount={el.chartCount}
          />
        ))}
      </BoardContainer>
    </Window>
  );
};

interface LeaderBoardProps {
  id: number;
  agentSymbol: string;
  amount: React.ReactNode;
}

const LeaderData = ({ id, agentSymbol, amount }: LeaderBoardProps) => {
  return (
    <div className="data-container">
      <div className="name">
        {id}. <span>{agentSymbol}</span>
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
