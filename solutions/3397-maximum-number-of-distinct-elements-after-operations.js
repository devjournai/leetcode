/**
 * Maximum Number of Distinct Elements After Operations
 * Intuition: Each value may move to any integer in `[num - k, num + k]`. Greedily assign the smallest still-free integer that a sorted number can reach so later numbers keep more room.
 * Approach: 1. Sort `nums`. 2. Track `occupied`, the last assigned integer. 3. If `occupied < num + k`, assign `max(occupied + 1, num - k)` and count +1.
 * Dry Run: nums = [1,2,2,3], k = 1. Assign 0, then 1, then 2, then 3 → 4 distinct.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */

var maxDistinctElements = function (nums, k) {
  nums.sort((leftValue, rightValue) => leftValue - rightValue);
  let distinctCount = 0;
  let lastOccupied = -Infinity;

  for (const number of nums) {
    if (lastOccupied < number + k) {
      lastOccupied = Math.max(lastOccupied + 1, number - k);
      distinctCount++;
    }
  }

  return distinctCount;
};
