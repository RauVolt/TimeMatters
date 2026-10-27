export function hourlyCost({ internalRate, internalCount, consultantRate, consultantCount }) {
  return internalRate * internalCount + consultantRate * consultantCount;
}
export function meetingCost(rate, elapsedMs) { return rate * elapsedMs / 3600000; }
export function clock(elapsedMs) {
  const seconds = Math.floor(elapsedMs / 1000);
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(n => String(n).padStart(2, '0')).join(':');
}
