/**
 * Minimize Maximum Pair Sum in Array
 * Intuition: The max pair sum is minimized by pairing smallest with largest after sorting.
 * Approach: 1. Sort `nums`. 2. Two pointers `startIndex`/`endIndex`, track max of nums[lo]+nums[hi].
 * Dry Run: nums=[3,5,2,3] sorted [2,3,3,5]. Pairs 2+5=7, 3+3=6. Return 7.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minPairSum = function (nums) {
  nums.sort((firstElement, secondElement) => firstElement - secondElement);

  let minimizedMaxPairSum = 0;
  let startIndex = 0;
  let endIndex = nums.length - 1;

  while (startIndex < endIndex) {
    let currentPairTotal = nums[startIndex] + nums[endIndex];
    minimizedMaxPairSum = Math.max(minimizedMaxPairSum, currentPairTotal);
    startIndex++;
    endIndex--;
  }

  return minimizedMaxPairSum;
};
