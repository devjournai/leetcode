/**
 * Special Permutations
 *
 * Intuition:
 * Since n ≤ 14, every subset of numbers can be represented by a bitmask.
 *
 * We build the permutation one element at a time.
 *
 * A transition is allowed only if the current number and the next number satisfy:
 *
 *      a % b == 0
 *      OR
 *      b % a == 0
 *
 * Therefore, use Bitmask DP.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Precompute an adjacency list.
 *
 *      adj[i]
 *
 *      contains every index j such that
 *
 *      nums[i] and nums[j]
 *
 *      satisfy the divisibility condition.
 *
 * 2. Define DP:
 *
 *      dfs(mask, last)
 *
 *      =
 *      number of valid permutations where
 *
 *          mask
 *              represents the used numbers
 *
 *          last
 *              is the last chosen index.
 *
 * 3. Base Case:
 *
 *      If every number is used,
 *
 *          return 1.
 *
 * 4. Transition:
 *
 *      Try every unused adjacent index.
 *
 * 5. Memoize every state.
 *
 * 6. Start DFS from every possible first element.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [2,3,6]
 *
 * Graph:
 *
 * 2 ↔ 6
 *
 * 3 ↔ 6
 *
 * DFS:
 *
 * 2 → 6 → 3
 *
 * 3 → 6 → 2
 *
 * Answer = 2
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N² × 2ᴺ)
 * Space Complexity: O(N × 2ᴺ)
 */

var specialPerm = function (nums) {
  const MOD = 1000000007;

  const n = nums.length;

  const adj = Array.from({ length: n }, () => []);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && (nums[i] % nums[j] === 0 || nums[j] % nums[i] === 0)) {
        adj[i].push(j);
      }
    }
  }

  const fullMask = (1 << n) - 1;

  const memo = Array.from({ length: 1 << n }, () => new Array(n).fill(-1));

  const dfs = (mask, last) => {
    if (mask === fullMask) {
      return 1;
    }

    if (memo[mask][last] !== -1) {
      return memo[mask][last];
    }

    let ways = 0;

    for (const next of adj[last]) {
      if ((mask & (1 << next)) !== 0) {
        continue;
      }

      ways = (ways + dfs(mask | (1 << next), next)) % MOD;
    }

    memo[mask][last] = ways;

    return ways;
  };

  let answer = 0;

  for (let i = 0; i < n; i++) {
    answer = (answer + dfs(1 << i, i)) % MOD;
  }

  return answer;
};
