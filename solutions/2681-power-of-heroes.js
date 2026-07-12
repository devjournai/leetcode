/**
 * Power of Heroes
 *
 * Intuition:
 * Sort the heroes in increasing order.
 *
 * Assume nums[i] is the maximum hero in the current group.
 *
 * Then:
 *
 *      contribution =
 *      nums[i]^2 × (sum of all possible minimums)
 *
 * The minimum can be:
 *
 * • nums[i] itself (single element subset)
 * • any previous element chosen as the minimum.
 *
 * While scanning from left to right, maintain a running value that represents
 * the sum of minimum contributions of all previously formed subsets.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Sort nums.
 *
 * 2. Maintain:
 *
 *      prefixContribution
 *
 *      =
 *      sum of minimum values contributed by all subsets formed so far.
 *
 * 3. For every hero x:
 *
 *      minimumSum =
 *
 *          x
 *          +
 *          prefixContribution
 *
 *      Contribution:
 *
 *          x² × minimumSum
 *
 *      Add it to the answer.
 *
 * 4. Update:
 *
 *      prefixContribution =
 *
 *          prefixContribution × 2
 *          +
 *          x
 *
 *      because every previous subset may either include or exclude x.
 *
 * 5. Return the answer modulo 1e9+7.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 *
 * [2,1,4]
 *
 * After sorting:
 *
 * [1,2,4]
 *
 * x = 1
 *
 * answer += 1² × 1 = 1
 *
 * prefix = 1
 *
 * ----------------
 *
 * x = 2
 *
 * answer += 4 × (2+1)=12
 *
 * total =13
 *
 * prefix = 1×2+2=4
 *
 * ----------------
 *
 * x = 4
 *
 * answer +=16×(4+4)=128
 *
 * total =141
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var sumOfPower = function (nums) {
  const MOD = 1000000007n;

  nums.sort((a, b) => a - b);

  let answer = 0n;
  let prefixContribution = 0n;

  for (const value of nums) {
    const x = BigInt(value);

    const contribution = ((x * x) % MOD) * ((x + prefixContribution) % MOD);

    answer = (answer + contribution) % MOD;

    prefixContribution = (prefixContribution * 2n + x) % MOD;
  }

  return Number(answer);
};
