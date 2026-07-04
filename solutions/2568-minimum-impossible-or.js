/**
 * Minimum Impossible Or
 * Intuition: A positive integer `X` can be expressed as a bitwise OR of a subsequence of `nums`. The key observation is that a power of two, `2^k`, can be formed this way if and only if `2^k` itself is present in `nums`. This is because for `n_1 | n_2 | ... | n_m` to equal `2^k`, every `n_i` in the subsequence must have its `k`-th bit set and all other bits unset, meaning each `n_i` must be `2^k`. If `1, 2, 4, ..., 2^(K-1)` are all present in `nums`, then any integer `X < 2^K` is expressible by ORing the relevant powers of two. Thus, the minimum non-expressible number must be the smallest power of two, `2^K`, that is not found in `nums`.
 * Approach: 1. Convert the input array `nums` into a `Set` for efficient `O(1)` average-time lookups. 2. Initialize a variable, say `currentValueToFind`, to `1` (the smallest positive integer). 3. Continuously check if `currentValueToFind` exists in the `Set`. If it does, double `currentValueToFind` (left-shift by one bit). 4. The loop terminates when `currentValueToFind` is not found in the `Set`. This `currentValueToFind` is the minimum impossible OR.
 * Dry Run: nums = [1, 2, 5]
 * 1. numberPresenceSet = new Set([1, 2, 5]).
 * 2. currentValueToFind = 1.
 * 3. Loop:
 *    - numberPresenceSet.has(1) is true. currentValueToFind becomes 1 << 1 = 2.
 *    - numberPresenceSet.has(2) is true. currentValueToFind becomes 2 << 1 = 4.
 *    - numberPresenceSet.has(4) is false. Loop terminates.
 * 4. Return currentValueToFind, which is 4.
 * Time Complexity: O(N + log(M))
 * Space Complexity: O(N)
 */
var minImpossibleOR = function (nums) {
  const numberPresenceSet = new Set(nums);
  let currentValueToFind = 1;

  while (numberPresenceSet.has(currentValueToFind)) {
    currentValueToFind <<= 1;
  }

  return currentValueToFind;
};
