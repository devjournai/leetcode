/**
 * Race Car
 * Intuition: DP to each position. Reach `2^k-1` with k A's. Else overshoot then reverse, or A k-1 times, reverse some B's, reverse again, and finish with a smaller DP remainder.
 * Approach: 1. `dpValues[0]=0`. 2. k = ceil(log2(pos+1)); if `2^k-1 === pos`, dp = k. 3. Else start with k+1+dp[overshoot-pos]. 4. For reverse length r < k-1, cost `(k-1)+1+r+1+dp[pos - ((2^{k-1}-1)-(2^r-1))]`.
 * Dry Run: target = 3. 2^2-1 = 3 → 2 instructions "AA".
 * Time Complexity: O(T log T)
 * Space Complexity: O(T)
 */
var racecar = function (target) {
  const dpValues = new Array(target + 1).fill(Infinity);
  dpValues[0] = 0;

  for (
    let currentPositionTarget = 1;
    currentPositionTarget <= target;
    currentPositionTarget++
  ) {
    const kValueForTarget = Math.ceil(Math.log2(currentPositionTarget + 1));
    const reachExactPosition = (1 << kValueForTarget) - 1;

    if (reachExactPosition === currentPositionTarget) {
      dpValues[currentPositionTarget] = kValueForTarget;
      continue;
    }

    const overshootStepsCount = kValueForTarget;
    const overshootReverseCost =
      overshootStepsCount +
      1 +
      dpValues[reachExactPosition - currentPositionTarget];
    dpValues[currentPositionTarget] = overshootReverseCost;

    for (
      let innerReverseSteps = 0;
      innerReverseSteps < kValueForTarget - 1;
      innerReverseSteps++
    ) {
      const initialForwardAccelerations = kValueForTarget - 1;
      const initialForwardPosition = (1 << initialForwardAccelerations) - 1;

      const backwardMovementDistance = (1 << innerReverseSteps) - 1;

      const intermediateCarPosition =
        initialForwardPosition - backwardMovementDistance;
      const neededRemainingDistance =
        currentPositionTarget - intermediateCarPosition;

      const combinedPathCost =
        initialForwardAccelerations +
        1 +
        innerReverseSteps +
        1 +
        dpValues[neededRemainingDistance];
      dpValues[currentPositionTarget] = Math.min(
        dpValues[currentPositionTarget],
        combinedPathCost
      );
    }
  }

  return dpValues[target];
};
