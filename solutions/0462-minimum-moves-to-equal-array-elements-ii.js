/**
 * Minimum Moves To Equal Array Elements II
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
