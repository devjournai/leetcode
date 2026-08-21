/**
 * Maximum Product of Subsequences With an Alternating Sum Equal to K
 * Intuition: DP over index, remaining alternating-sum target, capped product, and whether the next pick adds or subtracts. Skip or take each element in +/− order.
 * Approach: 1. If |k| exceeds the total sum, return -1. 2. Recurse: skip nums[i], or take it as first (+), as subtract, or as add, capping product at limit+1. 3. At the end, accept only a non-empty subsequence with remaining k=0 and product ≤ limit.
 * Dry Run: nums = [1, 2, 3], k = 2, limit = 10. Subsequence [1,3] has alt sum 1-3? Wait [2] product 2 sum 2. Answer 2.
 * Time Complexity: O(N * sum(nums) * limit)
 * Space Complexity: O(N * sum(nums) * limit)
 */
var maxProduct = function (nums, k, limit) {
  const MIN = -5000;
  const FIRST = 0;
  const SUBTRACT = 1;
  const ADD = 2;
  let total = 0;
  for (const value of nums) total += value;
  if (Math.abs(k) > total) return -1;

  const memo = new Map();

  const dp = (i, product, state, remaining) => {
    if (i === nums.length) {
      return remaining === 0 && state !== FIRST && product <= limit
        ? product
        : MIN;
    }
    const key = `${i},${remaining},${product},${state}`;
    if (memo.has(key)) return memo.get(key);
    let result = dp(i + 1, product, state, remaining);
    if (state === FIRST) {
      result = Math.max(
        result,
        dp(i + 1, nums[i], SUBTRACT, remaining - nums[i])
      );
    }
    if (state === SUBTRACT) {
      result = Math.max(
        result,
        dp(
          i + 1,
          Math.min(product * nums[i], limit + 1),
          ADD,
          remaining + nums[i]
        )
      );
    }
    if (state === ADD) {
      result = Math.max(
        result,
        dp(
          i + 1,
          Math.min(product * nums[i], limit + 1),
          SUBTRACT,
          remaining - nums[i]
        )
      );
    }
    memo.set(key, result);
    return result;
  };

  const answer = dp(0, 1, FIRST, k);
  return answer === MIN ? -1 : answer;
};
