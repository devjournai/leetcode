/**
 * Minimum Moves To Pick K Ones
 * Intuition: Alice gathers `k` ones. Action 1 creates a one beside her and picks it (cost 2, limited by `maxChanges`). Action 2 walks an existing one toward her (cost = distance). Distances are minimized by sitting on a median of a window of existing ones. Using Action 2 on ones farther than about 3 neighbors is never better than Action 1, so only a few window sizes need checking.
 * Approach: 1. Collect indices of all ones and build a prefix sum of those indices. 2. Let `minOnesBySwap = max(0, k - maxChanges)` and `maxOnesBySwap = min(k, minOnesBySwap + 3, onesCount)`. 3. For each window size in that range and every window of that size, cost of swaps is the sum of distances to the median (computed from prefix sums); remaining ones cost 2 each. 4. Return the minimum total.
 * Dry Run:
 * Input: nums = [1,1,0,0,0,1,1,0,0,1], k = 3, maxChanges = 1
 * 1. oneIndices = [0,1,5,6,9], prefix = [0,0,1,6,12,21]
 * 2. minOnesBySwap = 2, maxOnesBySwap = min(3, 5, 5) = 3
 * 3. Window of 2 ones at [0,1]: swap cost 1, create 1 one for 2, total 3
 * 4. Other windows are no better than 3. Answer: 3
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minimumMoves = function (nums, k, maxChanges) {
  const INDICES_WITHIN_DISTANCE_ONE = 3;
  const onePositions = [];
  for (let arrayIndex = 0; arrayIndex < nums.length; arrayIndex++) {
    if (nums[arrayIndex] === 1) {
      onePositions.push(arrayIndex);
    }
  }

  const prefixOfOnePositions = [0];
  for (let oneIndex = 0; oneIndex < onePositions.length; oneIndex++) {
    prefixOfOnePositions.push(
      prefixOfOnePositions[prefixOfOnePositions.length - 1] +
        onePositions[oneIndex]
    );
  }

  const minOnesCollectedBySwap = Math.max(0, k - maxChanges);
  const maxOnesCollectedBySwap = Math.min(
    k,
    minOnesCollectedBySwap + INDICES_WITHIN_DISTANCE_ONE,
    onePositions.length
  );

  let minimumMoveCount = Number.POSITIVE_INFINITY;
  for (
    let onesBySwap = minOnesCollectedBySwap;
    onesBySwap <= maxOnesCollectedBySwap;
    onesBySwap++
  ) {
    for (
      let windowLeft = 0;
      windowLeft + onesBySwap < prefixOfOnePositions.length;
      windowLeft++
    ) {
      const windowRight = windowLeft + onesBySwap;
      const creationCost = (k - onesBySwap) * 2;
      const medianHigh = Math.floor((windowLeft + windowRight) / 2);
      const medianLow = Math.floor((windowLeft + windowRight + 1) / 2);
      const swapCost =
        prefixOfOnePositions[windowRight] -
        prefixOfOnePositions[medianHigh] -
        (prefixOfOnePositions[medianLow] - prefixOfOnePositions[windowLeft]);
      minimumMoveCount = Math.min(minimumMoveCount, creationCost + swapCost);
    }
  }

  return minimumMoveCount;
};
