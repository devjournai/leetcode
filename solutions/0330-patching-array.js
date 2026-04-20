/**
 * Patching Array
 * Time Complexity: O(L + log N)
 * Space Complexity: O(1)
 */
var minPatches = function (nums, n) {
  let totalPatches = 0;
  let currentElementIndex = 0;
  let maximumReachableSum = 0;

  while (maximumReachableSum < n) {
    if (
      currentElementIndex < nums.length &&
      nums[currentElementIndex] <= maximumReachableSum + 1
    ) {
      maximumReachableSum += nums[currentElementIndex];
      currentElementIndex++;
    } else {
      maximumReachableSum = maximumReachableSum * 2 + 1;
      totalPatches++;
    }
  }

  return totalPatches;
};
