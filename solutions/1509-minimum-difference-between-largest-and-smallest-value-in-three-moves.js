/**
 * Minimum Difference Between Largest And Smallest Value In Three Moves
 * Intuition: Three changes can drop three extremes. After sorting, try removing 0..3 from the left and the rest from the right.
 * Approach: 1. If n≤4 return 0. 2. Sort. 3. Min of nums[n-4]-nums[0], nums[n-3]-nums[1], nums[n-2]-nums[2], nums[n-1]-nums[3].
 * Dry Run: nums = [5,3,2,4].
 *   - n=4 → 0.
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
    nums[numElements - 4] - nums[0]
  );

  minAchievedDifference = Math.min(
    minAchievedDifference,
    nums[numElements - 3] - nums[1]
  );

  minAchievedDifference = Math.min(
    minAchievedDifference,
    nums[numElements - 2] - nums[2]
  );

  minAchievedDifference = Math.min(
    minAchievedDifference,
    nums[numElements - 1] - nums[3]
  );

  return minAchievedDifference;
};
