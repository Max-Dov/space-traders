/**
 * Formats remaining time left. Example: "22d 3h 12m 12s"
 */
export const formatTimeLeft = (timeInMs: number): string => {
  let timeLeftString = '';
  let tempTimeLeft = timeInMs;

  const daysLeft = Math.trunc(tempTimeLeft / 86400000); // 1000 * 60 * 60 * 24
  tempTimeLeft = tempTimeLeft - daysLeft * 86400000;
  const shouldDisplayDays = daysLeft > 0;
  if (shouldDisplayDays) {
    timeLeftString += `${daysLeft}d`;
  }

  const hoursLeft = Math.trunc(tempTimeLeft / 3600000); // 1000 * 60 * 60
  tempTimeLeft = tempTimeLeft - hoursLeft * 3600000;
  const shouldDisplayHours = shouldDisplayDays || hoursLeft > 0;
  if (shouldDisplayHours) {
    timeLeftString += ` ${hoursLeft}h`;
  }

  const minutesLeft = Math.trunc(tempTimeLeft / 60000); // 1000 * 60
  tempTimeLeft = tempTimeLeft - minutesLeft * 60000;
  const shouldDisplayMinutes = shouldDisplayHours || minutesLeft > 0;
  if (shouldDisplayMinutes) {
    timeLeftString += ` ${minutesLeft}m`;
  }

  const secondsLeft = Math.trunc(tempTimeLeft / 1000); // 1000 * 60
  timeLeftString += ` ${secondsLeft}s`;

  return timeLeftString.trim();
};