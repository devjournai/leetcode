/**
 * Find All Lonely Numbers In The Array
 * Intuition: To determine if a number is lonely, we need its frequency and the presence of its neighbors. A frequency map efficiently provides this information in O(1) average time.
 * Approach: 1. Iterate through the input array `nums` to build a frequency map, storing each number and its count. 2. Iterate through the entries (number and count) of the created frequency map. 3. For each number, check if its count is exactly one AND if its preceding number (x-1) and succeeding number (x+1) are NOT present as keys in the frequency map. 4. Collect all numbers that satisfy these three conditions into a result array.
 * Dry Run: nums = [1,3,5,3]
 *   1. Initialize `numberFrequencies` = new Map(), `lonelyValuesAccumulator` = [].
 *   2. First pass (populate `numberFrequencies`):
 *      - currentInput = 1: `numberFrequencies.set(1, 1)` -> {1: 1}
 *      - currentInput = 3: `numberFrequencies.set(3, 1)` -> {1: 1, 3: 1}
 *      - currentInput = 5: `numberFrequencies.set(5, 1)` -> {1: 1, 3: 1, 5: 1}
 *      - currentInput = 3: `numberFrequencies.set(3, 2)` -> {1: 1, 3: 2, 5: 1}
 *   3. Second pass (check for lonely numbers from `numberFrequencies`):
 *      - numKey = 1, numCount = 1:
 *        - `numCount === 1` (true)
 *        - `!numberFrequencies.has(0)` (true)
 *        - `!numberFrequencies.has(2)` (true)
 *        - All true. `lonelyValuesAccumulator.push(1)` -> [1]
 *      - numKey = 3, numCount = 2:
 *        - `numCount === 1` (false) -> Skip.
 *      - numKey = 5, numCount = 1:
 *        - `numCount === 1` (true)
 *        - `!numberFrequencies.has(4)` (true)
 *        - `!numberFrequencies.has(6)` (true)
 *        - All true. `lonelyValuesAccumulator.push(5)` -> [1, 5]
 *   4. Return `lonelyValuesAccumulator` -> [1, 5].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findLonely = function (nums) {
  const numberFrequencies = new Map();

  for (const currentInput of nums) {
    numberFrequencies.set(
      currentInput,
      (numberFrequencies.get(currentInput) || 0) + 1
    );
  }

  const lonelyValuesAccumulator = [];
  for (const [numKey, numCount] of numberFrequencies) {
    if (
      numCount === 1 &&
      !numberFrequencies.has(numKey - 1) &&
      !numberFrequencies.has(numKey + 1)
    ) {
      lonelyValuesAccumulator.push(numKey);
    }
  }

  return lonelyValuesAccumulator;
};
