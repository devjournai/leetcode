/**
 * Reach A Number
 * Intuition: Direction is symmetric, so use `absoluteTargetMagnitude`. After `m` steps the position is triangular `m(m+1)/2`; flipping a step of size `x` subtracts `2x`, so `sum - target` must be even and `sum >= target`.
 * Approach: 1. Start `totalMovesCount` at `floor(sqrt(2 * |target|))`. 2. Loop: `currentStepSum = m(m+1)/2`. 3. If that is at least the target and `(currentStepSum - target) % 2 === 0`, return `m`. 4. Otherwise increment `totalMovesCount`.
 * Dry Run: target = 2.
 *   - Estimate m = floor(sqrt(4)) = 2. Sum = 3, diff = 1 (odd) → m = 3.
 *   - Sum = 6, diff = 4 (even) → return 3.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var reachNumber = function (target) {
  const absoluteTargetMagnitude = Math.abs(target);
  let totalMovesCount = 0;

  let initialMovesEstimate = Math.floor(Math.sqrt(2 * absoluteTargetMagnitude));
  totalMovesCount = initialMovesEstimate;

  while (true) {
    let currentStepSum = (totalMovesCount * (totalMovesCount + 1)) / 2;

    if (currentStepSum >= absoluteTargetMagnitude) {
      let parityDifference = currentStepSum - absoluteTargetMagnitude;
      if (parityDifference % 2 === 0) {
        return totalMovesCount;
      }
    }
    totalMovesCount++;
  }
};
