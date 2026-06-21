/**
 * Number Of Ways To Reach A Position After Exactly K Steps
 * Intuition: This problem involves counting paths on a 1D number line with a fixed number of steps. This is a classic dynamic programming problem where the number of ways to reach a state (position, remaining_steps) is the sum of ways from its previous possible states (left and right moves). Memoization can be used to store and reuse computed results, preventing redundant calculations.
 * Approach: 1. Initialize a 2D dynamic programming table (memoization table) to store results for `(position, steps_remaining)`. A fixed offset is used for positions to handle negative coordinates. 2. Define a recursive helper function that takes the current position, target position, and steps remaining. 3. Implement base cases: if current position equals target and no steps are left, return 1 (found a way). If steps are left but current position doesn't equal target, return 0 (failed to reach target). If no steps are left, return 0 (cannot move further). 4. Implement memoization check: if the result for the current state is already in the table, return it. 5. Recursively calculate ways by taking a left step and a right step, sum their results, apply modulo, store in the memoization table, and return.
 * Dry Run: startPos = 1, endPos = 2, k = 3
 *   Initialize modulusValue = 1_000_000_007.
 *   Initialize memoTable: `new Array(3002).fill(null).map(() => new Array(k + 1).fill(-1))`. (Offset: 1000)
 *   Call `calculateWays(1, 2, 3)`:
 *     `currentPosition = 1`, `finalPosition = 2`, `stepsLeft = 3`.
 *     `positionOffsetIndex = 1 + 1000 = 1001`.
 *     `memoTable[1001][3]` is -1 (not computed).
 *     `waysFromLeft = calculateWays(0, 2, 2)`:
 *       `currentPosition = 0`, `finalPosition = 2`, `stepsLeft = 2`.
 *       `positionOffsetIndex = 0 + 1000 = 1000`.
 *       `memoTable[1000][2]` is -1.
 *       `waysFromLeft = calculateWays(-1, 2, 1)`:
 *         `currentPosition = -1`, `finalPosition = 2`, `stepsLeft = 1`.
 *         `positionOffsetIndex = -1 + 1000 = 999`.
 *         `memoTable[999][1]` is -1.
 *         `waysFromLeft = calculateWays(-2, 2, 0)`: `stepsLeft === 0` (and `currentPosition !== finalPosition`), returns 0.
 *         `waysFromRight = calculateWays(0, 2, 0)`: `stepsLeft === 0`, returns 0.
 *         `memoTable[999][1] = (0 + 0) % modulusValue = 0`. Returns 0.
 *       `waysFromRight = calculateWays(1, 2, 1)`:
 *         `currentPosition = 1`, `finalPosition = 2`, `stepsLeft = 1`.
 *         `positionOffsetIndex = 1 + 1000 = 1001`.
 *         `memoTable[1001][1]` is -1.
 *         `waysFromLeft = calculateWays(0, 2, 0)`: returns 0.
 *         `waysFromRight = calculateWays(2, 2, 0)`: `currentPosition === finalPosition && stepsLeft === 0`, returns 1.
 *         `memoTable[1001][1] = (0 + 1) % modulusValue = 1`. Returns 1.
 *       `memoTable[1000][2] = (0 + 1) % modulusValue = 1`. Returns 1.
 *     `waysFromRight = calculateWays(2, 2, 2)`:
 *       `currentPosition = 2`, `finalPosition = 2`, `stepsLeft = 2`.
 *       `positionOffsetIndex = 2 + 1000 = 1002`.
 *       `memoTable[1002][2]` is -1.
 *       `waysFromLeft = calculateWays(1, 2, 1)`:
 *         `positionOffsetIndex = 1 + 1000 = 1001`. `memoTable[1001][1]` is 1 (already computed). Returns 1.
 *       `waysFromRight = calculateWays(3, 2, 1)`:
 *         `currentPosition = 3`, `finalPosition = 2`, `stepsLeft = 1`.
 *         `positionOffsetIndex = 3 + 1000 = 1003`.
 *         `memoTable[1003][1]` is -1.
 *         `waysFromLeft = calculateWays(2, 2, 0)`: returns 1.
 *         `waysFromRight = calculateWays(4, 2, 0)`: returns 0.
 *         `memoTable[1003][1] = (1 + 0) % modulusValue = 1`. Returns 1.
 *       `memoTable[1002][2] = (1 + 1) % modulusValue = 2`. Returns 2.
 *     `memoTable[1001][3] = (1 + 2) % modulusValue = 3`. Returns 3.
 *   Final result: 3.
 * Time Complexity: O(k * (maxPos - minPos))
 * Space Complexity: O(k * (maxPos - minPos))
 */
var numberOfWays = function (startPos, endPos, k) {
  const modulusValue = 1_000_000_007;
  const positionOffset = 1000;
  const maxPossibleCoordinate = Math.max(startPos, endPos) + k;
  const minPossibleCoordinate = Math.min(startPos, endPos) - k;
  const maxIndexForPosition = maxPossibleCoordinate + positionOffset;
  const minIndexForPosition = minPossibleCoordinate + positionOffset;
  const totalPositionStates = maxIndexForPosition - minIndexForPosition + 1;

  const memoTable = new Array(maxIndexForPosition + 1)
    .fill(null)
    .map(() => new Array(k + 1).fill(-1));

  function calculateWays(currentPosition, finalPosition, stepsLeft) {
    if (currentPosition === finalPosition && stepsLeft === 0) {
      return 1;
    }
    if (stepsLeft === 0) {
      return 0;
    }

    const currentPositionIndexed = currentPosition + positionOffset;
    if (memoTable[currentPositionIndexed][stepsLeft] !== -1) {
      return memoTable[currentPositionIndexed][stepsLeft];
    }

    const waysFromLeftStep = calculateWays(
      currentPosition - 1,
      finalPosition,
      stepsLeft - 1,
    );
    const waysFromRightStep = calculateWays(
      currentPosition + 1,
      finalPosition,
      stepsLeft - 1,
    );

    const totalWays = (waysFromLeftStep + waysFromRightStep) % modulusValue;
    memoTable[currentPositionIndexed][stepsLeft] = totalWays;
    return totalWays;
  }

  return calculateWays(startPos, endPos, k);
};
