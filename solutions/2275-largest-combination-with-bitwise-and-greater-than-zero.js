/**
 * Largest Combination With Bitwise And Greater Than Zero
 * Intuition: A combination's bitwise AND is greater than zero if there's at least one bit position where every number in that combination has that specific bit set. To find the largest such combination, we need to identify the bit position that is set in the maximum number of candidates. The count of candidates sharing that common set bit will be the size of the largest possible combination.
 * Approach: 1. Initialize an array, `bitPositionTallies`, to store counts for each of the 32 bit positions (0 to 31), starting all counts at zero. 2. Iterate through each `currentCandidate` in the input `candidates` array. For each `currentCandidate`, iterate from `bitIndex` 0 up to 31. Use a bitwise AND operation (`&`) with a left-shifted 1 (`1 << bitIndex`) to check if the `bitIndex`-th bit is set in `currentCandidate`. If it is set, increment the corresponding count in `bitPositionTallies[bitIndex]`. 3. After processing all `candidates` and populating `bitPositionTallies`, initialize `maximalCombinationSize` to 0. Iterate through each `tallyEntry` in `bitPositionTallies` and update `maximalCombinationSize` to the maximum of its current value and the `tallyEntry`. 4. Return `maximalCombinationSize`.
 * Dry Run: candidates = [2, 3, 5] (binary: 010, 011, 101)
 * bitPositionTallies = [0, 0, ..., 0] (length 32)
 * maximalCombinationSize = 0
 *
 * Processing candidates:
 * currentCandidate = 2 (0b010):
 *   bitIndex = 0: (2 & (1 << 0)) === 0.
 *   bitIndex = 1: (2 & (1 << 1)) !== 0. bitPositionTallies[1] becomes 1.
 *   bitIndex = 2: (2 & (1 << 2)) === 0.
 *   ... (other bitIndexes for 2 remain 0)
 *
 * currentCandidate = 3 (0b011):
 *   bitIndex = 0: (3 & (1 << 0)) !== 0. bitPositionTallies[0] becomes 1.
 *   bitIndex = 1: (3 & (1 << 1)) !== 0. bitPositionTallies[1] becomes 2.
 *   bitIndex = 2: (3 & (1 << 2)) === 0.
 *   ...
 *
 * currentCandidate = 5 (0b101):
 *   bitIndex = 0: (5 & (1 << 0)) !== 0. bitPositionTallies[0] becomes 2.
 *   bitIndex = 1: (5 & (1 << 1)) === 0.
 *   bitIndex = 2: (5 & (1 << 2)) !== 0. bitPositionTallies[2] becomes 1.
 *   ...
 *
 * After all candidates, `bitPositionTallies` becomes approximately `[2, 2, 1, 0, ..., 0]`.
 *
 * Finding maximalCombinationSize:
 * tallyEntry = 2 (from bitPositionTallies[0]): maximalCombinationSize = Math.max(0, 2) = 2.
 * tallyEntry = 2 (from bitPositionTallies[1]): maximalCombinationSize = Math.max(2, 2) = 2.
 * tallyEntry = 1 (from bitPositionTallies[2]): maximalCombinationSize = Math.max(2, 1) = 2.
 * ... (all subsequent tallyEntry values are 0, so maximalCombinationSize remains 2).
 *
 * Return 2.
 * Time Complexity: O(N * B)
 * Space Complexity: O(B)
 */
var largestCombination = function (candidates) {
  const bitPositionTallies = new Array(32).fill(0);
  let maximalCombinationSize = 0;

  candidates.forEach((currentCandidate) => {
    for (let bitIndex = 0; bitIndex < 32; bitIndex++) {
      if ((currentCandidate & (1 << bitIndex)) !== 0) {
        bitPositionTallies[bitIndex]++;
      }
    }
  });

  bitPositionTallies.forEach((tallyEntry) => {
    maximalCombinationSize = Math.max(maximalCombinationSize, tallyEntry);
  });

  return maximalCombinationSize;
};
