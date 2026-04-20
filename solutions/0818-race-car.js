/**
 * Race Car
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
        combinedPathCost,
      );
    }
  }

  return dpValues[target];
};
