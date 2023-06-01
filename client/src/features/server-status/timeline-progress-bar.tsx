import React from 'react';
import './timeline-progress-bar.styles.scss';

interface TimelineProgressBarProps {
  oldReset: Date;
  newReset: Date;
}

/**
 * Progress bar for reset timeline.
 */
export const TimelineProgressBar = ({ oldReset, newReset }: TimelineProgressBarProps) => {
  const timePassed = new Date().getTime() - oldReset.getTime();
  const timeBetweenResets = newReset.getTime() - oldReset.getTime();
  const progressPercent = Math.trunc(
    (timePassed)
    / (timeBetweenResets)
    * 100,
  );
  return <div className="timeline-container">
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progressPercent}%` }}>
        <span className="tooltip">{progressPercent}%</span>
      </div>
    </div>
  </div>;
};