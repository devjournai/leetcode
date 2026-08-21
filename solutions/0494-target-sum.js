/**
 * Target Sum
 * Intuition: Each number is added or subtracted. The number of ways to reach `target` from index 0 is memoized on `(index, running sum)`.
 * Approach: 1. `computeCombinations(i, sum)`: if i==n, return 1 iff sum==target else 0. 2. Cache key `` `${i},${sum}` ``. 3. Recurse with `sum+nums[i]` and `sum-nums[i]`; store the sum of both. 4. Start at (0, 0).
 * Dry Run: nums = [1,1,1,1,1], target = 3.
 *   - Five ±1 choices with exactly three more pluses than minuses (net +3) → 5 ways. Memo hits shared (index,sum) states.
 * Time Complexity: O(N * S)
 * Space Complexity: O(N * S)
 */
var findTargetSumWays = function (nums, target) {
  const memoizationStore = new Map();

  function computeCombinations(currentNumberIndex, currentAccumulatedSum) {
    if (currentNumberIndex === nums.length) {
      return currentAccumulatedSum === target ? 1 : 0;
    }

    const stateKey = `${currentNumberIndex},${currentAccumulatedSum}`;

    if (memoizationStore.has(stateKey)) {
      return memoizationStore.get(stateKey);
    }

    const resultFromAddition = computeCombinations(
      currentNumberIndex + 1,
      currentAccumulatedSum + nums[currentNumberIndex]
    );
    const resultFromSubtraction = computeCombinations(
      currentNumberIndex + 1,
      currentAccumulatedSum - nums[currentNumberIndex]
    );

    const totalPossibleWays = resultFromAddition + resultFromSubtraction;

    memoizationStore.set(stateKey, totalPossibleWays);

    return totalPossibleWays;
  }

  return computeCombinations(0, 0);
};
