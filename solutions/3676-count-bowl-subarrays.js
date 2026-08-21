/**
 * Count Bowl Subarrays
 * Intuition: A bowl’s two endpoints are the two largest values in that range, so one endpoint is the nearest strictly greater neighbor of the other. Length must be at least 3.
 * Approach: 1. Monotonic decreasing stack computes previous greater and next greater for every index. 2. Count [prevGreater[i], i] when that span has length >= 3. 3. Count [i, nextGreater[i]] when that span has length >= 3. Each bowl is generated exactly once.
 * Dry Run: nums = [2, 5, 3, 1, 4]. Next greater of 3 is 4 → [3, 1, 4]. Previous greater of 4 is 5 → [5, 3, 1, 4]. Total 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var bowlSubarrays = function (nums) {
  const n = nums.length;
  const previousGreater = new Array(n).fill(-1);
  const nextGreater = new Array(n).fill(n);
  const stack = [];

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      nextGreater[stack.pop()] = i;
    }
    if (stack.length > 0) {
      previousGreater[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }

  let bowlCount = 0;
  for (let i = 0; i < n; i++) {
    if (previousGreater[i] !== -1 && i - previousGreater[i] + 1 >= 3) {
      bowlCount++;
    }
    if (nextGreater[i] !== n && nextGreater[i] - i + 1 >= 3) {
      bowlCount++;
    }
  }

  return bowlCount;
};
