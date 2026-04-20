/**
 * Binary Subarrays With Sum
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
    goal - 1,
  );

  return totalSubarraysUpToGoal - totalSubarraysUpToGoalMinusOne;
};
