/**
 * Sum of Variable Length Subarrays
 * Intuition: For each index i the subarray is nums[max(0, i - nums[i])..i], so prefix sums answer every range in O(1).
 * Approach: 1. Build prefix where prefix[i+1] is the sum of nums[0..i]. 2. Add prefix[i+1] - prefix[max(0, i - nums[i])] for every i.
 * Dry Run: nums = [2,3,1]. i=0 → [2]=2. i=1 → start=max(0,1-3)=0 → [2,3]=5. i=2 → start=max(0,2-1)=1 → [3,1]=4. Total 11.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var subarraySum = function (nums) {
  const n = nums.length;
  const prefix = new Array(n + 1).fill(0);
  for (let index = 0; index < n; index++) {
    prefix[index + 1] = prefix[index] + nums[index];
  }

  let total = 0;
  for (let index = 0; index < n; index++) {
    const start = Math.max(0, index - nums[index]);
    total += prefix[index + 1] - prefix[start];
  }
  return total;
};
