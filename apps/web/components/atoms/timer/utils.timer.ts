const FULL_DASH_ARRAY = 283;

export function msToSeconds(ms: number) {
  return Math.round(ms / 1000);
}

export function calculateTimeFraction(limit: number, timeLeft: number) {
  const rawTimeFraction = timeLeft / limit;
  return rawTimeFraction - (1 / limit) * (1 - rawTimeFraction);
}

export function calcCircleDasharray(limit: number, timeLeft: number) {
  return `${(calculateTimeFraction(limit, timeLeft) * FULL_DASH_ARRAY).toFixed(
    0
  )} ${FULL_DASH_ARRAY}`;
}
