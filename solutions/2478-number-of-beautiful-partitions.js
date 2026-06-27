/**
 * Number of Beautiful Partitions
 *
 * Intuition:
 * A valid partition must:
 * 1. Start with a prime digit (2, 3, 5, 7).
 * 2. End with a non-prime digit.
 * 3. Have a minimum length of `minLength`.
 *
 * Instead of checking every possible partition recursively, precompute all valid
 * starting and ending positions. Then use Dynamic Programming where each DP layer
 * represents the number of partitions formed so far. A running prefix sum is used
 * to optimize transitions and avoid O(N²) complexity.
 *
 * Approach:
 * 1. Let `n` be the length of the string.
 * 2. If `k * minLength > n`, return 0 because it is impossible to create `k`
 *    partitions with the required minimum length.
 * 3. Create a helper function `isPrime(char)` that returns true if the digit is
 *    one of {2, 3, 5, 7}.
 * 4. If:
 *      - the first character is not prime, or
 *      - the last character is prime,
 *    return 0 because the entire partitioning is impossible.
 * 5. Create two arrays:
 *      - `canStart[i]` → true if a partition can start at index `i`.
 *      - `canEnd[i]` → true if a partition can end just before index `i`
 *        (i.e., substring ends at `i-1`).
 * 6. Mark:
 *      - `canStart[0] = true`
 *      - `canEnd[n] = true`
 *    because the first partition always starts at index 0 and the last partition
 *    always ends at the last character.
 * 7. Traverse the string from index 1 to n-1.
 *      If:
 *          previous digit is non-prime
 *          &&
 *          current digit is prime
 *      then:
 *          canStart[i] = true
 *          canEnd[i] = true
 *    because this is a valid partition boundary.
 * 8. Initialize DP:
 *      dp[i] = number of ways to create previous partitions ending exactly at i.
 *      Initially:
 *          dp[0] = 1
 *          all others = 0
 * 9. Repeat for every partition from 1 to k:
 *      a. Create a new DP array `newDp`.
 *      b. Maintain a running prefix sum `runningSum`.
 *      c. Iterate every possible ending index `i` starting from
 *         `partition * minLength` to `n`.
 *      d. Let:
 *            j = i - minLength
 *         which represents the earliest possible starting position.
 *      e. If `canStart[j]` is true,
 *         add `dp[j]` into `runningSum`.
 *      f. If `canEnd[i]` is true,
 *         set:
 *            newDp[i] = runningSum
 *      g. Replace:
 *            dp = newDp
 * 10. Return `dp[n]`.
 *
 * Dry Run:
 * Input:
 *    s = "23542185131"
 *    k = 3
 *    minLength = 2
 *
 * Initial:
 *    n = 11
 *    k * minLength = 6 <= 11
 *
 * First digit = '2' (Prime)
 * Last digit = '1' (Non-prime)
 * Continue.
 *
 * Build canStart / canEnd:
 *
 * Index : 0 1 2 3 4 5 6 7 8 9 10
 * Digit : 2 3 5 4 2 1 8 5 1 3 1
 *
 * Valid boundaries occur whenever:
 *    Non-prime -> Prime
 *
 * Therefore:
 *    canStart[0] = true
 *    canStart[4] = true
 *    canStart[7] = true
 *
 *    canEnd[4] = true
 *    canEnd[7] = true
 *    canEnd[11] = true
 *
 * DP Initialization:
 *    dp =
 *    [1,0,0,0,0,0,0,0,0,0,0,0]
 *
 * -------------------------
 * Partition = 1
 * -------------------------
 *
 * runningSum starts at 0.
 *
 * Whenever a valid start becomes available,
 * add dp[start] into runningSum.
 *
 * Valid ending positions receive runningSum.
 *
 * Result:
 *
 * dp becomes:
 *    [0,0,0,0,1,0,0,1,0,0,0,1]
 *
 * Meaning:
 * There is exactly one way to create one valid partition ending at
 * indices 4, 7 and 11.
 *
 * -------------------------
 * Partition = 2
 * -------------------------
 *
 * Repeat the same process using previous dp.
 *
 * runningSum accumulates previous valid partition counts.
 *
 * New dp:
 *    [0,0,0,0,0,0,0,1,0,0,0,2]
 *
 * Meaning:
 * Two ways now exist to create two beautiful partitions ending at n.
 *
 * -------------------------
 * Partition = 3
 * -------------------------
 *
 * Again repeat.
 *
 * Final dp:
 *    [0,0,0,0,0,0,0,0,0,0,0,3]
 *
 * Answer:
 *    dp[11] = 3
 *
 * Therefore there are 3 beautiful partitions.
 *
 * Time Complexity: O(k × n)
 * Space Complexity: O(n)
 */
var beautifulPartitions = function (s, k, minLength) {
  const n = s.length;

  if (k * minLength > n) return 0;

  const isPrime = (char) => {
    return char === "2" || char === "3" || char === "5" || char === "7";
  };

  if (!isPrime(s[0]) || isPrime(s[n - 1])) return 0;

  const MOD = 1e9 + 7;

  const canStart = new Array(n).fill(false);
  const canEnd = new Array(n + 1).fill(false);

  canStart[0] = true;
  canEnd[n] = true;

  for (let i = 1; i < n; i++) {
    if (!isPrime(s[i - 1]) && isPrime(s[i])) {
      canStart[i] = true;
      canEnd[i] = true;
    }
  }

  let dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let p = 1; p <= k; p++) {
    let newDp = new Array(n + 1).fill(0);
    let runningSum = 0;

    for (let i = p * minLength; i <= n; i++) {
      let j = i - minLength;

      if (canStart[j]) {
        runningSum = (runningSum + dp[j]) % MOD;
      }

      if (canEnd[i]) {
        newDp[i] = runningSum;
      }
    }
    dp = newDp;
  }

  return dp[n];
};
