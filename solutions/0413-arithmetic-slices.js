/**
 * Arithmetic Slices
 * Intuition: Each time a new index continues the same difference as the previous pair, it adds one new slice ending here plus all longer slices already counted by `consecutiveCount`.
 * Approach: 1. Length < 3 → 0. 2. From index 2, compare `nums[i]-nums[i-1]` with `nums[i-1]-nums[i-2]`. 3. Equal: increment `consecutiveCount` and add it to `totalSlicesFound`; else reset. 4. Return the total.
 * Dry Run: nums = [1,2,3,4].
 *   - i=2 diffs 1=1 → count=1, total=1 ([1,2,3]).
 *   - i=3 diffs 1=1 → count=2, total=3 ([2,3,4] and [1,2,3,4]). Return 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfArithmeticSlices = function (nums) {
  const numsLength = nums.length;

  if (numsLength < 3) {
    return 0;
  }

  let totalSlicesFound = 0;
  let consecutiveCount = 0;
  let currentPointer = 2;

  while (currentPointer < numsLength) {
    const firstDifference = nums[currentPointer] - nums[currentPointer - 1];
    const secondDifference =
      nums[currentPointer - 1] - nums[currentPointer - 2];

    if (firstDifference === secondDifference) {
      consecutiveCount++;
      totalSlicesFound += consecutiveCount;
    } else {
      consecutiveCount = 0;
    }
    currentPointer++;
  }

  return totalSlicesFound;
};
