/**
 * Minimum Array Sum
 * Intuition: Each index may take no op, divide-by-two (ceil), subtract `k` (if ≥ k), or both in either order. The two orders can differ, so DP over remaining op1/op2 budgets chooses the cheapest option per index.
 * Approach: 1. `dp(i, op1Left, op2Left)` = min sum of `nums[i..]`. 2. Always try skip. 3. If op1 left, try `ceil(nums[i]/2)`. 4. If op2 left and `nums[i] >= k`, try `nums[i]-k`. 5. If both left, try half-then-k (when half ≥ k) and k-then-half (when `nums[i] >= k`). 6. Memoize.
 * Dry Run: nums = [2, 8], k = 5, op1 = 1, op2 = 1. Best: half 8→4, subtract 2? 2<5 so subtract 8→3 and half 2→1, sum 4. Or half 8→4 and leave 2 = 6. Answer 4.
 * Time Complexity: O(N * op1 * op2)
 * Space Complexity: O(N * op1 * op2)
 */
var minArraySum = function (nums, k, op1, op2) {
  const memo = new Map();

  const dp = (index, op1Left, op2Left) => {
    if (index === nums.length) {
      return 0;
    }
    const memoKey = `${index},${op1Left},${op2Left}`;
    if (memo.has(memoKey)) {
      return memo.get(memoKey);
    }

    const currentValue = nums[index];
    let bestSum = currentValue + dp(index + 1, op1Left, op2Left);

    if (op1Left > 0) {
      bestSum = Math.min(
        bestSum,
        Math.floor((currentValue + 1) / 2) + dp(index + 1, op1Left - 1, op2Left)
      );
    }
    if (op2Left > 0 && currentValue >= k) {
      bestSum = Math.min(
        bestSum,
        currentValue - k + dp(index + 1, op1Left, op2Left - 1)
      );
    }
    if (op1Left > 0 && op2Left > 0) {
      const halved = Math.floor((currentValue + 1) / 2);
      if (halved >= k) {
        bestSum = Math.min(
          bestSum,
          halved - k + dp(index + 1, op1Left - 1, op2Left - 1)
        );
      }
      if (currentValue >= k) {
        bestSum = Math.min(
          bestSum,
          Math.floor((currentValue - k + 1) / 2) +
            dp(index + 1, op1Left - 1, op2Left - 1)
        );
      }
    }

    memo.set(memoKey, bestSum);
    return bestSum;
  };

  return dp(0, op1, op2);
};
