/**
 * Two Sum Less Than K
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var twoSumLessThanK = function (nums, k) {
  nums.sort((elementA, elementB) => elementA - elementB);

  let firstPointerIndex = 0;
  let secondPointerIndex = nums.length - 1;
  let maxPossibleSum = -1;

  while (firstPointerIndex < secondPointerIndex) {
    const currentSumCalculation =
      nums[firstPointerIndex] + nums[secondPointerIndex];

    if (currentSumCalculation < k) {
      maxPossibleSum = Math.max(maxPossibleSum, currentSumCalculation);
      firstPointerIndex++;
    } else {
      secondPointerIndex--;
    }
  }

  return maxPossibleSum;
};
