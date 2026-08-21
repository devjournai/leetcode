/**
 * Minimum Moves To Equal Array Elements II
 * Intuition: The median minimizes total absolute deviation. Sort, pick the middle element, sum |nums[i]-median|.
 * Approach: 1. Sort ascending. 2. `commonTargetValue = nums[floor(n/2)]`. 3. Accumulate `Math.abs(currentNumber - commonTargetValue)`. 4. Return `accumulatedMoves`.
 * Dry Run: [1,2,3]. Median 2. Moves 1+0+1=2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var minMoves2 = function (nums) {
  nums.sort((firstElement, secondElement) => firstElement - secondElement);

  let totalElements = nums.length;
  let medianIndexPosition = Math.floor(totalElements / 2);
  let commonTargetValue = nums[medianIndexPosition];

  let accumulatedMoves = 0;
  for (let currentNumber of nums) {
    accumulatedMoves += Math.abs(currentNumber - commonTargetValue);
  }

  return accumulatedMoves;
};
