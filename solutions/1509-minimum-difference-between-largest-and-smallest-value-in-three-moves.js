/**
 * Minimum Difference Between Largest And Smallest Value In Three Moves
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minDifference = function (nums) {
  if (nums.length <= 4) {
    return 0;
  }

  nums.sort((valueA, valueB) => valueA - valueB);

  const numElements = nums.length;
  let minAchievedDifference = Infinity;

  minAchievedDifference = Math.min(
    minAchievedDifference,
    nums[numElements - 4] - nums[0],
  );

  minAchievedDifference = Math.min(
    minAchievedDifference,
    nums[numElements - 3] - nums[1],
  );

  minAchievedDifference = Math.min(
    minAchievedDifference,
    nums[numElements - 2] - nums[2],
  );

  minAchievedDifference = Math.min(
    minAchievedDifference,
    nums[numElements - 1] - nums[3],
  );

  return minAchievedDifference;
};
