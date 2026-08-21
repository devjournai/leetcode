/**
 * Minimum Moves To Equal Array Elements
 * Intuition: Incrementing n-1 elements is equivalent to decrementing the remaining one. Minimum moves equal the sum of (value − min).
 * Approach: 1. Empty → 0. 2. Scan for `minimumElement`. 3. Sum `currentArrayValue - minimumElement` over the array. 4. Return `totalMovesCount`.
 * Dry Run: [1,2,3]. Min 1. Moves 0+1+2=3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minMoves = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let minimumElement = nums[0];
  for (let elementIndex = 1; elementIndex < nums.length; elementIndex++) {
    if (nums[elementIndex] < minimumElement) {
      minimumElement = nums[elementIndex];
    }
  }

  let totalMovesCount = 0;
  for (let currentArrayValue of nums) {
    totalMovesCount += currentArrayValue - minimumElement;
  }

  return totalMovesCount;
};
