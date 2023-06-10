const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const prependZeroIfNeeded = (number: number): string => (number < 10 ? `0${number}` : String(number));

/**
 * Formats date up to format placeholder.
 * Tokens to use within format:
 * YYYY (year),
 * MMM (month, 3 letters),
 * MO (month, 2  digits),
 * DD (day),
 * mm (minutes),
 * HH (hours),
 * SS (seconds),
 * MS (milliseconds),
 * DOW (day of week)
 */
export const formatDate = (date: Date | string, format: string) => {
  const properDate = new Date(date);
  return format
  .replace('YYYY', String(properDate.getFullYear()))
  .replace('MMM', MONTHS[properDate.getMonth()])
  .replace('DD', String(properDate.getDate()))
  .replace('DOW', DAYS_OF_WEEK[properDate.getDay()])
  .replace('HH', prependZeroIfNeeded(properDate.getHours()))
  .replace('mm', prependZeroIfNeeded(properDate.getMinutes()))
  .replace('SS', prependZeroIfNeeded(properDate.getSeconds()))
  .replace('MS', prependZeroIfNeeded(properDate.getMilliseconds()));
};