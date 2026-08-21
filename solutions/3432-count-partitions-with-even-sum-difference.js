/**
 * Count Partitions with Even Sum Difference
 * Intuition: Moving the split one step adds the same value to the left and subtracts it from the right, so the difference's parity never changes. It stays even iff the total sum is even.
 * Approach: 1. Sum the array. 2. If the sum is even, every split (n-1 of them) works; otherwise none do.
 * Dry Run: nums = [1,2,3] sum=6 even → 2 partitions: [1]|[2,3] diff -4, [1,2]|[3] diff 0.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var countPartitions = function (nums) {
  const total = nums.reduce((sum, value) => sum + value, 0);
  return total % 2 === 0 ? nums.length - 1 : 0;
};
