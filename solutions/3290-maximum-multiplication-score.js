/**
 * Maximum Multiplication Score
 * Intuition: We must pick four increasing indices in b and score a[0]*b[i] + a[1]*b[j] + a[2]*b[k] + a[3]*b[l]. Process b left to right and keep the best score using the first t multipliers of a. This is a 4-layer knapsack along b.
 * Approach:
 * 1. `dp[t]` = best score after pairing a[0..t] with some increasing indices already seen in b.
 * 2. Initialize `dp` to a large negative sentinel so incomplete selections are invalid.
 * 3. For each `num` in b, update t = 3..0: either skip `num` (`dp[t]` unchanged) or take it as the partner of `a[t]` (`(t === 0 ? 0 : dp[t-1]) + a[t] * num`). Update from the back so the same `num` is not reused in one pass.
 * 4. Return `dp[3]`.
 * Dry Run: a = [3, 2, 5, 6], b = [2, -6]
 *   - num=2: dp0=3*2=6; dp1 still -inf (needs a previous pick); dp2/dp3 -inf
 *   - num=-6: dp0=max(6, 3*(-6))=6; dp1=6+2*(-6)=-6; dp2/dp3 still -inf
 *   - Not enough numbers yet for four picks; full examples continue the same recurrence until dp[3] is finite.
 * Time Complexity: O(|b|)
 * Space Complexity: O(1)
 */
var maxScore = function (a, b) {
  const dp = Array(4).fill(-1e15);

  for (const num of b) {
    for (let i = 3; i >= 0; i--) {
      dp[i] = Math.max(dp[i], (i > 0 ? dp[i - 1] : 0) + a[i] * num);
    }
  }

  return dp[3];
};
