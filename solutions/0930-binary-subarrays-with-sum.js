/**
 * Binary Subarrays With Sum
 * Intuition: Number of subarrays with sum == goal equals (sum ≤ goal) minus (sum ≤ goal−1). On a binary array, a sliding window counts at-most-S windows in linear time.
 * Approach: 1. `countSubarraysWithAtMostSum`: if limit<0 return 0; expand right, shrink left while sum>limit, add window length. 2. Return atMost(goal) − atMost(goal−1).
 * Dry Run: nums=[1,0,1,0,1], goal=2. atMost(2) windows include all length-enough; difference is 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numSubarraysWithSum = function (nums, goal) {
  const countSubarraysWithAtMostSum = (inputArray, upperLimit) => {
    if (upperLimit < 0) {
      return 0;
    }

    let leftBoundary = 0;
    let currentWindowSum = 0;
    let cumulativeCount = 0;

    for (
      let rightBoundary = 0;
      rightBoundary < inputArray.length;
      rightBoundary++
    ) {
      currentWindowSum += inputArray[rightBoundary];

      while (currentWindowSum > upperLimit) {
        currentWindowSum -= inputArray[leftBoundary];
        leftBoundary++;
      }
      cumulativeCount += rightBoundary - leftBoundary + 1;
    }
    return cumulativeCount;
  };

  let totalSubarraysUpToGoal = countSubarraysWithAtMostSum(nums, goal);
  let totalSubarraysUpToGoalMinusOne = countSubarraysWithAtMostSum(
    nums,
    goal - 1
  );

  return totalSubarraysUpToGoal - totalSubarraysUpToGoalMinusOne;
};
