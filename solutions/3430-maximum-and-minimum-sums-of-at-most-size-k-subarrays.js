/**
 * Maximum and Minimum Sums of at Most Size K Subarrays
 * Intuition: Each value's contribution as a subarray maximum (or minimum) is the count of windows of length <= k where it is the extreme, found with nearest greater/lesser bounds.
 * Approach: 1. Monotonic stacks give prev/next greater and prev/next smaller. 2. For bounds l = min(i-prev, k) and r = min(next-i, k), the number of windows is l*r minus the oversize triangle extra*(extra+1)/2. 3. Sum value * count for maxima and minima.
 * Dry Run: nums = [1,2,3], k = 2. As max, 3 is max of [2,3] and [3]; 2 is max of [1,2] and [2]. As min, 1 is min of [1] and [1,2]. Sum those contributions.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var minMaxSubarraySum = function (nums, k) {
  const getPrevNext = (compare) => {
    const n = nums.length;
    const prev = new Array(n).fill(-1);
    const next = new Array(n).fill(n);
    const stack = [];
    for (let index = 0; index < n; index++) {
      while (
        stack.length > 0 &&
        compare(nums[stack[stack.length - 1]], nums[index])
      ) {
        next[stack.pop()] = index;
      }
      if (stack.length > 0) {
        prev[index] = stack[stack.length - 1];
      }
      stack.push(index);
    }
    return [prev, next];
  };

  const subarraySum = (prev, next) => {
    let total = 0;
    for (let index = 0; index < nums.length; index++) {
      const left = Math.min(index - prev[index], k);
      const right = Math.min(next[index] - index, k);
      const extra = Math.max(0, left + right - 1 - k);
      total += nums[index] * (left * right - (extra * (extra + 1)) / 2);
    }
    return total;
  };

  const [prevGreater, nextGreater] = getPrevNext((left, right) => left < right);
  const [prevLess, nextLess] = getPrevNext((left, right) => left > right);
  return (
    subarraySum(prevGreater, nextGreater) + subarraySum(prevLess, nextLess)
  );
};
