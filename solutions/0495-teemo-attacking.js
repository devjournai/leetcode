/**
 * Teemo Attacking
 * Intuition: Each attack poisons for `duration` seconds, but a later attack that starts inside an existing window clips the previous contribution to the gap between attack times.
 * Approach: 1. Empty series → 0. 2. For each attack time t_i, let next be t_{i+1} or t_i+duration (last hit). 3. Add `min(duration, next - t_i)` to the total.
 * Dry Run: timeSeries = [1,4], duration = 2.
 *   - i=0: min(2, 4-1)=2. i=1 last: min(2, (4+2)-4)=2. Total 4.
 *   - [1,2], duration 2: min(2,1)+2 = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findPoisonedDuration = function (timeSeries, duration) {
  let totalPoisonSeconds = 0;
  let seriesLength = timeSeries.length;

  if (seriesLength === 0) {
    return 0;
  }

  for (
    let currentAttackIndex = 0;
    currentAttackIndex < seriesLength;
    currentAttackIndex++
  ) {
    let currentAttackMoment = timeSeries[currentAttackIndex];
    let nextAttackMoment;

    if (currentAttackIndex + 1 < seriesLength) {
      nextAttackMoment = timeSeries[currentAttackIndex + 1];
    } else {
      nextAttackMoment = currentAttackMoment + duration;
    }

    let contributionValue = Math.min(
      duration,
      nextAttackMoment - currentAttackMoment
    );
    totalPoisonSeconds += contributionValue;
  }

  return totalPoisonSeconds;
};
