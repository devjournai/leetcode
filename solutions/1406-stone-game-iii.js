/**
 * Stone Game III
 * Intuition: This is a classic game theory problem that can be solved using dynamic programming or memoized recursion. The core idea is that both players play optimally to maximize their own score. We can model this by determining the maximum score difference a player can achieve over their opponent from any given game state.
 * Approach: 1. Define a recursive helper function `calculateMaxDifference(currentIndex)` which computes the maximum net score (current player's score minus opponent's score) the current player can achieve starting from `currentIndex`. 2. Initialize a `memoizationTable` of size `totalLength + 1` with `null` values to store computed results, preventing redundant calculations. 3. The base case for the recursion is when `currentIndex` reaches or exceeds `totalLength`, meaning no stones are left. In this scenario, the score difference is 0. 4. In the recursive step, if the result for `currentIndex` is already in `memoizationTable`, return it immediately. 5. Otherwise, for the current player at `currentIndex`, iterate through the possible moves: taking 1, 2, or 3 stones. a. Accumulate the value of the stones taken in `currentPilesValue`. b. Recursively call `calculateMaxDifference` for the subsequent game state (`currentIndex + numPiles`) to find the score difference the *opponent* would achieve from that point (`futureGameDiff`). c. The current player's score difference for this particular move is `currentPilesValue - futureGameDiff`. Update `maximumPossibleDiff` with the best (maximum) score difference found so far. 6. Store the computed `maximumPossibleDiff` in `memoizationTable[currentIndex]` and return it. 7. The game starts with Alice. Call `calculateMaxDifference(0)` to get the final score difference for Alice (Alice's total score - Bob's total score). 8. If this `finalAliceScoreDiff` is positive, Alice wins. If negative, Bob wins. If zero, it's a Tie.
 * Dry Run: stoneValue = [1, 2, 3, -99]
 * totalLength = 4
 * memoizationTable = [null, null, null, null, null]
 *
 * calculateMaxDifference(0):
 *   numPiles = 1 (take 1) -> currentPilesValue = 1. futureGameDiff = calculateMaxDifference(1)
 *     calculateMaxDifference(1):
 *       numPiles = 1 (take 2) -> currentPilesValue = 2. futureGameDiff = calculateMaxDifference(2)
 *         calculateMaxDifference(2):
 *           numPiles = 1 (take 3) -> currentPilesValue = 3. futureGameDiff = calculateMaxDifference(3)
 *             calculateMaxDifference(3):
 *               numPiles = 1 (take -99) -> currentPilesValue = -99. futureGameDiff = calculateMaxDifference(4) = 0.
 *               maximumPossibleDiff_3 = max(-Inf, -99 - 0) = -99. memoizationTable[3] = -99. Return -99.
 *           maximumPossibleDiff_2 = max(-Inf, 3 - (-99)) = 102.
 *           numPiles = 2 (take 3, -99) -> currentPilesValue = 3 + (-99) = -96. futureGameDiff = calculateMaxDifference(4) = 0.
 *           maximumPossibleDiff_2 = max(102, -96 - 0) = 102. memoizationTable[2] = 102. Return 102.
 *         maximumPossibleDiff_1 = max(-Inf, 2 - 102) = -100.
 *       numPiles = 2 (take 2, 3) -> currentPilesValue = 2 + 3 = 5. futureGameDiff = calculateMaxDifference(3) = -99.
 *       maximumPossibleDiff_1 = max(-100, 5 - (-99)) = 104.
 *       numPiles = 3 (take 2, 3, -99) -> currentPilesValue = 2 + 3 + (-99) = -94. futureGameDiff = calculateMaxDifference(4) = 0.
 *       maximumPossibleDiff_1 = max(104, -94 - 0) = 104. memoizationTable[1] = 104. Return 104.
 *     maximumPossibleDiff = max(-Inf, 1 - 104) = -103.
 *   numPiles = 2 (take 1, 2) -> currentPilesValue = 1 + 2 = 3. futureGameDiff = calculateMaxDifference(2) = 102.
 *   maximumPossibleDiff = max(-103, 3 - 102) = -99.
 *   numPiles = 3 (take 1, 2, 3) -> currentPilesValue = 1 + 2 + 3 = 6. futureGameDiff = calculateMaxDifference(3) = -99.
 *   maximumPossibleDiff = max(-99, 6 - (-99)) = 105.
 * memoizationTable[0] = 105. Return 105.
 *
 * finalAliceScoreDiff = 105. Since 105 > 0, Alice wins.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var stoneGameIII = function (stoneValue) {
  const totalLength = stoneValue.length;
  const memoizationTable = new Array(totalLength + 1).fill(null);

  function calculateMaxDifference(currentIndex) {
    if (currentIndex >= totalLength) {
      return 0;
    }
    if (memoizationTable[currentIndex] !== null) {
      return memoizationTable[currentIndex];
    }

    let maximumPossibleDiff = -Infinity;
    let currentPilesValue = 0;

    for (
      let numPiles = 1;
      numPiles <= 3 && currentIndex + numPiles - 1 < totalLength;
      numPiles++
    ) {
      currentPilesValue += stoneValue[currentIndex + numPiles - 1];
      const futureGameDiff = calculateMaxDifference(currentIndex + numPiles);
      maximumPossibleDiff = Math.max(
        maximumPossibleDiff,
        currentPilesValue - futureGameDiff,
      );
    }

    memoizationTable[currentIndex] = maximumPossibleDiff;
    return maximumPossibleDiff;
  }

  const finalAliceScoreDiff = calculateMaxDifference(0);

  if (finalAliceScoreDiff > 0) {
    return "Alice";
  }
  if (finalAliceScoreDiff < 0) {
    return "Bob";
  }
  return "Tie";
};
