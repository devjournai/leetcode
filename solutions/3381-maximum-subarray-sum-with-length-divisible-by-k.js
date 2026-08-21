/**
 * Maximum Subarray Sum With Length Divisible by K
 * Intuition: A subarray `nums[j+1..i]` has length divisible by `k` iff `i % k === j % k`. Maximize `prefix[i] - minPrefixWithSameRemainder`.
 * Approach: 1. Track running prefix sums. 2. `minPrefix[r]` is the smallest prefix among indices with remainder `r`. 3. Seed `minPrefix[k-1] = 0` for the empty prefix at index -1. 4. At each `i`, update the answer then the bucket `i % k`.
 * Dry Run: nums = [1, 2], k = 1. Any length works. Best is 1+2=3. minPrefix[0]=0, after i=0 prefix=1 ans=1, after i=1 prefix=3 ans=3.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */

var maxSubarraySum = function (nums, k) {
  let maximumSum = -Infinity;
  let prefixSum = 0;
  const minPrefixByRemainder = new Array(k).fill(Infinity);
  minPrefixByRemainder[k - 1] = 0;

  for (let index = 0; index < nums.length; index++) {
    prefixSum += nums[index];
    maximumSum = Math.max(
      maximumSum,
      prefixSum - minPrefixByRemainder[index % k]
    );
    minPrefixByRemainder[index % k] = Math.min(
      minPrefixByRemainder[index % k],
      prefixSum
    );
  }

  return maximumSum;
};
